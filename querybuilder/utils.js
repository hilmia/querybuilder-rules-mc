/*
The MIT License (MIT)

Copyright (c) 2014-2015 Damien Sorel

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

/*
* Logic copied from the jQuery QueryBuilder library, converted to node.js syntax.
*/

var Utils = function() {
};

/**
 * Replaces {0}, {1}, ... in a string
 * @param str {string}
 * @param args,... {mixed}
 * @return {string}
 */
Utils.fmt = function(str/*, args*/) {
    var args = Array.prototype.slice.call(arguments, 1);

    return str.replace(/{([0-9]+)}/g, function(m, i) {
        return args[parseInt(i)];
    });
};

/**
 * Throw an Error object with custom name
 * @param type {string}
 * @param message {string}
 * @param args,... {mixed}
 */
Utils.error = function(type, message/*, args*/) {
    var err = new Error(Utils.fmt.apply(null, Array.prototype.slice.call(arguments, 1)));
    err.name = type + 'Error';
    err.args = Array.prototype.slice.call(arguments, 2);
    throw err;
};

/**
 * Change type of a value to int or float
 * @param value {mixed}
 * @param type {string} 'integer', 'double' or anything else
 * @param boolAsInt {boolean} return 0 or 1 for booleans
 * @return {mixed}
 */
Utils.changeType = function(value, type, boolAsInt) {
    switch (type) {
        case 'integer': return parseInt(value);
        case 'double': return parseFloat(value);
        case 'boolean':
            var bool = value.trim().toLowerCase() === 'true' || value.trim() === '1' || value === 1;
            return boolAsInt ? (bool ? 1 : 0) : bool;
        default: return value;
    }
};

/**
 * Escape string like mysql_real_escape_string
 * @param value {string}
 * @return {string}
 */
Utils.escapeString = function(value) {
    if (typeof value !== 'string') {
        return value;
    }

    return value
      .replace(/[\0\n\r\b\\\'\"]/g, function(s) {
          switch (s) {
              case '\0': return '\\0';
              case '\n': return '\\n';
              case '\r': return '\\r';
              case '\b': return '\\b';
              default:   return '\\' + s;
          }
      })
      // uglify compliant
      .replace(/\t/g, '\\t')
      .replace(/\x1a/g, '\\Z');
};

/**
 * Escape value for use in regex
 * @param value {string}
 * @return {string}
 */
Utils.escapeRegExp = function(str) {
    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
};

/**
 * Sort objects by grouping them by {key}, preserving initial order when possible
 * @param {object[]} items
 * @param {string} key
 * @returns {object[]}
 */
Utils.groupSort = function(items, key) {
    var optgroups = [];
    var newItems = [];

    items.forEach(function(item) {
        var idx;

        if (item[key]) {
            idx = optgroups.lastIndexOf(item[key]);

            if (idx == -1) {
                idx = optgroups.length;
            }
            else {
                idx++;
            }
        }
        else {
            idx = optgroups.length;
        }

        optgroups.splice(idx, 0, item[key]);
        newItems.splice(idx, 0, item);
    });

    return newItems;
};

module.exports = Utils;

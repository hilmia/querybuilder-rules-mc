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

var _ = require('underscore');
var defaults = require('../defaults');
var Utils = require('../utils');
var PluginBase = require('./plugin-base');
var util = require('util');

var MongoSupport = function MongoSupport() {
	this.settings = _.extend(defaults.DEFAULTS, {
		mongoOperators: {
			equal:            function(v) { return v[0]; },
			not_equal:        function(v) { return { '$ne': v[0] }; },
			in:               function(v) { return { '$in': v }; },
			not_in:           function(v) { return { '$nin': v }; },
			less:             function(v) { return { '$lt': v[0] }; },
			less_or_equal:    function(v) { return { '$lte': v[0] }; },
			greater:          function(v) { return { '$gt': v[0] }; },
			greater_or_equal: function(v) { return { '$gte': v[0] }; },
			between:          function(v) { return { '$gte': v[0], '$lte': v[1] }; },
			not_between:      function(v) { return { '$lt': v[0], '$gt': v[1] }; },
			begins_with:      function(v) { return { '$regex': '^' + Utils.escapeRegExp(v[0]) }; },
			not_begins_with:  function(v) { return { '$regex': '^(?!' + Utils.escapeRegExp(v[0]) + ')' }; },
			contains:         function(v) { return { '$regex': Utils.escapeRegExp(v[0]) }; },
			not_contains:     function(v) { return { '$regex': '^((?!' + Utils.escapeRegExp(v[0]) + ').)*$', '$options': 's' }; },
			ends_with:        function(v) { return { '$regex': Utils.escapeRegExp(v[0]) + '$' }; },
			not_ends_with:    function(v) { return { '$regex': '(?<!' + Utils.escapeRegExp(v[0]) + ')$' }; },
			is_empty:         function(v) { return ''; },
			is_not_empty:     function(v) { return { '$ne': '' }; },
			is_null:          function(v) { return null; },
			is_not_null:      function(v) { return { '$ne': null }; }
		},

		mongoRuleOperators: {
			$ne: function(v) {
				v = v.$ne;
				return {
					'val': v,
					'op': v === null ? 'is_not_null' : (v === '' ? 'is_not_empty' : 'not_equal')
				};
			},
			eq: function(v) {
				return {
					'val': v,
					'op': v === null ? 'is_null' : (v === '' ? 'is_empty' : 'equal')
				};
			},
			$regex: function(v) {
				v = v.$regex;
				if (v.slice(0, 4) == '^(?!' && v.slice(-1) == ')') {
					return { 'val': v.slice(4, -1), 'op': 'not_begins_with' };
				}
				else if (v.slice(0, 5) == '^((?!' && v.slice(-5) == ').)*$') {
					return { 'val': v.slice(5, -5), 'op': 'not_contains' };
				}
				else if (v.slice(0, 4) == '(?<!' && v.slice(-2) == ')$') {
					return { 'val': v.slice(4, -2), 'op': 'not_ends_with' };
				}
				else if (v.slice(-1) == '$') {
					return { 'val': v.slice(0, -1), 'op': 'ends_with' };
				}
				else if (v.slice(0, 1) == '^') {
					return { 'val': v.slice(1), 'op': 'begins_with' };
				}
				else {
					return { 'val': v, 'op': 'contains' };
				}
			},
			between:     function(v) { return { 'val': [v.$gte, v.$lte], 'op': 'between' }; },
			not_between: function(v) { return { 'val': [v.$lt, v.$gt], 'op': 'not_between' }; },
			$in:  function(v) { return { 'val': v.$in, 'op': 'in' }; },
			$nin: function(v) { return { 'val': v.$nin, 'op': 'not_in' }; },
			$lt:  function(v) { return { 'val': v.$lt, 'op': 'less' }; },
			$lte: function(v) { return { 'val': v.$lte, 'op': 'less_or_equal' }; },
			$gt:  function(v) { return { 'val': v.$gt, 'op': 'greater' }; },
			$gte: function(v) { return { 'val': v.$gte, 'op': 'greater_or_equal' }; }
		}
	});

	this.operators = defaults.OPERATORS;
}

util.inherits(MongoSupport, PluginBase);

/**
 * Get rules as MongoDB query
 * @throws UndefinedMongoConditionError, UndefinedMongoOperatorError
 * @param data {object} (optional) rules
 * @return {object}
 */
MongoSupport.prototype.getMongo = function(data) {
    if (_.isUndefined(data)) {
        throw new Error('Missing rules');
    }

    var self = this;

    return (function parse(data) {
        if (!data.condition) {
            data.condition = self.settings.default_condition;
        }
        if (['AND', 'OR'].indexOf(data.condition.toUpperCase()) === -1) {
            Utils.error('UndefinedMongoCondition', 'Unable to build MongoDB query with condition "{0}"', data.condition);
        }

        if (!data.rules) {
            return {};
        }

        var parts = [];

        data.rules.forEach(function(rule) {
            if (rule.rules && rule.rules.length > 0) {
                parts.push(parse(rule));
            }
            else {
                var mdb = self.settings.mongoOperators[rule.operator];
                var ope = self.getOperatorByType(rule.operator);
                var values = [];

                if (mdb === undefined) {
                    Utils.error('UndefinedMongoOperator', 'Unknown MongoDB operation for operator "{0}"', rule.operator);
                }

                if (ope.nb_inputs !== 0) {
                    if (!(rule.value instanceof Array)) {
                        rule.value = [rule.value];
                    }

                    rule.value.forEach(function(v) {
                        values.push(Utils.changeType(v, rule.type, false));
                    });
                }

                var part = {};
                part[rule.field] = mdb.call(self, values);
                parts.push(part);
            }
        });

        var res = {};
        if (parts.length > 0) {
            res['$' + data.condition.toLowerCase()] = parts;
        }
        return res;
    }(data));
}

module.exports = new MongoSupport();
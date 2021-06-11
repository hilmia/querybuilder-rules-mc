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

var SqlSupport = function SqlSupport() {
    this.settings = _.extend(defaults.DEFAULTS, {
        /* operators for internal -> SQL conversion */
        sqlOperators: {
            equal:            { op: '= ?' },
            not_equal:        { op: '!= ?' },
            in:               { op: 'IN(?)',          sep: ', ' },
            not_in:           { op: 'NOT IN(?)',      sep: ', ' },
            less:             { op: '< ?' },
            less_or_equal:    { op: '<= ?' },
            greater:          { op: '> ?' },
            greater_or_equal: { op: '>= ?' },
            between:          { op: 'BETWEEN ?',      sep: ' AND ' },
            not_between:      { op: 'NOT BETWEEN ?',  sep: ' AND ' },
            begins_with:      { op: 'LIKE(?)',        mod: '{0}%' },
            not_begins_with:  { op: 'NOT LIKE(?)',    mod: '{0}%' },
            contains:         { op: 'LIKE(?)',        mod: '%{0}%' },
            not_contains:     { op: 'NOT LIKE(?)',    mod: '%{0}%' },
            ends_with:        { op: 'LIKE(?)',        mod: '%{0}' },
            not_ends_with:    { op: 'NOT LIKE(?)',    mod: '%{0}' },
            is_empty:         { op: '= \'\'' },
            is_not_empty:     { op: '!= \'\'' },
            is_null:          { op: 'IS NULL' },
            is_not_null:      { op: 'IS NOT NULL' }
        },

        /* operators for SQL -> internal conversion */
        sqlRuleOperator: {
            '=': function(v) {
                return {
                    val: v,
                    op: v === '' ? 'is_empty' : 'equal'
                };
            },
            '!=': function(v) {
                return {
                    val: v,
                    op: v === '' ? 'is_not_empty' : 'not_equal'
                };
            },
            'LIKE': function(v) {
                if (v.slice(0, 1) == '%' && v.slice(-1) == '%') {
                    return {
                        val: v.slice(1, -1),
                        op: 'contains'
                    };
                }
                else if (v.slice(0, 1) == '%') {
                    return {
                        val: v.slice(1),
                        op: 'ends_with'
                    };
                }
                else if (v.slice(-1) == '%') {
                    return {
                        val: v.slice(0, -1),
                        op: 'begins_with'
                    };
                }
                else {
                    Utils.error('SQLParse', 'Invalid value for LIKE operator "{0}"', v);
                }
            },
            'IN':           function(v) { return { val: v, op: 'in' }; },
            'NOT IN':       function(v) { return { val: v, op: 'not_in' }; },
            '<':            function(v) { return { val: v, op: 'less' }; },
            '<=':           function(v) { return { val: v, op: 'less_or_equal' }; },
            '>':            function(v) { return { val: v, op: 'greater' }; },
            '>=':           function(v) { return { val: v, op: 'greater_or_equal' }; },
            'BETWEEN':      function(v) { return { val: v, op: 'between' }; },
            'NOT BETWEEN':  function(v) { return { val: v, op: 'not_between' }; },
            'IS': function(v) {
                if (v !== null) {
                    Utils.error('SQLParse', 'Invalid value for IS operator');
                }
                return { val: null, op: 'is_null' };
            },
            'IS NOT': function(v) {
                if (v !== null) {
                    Utils.error('SQLParse', 'Invalid value for IS operator');
                }
                return { val: null, op: 'is_not_null' };
            }
        },

        /* statements for internal -> SQL conversion */
        sqlStatements: {
            'question_mark': function() {
                var params = [];
                return {
                    add: function(rule, value) {
                        params.push(value);
                        return '?';
                    },
                    run: function() {
                        return params;
                    }
                };
            },

            'numbered': function(char) {
                if (!char || char.length > 1) char = '$';
                var index = 0;
                var params = [];
                return {
                    add: function(rule, value) {
                        params.push(value);
                        index++;
                        return char + index;
                    },
                    run: function() {
                        return params;
                    }
                };
            },

            'named': function(char) {
                if (!char || char.length > 1) char = ':';
                var indexes = {};
                var params = {};
                return {
                    add: function(rule, value) {
                        if (!indexes[rule.field]) indexes[rule.field] = 1;
                        var key = rule.field + '_' + (indexes[rule.field]++);
                        params[key] = value;
                        return char + key;
                    },
                    run: function() {
                        return params;
                    }
                };
            }
        },

        /* statements for SQL -> internal conversion */
        sqlRuleStatement: {
            'question_mark': function(values) {
                var index = 0;
                return {
                    parse: function(v) {
                        return v == '?' ? values[index++] : v;
                    },
                    esc: function(sql) {
                        return sql.replace(/\?/g, '\'?\'');
                    }
                };
            },

            'numbered': function(values, char) {
                if (!char || char.length > 1) char = '$';
                var regex1 = new RegExp('^\\' + char + '[0-9]+$');
                var regex2 = new RegExp('\\' + char + '([0-9]+)', 'g');
                return {
                    parse: function(v) {
                        return regex1.test(v) ? values[v.slice(1) - 1] : v;
                    },
                    esc: function(sql) {
                        return sql.replace(regex2, '\'' + (char == '$' ? '$$' : char) + '$1\'');
                    }
                };
            },

            'named': function(values, char) {
                if (!char || char.length > 1) char = ':';
                var regex1 = new RegExp('^\\' + char);
                var regex2 = new RegExp('\\' + char + '(' + Object.keys(values).join('|') + ')', 'g');
                return {
                    parse: function(v) {
                        return regex1.test(v) ? values[v.slice(1)] : v;
                    },
                    esc: function(sql) {
                        return sql.replace(regex2, '\'' + (char == '$' ? '$$' : char) + '$1\'');
                    }
                };
            }
        }
    });

    this.operators = defaults.OPERATORS;
};

util.inherits(SqlSupport, PluginBase);

SqlSupport.prototype.getSQL = function(stmt, nl, data) {
    if (_.isUndefined(data)) {
        throw new Error('Missing rules');
    }

    nl = (nl === true) ? '\n' : ' ';

    if (stmt === true) stmt = 'question_mark';
    if (typeof stmt == 'string') {
        var config = getStmtConfig(stmt);
        stmt = this.settings.sqlStatements[config[1]](config[2]);
    }

    var self = this;

    var sql = (function parse(data) {
        if (!data.condition) {
            data.condition = self.settings.default_condition;
        }
        if (['AND', 'OR'].indexOf(data.condition.toUpperCase()) === -1) {
            Utils.error('UndefinedSQLCondition', 'Unable to build SQL query with condition "{0}"', data.condition);
        }

        if (!data.rules) {
            return '';
        }

        var parts = [];

        data.rules.forEach(function(rule) {
            if (rule.rules && rule.rules.length > 0) {
                parts.push('(' + nl + parse(rule) + nl + ')' + nl);
            }
            else {
                var sql = self.settings.sqlOperators[rule.operator];
                var ope = self.getOperatorByType(rule.operator);
                var value = '';

                if (sql === undefined) {
                    Utils.error('UndefinedSQLOperator', 'Unknown SQL operation for operator "{0}"', rule.operator);
                }

                if (ope.nb_inputs !== 0) {
                    if (!(rule.value instanceof Array)) {
                        rule.value = [rule.value];
                    }

                    rule.value.forEach(function(v, i) {
                        if (i > 0) {
                            value+= sql.sep;
                        }

                        if (rule.type == 'integer' || rule.type == 'double' || rule.type == 'boolean') {
                            v = Utils.changeType(v, rule.type, true);
                        }
                        else if (!stmt) {
                            v = Utils.escapeString(v);
                        }

                        if (sql.mod) {
                            v = Utils.fmt(sql.mod, v);
                        }

                        if (stmt) {
                            value+= stmt.add(rule, v);
                        }
                        else {
                            if (typeof v == 'string') {
                                v = '\'' + v + '\'';
                            }

                            value+= v;
                        }
                    });
                }

                parts.push(rule.field + ' ' + sql.op.replace(/\?/, value));
            }
        });

        return parts.join(' ' + data.condition + nl);
    }(data));

    if (stmt) {
        return {
            sql: sql,
            params: stmt.run()
        };
    }
    else {
        return {
            sql: sql
        };
    }
};

function getStmtConfig(stmt) {
    var config = stmt.match(/(question_mark|numbered|named)(?:\((.)\))?/);
    if (!config) config = [null, 'question_mark', undefined];
    return config;
}

module.exports = new SqlSupport();

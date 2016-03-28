var assert = require('assert');
var QueryBuilder = require('../index');
var qb = new QueryBuilder();
var rules = require('./data/index');

describe('SQL', function() {
	for(dataType in rules) {
		describe(dataType, function() {
			rules[dataType].forEach(function(test) {
				it(test.name, function() {
					var whereClause = qb.getSQL(false, false, test.rules).sql;
					assert.equal(whereClause.trim(), test.validate.sql);
				});
			});
		});
	}
});

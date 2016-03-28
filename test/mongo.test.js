var assert = require('assert');
var QueryBuilder = require('../index');
var qb = new QueryBuilder();
var rules = require('./data/index');

describe('MongoDB', function() {
	for(dataType in rules) {
		describe(dataType, function() {
			rules[dataType].forEach(function(test) {
				if (test.validate.mongo) {
					it(test.name, function() {
						var filter = qb.getMongo(test.rules);
						assert.deepEqual(filter, test.validate.mongo);
					});
				}
			});
		});
	}
});

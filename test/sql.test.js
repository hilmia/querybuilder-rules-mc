const assert = require('assert');
const QueryBuilder = require('../index');
const qb = new QueryBuilder();
const rules = require('./data/index');

function test_data_type(t) {
  describe(t, function() {
    rules[t].forEach((test) => {
      it(test.name, function() {
        let whereClause = qb.getSQL(false, false, test.rules).sql;
        assert.equal(whereClause.trim(), test.validate.sql);
      });
    });
  });
}

describe('SQL', function() {
  for(let dataType in rules) {
    test_data_type(dataType);
  }
});

const assert = require('assert');
const QueryBuilder = require('../index');
const qb = new QueryBuilder();
const rules = require('./data/index');

function test_data_type(t) {
  describe(t, function() {
    rules[t].forEach((test) => {
      if (test.validate.mongo) {
        it(test.name, function() {
          let filter = qb.getMongo(test.rules);
          assert.deepEqual(filter, test.validate.mongo);
        });
      }
    });
  });
}


describe('MongoDB', function() {
  for(let dataType in rules) {
    test_data_type(dataType);
  }
});

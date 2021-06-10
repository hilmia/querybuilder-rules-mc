var SqlSupport = require('./plugins/sql-support');
var MongoSupport = require('./plugins/mongo-support');

/*
* Create a wrapper class that exposes the various plugin methods
*/
var QueryBuilder = function() {
	this.getSQL = function() {
		return SqlSupport.getSQL.apply(SqlSupport, arguments);
	};

	this.getMongo = function() {
		return MongoSupport.getMongo.apply(MongoSupport, arguments);
	};
};

module.exports = QueryBuilder;

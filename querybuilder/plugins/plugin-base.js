var _ = require('underscore');
var Utils = require('../utils');

/*
* Generic logic that's needed by any "plugin"
*/
var PluginBase = function() {

};

PluginBase.prototype.getOperatorByType = function(type) {
    if (type == '-1') {
        return null;
    }

    if (_.has(this.operators, type)) {
        return this.operators[type];
    } 

    Utils.error('UndefinedOperator', 'Undefined operator "{0}"', type);
};

module.exports = PluginBase;
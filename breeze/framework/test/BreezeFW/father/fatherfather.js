define(function(require, exports, module) {
    var FW = require("breeze/framework/js/BreezeFW");
    FW.register({
        "name": "fatherfather",
        "onCreate": function() {
			this.param.onCreate = 1;
        },
        "public": {
            "ffa": function(p1) {
				return 1+p1;
            }
        }

    },
    module, '0.01');
    return FW;
});
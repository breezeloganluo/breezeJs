define(function(require, exports, module) {
    var FW = require("breeze/framework/js/BreezeFW");
    FW.register({
        "name": "normal",
        "onCreate": function() {
			this.param.onCreate = 1;
        },
        "public": {
            "pb": function(p1) {
                var result = this.API.private("pf",1);
				return result;
            }
        },
        "private": {
            
            "pf": function(p1) {
                return p1+1;
            }
        },
        "FireEvent": {
            "fv": function(p1) {
                return "f";
            }
        }

    },
    module, '0.01');
    return FW;
});
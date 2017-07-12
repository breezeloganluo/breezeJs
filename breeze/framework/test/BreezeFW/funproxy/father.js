define(function(require, exports, module) {
    var FW = require("breeze/framework/js/BreezeFW");
    FW.register({
        "name": "father",
        "onCreate": function() {
			this.param.onCreate = 1;
        },
        "public": {
            "fa": function(p1) {
				return 1;
            },
			"fb":function(){
				return this.API.private("p1");
			},
			"fc":function(){
				return this.ccc(6);
			},
			"fd":function(callback1,callback2){
				callback1(4);
				callback2(5);
			},
			"ccc":function(){
				return 3
			}
        },
		"private" : {
			"p1":function(){
				return 2;
			}
		}

    },
    module, '0.01');
    return FW;
});
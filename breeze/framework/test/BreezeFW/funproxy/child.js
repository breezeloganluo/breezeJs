define(function(require, exports, module) {
    var FW = require("breeze/framework/js/BreezeFW");
	require("./father")
    FW.register({
        "name": "child",
		"extends":["father"],
        "onCreate": function() {
			this.param.onCreate = 1;
        },
        "public": {
            "ca": function() {
                return this.fa();
            },
			"cb":function(){
				return this.API.father("fa");
			},
			"cc":function(){
				return this.API.father("fb");
			},
			"cd":function(){
				return this.API.father("fc");
			},
			"ce":function(){
				return this.fc();
			},
			"cf":function(obj){
				this.fd(function(param){
					obj.result1 = param;
					
				},function(param){
					obj.result2 = param;
					
				});
			},
			"ccc":function(){
				return 99;
			}
        }

    },
    module, '0.01');
    return FW;
});
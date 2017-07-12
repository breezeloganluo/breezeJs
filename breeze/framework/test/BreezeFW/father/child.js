define(function(require, exports, module) {
    var FW = require("breeze/framework/js/BreezeFW");
	require("./father");
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
					obj.result = param;
					
				});
			},
			"cg":function(idx,obj){
				this.fe(idx,function(param){
					obj.result = param;
				});
			},
			"cfa":function(p){
				return p+this.API.father("cfa",p);
			},
			"nmfa":function(){
				var _this = this;
				return (function(){
					return _this.API.father("fa");
				})();
			},
			"ccc":function(){
				return 99;
			},
			"getMyValue":function (){
				return this.MY.myValue;
			}
        }

    },
    module, '0.01');
    return FW;
});
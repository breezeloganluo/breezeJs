define(function(require, exports, module) {
    var FW = require("breeze/framework/js/BreezeFW");
	require("./fatherfather");
    FW.register({
        "name": "father",
		"extends":["fatherfather"],
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
				return this.ccc();
			},
			"fd":function(callback){
				callback(4);
			},
			"fe":function(org,callback){
				callback(234555);
				callback(org);
			},
			"ccc":function(){
				return 3
			},
			"cfa": function(p1) {
				return p1+1;
            },
			"ffa": function(p1) {
				return p1+this.API.father("ffa",p1);
            },
			"setMyValue":function(myValue){
				this.MY.myValue = myValue;
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
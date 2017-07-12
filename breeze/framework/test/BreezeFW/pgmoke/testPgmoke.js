define(function(require, exports, module) {
    var JSTest = require("breeze/framework/js/JSTest");
    var FW = require("breeze/framework/js/BreezeFW");
    JSTest.addTest("moke", {
        testMoke_ok: function() { 
			//模拟桩
			Cfg={baseUrl: ""};
            FW.use().getParameter = function(){
				return "my";
			}
			FW.doServer = function(sn,pkg,param,callback,thisObj,url){
				JSTest.assertEquals("testGadget", param.gadgetName, "发请求的gadget名字是否正确");
				JSTest.assertEquals("testMethod", param.funName, "发请求的method名字是否正确");
				JSTest.assertEquals(0, param.input.length, "发请求的input是否正确");
				return {
					code:0,
					data:{
						testGadget:{
							testMethod:{
								isMoke:true,
								"return":111
							}
						}
					}
				}
			}
			
			//测试正常发送
			var gadget = "testGadget";
			var method = "testMethod";
			var callbackArr = null;
			var input = null;
			var result = FW.pgMoke(gadget,method,callbackArr,input);
			JSTest.assertEquals(true, result.isMoke, "处理结果是否是模拟");
			JSTest.assertEquals("111", result["return"], "处理结果值是否正确");
        },
		testMoke_multCallBack: function() { 
			//模拟桩
			Cfg={baseUrl: ""};
            FW.use().getParameter = function(){
				return "my";
			}
			FW.doServer = function(sn,pkg,param,callback,thisObj,url){
				JSTest.assertEquals("testGadget", param.gadgetName, "发请求的gadget名字是否正确");
				JSTest.assertEquals("testMethod", param.funName, "发请求的method名字是否正确");
				JSTest.assertEquals(0, param.input.length, "发请求的input是否正确");
				return {
					code:0,
					data:{
						testGadget:{
							testMethod:{
								isMoke:true,
								"return":111,
								"callback":{
									c0:[
									   [1,2]
									],
									c1:[
									   [3,4],
									   [5,6]
									]
								}
							}
						}
					}
				}
			}
			
			//测试正常发送
			var gadget = "testGadget";
			var method = "testMethod";
			var cbra = [];
			var callbackArr = [function(a,b){
				cbra.push(a);
				cbra.push(b);
			},function(a,b){
				cbra.push(a);
				cbra.push(b);
			}];
			var input = null;
			var result = FW.pgMoke(gadget,method,callbackArr,input);
			JSTest.assertEquals(true, result.isMoke, "处理结果是否是模拟");
			JSTest.assertEquals("111", result["return"], "处理结果值是否正确");
			JSTest.assertEquals(6, cbra.length, "回调结果长度");
			JSTest.assertEquals(1, cbra[0], "回调结果每个元素");
			JSTest.assertEquals(2, cbra[1], "回调结果每个元素");
			JSTest.assertEquals(3, cbra[2], "回调结果每个元素");
			JSTest.assertEquals(4, cbra[3], "回调结果每个元素");
			JSTest.assertEquals(5, cbra[4], "回调结果每个元素");
			JSTest.assertEquals(6, cbra[5], "回调结果每个元素");
        },
		testMoke_lestOneCallBack: function() { 
			//模拟桩
			Cfg={baseUrl: ""};
            FW.use().getParameter = function(){
				return "my";
			}
			FW.doServer = function(sn,pkg,param,callback,thisObj,url){
				JSTest.assertEquals("testGadget", param.gadgetName, "发请求的gadget名字是否正确");
				JSTest.assertEquals("testMethod", param.funName, "发请求的method名字是否正确");
				JSTest.assertEquals(0, param.input.length, "发请求的input是否正确");
				return {
					code:0,
					data:{
						testGadget:{
							testMethod:{
								isMoke:true,
								"return":111,
								"callback":{
									c0:[
									   [1,2]
									]
								}
							}
						}
					}
				}
			}
			
			//测试正常发送
			var gadget = "testGadget";
			var method = "testMethod";
			var cbra = [];
			var callbackArr = [function(a,b){
				cbra.push(a);
				cbra.push(b);
			},function(a,b){
				cbra.push(a);
				cbra.push(b);
			}];
			var input = null;
			var result = FW.pgMoke(gadget,method,callbackArr,input);
			JSTest.assertEquals(true, result.isMoke, "处理结果是否是模拟");
			JSTest.assertEquals("111", result["return"], "处理结果值是否正确");
			JSTest.assertEquals(2, cbra.length, "回调结果长度");
			JSTest.assertEquals(1, cbra[0], "回调结果每个元素");
			JSTest.assertEquals(2, cbra[1], "回调结果每个元素");
        }
    });
    return JSTest;
});
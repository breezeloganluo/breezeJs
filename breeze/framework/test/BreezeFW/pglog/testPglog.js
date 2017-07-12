define(function(require, exports, module) {
    var JSTest = require("breeze/framework/js/JSTest");
    var FW = require("breeze/framework/js/BreezeFW");
    JSTest.addTest("pglog", {
        testDG_ok: function() { 
			//模拟桩
			Cfg={baseUrl: ""};
            FW.use().getParameter = function(){
				return "my";
			}
			var goThrows = false;
			FW.doServer = function(sn,pkg,param,callback,thisObj,url){
				JSTest.assertEquals("{\"a\":0,\"b\":\"对象递归\"}", FW.use().toJSONString(param.logObj), "递归参数是否正确");
				goThrows = true;
			}

			//测试logObj是递归参数情况
			var gadgeturl="abc/gadget",gadget="gadget",method="method",logObj={a:0};
			logObj.b = logObj;
			FW.pgLog(gadgeturl,gadget,method,logObj);
			
			JSTest.assertEquals(true, goThrows, "是否经过doServer");
        },
		testNULL_ok: function() { 
			//模拟桩
			Cfg={baseUrl: ""};
            FW.use().getParameter = function(){
				return "my";
			}
			var goThrows = false;
			FW.doServer = function(sn,pkg,param,callback,thisObj,url){
				JSTest.assertEquals("{\"a\":0}", FW.use().toJSONString(param.logObj), "null参数是否正确");
				goThrows = true;
			}

			//测试logObj是递归参数情况
			var gadgeturl="abc/gadget",gadget="gadget",method="method",logObj={a:0};
			logObj.b = null;
			FW.pgLog(gadgeturl,gadget,method,logObj);
			
			JSTest.assertEquals(true, goThrows, "是否经过doServer");
        },
		testFUNCTIOn_ok: function() { 
			//模拟桩
			Cfg={baseUrl: ""};
            FW.use().getParameter = function(){
				return "my";
			}
			var goThrows = false;
			FW.doServer = function(sn,pkg,param,callback,thisObj,url){
				JSTest.assertEquals("{\"a\":0,\"b\":\"JS_FUNCTION\"}", FW.use().toJSONString(param.logObj), "function参数是否正确");
				goThrows = true;
			}

			//测试logObj是递归参数情况
			var gadgeturl="abc/gadget",gadget="gadget",method="method",logObj={a:0};
			logObj.b = function(){};
			FW.pgLog(gadgeturl,gadget,method,logObj);
			
			JSTest.assertEquals(true, goThrows, "是否经过doServer");
        },
		testRegexp_ok: function() { 
			//模拟桩
			Cfg={baseUrl: ""};
            FW.use().getParameter = function(){
				return "my";
			}
			var goThrows = false;
			FW.doServer = function(sn,pkg,param,callback,thisObj,url){
				JSTest.assertEquals("{\"a\":0,\"b\":\"JS_REGEXP\"}", FW.use().toJSONString(param.logObj), "正则参数是否正确");
				goThrows = true;
			}

			//测试logObj是递归参数情况
			var gadgeturl="abc/gadget",gadget="gadget",method="method",logObj={a:0};
			logObj.b = /abde/;
			FW.pgLog(gadgeturl,gadget,method,logObj);
			
			JSTest.assertEquals(true, goThrows, "是否经过doServer");
        },
		testDom_ok: function() { 
			//模拟桩
			Cfg={baseUrl: ""};
            FW.use().getParameter = function(){
				return "my";
			}
			var goThrows = false;
			FW.doServer = function(sn,pkg,param,callback,thisObj,url){
				JSTest.assertEquals("{\"a\":0,\"b\":\"HTMLElement\"}", FW.use().toJSONString(param.logObj), "正则参数是否正确");
				goThrows = true;
			}
	
			//测试logObj是递归参数情况
			var gadgeturl="abc/gadget",gadget="gadget",method="method",logObj={a:0};
			logObj.b = document.body;
			FW.pgLog(gadgeturl,gadget,method,logObj);
			
			JSTest.assertEquals(true, goThrows, "是否经过doServer");
        },
		testJquery_ok: function() { 
			//模拟桩
			Cfg={baseUrl: ""};
            FW.use().getParameter = function(){
				return "my";
			}
			var goThrows = false;
			FW.doServer = function(sn,pkg,param,callback,thisObj,url){
				JSTest.assertEquals("{\"a\":0,\"b\":\"jQuery\"}", FW.use().toJSONString(param.logObj), "正则参数是否正确");
				goThrows = true;
			}
	
			//测试logObj是递归参数情况
			var gadgeturl="abc/gadget",gadget="gadget",method="method",logObj={a:0};
			logObj.b = $(document.body);
			FW.pgLog(gadgeturl,gadget,method,logObj);
			
			JSTest.assertEquals(true, goThrows, "是否经过doServer");
        }
    });
    return JSTest;
});
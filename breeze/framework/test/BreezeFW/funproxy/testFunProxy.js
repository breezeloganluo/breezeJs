define(function(require, exports, module) {
    var JSTest = require("breeze/framework/js/JSTest");
    var FW = require("breeze/framework/js/BreezeFW");
    require("./child");
    JSTest.addTest("proxy", {
        testProxy_ok: function() { //模拟桩
            FW.regAPI({
                doServer: function($service, $package, $parram, $callback) {
                },
                show: function(view, data) {
                }
            });
			//去掉日志系统
			var log = [];
			FW.pgLog =function(gadgeturl,gadget,method,logObj){
				var oneLog = {};
				oneLog.gadgeturl = gadgeturl;
				oneLog.gadget = gadget;
				oneLog.method = method;
				oneLog.logObj = logObj;
				log.push(oneLog);
			};
			
			FW.pgMoke = null;
			
            //初始输入
            var pageParam = {
                id: 'TEST',
                dom: $(document.body),
                param: {
                    onCreate: "no"
                },
                //实际的参数
                view: {} //实际的视图内容
            }
			
			var app = FW.createApp("child","child",pageParam);
			//测试直接调用父方法
			log = [];
			var r1 = app.ca();
			JSTest.assertEquals(1, r1, "测试直接调用父方法");
			var session = log[0].logObj.session;
			JSTest.assertEquals(session, log[log.length-1].logObj.session,"测试session值是否一致");
			
			JSTest.assertEquals("child.ca", log[0].gadget +"."+log[0].method, "测试第一次调用的方法名和gadget名");
			JSTest.assertEquals(0, log[0].logObj.logObj.length, "测试第一次调用的方法名长度");
			
			JSTest.assertEquals("father.fa", log[1].gadget +"."+log[1].method,"测试第二次是付父亲的方法名");
			JSTest.assertEquals(0, log[1].logObj.logObj.length, "测试第二次调用的方法名长度");
			
			
			JSTest.assertEquals(1, log[2].logObj["logObj"],"测试第三次是付父亲的返回值");
			
			JSTest.assertEquals(1, log[3].logObj["logObj"],"测试第四次是儿子的返回值");
			
			
			//测试通过father方法调用父亲方法
			log = [];
			var r2 = app.cb();
			JSTest.assertEquals(1, r2, "测试通过father方法调用父亲方法");
			var session = log[0].logObj.session;
			JSTest.assertEquals(session, log[log.length-1].logObj.session,"测试session值是否一致");
			
			JSTest.assertEquals("child.cb", log[0].gadget +"."+log[0].method, "测试第一次调用的方法名和gadget名");
			JSTest.assertEquals(0, log[0].logObj.logObj.length, "测试第一次调用的方法名长度");
			
			JSTest.assertEquals("father.fa", log[1].gadget +"."+log[1].method,"测试第二次是付父亲的方法名");
			JSTest.assertEquals(0, log[1].logObj.logObj.length, "测试第二次调用的方法名长度");
			
			JSTest.assertEquals(1, log[2].logObj["logObj"],"测试第三次是付父亲的返回值");
			
			JSTest.assertEquals(1, log[3].logObj["logObj"],"测试第四次是儿子的返回值");
			
			
			//测试通过father方法调用父亲而父亲再调用私有方法
			log = [];
			var r3 = app.cc();
			JSTest.assertEquals(2, r3, "测试通过father方法调用父亲而父亲再调用私有方法");
			var session = log[0].logObj.session;
			JSTest.assertEquals(session, log[log.length-1].logObj.session,"测试session值是否一致");
			
			JSTest.assertEquals("child.cc", log[0].gadget +"."+log[0].method, "测试第一次调用的方法名和gadget名");
			JSTest.assertEquals(0, log[0].logObj.logObj.length, "测试第一次调用的方法名长度");
			
			JSTest.assertEquals("father.fb", log[1].gadget +"."+log[1].method,"测试第二次是付父亲的方法名");
			JSTest.assertEquals(0, log[1].logObj.logObj.length, "测试第二次调用的方法名长度");
			
			JSTest.assertEquals(2, log[2].logObj["logObj"],"测试第三次是付父亲的返回值");
			
			JSTest.assertEquals(2, log[3].logObj["logObj"],"测试第四次是儿子的返回值");
			
			
			//测试通过father方法调用父亲而父亲再调用公有方法，而该公有方法是子类的
			log = [];
			var r4 = app.cd();
			JSTest.assertEquals(99, r4, "测试通过father方法调用父亲而父亲再调用公有方法，而该公有方法是子类的");
			var session = log[0].logObj.session;
			JSTest.assertEquals(session, log[log.length-1].logObj.session,"测试session值是否一致");
			
			JSTest.assertEquals("child.cd", log[0].gadget +"."+log[0].method, "测试第一次调用的方法名和gadget名");
			JSTest.assertEquals(0, log[0].logObj.logObj.length, "测试第一次调用的方法名长度");
			
			JSTest.assertEquals("father.fc", log[1].gadget +"."+log[1].method,"测试第二次是付父亲的方法名");
			JSTest.assertEquals(0, log[1].logObj.logObj.length, "测试第二次调用的方法名长度");
			
			JSTest.assertEquals("child.ccc", log[2].gadget +"."+log[2].method,"测试第三次是付儿子的方法名");
			JSTest.assertEquals(6, log[2].logObj.logObj[0], "测试第三次调用的方法名长度");
			
			JSTest.assertEquals(99, log[3].logObj["logObj"],"测试第四次是儿子的返回值");
			
			JSTest.assertEquals(99, log[4].logObj["logObj"],"测试第五次是付父亲的返回值");
			
			JSTest.assertEquals(99, log[5].logObj["logObj"],"测试第六次是付父亲的返回值");
			
			//测试和r4一样，不过是直接调用
			log = [];
			var r5 = app.ce();
			JSTest.assertEquals(99, r5, "测试和r4一样，不过是直接调用");
			var session = log[0].logObj.session;
			JSTest.assertEquals(session, log[log.length-1].logObj.session,"测试session值是否一致");
			
			JSTest.assertEquals("child.ce", log[0].gadget +"."+log[0].method, "测试第一次调用的方法名和gadget名");
			JSTest.assertEquals(0, log[0].logObj.logObj.length, "测试第一次调用的方法名长度");
			
			JSTest.assertEquals("father.fc", log[1].gadget +"."+log[1].method,"测试第二次是付父亲的方法名");
			JSTest.assertEquals(0, log[1].logObj.logObj.length, "测试第二次调用的方法名长度");
			
			JSTest.assertEquals("child.ccc", log[2].gadget +"."+log[2].method,"测试第三次是付儿子的方法名");
			JSTest.assertEquals(6, log[2].logObj.logObj[0], "测试第三次调用的方法名长度");
			
			JSTest.assertEquals(99, log[3].logObj["logObj"],"测试第四次是儿子的返回值");
			
			JSTest.assertEquals(99, log[4].logObj["logObj"],"测试第五次是付父亲的返回值");
			
			JSTest.assertEquals(99, log[5].logObj["logObj"],"测试第六次是付父亲的返回值");
			
			//测试父方法的回调函数是否ok
			log = [];
			var tobj = {};
			var r5 = app.cf(tobj);
			var session = log[0].logObj.session;
			JSTest.assertEquals(session, log[log.length-1].logObj.session,"测试session值是否一致");
			
			JSTest.assertEquals(4, tobj.result1, "测试父方法的回调函数是否ok");
			JSTest.assertEquals(5, tobj.result2, "测试父方法的回调函数是否ok");
			
			JSTest.assertEquals("child.cf", log[0].gadget +"."+log[0].method, "测试第一次调用的方法名和gadget名");
			JSTest.assertEquals("object", typeof(log[0].logObj.logObj) , "测试第一次调用的方法名");
			
			JSTest.assertEquals("father.fd", log[1].gadget +"."+log[1].method,"测试第二次是付父亲的方法名");
			JSTest.assertEquals(0, log[1].logObj.logObj.length, "测试第二次调用的方法名长度");
			
			JSTest.assertEquals("c0", log[2].logObj.logObj.name,"测试第三次是第0个回调名");
			JSTest.assertEquals(4, log[2].logObj.logObj.param[0],"测试第三次是第0个回调参数");
			
			JSTest.assertEquals("c1", log[3].logObj.logObj.name,"测试第四次是第0个回调名");
			JSTest.assertEquals(5, log[3].logObj.logObj.param[0],"测试第四次是第0个回调参数");
			
			
			
			JSTest.assertEquals(null, log[4].logObj["logObj"],"测试第五次是付父亲的返回值");
			
			JSTest.assertEquals(null, log[5].logObj["logObj"],"测试第六次是付父亲的返回值");
        },
		testMoke_ok: function() { //模拟桩
            FW.regAPI({
                doServer: function($service, $package, $parram, $callback) {
                },
                show: function(view, data) {
                }
            });
			//去掉日志系统
			var log = [];
			FW.pgLog =function(gadgeturl,gadget,method,logObj){
				
			};
			
			FW.pgMoke = function(gadget,method,callbackArr){
				if (gadget == "child"){
					return null;
				}
				
				if (method == "fd"){
					callbackArr[0](44);
					callbackArr[1](55);
					return {
						"isMoke":true,
						"return":null
					}
				}
			};
			
            //初始输入
            var pageParam = {
                id: 'TEST',
                dom: $(document.body),
                param: {
                    onCreate: "no"
                },
                //实际的参数
                view: {} //实际的视图内容
            }
			
			var app = FW.createApp("child","child",pageParam);
			//测试直接调用父方法
			log = [];
			var r1 = app.ca();
			JSTest.assertEquals(1, r1, "测试直接调用父方法");
			
			
			
			//测试父方法的回调函数是否ok
			log = [];
			var tobj = {};
			var r5 = app.cf(tobj);
			JSTest.assertEquals(44, tobj.result1, "测试父方法的回调函数是否ok");
			JSTest.assertEquals(55, tobj.result2, "测试父方法的回调函数是否ok");
        }
    });
	
	
    return JSTest;
});

define(function(require, exports, module) {
    var JSTest = require("breeze/framework/js/JSTest");
    var FW = require("breeze/framework/js/BreezeFW");
    require("./normal");
    JSTest.addTest("normal", {
        testNormal_ok: function() { //模拟桩
            FW.regAPI({
                doServer: function($service, $package, $parram, $callback) {
                },
                show: function(view, data) {
                }
            });
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
			
			//去掉日志系统
			FW.pgLog =function(){};
			var app = FW.createApp("normal","normal",pageParam);
			
            JSTest.assertEquals(1, app.param.onCreate, "初始化的函数是否调用");
			var r1 = app.pb();
			JSTest.assertEquals(2, r1, "公有方法和私有方法的调用是否正常");
			var r2 = app.FireEvent.fv();
			JSTest.assertEquals("f", r2, "测试event是否正常");
        }
    });
    return JSTest;
});
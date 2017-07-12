define(function(require, exports, module) {
    var JSTest = require("breeze/framework/js/JSTest");
    var FW = require("breeze/framework/js/BreezeFW");
    require("./child");
    JSTest.addTest("father", {
        testFather_ok: function() { //模拟桩
            FW.regAPI({
                doServer: function($service, $package, $parram, $callback) {
                },
                show: function(view, data) {
                }
            });
			//去掉日志系统
			FW.pgLog =function(){};
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
			var r1 = app.ca();
			JSTest.assertEquals(1, r1, "测试直接调用父方法");
			
			//测试通过father方法调用父亲方法
			var r2 = app.cb();
			JSTest.assertEquals(1, r2, "测试通过father方法调用父亲方法");
			
			//测试通过father方法调用父亲而父亲再调用私有方法
			var r3 = app.cc();
			JSTest.assertEquals(2, r3, "测试通过father方法调用父亲而父亲再调用私有方法");
			
			//测试通过father方法调用父亲而父亲再调用公有方法，而该公有方法是子类的
			var r4 = app.cd();
			JSTest.assertEquals(99, r4, "测试通过father方法调用父亲而父亲再调用公有方法，而该公有方法是子类的");
			
			//测试和r4一样，不过是直接调用
			var r5 = app.ce();
			JSTest.assertEquals(99, r5, "测试和r4一样，不过是直接调用");
			
			//测试父方法的回调函数是否ok
			var tobj = {};
			var r5 = app.cf(tobj);
			JSTest.assertEquals(4, tobj.result, "测试父方法的回调函数是否ok");
			
			//测试连续回调父类的回调函数是否ok
			var tobj = {};
			var r6 = app.cg(111,tobj);
			JSTest.assertEquals(111, tobj.result, "测试连续回调父类的回调函数是否ok");
			
			//测试子类调用父类
			var result = app.cfa(2);
			JSTest.assertEquals(5, result, "测试子类调用父类");
			
			//测试子类调用父类，父类用father调用父类的父类
			var result = app.ffa(2);
			JSTest.assertEquals(5, result, "测试子类调用父类，父类用father调用父类的父类");
			
			//测试匿名函数的调用
			var result = app.nmfa();
			JSTest.assertEquals(1, result, "匿名函数中调用father的情况");
			
			//测试获取父类的this.MY参数
			app.setMyValue("myValue");
			var result = app.getMyValue();
			JSTest.assertEquals("myValue",result,"测试父类的this.MY的设置")
        }
    });
    return JSTest;
});

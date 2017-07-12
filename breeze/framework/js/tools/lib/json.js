/**
* @file  json.js
* @use  FW.use().func();
* @description 用于支持Json与其它类型互转的扩展方法
* @prame .evalJSON(strJson);  .toJSONString(object);
* @date 2013-05-14
**/

define(function(require, exports, module) {
	var _win = window;
    var _doc = _win.document;
    var _result = {
        name : "JsonAPI",
        desc : "Json转换函数",
        domain : "JsonAPI"
    }
    
    var _api = _result.f = {};

/**
* 将json字符串转换为对象的方法。
*
* @public
* @param json字符串
* @return 返回object,array,string等对象

/** * @see 将json字符串转换为对象 * @param json字符串 * @return 返回object,array,string等对象 */
	_api.evalJSON = function(strJson) {
		return eval("(" + strJson + ")");
	}

    
    var isDupObj = function(obj,objArray){
		for (var i=0;i<objArray.length;i++){
			if (obj === objArray[i]){
				return true;
			}
		}
		objArray.push(obj);
		return false;
	}
/**
* 将javascript数据类型转换为json字符串的方法。
*
* @public
* @param {object} 需转换为json字符串的对象, 一般为Json 【支持object,array,string,function,number,boolean,regexp *】
* @return 返回json字符串
**/

	_api.toJSONString = function(object,objectArr) {
		//这个参数是防止递归调用的
		if (objectArr == null){
			objectArr = [0];
		}
		else{
			objectArr[0]++;
			if (objectArr[0] >=30){
				//如果这个中断被触发，说明被解析的json还是被递归了objectArr[0]的值代表被递归的深度
				debugger;
			}
		}
		
		if (object == null){
			objectArr[0]--;
			return null;
		}
		var type = typeof object;
		if ('object' == type) {
			if (Array == object.constructor) {
				type = 'array';
			}
			else if (RegExp == object.constructor) {
				type = 'regexp';
			}
			else if (object instanceof HTMLElement){
				type = 'html';
			}
			else if (!/^undefine/.test(typeof(jQuery)) && object instanceof jQuery){
				type = "jQuery";
			}
			else {
				type = 'object';
			}
		}
		switch (type) {
			case 'undefined':
			case 'unknown':
				objectArr[0]--;
			    return null;
				break;
			case 'function':
				objectArr[0]--;
			    return '"JS_FUNCTION"';
			case 'html':
				objectArr[0]--;
			    return '"HTMLElement"';
			case 'jQuery':
				objectArr[0]--;
			    return '"jQuery"';
			case 'regexp':
				objectArr[0]--;
			    return '"JS_REGEXP"';
			case 'boolean':
				objectArr[0]--;
				return object.toString();
				break;
			case 'number':
				objectArr[0]--;
				return isFinite(object) ? object.toString() : 'null';
				break;
			case 'string':
				objectArr[0]--;
				return '"' + object.replace(/(\\|\")/g, "\\$1").replace(/\n|\r|\t/g, function() {
				var a = arguments[0];
				return (a == '\n') ? '\\n': (a == '\r') ? '\\r': (a == '\t') ? '\\t': ""
				}) + '"';
				break;
			case 'object':
				if (object === null) return 'null';
				//判断是否递归调用
				if (isDupObj(object,objectArr)){
					objectArr[0]--;
					return "\"对象递归\"";
				}
				
				var results = [];
				for (var property in object) {
				var value = _api.toJSONString(object[property],objectArr);
				if (value != null) results.push(_api.toJSONString(property,objectArr) + ':' + value);
				}
				objectArr[0]--;
				return '{' + results.join(',') + '}';
				break;
			case 'array':
			    //判断是否递归调用
				if (isDupObj(object,objectArr)){
					objectArr[0]--;
					return "\"数组递归\"";
				}
				var results = [];
				for (var i = 0; i < object.length; i++) {
				var value = _api.toJSONString(object[i],objectArr);
				if (value != null) results.push(value);
				}
				objectArr[0]--;
				return '[' + results.join(',') + ']';
				break;
			}
	}
	if (_win.APICtr && _win.APICtr.addAPI){
		_win.APICtr.addAPI(_result);
	}else{
		module.exports = _api;	
	}
})
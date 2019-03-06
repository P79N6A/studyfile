//object对象具有下列属性 object object
'constructor';'返回函数';
obj.constructor
'数组''返回Array'
'object''返回Object'

'ToString()';返回'对象原始字符串'表示
obj.ToString();

'ValueOf()';返回'最适合该对象'的'原始值'，'对于许多对象'，
该方法'返回的值'都'与toString()'的'返回值相同' valueOf

obj.ValueOf();

'typeof()';返回'对象的类型' '四种'"string","object","number",undefined;

//Object对象具有以下方法
hasOwnProperty(property)
'是否具有特定属性';

IsPrototypeOf(obj)
'原型对象是否是obj'

PropertyIsEnumerable
'判断是否能用for in 列举'

'Prototype';'能够定义''构造函数'的属性'还可以''为本地函数''添加属性和方法';
obj.prototype.showVal=function(){
	alert(this.valueOf());
}
'js中类似指针'
input=windows.prompt('');
test(input);
myVar=test;
myVar('outPut');
function test(data){
	console.log(data)  
}
//结果会输一次input和一次outPut
myVal变量指向代码块test，和c的指针相同，访问myVal就是访问代码test();
不同的是c输出的是地址，js输出的是代码

'js递归函数的执行顺序'
function dg(){
	if(num>3){
		dg(--num);
	}
	document.writeln(num);
}
dg(5);

'js基本类型'
js 三大基本类型 Boolean Number String
两大符合类型 object array
两个特殊类型 undefined null 他们调用typeof 都返回'object'
'typeOf();返回对象的数据类型' 四种 Boolean number string object undefined

'constructor 返回该对象的构造函数' 
返回的结果有Array

'prototype'
能够让对象动态添加属性和方法,不用也能成功
function people(name,job){
	this.name=name;
	this.job=job;
}
var x=new people('xm','cxy');
x.sex='girl';
document.write(x.sex)

'hasOwnProperty' 
判断是否具有唯一属性

'js函数执行时会自动开辟栈,执行结果返回后销毁栈'
var mX=70;
function getVal(mX){
	mX=7;//没有带var 是全局变量
	console.log("neibu:"+mX)
}

getVal(mX);
documents.write(mX);

全局变量传参用的地址传参，即堆传参，改变值时改变的是该对象对应得地址对象的值
'三大基本类型'都是存在栈中处理值的，局部变量传参用的栈，后入的栈值将覆盖新的栈值
'两大符合类型'用的是堆传参

'类全局变量'
var a=90;
function tt(){
	//在函数里不带var是全局变量
	//带var是局部变量
	var a=9;//a和全局的a区别对待
}
tt();
alert(a);

'this关键字'
谁调用this所在函数 this就指的是谁

'js重载？'
js没有重载的概念，同名的会覆盖前面的函数

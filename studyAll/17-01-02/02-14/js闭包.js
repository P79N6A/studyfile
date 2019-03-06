一、变量的作用域
1.'函数内部'可'直接读取全局变量'
var n=999;
function f1(){
	alert(n);
}
f1(); // 999

2.'函数外部''无法读取'函数'内的局部变量'
function f1(){
	var n=999;
}
alert(n); // error

3.'函数内部声明变量一定要使用var。不用的话，是声明一个全局变量！'
function f1(){
	n=999;
}
f1();
alert(n); //999



二，如何'从外部读取局部变量'？
'在函数的内部，再定义一个函数'
function f1(){
　 n=999;
　 function f2(){
	alert(n); // 999
　}
}
“链式作用域“
'f2'包括'在函数f1内部'，'f1内部的所有局部变量'，'对f2都是可见的'
'f2'内部的'局部变量'，'对f1' 就是'不可见的'
'f2'可以'读取f1中的局部变量'，那么只要把'f2作为返回值'，就'可以在f1外部读取f1的内部变量了！'

function f1(){
　n=999;
　function f2(){
　　alert(n);
　}
　return f2;
}
var result=f1();
result(); // 999

三、闭包的概念
'闭包就是能够读取其他函数内部变量的函数。'
'只有函数内部的子函数才能读取局部变量，因此可以把闭包简单理解成“定义在一个函数内部的函数”。'

四、闭包的用途
'一个是前面'提到的'可以读取函数内部的变量'，
另'一个就是让这些变量的值始终保持在内存中'。

function f1(){
　var n=999;
　nAdd=function(num){
	n=num
  };
　function f2(){
　　alert(n);
　}
　return f2;
}
var result=f1();
result(); // 999
nAdd();
result(); // 1000

这段代码中另一个值得注意的地方，就是“nAdd=function(){n+=1}”这一行，
首先在nAdd前面没有使用var关键字，因此 'nAdd是一个全局变量'，而不是局部变量。
其次，nAdd的值是一个匿名函数（anonymous function），
而这个匿名函数本身也是一个闭包，所以nAdd'相当于是一个setter'，可以在函数外部对函数内部的局部变量进行操作。

/*var f1=(function(){
	var n=999;
	nAdd=function(){n+=1};
	return{
		f2:function(){
			alert(n);
		}
	}
})*/

五、使用闭包的注意点
'内存消耗很大，不能滥用闭包'
'把父函数当作对象（object）使用'，'闭包当作它的公用方法'，'内部变量当作它的私有属性'，
'这时一定要小心，不要随便改变父函数内部变量的值。'


var name = "The Window";   
var object = {
　name : "My Object",   
　getNameFunc : function(){
　　return function(){
　　　return this.name;   
　　};
　}
};
alert(object.getNameFunc()());  //The Window /*这个并不是闭包*/


function outerFun(){
	var a=0;
	function innerFun(){
		a++;
		alert(a);
	}
}
innerFun();
什么是闭包:
//innerFun是私有方法，不能外部访问
当'内部函数' '在'定义它的'作用域的外'部'被引用'时,就'创建了该内部函数的闭包' ,
如果'内部函数引用'了位于'外部函数的变量',当'外部函数调用完毕后',
这些'变量'在内存'不会被释放',因为闭包需要它们.


function outerFun(){
	//没有var 
	a =0;
	alert(a);  
}
var a=4;
outerFun();
alert(a);
结果为 0,0 真是奇怪,为什么呢?
沿着作用域链，当执行a=0时,因为没有使用var关键字,因此赋值操作会
沿着作用域链到var a=4;  并改变其值.
'js定义类'
cat();这样子'是在调用函数';

这样子'调用对象属性与方法';
var cat=new Cat();
cat.name;
cat.getName();

function Cat(){
	this.name='喵喵';
}

js'属性能动态添加'
var cat=new Cat();
//本来没有私有属性sex这一步加入了私有属性sex
cat.sex='女';

'给js对象创建方法'
1.使用new object创建并添加相关属性
基本语法
function Cat(){
	this.getName=function(name){
		console.log(name);
	}
}

'全局变量的改变'
var a=100;
function test(){
	//不带var就是全局变量
	//带了就是局部变量；
	var a=89;
}
区别于'参数传递中全局变量值的改变'
var mVal=900;
function cc(val){
	此处'val'是'属于cc方法内'的'局部变量''与'调用
	该函数的'传入的参数''mVal'并'不'是'同'一个东西，
	栈中'val','mVal''对应两个不同的值'
	alert('qian_'+val);
	val=90;
	alert('hou_'+val);
}
cc(mVal);
alert('end_'+mVal);
900 90 900
'释放内存'delete
就是'删除对象属性'的'内存'
delete cat.name;

*this '关键字'，谁调用 this 所在函数,this 就代表是谁,this 不能在类的外部使用
'私有化方法和属性'
function Person(){
	this.name="wang";//公共的name
	var age='18';//私有的年龄
	show=function(){
		
	}
	this.get=function(){
		
	}
}
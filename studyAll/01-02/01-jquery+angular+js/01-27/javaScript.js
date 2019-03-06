'01执行流程'
1.浏览器（通过url）请求页面，
2.查找本地缓存，有缓存则访问缓存（over），没有则去请求服务器
3.服务器根据（url）找到对应的页面返回给客户

'调试技巧'。一般浏览器都会禁用掉脚本调试，你需要'手动取消禁用'

'02prompt'
弹出输入框，返回输入值

js金字塔
var n=window.prompt("请输入");
for(var i=0;i<=n;i++){
	for(var j=0,j<n-1;j++){
		document.write("&nbspp;")
	}
	for(var j=0;j<2*i-1;j++){
		document.write("*");
	}
	document.writeln("<br/>");
}

'03eval'
能将str当脚本执行

'04js函数'
function name (par){
	return;
}

'05js函数调用'
js执行顺序是'从上往下'的;调用'函数类似于指针'
input=window.prompt("");
test(input);
x=test;
x("outPut")
function test(ins){
	console.log(ins);
}
总结：'x=test x指向代码块test;这时候访问x就是访问代码test'
结果调用两次test() 打印出两个值 input和outPut

'06js递归函数的执行顺序'
function abc(num){
	if(num>3)
		abc(--num);
	document.write(num+" ");
}
//5 4 3--3
//4--3
//5--4

'07理解代码'
'堆与栈'
栈里面的值赋值会被覆盖【后进先出】，堆的赋值是对堆里面的对象做赋值，就不会覆盖其值;
'参数传递'*就参数传递而言;
var mVal=900;
function cc(val){
	//此val是方法内的局部变量；与调用该函数的传入的参数mVal并不是同一个东西，栈中val,mVal对应两个不同的值
	val=90;
}
cc(mVal);
alert(mVal);
结果'还是900;不同于java';
//没有开辟'堆',只是在'栈'中操作数据;栈后入覆盖前入（X）;
没有用var 就是全局变量

改进为'地址传参'+'堆传参';
var mArr=[100,200,300];
function cc(arr){
	arr[0]=10;
	arr[1]=20;
	arr[2]=30;
}
cc(mArr);
document.write(mArr[0]+mArr[1]+mArr[2]);
这里'js数组'是地址传参，开辟了堆，改变堆的值时，对堆指向的对象的值做了修改，所以值变化了
总结：'栈是用来存值的，堆是用来引用的'，'栈是用于局部变量，堆用于全局变量'

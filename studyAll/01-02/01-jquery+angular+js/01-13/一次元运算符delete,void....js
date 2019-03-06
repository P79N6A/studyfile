'一元'运算符只有'一个参数'，即要'操作'的'对象''或者值'。
delete '运算符''删除'对象'属性''或者方法' delete
var o=new Object;
o.name="david";
delete o.name; 
'不能删除''未定义的方法'。会报错

void//"对"于"任何值""返回""undefined"。用作"避免输出"
"不该输出的值" void 避免不该输出的值
/*用来返回空*/
<a href="javascript:window.open('about:blank')">Click me</a>
//点击上述链接，屏幕会显示"[object]" window.open()有返回引用
//避免方法如下
<a href="javascript:void(window.open('about:blank'))">Click me</a>

"前增量"/"前减量运算符"
//直接从c和java借用的两个运算符是前增量运算符和前减量运算符号
//前增量就是"数值加上一"，前减量同理
var q=1;
++q;

后增量/后减量
和前增量区别在于 "++q 在此时q+1"  "q++在此时q没有+1"

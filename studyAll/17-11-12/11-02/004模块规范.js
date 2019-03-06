layui 的模块是基于 'layui.js' 内部'实现'的'异步模块''加载方式'，
它并'不遵循于AMD'（没有为什么，毕竟任性呀！），而是自己定义了一套更轻量的模块规范。
并且这种方式在经过了大量的实践后，成为 layui 最核心的模块加载引擎

【预先加】
'开门见山'，还是'直接说'使用'比较妥当'。Layui的模块加载'采用核心'的 
'layui.use(mods, callback)'方法，当你的'JS需要用到Layui模块'的时候，我们更'推荐'你'采用预先加载'，
因为这样'可以避免到处写layui.use的麻烦'。你应该在最外层如此定义：
/*
Demo1.js
使用Layui的form和upload模块
*/
layui.use(['form', 'upload'], function(){  //如果只加载一个模块，可以不填数组。如：layui.use('form')
var form = layui.form //获取form模块
,upload = layui.upload; //获取upload模块

//监听提交按钮
form.on('submit(test)', function(data){
  console.log(data);
});

//实例化一个上传控件
upload({
  url: '上传接口url'
  ,success: function(data){
    console.log(data);
  }
})
});


【按需加载（不推荐）】
如果你有强迫症，你对网站的性能有极致的要求，你并'不想预先加载'所需要的'模块'，
而是在'触发一个动作的时候'，才去'加载模块'，那么，这是允许的。你'不用'在你的JS
最外层去包裹一个大大的 'layui.use'，你只需要：
/*
Demo2.js
按需加载一个Layui模块
*/
//……
//你的各种JS代码什么的
//……
//下面是在一个事件回调里去加载一个Layui模块
button.addEventListener('click', function(){
	layui.use('laytpl', function(laytpl){ //温馨提示：多次调用use并不会重复加载laytpl.js，Layui内部有做模块cache处理。
	  var html = laytpl('').render({});
	  console.log(html);
	});
});

【模块命名空间】
Layui的'全部模块'绑定'在 layui对象下'，内部'由layui.define()'方法'来完成'。
'每一个模块'都会'一个特有的名字'，并且'无法被占用'。所以你'无需担心模块'的'空间被污染'，
'除非'是你 'delete layui.mod'; 调用'一个模块'也'必须借助layui对象'的'赋值'。如：
layui.use(['layer', 'laypage', 'laydate'], function(){
  var layer = layui.layer //获得layer模块
  ,laypage = layui.laypage //获得laypage模块
  ,laydate = layui.laydate; //获得laydate模块
  
  //使用模块
});  
一个'模块一旦加载'后，就会'注册在layui对象下'，所以你'无法直接用模块名来获得'，
而同样'借助layui对象'。譬如有时你可能会'直接'在'元素的事件属性上'去'调用一个模块'，如：
<input onclick="layui.laydate()">

【扩展一个Layui模块】
layui 官方提供的模块有时可能还无法满足你，或者你试图'按照layer的模块规范'来
'扩展一个模块'。那么你有必要'认识layui.define()方法'，相信你在文档左侧的“底层方法”
中已有所阅读。下面就就让我们一起扩展一个Layui模块吧：

第一步：确认模块名，假设为：test，然后'新建一个test.js' 文件放入项目任意目录下
（注意：不用放入layui目录）

第二步：'编写test.js' 如下：
/**
扩展一个test模块
**/      
layui.define(function(exports){ 
//提示：模块也可以依赖其它模块，如：layui.define('layer', callback);
	var obj = {
	  hello: function(str){
	    alert('Hello '+ (str||'test'));
	  }
	};
	//输出test接口
	exports('test', obj);
});  

第三步：'设定扩展模块'所在的'目录'，然后就可以'在别的JS文件'中'使用'了
//config的设置是全局的
layui.config({
  base: '/res/js/' //假设这是test.js所在的目录
}).extend({ //设定模块别名
  test: 'test' //如果test.js是在根目录，也可以不用设定别名
  ,test1: 'admin/test1' //相对于上述base目录的子目录
});
 
//使用test
layui.use('test', function(){
  var test = layui.test;
  
  test.hello('World!'); //弹出Hello World!
});
//使用test1
layui.use('test1', function(){
  var test = layui.test1;
  
  //……
});

'大体'上'来说'，Layui的模块定义很'类似Require.js'和'Sea.js'，但'跟他们又有着明显的不同'，
譬如在接口输出等地方。




































































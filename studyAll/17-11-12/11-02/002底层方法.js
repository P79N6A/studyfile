本篇主要'介绍核心基础库' 'layui.js' 所'发挥的作用'，其中'过滤了''大部分'在'外部'可能
'不'是'太常用的API'，侧重'罗列了最常用的框架'支撑

你可以'在使用模块之前'，全局化'配置一些参数'，尽管'大部分时候'它'不是必须的'。
所以我们目前提供的'全局配置项非常少'，这也是'为了减少'一些'不必要的工作'，
尽可能'让''使用''变得更简单'。目前支持的'全局配置项'如下：

layui.config({
  dir: '/res/layui/' //layui.js 所在路径（注意，如果是script单独引入layui.js，无需设定该参数。），
	  //一般情况下可以【无视】
  ,version: false //一般用于【更新模块缓存】，【默认不开启】。设为【true即让浏览器不缓存】。
  		//也可以设为一个固定的值，如：201610
  ,debug: false //用于开启调试模式，【默认false】，如果设为【true】，则【JS模块的节点】
  	//会【保留在页面】
  ,base: '' //设定扩展的Layui模块的所在目录，一般【用于外部模块扩展】'比如要引进下拉框'
});

//定义模块
通过该方法'可定义'一个 'Layui模块'。参数'mods'是'可选'的，用于'声明该模块'所'依赖的模块'。
'callback'即'为模块加载完毕'的'回调函数'，它'返回'一个'exports参数'，用于'输出该模块的接口'。
layui.define(function(exports){
  //do something
  
  exports('demo', function(){
    alert('Hello World!');
  });
});

跟Requirejs最大'不同'的地方'在于'接口输出，'exports''是'一个'函数'，它'接受两个参数'，
'第一个'参数'为模块名'，'第二个'参数为'模块接口'，当你'声明'了上述的'一个模块后'，
你就'可以在外部''使用'了，'demo'就会'注册到layui对象下'，即'可通过 layui.demo()'
去'执行该模块的接口'。

你也可以在'定义'一个'模块的时候'，'声明'该模块'所需的依赖'，如：
layui.define(['layer', 'laypage'], function(exports){
  exports('demo', function(){
    alert('Hello World!');
  });
});

Layui的'内置模块''并非默认'就'加载'的，他必须'在你执行'该'方法后''才会加载'。
它的'参数''跟'上述的 'define'方法完全'一样'。 
另外请注意，'mods'里面'必须是'一个'合法的模块名'，'不能包含目录'。
如果'需要加载目录'，建议'采用extend建立别名'（详见模块规范）
layui.use(['laypage', 'layedit'], function(){
  var laypage = layui.laypage
  ,layedit = layui.layedit;
  
  //do something
});

该方法的'函数'其实'返回了'所加载的'模块接口'，所以你其实'也可以''不通过layui对象'
'赋值获得接口'（这一点跟Sea.js很像哈）：
layui.use(['laypage', 'layedit'], function(laypage, layedit){
  //使用分页
  laypage();
  //建立编辑器
  layedit.build();
});


'参数table'为'表名'，'settings''是'一个'对象'，用于'设置key'、'value'。 
该方法'对localStorage''进行'了良好的'封装'，在'Layui'的'多个内置模块'（比如'layim'）
中'发挥了''重要'的'作用'，因此你'可以使用它''存储'一些'本地数据'。
//【增】：向【test表】【插入】一个【nickname字段】，如果该表【不存在】，则【自动建立】。
layui.data('test', {
  key: 'nickname'
  ,value: '贤心'
});
//【删】：【删除test表】的【nickname字段】
layui.data('test', {
  key: 'nickname'
  ,remove: true
});
layui.data('test', null); //【删除test表】
 
//【改】：同【增】，会【覆盖已经存储】的【数据】
 
//【查】：向【test表】【读取全部的数据】
var localTest = layui.data('test');
console.log(localTest.nickname); //获得“贤心”

【获取设备信息】
方法：layui.device(key)，参数'key是可选的'
由于Layui的一些功能进行了'兼容性处理'和'响应式支持'，因此该方法同样发挥了至关重要的作用。
尤其是在'layui mobile模块'中的作用可谓举足轻重。该方法'返回了丰富的设备信息'：


【其他支撑】
其实除此之外，'layui.js'内部还'提供'了许多'底层引擎'，他们同样'是整个Layui框架'
体系的有力'支撑'，所以有必要露个脸，尽管你可能并不会用到：
'layui.cache'	静态属性。'获得'一些'配置'及临时的'缓存'信息
'layui.extend(options)'	'拓展'一个'模块别名'，如：layui.extend({test: '/res/js/test'})

【第三方支撑】
Layui'部分模块依赖jQuery'（比如layer），但是你并'不用去额外加载jQuery'。Layui'已经将jQuery最稳定的一个版本'
'改为Layui的内部模块'，当你去'使用 layer'之类的'模块时'，它会首先判断你的页面是否已经引入了jQuery，如果没有，
则加载内部的jQuery模块，如果'有'，则'不会加载'。

另外，我们的'图标取材'于'阿里巴巴矢量图标库'（iconfont），构建工具采用 Gulp 。除此之外，不依赖于任何第三方工具。


【快速上手】
'获得 layui 后'，将其完整地'部署到'你的'项目目录'（或静态资源服务器），
你'只需'要'引入'下述'两个文件'：
'./layui/css/layui.css'
'./layui/layui.js'

<script src="../layui/layui.js"></script>
<script>
//一般直接写在一个js文件中
layui.use(['layer', 'form'], function(){
  var layer = layui.layer,
  form = layui.form;
  
  layer.msg('Hello World');
});
</script>


'非模块化''方式'
<script src="../layui/layui.all.js"></script>
<script>
//由于模块都一次性加载，因此不用执行 layui.use() 来加载对应模块，直接使用即可：
;!function(){
  var layer = layui.layer
  ,form = layui.form;
  
  layer.msg('Hello World');
}();
</script> 

'以当前浏览器''普通认可'的方式去'组织模块'！我们认为，这恰是符合当下国内绝
大多数程序员从旧时代过渡到未来新标准的最佳指引。所以 layui 本身也并'不'是'完全'
'遵循'于'AMD时代'，准确地说，她试图'建立自己的模式'，所以你会看到：
//layui模块的定义
layui.define([mods], function(exports){
  //……
  exports('mod', api);
});  
 
//layui模块的使用
layui.use(['mod1', 'mod2'], function(args){
  var mod = layui.mod1;
  //……
});  
所以她坚持采用经典模块化，也正是能让人'避开工具的复杂配置'，'回归简单'，安静高效地编
织原生态的HTML、CSS和JavaScript。但是 layui 又'并非是 Requirejs '那样的'模块加载器'，
而'是一款UI解决方案'她'与Bootstrap'最大的不同恰恰在于她'糅合了'自身'对经典'
'模块化的理解'。

我们推荐你'遵循 layui 的模块规范''建立一个入口文件'，并'通过 layui.use() '方式来'加载'
该'入口文件'，如下所示：
<script>
layui.config({
  base: '/res/js/modules/' //你存放新模块的目录，注意，不是layui的模块目录
}).use('index'); //加载入口
</script>

上述的 'index' 即为'你 /res/js/modules/ 目录下的 index.js'，它的内容应该如下
/**
项目JS主入口
以依赖layui的layer和form模块为例
**/    
layui.define(['layer', 'form'], function(exports){
	var layer = layui.layer,
	form = layui.form;
	layer.msg('Hello World');
	exports('index', {}); //注意，这里是模块输出的核心，模块名必须和use时的模块名一致
});  


【应该如何加载模块最科学？】
事实上我们在模块规范已经有明确地说明，你可以采用'预先加载'和'按需加载'两种模式，
但后者我们并不推荐（文档也解释原因了）。因此我们强烈推荐的方式是：你应该'在你js文件的代码最外层'，
就'把需要用到的模块' 'layui.use'以 一下，如：
//我们强烈推荐你在代码最外层把需要用到的模块先加载
layui.use(['layer', 'form', 'element'], function(){
	var layer = layui.layer
	,form = layui.form
	,element = layui.element
	
	//……
	//你的代码都应该写在这里面
});

【如何使用内部jQuery？】
由于Layui'部分内置模块''依赖''jQuery'，所以我们'将jQuery1.11'最稳定的一个版本'作为'一个'内置'
的'DOM模块'（唯一的一个第三方模块）。只有你'所使用的模块'有'依赖到它'，它'才会加载'，
并且如果'你的页面'已经script'引入了jquery'，'它并不会重复加载'。内置的jquery模块'去除'了
全局的'$'和'jQuery'，是一个符合layui规范的标准模块。所以你必须'通过以下方式得到'：
layui.use(['jquery', 'layer'], function(){ 
  var $ = layui.$ //重点处
  ,layer = layui.layer;
  //后面就跟你平时使用jQuery一样
  $('body').append('hello jquery');
});
layui.use('layer', function(){ 
  var $ = layui.$ //由于layer弹层依赖jQuery，所以可以直接得到
  ,layer = layui.layer;
});

【为什么表单不显示？】
当你'使用表单时'，'Layui'会'对select'、'checkbox'、'radio'等'原始元素隐藏'，
从而'进行美化修饰'处理。但这'需要依赖'于'form组件'，所以你'必须加载 form'，
并且'执行一个实例'。值得注意的是：'导航的Hover效果'、'Tab选项卡等同理'
（它们需'依赖 element 模块'）
layui.use('form', function(){
  var form = layui.form; //只有执行了这一步，部分表单元素才会自动修饰成功
  //……
  //但是，如果你的HTML是动态生成的，自动渲染就会失效
  //因此你需要在相应的地方，执行下述方法来手动渲染，跟这类似的还有 element.init();
  form.render();
});      






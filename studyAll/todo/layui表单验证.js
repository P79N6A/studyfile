校验
我们对表单的验证进行了非常'巧妙的支持'，大多数时候你只需要'在表单元素上加上' 'lay-verify=""'
属性值'即可'。如：

<input type="text" lay-verify="email"> 

还'同时支持多条规则'的验证，如下：
<input type="text" lay-verify="required|phone|number">

上述对输入框'定义'了一个'邮箱规则'的校验，它会'在 form 模块''内部完成'。
目前我们内置的'校验支持'见上文的：'预设元素属性'
注意：从 layui '2.2.0' 开始，'设定 lay-verify=""' 时，'不再强制必填'，
'除非同时设定'了 'required'，如：'lay-verify="phone|required"'

'除了内置的校验规则外'，你还可以'自定义验证规则'，通常对于比较复杂的校验，
这是非常有必要的。

form.verify({
	
	  username: function(value, item){ //value：表单的值、item：表单的DOM对象
	    if(!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)){
	      return '用户名不能有特殊字符';
	    }
	    if(/(^\_)|(\__)|(\_+$)/.test(value)){
	      return '用户名首尾不能出现下划线\'_\'';
	    }
	    if(/^\d+\d+\d$/.test(value)){
	      return '用户名不能全为数字';
	    }
	  }
	  //我们既支持上述函数式的方式，也支持下述数组的形式
	  //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
	  ,pass: [
	    /^[\S]{6,12}$/
	    ,'密码必须6到12位，且不能出现空格'
	  ] 
});


required（必填项）
phone（手机号）
email（邮箱）
url（网址）
number（数字）
date（日期）
identity（身份证）
自定义值



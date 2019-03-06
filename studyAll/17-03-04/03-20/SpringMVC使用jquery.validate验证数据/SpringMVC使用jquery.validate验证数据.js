引入资源
//jquery.js;jquery validation.js

'1.可以迅速验证一些常见的输入'
'2.并且可以自己扩充自己的验证方法'

1：'为input添加class'，'名字可以随意设置'，'但每个input需要保持一致'，
	本章案例calss设置为notNull。（若input已有class属性，可直接加到其后）
2：'为input添加一个属性'，用来'后期通过jquery获取该字段'，用'作提示语'。
	本章案例提示属性为notNull。
3：'通过jQuery遍历'页面中'所有calss为notNull的表单'，'验证'其'是否为空'，若为空，
	'通过获取notNull的字段'，'进行为空提示'。


步奏：
1.在'input中加入class'即：

<input id="firstname" name="firstname" class="required"/>
<input id="lastname" name="lastname" class="required"/>
<input id="username" name="username" class="required"/>
<input id="password" name="password" type="password" class="required"/>
<input id="confirm_password" name="confirm_password" type="password" class="required" equalTo="#password"/>
<input id="email" name="email" class="required email"/>

//validate自带的默认验证
required: "必选字段",
remote: "请修正该字段",
email: "请输入正确格式的电子邮件",
url: "请输入合法的网址",
date: "请输入合法的日期",
dateISO: "请输入合法的日期 (ISO).",
number: "请输入合法的数字",
digits: "只能输入整数",
creditcard: "请输入合法的信用卡号",
equalTo: "请再次输入相同的值",
accept: "请输入拥有合法后缀名的字符串",
maxlength: jQuery.format("请输入一个长度最多是 {0} 的字符串"),
minlength: jQuery.format("请输入一个长度最少是 {0} 的字符串"),
rangelength: jQuery.format("请输入一个长度介于 {0} 和 {1} 之间的字符串"),
range: jQuery.format("请输入一个介于 {0} 和 {1} 之间的值"),
max: jQuery.format("请输入一个最大为 {0} 的值"),
min: jQuery.format("请输入一个最小为 {0} 的值")

//然后，在document的read事件中，加入如下方法：
<script>
	$(document).ready(function(){
		$("#signupForm").validate();
	}
</script>

这样，'当form被提交'的时候，'就会根据'input指定的'class来进行验证了'。如果失败，form的提交就会被阻止。
并且，将提示信息显示在input的后面。

不过，'这样'感觉不好，因为'验证规则侵入'了我们的'html代码'。还有一个方式，便是'使用“rules”'。
我们'将'input的那些'验证用class删除掉'。然后'修改document的ready事件响应代码'：

$(document).ready(function(){
	$("#signupForm").validate({
		rules:{
			firstname:"required",
			lastname:"required",
			username:"required",
			
			//同时满足多项校验
			password:{
				required:true,
				minlength:4,
				maxlength:15
			}
			confirm_password:{
				required:true,
				equalTo:"#password"
			},
			email:{
				required:true,
				email:true
			}
		},
		//自定义错误信息，不写就使用默认的
		messages:{
			firstname:"必填项",
			lastname:"必填项",
			username:"必填项",
			password:{
				required:"必填项",
				minlength:jQuery.format("密码长度不少于{0}位"),
				maxlength:jQuery.format("密码长度不超过{0}位")
			},
			confirm_password:{
				required:"必填项",
				equalTo:"密码不一致"
			},
			email:{
				required:"必填项",
				email:"格式有误"
			}
		}
	});
})

/*修改错误样式*/
<style type="text/css">
	#signupForm label.error {
		padding-left: 16px;
		margin-left: 2px;
		color:red;
		background: url(img/unchecked.gif) no-repeat 0px 0px;
	}
</style>


可以'通过event指定触发效验方式'
（可选值有'keyup'(每次按键时)，'blur'(当控件失去焦点时)，'不指定'时就'只在'按'提交'按钮'时触发'）
$(document).ready(function(){
	$("#signupForm").validate({
		event:"keyup" || "blur"
	})
})

如果'通过指定debug为true'则表单'不会提交只能用来验证'(默认为提交)，可'用来调试'
$(document).ready(function(){
	$("#signupForm").validate({
		debug:true
	})
})

如果在'提交前'还需'要进行一些自定义处理'使'用submitHandler'参数
$(document).ready(function(){
	$("#signupForm").validate({
		SubmitHandler:function(){
			alert("success");
		}
	})
})




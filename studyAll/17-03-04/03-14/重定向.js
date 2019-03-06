第二种： 
attr.addFlashAttribute("param", value);
这种方式也能达到'重定向'带参，而且能'隐藏参数'，其'原理'就'是放到session中'，session在'跳到页面后'马上'移除对象'。
所以你刷新一下后这个值就会丢掉

例：
attr.addFlashAttribute("status","999");
attr.addFlashAttribute("message","登录失败");
return "redirect:/toLogin";

这样就相当于：return "redirect:/index?name=123&success=success"
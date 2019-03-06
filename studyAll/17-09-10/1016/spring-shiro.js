'@RequiresAuthentication'
'验证'用户'是否登录'，等同于方法'subject.isAuthenticated()' 结果为true时。

'@RequiresUser'
验证用户'是否被记忆'，user有两种含义：
'一种'是成功登录的（'subject.isAuthenticated() 结果为true'）；
'另外一种'是被记忆的（'subject.isRemembered()结果为true'）。

'@RequiresGuest'
验证是否是一个guest的请求，与'@RequiresUser完全相反'。
 换言之，RequiresUser  == !RequiresGuest。
此时subject.getPrincipal() 结果为null.

'@RequiresRoles'
例如：@RequiresRoles("aRoleName");
 void someMethod();
如果'subject中有aRoleName角色'才可以'访问方法someMethod'。
如果'没有这个权限'则会'抛出异常AuthorizationException'。

'@RequiresPermissions'
例如： @RequiresPermissions({"file:read", "write:aFile.txt"} )
  void someMethod();
要求'subject中'必须'同时含有file:read'和'write:aFile.txt'
的权限'才能执行方法someMethod()'。否则抛出异常AuthorizationException。
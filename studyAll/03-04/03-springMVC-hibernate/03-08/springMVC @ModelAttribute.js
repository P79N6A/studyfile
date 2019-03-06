"@ModelAttribute"
"用在方法的参数注解"中："用于解释model entity"
"用在方法注解"里:"该controller的所有方法在调用前，先执行@ModelAttribute注解的方法"
用在方法注解中：'先执行该方法'
两种

"扩展应用"
"在baseController中，所有controller都继承baseController就能在所有controller中调用ModelAttribute"；//他就使得这个对应的方法成了一个拦截器
可以将验证权限的方法写在其中，这样就能在所有controller中完成权限的代码了

可以做module输出到view时使用
让它先加载数据，再显示页面
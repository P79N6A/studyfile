$browser.cookies();//获取浏览器的cookie
//$browser是安哥拉内置的服务，与浏览器交互

//$apply()
数据模型'model与view'视图是'怎样动态绑定的'呢？其实是靠的'$apply()来实现的'
原理是用'watcher监听model和view的变化'，同时'用apply速度更新变化'来实现的
其实watcher 就是$watch();

$scope.$watch('aModel', function(newValue,oldValue) {
	//更新dom
});

//$digest()
在$watch中的第二个参数是回调函数，aModel一般变化，就调用它，那么监听器如何得知aModel产生变化的呢？
用$digest

'$digest循环执行' 它'遍历所有watch' ，每当检测到'watch对应model发生变化'，'相关的函数就调用'

'$scope.$digest()触发后'，就'开始循环$digest'，'遍历watch'了；

当你触发一些事件，如click，onblur，（'让model发生变化的操作'）导致'model发生变化后'，
'angular'会'自动触发'一轮'$digest'，来'执行'发生变化的'model的watch回调函数'，'更新视图'

注意，'angular不是直接调用$digest()',而是'用$scope.$apply()',后者调用$rootScope.$digest();
'$scope.$apply()'；当你执行该函数时候，相当于'让angular自动变量watch'，同步视图


//什么时候手动调用$apply()方法？
如果你在angular'上下文之外'的地方执'修改了model',那么'你需要手动调用$apply'
//就是在angular js以外的代码中更改model值


$scope.apply();


划重点，线程，


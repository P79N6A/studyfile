'require'
app.directive('myDire',function(){
	return{
		restrict:'AE',
		require:'^ngModel',//1.另一个指令的名称，作用是用于指令之间的相互交流
		//require将另一个指令的名称做link的第四个参数 :'',
		//在任何情况下，ng编译器在查找子控制器时会参考当前指令的模板
		'require'+ 符号策略;
		'?'+当前指令没有控制器,参数传null;
		'^'+调用require对应指令的控制器;
		'?^'+综合上面两种情况,优先在上级查找;
		''+同?但找不到会报错;
		'ngModel'	:'',
		//提供底层api处理控制器内的数据，这个api用来处理数据绑定，验证，css更新等不实际操作dom的事情
		require:'^ngModel';使用require设置上层指令为^ngModel,link方法就能访问ngModelController了;
		'ngModelController'+常用的元素如下:''
		//:为了设置作用域中的视图值，需要调用ngModel.$setViewValue()函数;
		/*
		$setViewValue()方法适合于在自定义指令中监听自定义事件（比如使用具有回调函数的jQuery插件），
		我们希望在回调时设置$viewValue并执行digest循环
		*/
		//2.$render方法可以定义视图具体的渲染方式
        /*
        3.属性
        1. $viewValue
        $viewValue属性保存着更新视图所需的实际字符串。
        2. $modelValue
        $modelValue由数据模型持有。 $modelValue和$viewValue可能是不同的，取决于$parser流水线是否对其进行了操作。
        3. $parsers
        $parsers 的值是一个由函数组成的数组，其中的函数会以流水线的形式被逐一调用。ngModel 从DOM中读取的值会被传入$parsers中的函数，并依次被其中的解析器处理。
        4. $formatters
        $formatters的值是一个由函数组成的数组，其中的函数会以流水线的形式在数据模型的值发生变化时被逐一调用。它和$parser流水线互不影响，用来对值进行格式化和转换，以便在绑定了这个值的控件中显示。
        5. $viewChangeListeners
        $viewChangeListeners 的值是一个由函数组成的数组，其中的函数会以流水线的形式在视图中的值发生变化时被逐一调用。通过$viewChangeListeners，可以在无需 使用$watch的情况下实现类似的行为。由于返回值会被忽略，因此这些函数不需要返回值。
        6. $error
        $error对象中保存着没有通过验证的验证器名称以及对应的错误信息。
        7. $pristine
        $pristine的值是布尔型的，可以告诉我们用户是否对控件进行了修改。
        8. $dirty
        $dirty的值和$pristine相反，可以告诉我们用户是否和控件进行过交互。
        9. $valid
        $valid值可以告诉我们当前的控件中是否有错误。当有错误时值为false， 没有错误时值为true。
        10. $invalid
        $invalid值可以告诉我们当前控件中是否存在至少一个错误，它的值和$valid相反。
        */
	};
});
var app=angular.model("app");
app.directive("checkAll",function(){
	return{
		restrict:'A',
//		scope使得指令对象作用域与外界隔离开来，使其模板（template）处于无继承状态（transclude嵌入除外）
//		指令与外界交互，就需要涉及到绑定策略@ = &
//		@他将本地作用域和特定的dom属性进行绑定（属性值需要是父级作用域中的） name:'@forName' 它传递的是一个字符串
//		=他与@不同在于@针对字符串而使用。=针对对象而使用 它传递的是一个对象
//		&对父级作用域进行绑定，并将其中的一个属性包装成为一个函数
		scope:{
			onTrClick:'&' 
		}
	}
}).directive("shuangxiang",function(){
	return{
		restrict:'E',
		template:'<div>指令中：<input ng-model="model"/></div>',
		scope:{
			model:"="
		}
	}
})
app.controller("shuangxiangController",[$scope,function('$sp'){
	$sp.data=[{name:'张三'},{name:'李四'}];
}])

<input ng-model="test"/>
<input ng-model="test"/>
<div ng-controller="shuangxiangController">
	父级scope中：<input ng-model="mark"/>
	<direct model="mark"></direct>
</div>
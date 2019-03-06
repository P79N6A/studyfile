var app = angular.module('testApp',[]);
//angular.module('tapp',[])第一次声明对象需要加上[],
//表示生成一个新的angular对象，不加就是覆盖老对象，没有老对象就报错
app.controller('myController',['$scope',function($scope){
}]).directive('myDtive1',function(){
	return{
		restrict:'AE',
		//指令scope作用域策略
		//@页面属性与模板属性进行绑定
		scope:{//新建一个scope，目的是让该对象绑定到父控制器的对象中  常用的有@ = & scope:{}
			tname/*tname模板中的对象*/:"=forName" /*for-name页面的属性*/  
				//他是指令属性for-name 与指令对象tname 的桥梁  **只有在指令属性和指令绑定对象名字相同才能够简写为 tname:"=";
				//=将指定对象与指令属性进行绑定
		},
		template:"<input type='text' ng-model='tname'/>",//template;
		replace:true//不写就默认replace:false  false:模板作为子元素 插入调用此指令的元素内部
		//replace true：模板作为调用元素的内部属性插入调用元素里
		//templateUrl 1.可作为外部文件路径的字符串   2.作为函数，可接收两个参数的函数telement attrs
	};
}).directive('myDtive2',function(){
	return{
		restrict:'AE',
		//指令scope作用域策略，
		require: '^ngModel',//提供angular底层api，可在link中的ngModel参数中使用
		/*
		'?' +页面没有ng-model对象,参数传null;
		'^'+页面的ng-model对象为必输项;
		'?^'+综合上面两种情况,优先在上级查找;
		''+同?但找不到会报错;
		*/
		scope:{//新建一个scope，目的是让该对象绑定到父控制器的对象中  常用的有@ = & scope:{}
			name2/*name2是页面的属性*/:"@",
				//@将页面属性与模板属性进行绑定
			ngModel: "="
		},
		template:"<span style='border: 1px;'>{{name2}}</span>",//template;
		replace:true,//不写就默认replace:false  false:模板作为子元素 插入调用此指令的元素内部
		//replace true：模板作为调用元素的内部属性插入调用元素里
		//templateUrl 1.可作为外部文件路径的字符串   2.作为函数，可接收两个参数的函数telement attrs
		//link 提供处理业务的方法，提供JQ对象element,页面属性attr两个参数
        link: function (scope, element, attrs,ngModel) {
        	console.log("element="+element);
        	console.log("attrs="+attrs);
        	console.log("scope="+scope);
        	console.log("ngModel="+ngModel);
        	attrs.name2="默认";//不能生效？？？
        }
	};
});



var app=angular.module('app',['ui.router']);
app.config(function($urlRouterProvider,$stateProvider){
	$urlRouterProvider.otherwise('app/home');
	$stateProvider.state('app', {
		url : '/app',
		templateUrl : 'tpl/manages.html'
	}).state('app.home', {
		url : '/home',
		templateUrl : 'tpl/home.html'
	});
});
//1.点击后2.再点就反选
app.directive('checkAll',function(){
	return {
		restrict:'A',
		scope:{
			data:'&'
		},
		link:function(element,attrs,scope){
			element.bind('click',function(e){
				if($(this).prop('checked')){
					$(this).parentsUntil('table').parent.find("input[type='checkbox']").porp('checked',true);
				}else{
					$(this).parentsUntil('table').parent.find("input[type='checkbox']").porp('checked',false);
				}
			});
		}
	};
})
//选中变色--需求如下
//1.要求点击该行就能选中改行--找到chekbox让他checked为true，让其他为false
//2.要求选中一行的颜色比其他颜色深--当点击一行选中时，将改行加入一个样式
//3.要求鼠标移动到某一行上去，颜色变化，移走颜色变回去--注册事件，移上去加入class变色，移走移除class
.directive('tableTrSelected',function(){
	return{
		restrict:'A',
		scope:{
			onTrClick:'&'
		},
		link:function(scope,element,attrs){
			//tr点击事件
			element.bind("click",function(){
				//本身加重颜色
				$(this).addClass("selected");
				//siblings找到该jquery对象的同辈元素，进而对他们进行操作
				//移除其他同辈的颜色
				$(this).siblings().removeClass("selected");
				scope.onTrClick();
			});
			//对第一列就是checkBox进行操作；要求是点击者被选中，其他未选中
			var td=element.find("td")[0];
			$(td).siblings().bind("click",function(){
				$(this).parent().find("td:frist input").prop("checked",true);
				$(this).parent().siblings().find("td:frist input").prop("checked",false);
			});
			//tr 鼠标移到的地方颜色深，移走的地方颜色浅
			//移上去
			element.bind("mouseover",function(){
				$(this).addClass("over");
			});
			//移出去
			element.bind("mouseout",function(){
				$(this).removeClass("over");
			});
			
			$(".stripe tr:even").addClass("alt");
		}
	};
}).directive("clickTr",function(){
	return{
		restrict:'A',
		scope:{
			onTrClick:'&'
		},
		link:function(element,attrs,scope){
			element.bind("click",function(){
				$(this).addClass("s");
				$(this).siblings().removeClass("s");
				scope.onTrClick();
			});
			var fristTd=element.find("td")[0];
			$(fristTd).siblings().bind("click",function(){
				$(this).parent().find("td:frist input").prop("checked",true);
				$(this).parent().siblings().find("td:frist input").prop("checked",false);
			});
		}
	};
});
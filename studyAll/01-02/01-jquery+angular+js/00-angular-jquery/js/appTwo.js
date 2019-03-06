var app=angular.module('app',['ui.router']);
app.config(function($urlRouterProvider,$stateProvider){
	$urlRouterProvider.otherwise('app/home');
	$stateProvider.state('app', {
		url : '/app',
		templateUrl : 'tpl/managesTwo.html'
	}).state('app.home', {
		url : '/home',
		templateUrl : 'tpl/home.html'
	});
}).config(function($urlRouterProvider,$stateProvider){
	$urlRouterProvider.otherwise('app/home');
	$stateProvider.state('app',{
		url:'/app',
		templateUrl:'tpl/manages.html'
	});
});
app.directive('checkAll',function(){
	return{
		restrict:'A',
		scope:{
			data:'&'
		},
		link:function(element,attrs,scope){
			element.bind('click',function(e){
				if($(this).prop('checked')){
					$(this).parentsUntil('table').parent.find("input[type='checkbox']").prop('checked',true);
				}else{
					$(this).parentsUntil('table').parent.find("input[type='checkbox']").porp('checked',false);
				}
			});
		}
	};
});
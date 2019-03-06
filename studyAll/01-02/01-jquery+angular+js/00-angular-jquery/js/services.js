var app=angular.model('myapp',[]);
app.factory('Public',['$http','$rootScope',function($http,$r_s){
	return{
		post:function(url,params){
			return $http({
				method:'post',
				headers:{'Content-type':'application/x-www-form-urlencoded'},
				data:params,
				url:url
			});
		},
	
		formParam:function(tableID){
			var inputID=$('#'+tableD+':input');
			var params='';
			inputID.each(function(domEle){
				//jquery遍历而来的对象不属于Jquery对象，仍然要用$来标识为Jquery对象 attr是一个参数则返回属性名
				params=params+"&"+$(domEle).attr("name")+"="+$(domEle).val();
			});
			return params;
		},
		
		getSelectByPar:function(parCode){
			var parColl=$r_s.parColl;
			var options=new Array();
			for(var i=0;i<parColl.length;i++){
				if(parColl[i].parCode=parCode){
					var option={};
					option.id=parColl[i].parValue;
					option.text=parColl[i].parMsg;
					options.push(option);
				}
			}
			return options;
		}
	};
}]).factory('p_service',['$http',function($http){
	return{
		getDate:function(){
			var fullDate='';
			var myDate=new Date();
			fullDate=myDate.getYear();
			return fullDate;
		}
	};
}]).factory('testServices',['$http',function($http){
	return{
		post:function(param,url){
			return $http({
				method:'post',
				headers:{'':''},
				data:param,
				url:url,
			});
		},
		formPar:function(tableID){
			var inputData=$("#"+tableID+":input");
			var par='';
			inputData.each(function(e){
				par=par+"&"+$(e).attr('name')+"="+$(e).val();
			});
			return par;
		},
	};
}]).factory('test',['$http',function($http){
	return{
		post:function(param,url){
			return $http({
				method:'post',
				headers:{'':''},
				data:param,
				url:url,
			});
		},
		formPar:function(tableID){
			var inputD=$("#"+tableID+":input");
			var par='';
			inputD.each(function(e){
				par=par+"&"+$(e).attr('name')+"="+$(e).val();//$Obj.attr('A') 取出属性A对应的值
			});
			return par;
		},
	};
}]);
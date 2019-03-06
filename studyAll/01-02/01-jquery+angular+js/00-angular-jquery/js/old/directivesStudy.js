var myApp=augular.model("app");

myApp.directive("checkAll",function(){
	return{
		restrict:"A",
		scope:{
			onTrClick:"&"
		},
		link:function(scope,element,attrs){
			element.bind("click",function(e){
				if($(this).prop("checked")){
					$(this).parentsUtil("table").parent("input:[type='checkbox']").prop("checked",true);
				}else{
					$(this).parentsUtil("table").parent("input:[type='checkbox']").prop("checked",false);
				}
				scope.onTrClick();
			});
		},
	};
})
  /**
   * 1.tr隔行变色
   * 2.点击tr改变背景色
   * 3.点击tr中任何一个td，选中当前行第一个input复选框
   * 4.鼠标移动到tr上背景高亮
   */
.directive("tableTrSelected",function(){
	return{
		restrict:"A",
		scope:{
			onTrClick:"&"
		},
		link:function(scope,element,attrs){//scope,element,attrs
			//点击变的，移除同辈其他色
			element.bind("click",function(){
				$(this).sbilings().removeClass();
				$(this).addClass();
			});
			element.bind("click",function(){
				$(this).addClass();
				$(this).siblings().removeClass();
			});
			//点击选中该行
			var td=element.find("td")[0];
			$(td).find("input:[type='checkbox']").prop("checked",true);
			$(td).siblings().find("input:[type='checkbox']").prop("checked",false);
			
			var td=element.find("td")[0];
			$(td).find("input:[type='checkbox']").prop("checked",true);
			$(td).siblings().find("input:[type='checkbox']").prop("checked",false);
			//鼠标移动到某一行，该行就变深色
			element.bind("mouseover",function(){
				$(this).addClass("over");
			});
			element.bind("mouseout",function(){
				$(this).removeClass("over");
			});
		},
	};
})
	/**
	 * 弹出提示信息
	 */
.directive("toolTip",function(){
	return{
		restrect:'AE',
		replace:true,// 默认false，模板会被当做子元素插入到调用此指令的元素内部
		scope:{
			data:"@"
		},
		template:'<div><span class="contText">{{data}}</span></div>',
		//1.一段html文本；2.一个可以接受两个参数的函数参数tElement，tAttrs返回一个代表模板的字符串
		link:function(scope,element,attrs){
			if(attrs.data != '' && !scope.$eval(attrs.noPopup) && attrs.data.getWidth()>element.width()){
	    		  
	    		  element.addClass("tooltip");
	    		  
	    		  element.append('<span class="tooltip-content">' + attrs.data + '</span>');  
	    		  
	    		  if ($.browser.msie && $.browser.version.substr(0,1)<7)
	    		  {
	    			  element.mouseover(function(){
	    				  $(this).children('.tooltip-content').css('visibility','visible');
	    			  }).mouseout(function(){
	    				  $(this).children('.tooltip-content').css('visibility','hidden');
	    			  });
	    		  }
	    	  }
			if(attrs.data!=''&&scope.$eval(attrs.noPopup)&&attrs.data.getWidth()>element.width()){
				element.addClass();
				element.append('<span class="tooltip-content">'+attrs.data+'</span>');
				//判断浏览器
				if($.browser.msie&&$broswer.version.substr(0,1)<7){
					element.mouseover(function(){
						$(this).children(".tooltip-content").css('visibility','visible');;
					}).mouseout(function(){
						$(this).children(".tooltip-content").css('visibility','hidden');;
					});
				}
			}
		}
	};
}).directive('tooltip',function(){
	return{
		restrict:'E',
		replace:true,
		scope:{
			data:'@'
		},
		template:'<div><span class="contText">{{data}}</span></div>',
		link:function(scope,element,attrs){
			if(attr.data){
				element.addClass("tooltip");
				element.append('<span class="tooltip-content">' + attrs.data + '</span>');
				element.mouseover(function(){
				  $(this).children('.tooltip-content').css('visibility','visible');
				}).mouseout(function(){
				  $(this).children('.tooltip-content').css('visibility','hidden');
				});
			}
		}
	};
}).directive('operateOptions',function(){
	return{
		restrict:'A',
		link:function(scope,element,attrs){
			element.bind('mouseenter',function(){
				element.parent().parent().siblings().find(".dropdowns").hide();
			});
		}
	};
})
/*
 * 
 */
.directive('select2',function(){
	return{
		restrict:'AE',
		require:'^ngModel',//为字符串，代表另外一个指令的名字
		scope:{
			data:'=',
			ngModel:'='
		},
		link:function(scope,element,attrs,ngModel){
			//重写
			function indexOf(value,array){
				var i=0,l=array.length;
				for(;i<l;i=i+1){
					if(equal(value,array[i]))return i;
				}
				return -1;
			}
			function equal(a,b){
				if(a===b)return true;
				//a和b有一个不存在直接返回false
				if(a===undefined||b===undefined)return false;
				if(a===null||b===undefined)return false;
				//a和b都存在
				if(a.constructor===String)return a+''===b+'';
				if(b.constructor===String)return b+''===a+'';
				return false;
			}
			
			var removeAttr = ['data','ngModel','type','class','style'];
			
			angular.forEach(attrs,function(val,key){
				if(typeof val !='string'||indexOf(key,removeAttr)!=-1){
					delete attrs[key];
				}else if(val=='false'){
					attrs[key]=false;
				}else if(val=='true'){
					attrs[key]=true;
				}
			});
			
			scope.$watch('ngModel',function(){
				element.select2('val',ngModel.$viewValue);
			});
			
			scope.$watch('data',function(){
				attrs.data=scope.data||[];
				element.select2(attrs);
				element.select2('val',ngModel.$viewValue);
				if(attrs.defaultVal){
					element.select2('val',attrs.defaultVal);
					ngModel.$setViewValue(attrs.defaultVal);
				}
				if(attrs.readonly){
					element.select2('readonly',attrs.readonly);
				}
			});
			element.on("change",function(){
				scope.$apply(function(e){
					ngModel.$setViewValue(e.val);
				});
			});
		}
	};
})
;
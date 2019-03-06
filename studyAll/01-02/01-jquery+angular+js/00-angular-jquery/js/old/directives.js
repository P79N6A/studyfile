'use strict';
/* Directives */
//angular.module('app', [])
/**
 * 列表全选功能
 * 使用方法 ： 在全选的input元素中加上属性check-all, 例 ： <input type="checkbox" check-all/>
 */
var app = angular.module('app');
app.directive('checkAll', function () {
    return {
      restrict: 'A',
      scope:{
    	  onTrClick : '&'
      },
      link: function (scope, element, attrs) {
    	  element.bind("click",function(e){
    		  if($(this).prop("checked")){
    			  $(this).parentsUntil("table").parent().find("tbody tr input[type='checkbox']").prop("checked",true);
    		  }else{
    			  $(this).parentsUntil("table").parent().find("tbody tr input[type='checkbox']").prop("checked",false);
    		  }
    		  scope.onTrClick();
    	  });
      }
    };
  })
  /**
   * 1.tr隔行变色
   * 2.点击tr改变背景色
   * 3.点击tr中任何一个td，选中当前行第一个input复选框
   * 4.鼠标移动到tr上背景高亮
   * 
   * 使用方法 ： 在 tr 上加上属性 table-tr-selected , 例 ： <tr table-tr-selected> <td> </td></tr>
   */
  .directive('tableTrSelected', function () {
    return {
      restrict: 'A',
      scope:{
    	  onTrClick : '&'
      },
      link: function (scope, element, attrs) {
    	  
    	  //tr 点击事件
    	  element.bind("click",function(){
    		  $(this).addClass("selected");
    		  $(this).siblings().removeClass("selected");
    		  scope.onTrClick();
    	  });
    	  
    	  var td = element.find("td")[0];
    	  //td 点击事件
    	  $(td).siblings().bind("click",function(){
    		  $(this).parent().find("td:first input").prop("checked",true);
    		  $(this).parent().siblings().find("td:first input").prop("checked",false);
    	  });
    	  
    	  //tr 鼠标移动事件
    	  element.bind("mouseover",function(){
    		  $(this).addClass("over");
    	  });
    	  
    	  element.bind("mouseout",function(){
    		  $(this).removeClass("over");
    	  });
    	  
    	  $(".stripe tr:even").addClass("alt");
    	  
      }
    };
  })
  /**
   * 提示框
   * 使用方法 : <tooltip data="{{menu.name}}" no-popup="true"></tooltip>
   */
  .directive('tooltip', function () {
    return {
      restrict: 'E',
      replace:true,
      scope:{
    	  data:'@'
      },
      template:'<div><span class="contText">{{data}}</span></div>',
      link: function (scope, element, attrs){
    	 
    	  if(attrs.data != '' && !scope.$eval(attrs.noPopup) && attrs.data.getWidth()>element.width()){
    		  
    		  element.addClass("tooltip");
    		  
    		  element.append('<span class="tooltip-content">' + attrs.data + '</span>');  
    		  
    		  if ($.browser.msie && $.browser.version.substr(0,1)<7){
    			  element.mouseover(function(){
    				  $(this).children('.tooltip-content').css('visibility','visible');
    			  }).mouseout(function(){
    				  $(this).children('.tooltip-content').css('visibility','hidden');
    			  });
    		  }
    	  }
      }
    };
  })
  .directive('operateOptions', function (){
    return {
      restrict: 'A',
      link: function (scope, element, attrs){
    	  
    	  element.bind('mouseenter',function(){
    		  //隐藏其他行的下拉列表
    		  element.parent().parent().siblings().find(".dropdowns").hide();
    		  //计算显示位置
    		  var ul = $(this).next("ul");
			  ul.css('marginLeft',-(ul.width()-$(this).width())/2-8+'px');
			  ul.show();
			  
			  ul.bind('mouseleave',function(e){
				  $(this).css('marginLeft','0px');
				  $(this).hide();
			  });
    	  });
      }
    };
  })
  /**
	data : 数据键值对，可以绑定到scope变量中，例如：data="dataList", 在控制器中使用$scope.dataList = [{id:1,text:'值1'},{id:2,text:'值2'},{id:3,text:'值3'}]
	placeholder : 未选择时的默认提示
	multiple : boolean值，默认为false，如果加上此属性multiple="true"，则可以进行多选操作
	close-on-select ：boolean值，默认为true，在选择一项后下拉列表是否关闭，设置此属性的前提是multiple属性为true
	allow-clear ： boolean值，清除选择的值，默认为false
	minimum-results-for-search : -1,  禁用搜索框
	页面中的用法
	<select2 ng-model="multiple" data="[{id:1,text:'值1'},{id:2,text:'值2'},{id:3,text:'值3'}]" placeholder=" -- 请选择 -- " multiple="true" close-on-select="false" allow-clear="true" style="width:200px;"/>
    <select2 ng-model="single" data="[{id:1,text:'值1'},{id:2,text:'值2'},{id:3,text:'值3'}]" placeholder=" -- 请选择 -- " allow-clear="true" style="width:150px;"/>
   */
  .directive('select2', function () {
    return {
      restrict: 'AE',
      require: '^ngModel',
      scope: {
          data: '=',
          ngModel: '='
        },
      link: function (scope, element, attrs, ngModel) {
    	  
    	  function indexOf(value, array) {
    	        var i = 0, l = array.length;
    	        for (; i < l; i = i + 1) {
    	            if (equal(value, array[i])) return i;
    	        }
    	        return -1;
    	    }
    	  function equal(a, b) {
    	        if (a === b) return true;
    	        if (a === undefined || b === undefined) return false;
    	        if (a === null || b === null) return false;
    	        // Check whether 'a' or 'b' is a string (primitive or object).
    	        // The concatenation of an empty string (+'') converts its argument to a string's primitive.
    	        if (a.constructor === String) return a+'' === b+''; // a+'' - in case 'a' is a String object
    	        if (b.constructor === String) return b+'' === a+''; // b+'' - in case 'b' is a String object
    	        return false;
    	    }
    	  
    	  //移除掉非select2属性
    	  var removeAttr = ['data','ngModel','type','class','style'];
    	  
    	  angular.forEach(attrs,function(val,key){
    		  if(typeof val != 'string' || indexOf(key, removeAttr) != -1 ){
    			  delete attrs[key];
    		  }else if(val == 'false'){
    			  attrs[key] = false;
    		  }else if(val == 'true'){
    			  attrs[key] = true;
    		  }
    	  });
    	  
    	  scope.$watch('ngModel',function(){
    		  element.select2('val',ngModel.$viewValue);
    	  });
    	  
    	  scope.$watch('data',function(){
    		  attrs.data = scope.data || [];
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
    	  
		  element.on("change", function(e) {
			scope.$apply(function(){
				ngModel.$setViewValue(e.val);
			});
		  });
      }
    };
  })
  .constant('removeElement', function(element){
		element && element.remove && element.remove();
   })
  .directive('myAccess', ['authService', 'removeElement', function (authService, removeElement) {
	return{
		restrict: 'A',
		link: function (scope, element, attributes) {
			var hasAccess = false;
			var allowedAccess = attributes.myAccess.split(" ");
			for (var i = 0; i < allowedAccess.length; i++) {
				if (authService.userHasRole(allowedAccess[i])) {
					hasAccess = true;
					break;
				}
			}
			if (!hasAccess) {
				angular.forEach(element.children(), function (child) {
					removeElement(child);
				});
				removeElement(element);
			}
		}
	};
}])
.controller('dynamicFormRenderCtrl',['$scope','PublicService',function($scope,PublicService){
	this.submitForm = function(data){
		if($scope.operate == 'add'){
			PublicService.postJson("/web/dynamicForm.do?method=addAuthApply",data)
			.success(function(ret) {
				$('#cancelBtn_'+$scope.template.modeNo).trigger('click');
				Dialog.alert('保存成功');
			});
		}else if($scope.operate == 'update'){
			PublicService.postJson("/web/dynamicForm.do?method=updateAuthApply",data)
			.success(function(ret) {
				$('#cancelBtn_'+$scope.template.modeNo).trigger('click');
				Dialog.alert('保存成功');
			});
		}
	};
}])
.directive('iTable', function () {
	return{
		restrict: 'EA',
		replace:true,
		controller:'dynamicFormRenderCtrl',
		scope: {
			formItems: '=',
			template: '=',
			formItemsVal: '=',
			operate:'='
        },
		template:'<table width="100%" border="0" cellspacing="0" cellpadding="0"></table>',
		link: function (scope, element, attributes, ctrl) {
			
			var renderComp = function(item,dataOrder,isHidden){
				
				dataOrder = dataOrder || '';
				isHidden = isHidden?'none':'block';
				
				if(item.type == '0'){//顺序号
					
				}else if(item.type == '1'){//文本框
					return '<input type="text" class="inputBd" style="width:100%;" id="_df_'+item.modeNo+'_'+item.modeOrder+'_'+dataOrder+'"/>';
				}else if(item.type == '2'){//文本域
					return '<textarea class="textareaBd" style="width:100%;height:70px;" id="_df_'+item.modeNo+'_'+item.modeOrder+'_'+dataOrder+'"></textarea>';
				}else if(item.type == '3'){//复选框
					var modeTypeHtml = '';//排版方式
					if(item.mode == '11'){//纵向排列
						modeTypeHtml = "&nbsp;";
					}else{//横向
						modeTypeHtml = "<br/>";
					}
					return '<input type="checkbox" id="_df_'+item.modeNo+'_'+item.modeOrder+'_'+dataOrder+'" />'+item.twoName+modeTypeHtml;
				}else if(item.type == '4'){//单选框
					var modeTypeHtml = '';//排版方式
					if(item.mode == '11'){//纵向排列
						modeTypeHtml = "&nbsp;";
					}else{//横向
						modeTypeHtml = "<br/>";
					}
					return '<input type="radio" name="_df_'+item.modeNo+'_'+item.oneName+'" id="_df_'+item.modeNo+'_'+item.modeOrder+'_'+dataOrder+'" />'+item.twoName+modeTypeHtml;
				}else if(item.type == '5'){//日期组件
					return '<input class="timeIcon" onclick="WdatePicker()" type="text" My97Mark="false" id="_df_'+item.modeNo+'_'+item.modeOrder+'_'+dataOrder+'"/>';
				}else if(item.type == '6'){//下拉选项
					
				}else if(item.type == '7'){//上传附件
					
				}else if(item.type == '8'){//动态添加数据行
					return '<a title="移除" class="deleteImg" id="_remove_row_'+item.modeNo+'_'+item.modeOrder+'_'+dataOrder+'" style="display:'+isHidden+';"></a>';
				}
				return '<input type="text" class="inputBd" style="width:100%;" id="_df_'+item.modeNo+'_'+item.modeOrder+'_'+dataOrder+'"/>';
			}
			
			//渲染表单
			function render(){
				
				if(scope.template && scope.template.modeTitle){
					element.append('<caption>'+scope.template.modeTitle+'</caption>');
				}
				
				angular.forEach(scope.formItems,function(v){
					if(v.isTable == '1'){//是否为表单列
						if(element.find('td[v='+v.oneName+']').length==0){
							element.append('<tr><td v="'+v.oneName+'" class="tdCenter tdColor" colspan="4">'+v.oneName+'</td></tr>');
							element.append('<tr><td class="tdCenter" colspan="4"><table width="100%" border="0" cellspacing="0" cellpadding="0" class="noneBd"><tr><td>'+v.twoName+'</td></tr><tr><td>'+renderComp(v,'1')+'</td></tr></table></td></tr>');
						}else{
							var lastTd = element.find('td[v='+v.oneName+']').parent().next().find('td');
							var table = lastTd.find('table');
							var trHeader = table.find('tr').first();
							var trContent = table.find('tr').last();
							if(v.type=='8'){//动态添加数据行
								trHeader.append('<td><a id="_add_row_'+v.modeNo+'_'+v.modeOrder+'"><img class="addImg" src="images/add.png"></a></td>');
							}else{
								trHeader.append('<td>'+v.twoName+'</td>');
							}
							
							trContent.append('<td>'+renderComp(v,'1',true)+'</td>');
							
							//为新增和移除一行（加、减按钮）添加事件
							$("#_add_row_"+v.modeNo+"_"+v.modeOrder).bind('click',function(){
								
								$(this).parent().parent().parent().append($(this).parent().parent().next().clone(true));
								
								var allTr = $(this).parent().parent().nextAll();
								
								for(var i=0;i<allTr.length;i++){
									
									if(i!=0){
										$(allTr[i]).find('[id^="_remove_row_"]').show();//显示除了第一行以外的移除按钮
									}
									
									//根据数据行修改移除按钮的id
									var delRow = $(allTr[i]).find('[id^="_remove_row_"]');
									for(var j=0;j<delRow.length;j++){
										var delRowId = $(delRow[j]).attr('id');
										var renewId = delRowId.substr(0,delRowId.lastIndexOf('_')+1)+(i+1);
										$(delRow[j]).attr('id',renewId);
									}
									
									//修改表单项的id
									var field = $(allTr[i]).find('[id^="_df_'+v.modeNo+'_'+'"]');
									for(var j=0;j<field.length;j++){
										var id = $(field[j]).attr('id');
										var renewId = id.substr(0,id.lastIndexOf('_')+1)+(i+1);
										$(field[j]).attr('id',renewId);
									}
								}
								
							});
							$("[id^='_remove_row_"+v.modeNo+"_"+v.modeOrder+"']").bind('click',function(){
								
								var firstTr = $(this).parent().parent().parent().find("tr").first();
								
								$(this).parent().parent().remove();
								
								var allTr = $(firstTr).nextAll();
								for(var i=0;i<allTr.length;i++){
									
									//根据数据行修改移除按钮的id
									var delRow = $(allTr[i]).find('[id^="_remove_row_"]');
									for(var j=0;j<delRow.length;j++){
										var delRowId = $(delRow[j]).attr('id');
										var renewId = delRowId.substr(0,delRowId.lastIndexOf('_')+1)+(i+1);
										$(delRow[j]).attr('id',renewId);
									}
									
									//修改表单项的id
									var field = $(allTr[i]).find('[id^="_df_'+v.modeNo+'_'+'"]');
									for(var j=0;j<field.length;j++){
										var id = $(field[j]).attr('id');
										var renewId = id.substr(0,id.lastIndexOf('_')+1)+(i+1);
										$(field[j]).attr('id',renewId);
									}
								}
							});
						}
					}else{
						var tdLen = element.find('tr').last().find('td').length;
						var colsLen = element.find('tr').last().find('td[colspan]').length;
						if(v.mode == '0'){//0-占1/2行,1-占1行,2-占2行,3-占3行,复选框、单选框：10-横向、11-纵向排列
							if(tdLen == 2 && colsLen==0){
								element.find('tr').last().append('<td class="tdColor">'+v.oneName+'</td><td>'+renderComp(v,'1')+'</td>');
							}else{
								element.append('<tr><td class="tdColor">'+v.oneName+'</td><td>'+renderComp(v,'1')+'</td></tr>');
							}
						}else if(v.mode == '1'){
							element.append('<tr><td class="tdColor">'+v.oneName+'</td><td colspan="3">'+renderComp(v,'1')+'</td></tr>');
						}else if(v.mode == '10' || v.mode == '11'){
							if(element.find('td[v='+v.oneName+']').length==0){
								element.append('<tr class="barginForm-change"><td class="tdColor" v="'+v.oneName+'">'+v.oneName+'</td><td colspan="3">'+renderComp(v,'1')+'</td></tr>');
							}else{
								element.find('td[v='+v.oneName+']').next().append(renderComp(v,'1'));
							}
						}
					}
				});
				
				var submitBtn = $('<input type="button" class="contBar-submit" id="saveBtn_'+scope.template.modeNo+'" value="保 存"/>');
				var wrapBtn = $('<div class="contBar-btn"></div>');
				submitBtn.bind("click",function(){//提交按钮点击事件
					
					var submitData = {};
					var detailList = [];
					
					var forms = element.find('[id^="_df_"]');
					
					angular.forEach(forms,function(v){
						var _ele = $(v);
						
						if(_ele && _ele.val()){
							var detail = {};
							var vals = _ele.attr('id').split('_');
							detail.modeNo = vals[2];
							detail.modeOrder = vals[3];
							detail.dataOrder = vals[4];
							if(_ele.attr('type')=='radio' || _ele.attr('type')=='checkbox'){
								if(_ele.prop('checked')){
									detail.dataContent = true;
									detailList.push(detail);
								}
							}else{
								detail.dataContent = _ele.val();
								detailList.push(detail);
							}
						}
					});
					if(scope.formItemsVal[0]){
						submitData.applyNo = scope.formItemsVal[0].applyNo;
					}
					submitData.modeNo = scope.template.modeNo;
					submitData.authApplyDetail = detailList;
					ctrl.submitForm(submitData);
				});
				wrapBtn.append(submitBtn).append('<input type="button" id="cancelBtn_'+scope.template.modeNo+'" class="contBar-submit" value="返 回" onclick="history.go(-1)"/>');
				element.after(wrapBtn);
			}
			
			//填充表单值
			function fillFormVal(){
				angular.forEach(scope.formItemsVal,function(v){
					var ele = $('#_df_'+v.modeNo+'_'+v.modeOrder+'_'+v.dataOrder);
					if(ele.length != 0){
						if(ele.attr('type')=='radio' || ele.attr('type')=='checkbox'){
							ele.prop('checked',scope.$eval(v.dataContent));
						}else{
							ele.val(v.dataContent);
						}
					}else{
						var p = $('#_df_'+v.modeNo+'_'+v.modeOrder+'_'+(parseInt(v.dataOrder)-1));
						var cloneTr = $(p).parent().parent().clone(true);
						
						//根据数据行修改移除按钮的id
						var delRow = $(cloneTr).find('[id^="_remove_row_"]');
						var delRowId = $(delRow[0]).attr('id');
						var renewDelId = delRowId.substr(0,delRowId.lastIndexOf('_')+1)+v.dataOrder;
						$(delRow[0]).attr('id',renewDelId);

						//修改表单项的id
						for(var i=0;i<$(cloneTr).find("[id^='_df_']").length;i++){
							var e = $(cloneTr).find("[id^='_df_']")[i];
							var eId = $(e).attr('id');
							var renewId = eId.substr(0,eId.lastIndexOf('_')+1)+v.dataOrder;
							$(e).attr('id',renewId);
							$(e).val(v.dataContent);
						}
						$(p).parent().parent().parent().append(cloneTr);
					}
				});
			}
			
			//将表单项设置为不可用
			function disableForm(){
				$('[id^="_df_'+scope.template.modeNo+'"]').each(function(){
					var type = $(this).attr('type');
					if(type=='radio' || type=='checkbox'){
						$(this).prop("disabled",true);
					}else{
						$(this).prop("readonly",true);
					}
				});
				
				$('[id^="_add_row_"]').parent().parent().parent().find('tr').find('td:last').remove();
				//移除保存按钮
				$('#saveBtn_'+scope.template.modeNo).remove();
			}
			
			scope.$watch('formItems',function(){
				if(scope.formItems){
					render();
				}
			});
			scope.$watch('formItemsVal',function(){
				if(scope.formItemsVal){
					fillFormVal();
				}
			});
			scope.$watch('operate',function(){
				if(scope.operate && scope.operate === 'view'){
					disableForm();
				}else if(scope.operate && scope.operate === 'update'){
					
					angular.forEach(scope.formItems,function(v){
						if(v.isModify == '0'){
							var formEle = $('[id^="_df_'+v.modeNo+'_'+v.modeOrder+'"]');
							if(formEle.attr('type')=='radio' || formEle.attr('type')=='checkbox'){
								formEle.prop('disabled',true);
							}else{
								formEle.prop('readonly',true);
							}
						}
					});
					
					var addRowForm = element.find('[id^="_add_row_"]');
					addRowForm.each(function(){
						//显示除了第一行以外的移除按钮
						$(this).parent().parent().nextAll('tr:gt(0)').find('[id^="_remove_row_"]').show();
					});
				}
			});
		}
	}
})
;

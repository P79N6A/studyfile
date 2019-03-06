'.forEach()'+对'对象'+或者'数组';
通过iterator(value,key)形式调用,value是'对象属性值或数组元素';
key是'对象属性键或者数组索引';

angular.forEach(obj,iterator,[context]);
context作为迭代函数上下文this的对象;

如果遍历而来的对象都是类似map的话，会有key和value

angular.forEach($scope.selectConfigs,function(data){
	angular.forEach(data,function(value,key){
		if(key == 'productId'){
			params += "&relatedConfig.productSId="+value;
		}
		if(key == 'amount'){
			params += "&relatedConfig.amount="+value;
		}
	});
});
var app=angular.model('app',[]);
app.filter('name',function(){
	return function(input){
		if(input){
			return input[0]toUpperCase()+input.slice(1);
		};
	};
}).filer('name',function(){
	return function(input){
		return 1;
	};
});

'冒泡'
原理：'相邻的两个比较，把大的往后排把第一个按次与之后的数字比较，得出最小的','第二次比较得出第二小的'共比较n(数组长度)-1次就ok了
var flag=false;
function pop(arr){
	for(var i=0;i<arr.length-1;i++){
		for(var j=0;i<arr.length-j-1;j++){
			if(arr[j]<arr[j+1]){
				var tem=arr[j];
				arr[j]=arr[j+1];
				arr[j+1]=tem;
				flag=true;
			}
		}
		if(flag)
			flag=false;
		else
			break;
	}
}

'二分算法'
原理：'找到数组中间数midNum，和你要查找的数去比较findNum，如果midNum>findNum就说明findNum在左边，就只在右边找';
Math.floor((leftindex+rightindex)/2)
function binarySearch(arr,fi,leftindex,rightindex){
	if(leftindex>rightindex){
		document.writeln("zhaobudao");
		return;
	}
	//找到中间值
	var midindex=Math.floor((leftindex+rightindex)/2);	
	var mi=arr[midindex];
	if(mi>fi){
		//左边找
		 binarySearch(arr,fi,leftindex,midindex-1);
		 document.writeln("左边找");
	}else if(mi<fi){
		//右边找
		 binarySearch(arr,fi,midindex+1,rightindex);
		 document.writeln("右边找");
	}else{
		document.writeln("find"+midindex);
		return;
	}
}
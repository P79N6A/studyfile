js数组方法汇总
'添加'和'删除'   shift  pop
'shift' '删除第一项'，'返回该值'  '空数组返回undefined'
var arr= ['1','2','3','4'];
var val=arr.shift();
'pop'删除数组'最后一项','返回该值'
var endVal=arr.pop();
'push' 将'数组'添'加到''对像数组'的'末尾'，返回数组长度 push 
var brr=['65','34','21'];
var blength=arr.push(brr);
'concat' '返回''新数组' 这样一来就3个数组了，得出一个新的数组
var crr=arr.concat(brr);
'splice'//(start,n,[val1,val2,...])
从'start'位置'开始删除n项'并在该位置'插入新的数组' 
crr.splice(2, 4, ['112','341']);
'reverse' 将数组'反序'  返回一个'反序'后的'数组' 
var drr=crr.reverse();
'sort'按'照指定'的'参数'对数组'排序'
var b=drr.sort(funct);
'slice'返回'开始下标'到'结束下标'之间的数组
var err=drr.slice(start, end);
'join'将数组元素'按照'给定的'分割符''组成字符串'，默认“，”
var f=err.join("=");
'类似StringBuffer'的处理字符串'方法'
/*function StringBuffer(){
	var arr=new Array;
	//这是把arr加到数组中去
	this.append=function(str){
		arr[arr.length]=str;
	};
	//这是把最终的数组用，拼接起来
	this.toString=function(){
		return arr.join("");
	};
};*/
function StringBuffer(){
	var arr=new Array;
	//这是把arr加到数组中去
	this.append=function(str){
		arr[arr.length]=str;
	};
	//这是把最终的数组用，拼接起来
	this.toString=function(){
		return arr.join("");
	};
}
StringBuffer sb = new StringBuffer();
sb.append("ww");
var str = sb.toString;

/**
 *'把数组''转化'为'特定符号'分割的'字符串'
 */
function arrToString(arr,separator){
	if(!separator){separator="";};
	return arr.join("");
};

/**
 * '查找''数组''包含'的'字符串'
 */
function arrayFindString(arr,string){
	var str =arr.join("");
	return str.indexOf(string);
}

//indexOf返回数组元素的位置
var arr=[{id:"2"},{id:"5"},{id:"8"},{id:"23"},{id:"87"}];
var s={id:"8"};
var idx=arr.indexOf(s);
alert(s);
//splice(bgin,size)
//删除数组的元素，从bgin开始，删除size个
arr.splice(idx,1);
//通过indexof返回在数组中的位置，再通过splice删除该元素
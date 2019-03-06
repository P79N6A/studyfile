[].forEach.call($$("*"),function(a){
  a.style.outline="1px solid #"+(~~(Math.random()*(1<<24))).toString(16)
})

这段代码首先获取所有的页面元素，然后用不同的颜色为他们添加一个1ps的边框

1.选中所有的元素
谷歌浏览器特有函数$$.  等价于document.querySelectorAll，
'匹配css选择器就能过滤出对应的元素'. 也等价document.all
$$('a')能够获取当前页面所有錨元素列表

2.迭代所有元素
第一步获取的是NodeLists对象，他和js数组类似
NodeLists 但是不同于数组，我们不能用 $$("*").forEach()迭代
arguments 和 NodeLists一样

使用[].forEach.call()，或者Array.prototype.forEach.call();	来迭代

3.为元素添加外边框
a.style.outline="1px solid #" + color;

(~~(Math.random()*(1<<24))).toString(16)
(number).toString(16);这是将int数字转化为16进制，//一种十六进制数字就是一种颜色
parseInt("1e", 16);这是16进制反转10进制//用parseInt("FFFFF",进制)
我们可以看出，要想(x).toString(16)得出一个16进制的数字，我们x的范围是0-16777215
所以'用Math.random()*(1<<24)得出的数字就在这个范围'
~~取值其中的整数部分//在js中作用和parseInt相同
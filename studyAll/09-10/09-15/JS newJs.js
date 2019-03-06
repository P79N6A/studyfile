'selectedIndex'获取下拉框的index
var checkedIndex = document.getElementById('currStatus').selectedIndex;


'options[i].text'设置下拉框的文本值
var x=document.getElementById("mySelect");
x.options[x.selectedIndex].text="Melon";


'remove'从下拉列表中删除选项
var x=document.getElementById("mySelect");
x.remove(x.selectedIndex);


window.parent.location.reload();//让打开这个窗口的父窗口刷新
window.parent.HideThisDiv(); //应该是让窗口的父窗口的某个DIV影藏
javascript:history.back(); //(-1)就是后退一页


/** 
 * 序列化元素，返回JSON对象 参数：flag 空元素是否系列化成空字符串
 */
$.fn.toJson = function (flag) {
	var json = {};
	var fields = this.serializeArray();
	$.each(fields, function () {
		if (json[this.name]) {
			if (!json[this.name].push) {
				json[this.name] = [json[this.name]];
			}
			if (flag || (!flag && this.value != "")) {
				json[this.name].push(this.value || "");
			}
		} else {
			if (flag || (!flag && this.value != "")) {
				json[this.name] = this.value || "";
			}
		}
	});
	return json;
};
//屏蔽右键菜单  
document.oncontextmenu = function(event) {
	if (window.event) {
		event = window.event;
	}
	try {
		var the = event.srcElement;
		if (!((the.tagName == "INPUT" && the.type.toLowerCase() == "text") || the.tagName == "TEXTAREA")) {
			return false;
		}
		return true;
	} catch (e) {
		return false;
	}
}

//屏蔽粘贴 
document.onpaste = function(event) {
	if (window.event) {
		event = window.event;
	}
	try {
		var the = event.srcElement;
		if (!((the.tagName == "INPUT" && the.type.toLowerCase() == "text") || the.tagName == "TEXTAREA")) {
			return false;
		}
		return true;
	} catch (e) {
		return false;
	}
}

//屏蔽复制  
document.oncopy = function(event) {
	if (window.event) {
		event = window.event;
	}
	try {
		var the = event.srcElement;
		if (!((the.tagName == "INPUT" && the.type.toLowerCase() == "text") || the.tagName == "TEXTAREA")) {
			return false;
		}
		return true;
	} catch (e) {
		return false;
	}
}

//屏蔽剪切  
document.oncut = function(event) {
	if (window.event) {
		event = window.event;
	}
	try {
		var the = event.srcElement;
		if (!((the.tagName == "INPUT" && the.type.toLowerCase() == "text") || the.tagName == "TEXTAREA")) {
			return false;
		}
		return true;
	} catch (e) {
		return false;
	}
}

//屏蔽选中
document.onselectstart = function(event) {
	if (window.event) {
		event = window.event;
	}
	try {
		var the = event.srcElement;
		if (!((the.tagName == "INPUT" && the.type.toLowerCase() == "text") || the.tagName == "TEXTAREA")) {
			return false;
		}
		return true;
	} catch (e) {
		return false;
	}
}

//网页退出的提示方法
window.onbeforeunload = function(event) {
	event = event || window.event;
	event.returnValue = ' ';
}

//禁用浏览器的默认滑动事件,移动端中，屏蔽类似iphone的默认滑动事件用一下方法：  
var preventBehavior = function(e) {
	e.preventDefault();
};
// Enable fixed positioning  
document.addEventListener("touchmove", preventBehavior, false);
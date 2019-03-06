'jQuery改变，操作 HTML'
'html:读取和修改元素的HTML标签'
	$(selector).html(content);

'load:动态加载html;''
$("#feeds").load("feeds.php", {
	limit : 25
}, function() {
	alert("The last 25 entries in the feed have been loaded");
});
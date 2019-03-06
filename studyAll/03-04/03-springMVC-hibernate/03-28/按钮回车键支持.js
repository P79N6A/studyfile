	//给回车加监听器
	document.onkeydown=keyListener;
	//重写监听的方法，这个监听会有一个事件参数
	function keyListener(){
		//第一步，找到按钮
		var x=$("#subtn");
		//查找监听到的事件是不是回车
		e=e?e:event;
		//如果是回车键，就触发点击事件
		if(e.keyCode==13){
			//第二步，让回车键触发按钮
			x.click();
		}
	}
	
//判斷json数组中"是否存在某一个字段"
1.object["key"]!=undefined//如果key定义了，会给他赋值为undefined
2.!("key" in obj)
obj.hasOwnProperty("key");
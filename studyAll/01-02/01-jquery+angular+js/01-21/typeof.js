typeof(obj)
返回obj的类型;

js7种类型
3大基本类型 number string boolean 基本类型存在栈中;类似局部变量
2个符合类型 object array 引用类型存在堆中;类似全局变量
2大特殊类型 undefined null

typeof 通常返回4种
1。"string","object","number",undefined;
其中 null 返回"object"

typeof(obj)
string number object
null -> object
equal检查属性是否等于固定值，等于就执行代码，notEqual相反
name属性//一个属性
<logic:equal name="var1" value="joe">
	<bean:write name="var1"/>
</logic:equal>
	
parameter属性//一个请求参数
<logic:equal parameter="userName" value="tom">
	hello tom!
</logic:equal>
在请求url中含有参数userName，值为tom才会执行
多个参数只取第一个参数

用scope指定查找一个bean的作用域//一个bean
<logic:equal name="MyBean" property="userId" scope="session" value="tom">
	<bean:write name="MyBean" property="userId"/>
</logic:equal>

notEqual和equal相反

使用限制
value属性是必须的
属性  /*name不为空*/ /*value不为空*/
除了base-attrs和exprop-attrs还有额外的value他是被比较的常数值
<logic:notEqual name="var1"/*name不为空*/ value="joe">
	is not joe
</logic:notEqual>

<logic:empty></logic:empty>
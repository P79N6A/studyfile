bean:define：有三个用途

一是'定义新字符串常量'：
<bean:define id="foo" value="This is a new String"/>
	
二是'复制一个现有的bean给新的bean'：
<bean:define id="foo" name="bar"/> // 将名字为bar的JavaBean赋值给foo

三是'复制一个现有的bean的属性给新的bean'：
<bean:define id="bop" name="user" property="role[3].name"/>
<bean:define id="foo" name="bar"  property="baz" scope="request" toScope="session"/>
//toScope属性指新bean的scope，默认为page
上段代码的意思是把名为bar的bean的baz属性赋值给foo，foo的类型为String(默认)。

<bean:define id="custId" name="aRelatePlanBO" property="relatePlanVO.custId"/>
	

<logic:present>判断name对象的property属性是否存在，如果存在则执行present标签内部的代码。
<logic:present name="RelatePlanForm" property="dataList">
<logic:iterate>判断name对象的property属性是否存在，以id为键值循环将name.property的值存入pagecontext中。
iterate标签一般配合<bean:write>标签使用

EX:
 <logic:iterate id="aRelatePlanBO" name="RelatePlanForm" property="dataList" indexId="index">
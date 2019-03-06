'关系映射文件'

'文件头'
<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE hibernate-mapping PUBLIC "-//Hibernate/Hibernate Mapping DTD 3.0//EN"
"http://hibernate.sourceforge.net/hibernate-mapping-3.0.dtd">

'<hibernate-mapping>' 
其下有元素<class>class有name,table属性

<class>有id，property，等元素   
'注意id'（id指定主键属性）<id name="" colum=""></id>
{
	name:对应类属性；   
	type:hibernate类型； 
	column:表字段；
	unsaved-value：区分刚刚创建的对象和session中的对象；
	access:访问属性值的策略；
}
<id name="itemDemand" type="java.lang.String" column="ITEM_DEMAND" />

id下面有generator元素用于设置主键策略;该对象需要初始化，或者一些配置用param 

'generator'-class{    'sequence,uuid,native'
	increment;	int,short,long生成唯一标识，在无其他进程同时作用时有效   
	identity;	用MySQL,SQL Server等的内置标识 
	sequence;	oracle中的内置标识 
	uuid;	
	guid;	用MySQL,SQL Server生成的guid字符串  
	native;根据数据库自动选择
	assigned
}

'property'{
	name 对应类名
	type 对应类属性
}
'property'-clumom{
	name 字段名
	not-null 字段是否为空
}
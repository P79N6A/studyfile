<hibernate-configuration>
	<session-factory>
		<property name="">
			...
		</property>
			
		<mapping resource=""/>
	</session-factory>
</hibernate-configuration>

"hbm2ddl.auto"
<!-- 让Hibernate自动检查数据库 create先删除重名表，再创建表 -->
<property name="hbm2ddl.auto">create</property>
Update如果没有表，创建新表，如果有表，表结构没变化，
就更新数据，结果变化，则创建新表

'O/R映射'
'1.hibernate基本数据类型'
多数与java对应类一样，名字首字母小写
除此之外还支持自定义类型

'实体映射'就是类与表之间关系的映射
1.实体映射基础
'根节点'<hibernate-mapping>
类/表；属性/字段
'类表映射文件'X.hbm.xml
'a.表名-类名' <class name="类名" table="表名">
"动态模型" <class entity-name="DynamicUserMap" table="表名">
Session =SessionFactory.opensession().getSession(EntityMode.MAP);
map.put("name","d");tx=session.beginTransaction();
session.save();tx.commit();

'b.主键'<id name="类属性" column="表字段" ><generator class="主键策略-118">
'c.字段'<property name="类属性" column="表字段">
注意主键生成策略在逻辑允许时选择uuid.hex它采用hib的内置算法
获取32位作为主键，数万年重复一次


2.实体映射技术
自定义数据类型，复合主键，特殊字段
'通过UserType,CompositeUserType'实现自定义数据类型
UserType具体见P124-128
CompositeUserType比UserType功能更多

'复合主键多字段作为主键'
<composite-id><key-property/><key-property/></composite-id>
对应实体类重写equals 和hashCode方法
如何调用load

'扩展 java super'
super()默认调用父类中的无参构造函数
this()是调用自己其他的构造函数，super()是调用自己继承的父类的构造函数
JAVA 中规定使用 this 和 super 时必须放在构造函数第一行
'扩展 java instanceof'
"instanceOf"判断 在运行时,对象是否是特定类的一个实例
obj instanceof class obj是class的实例返回 true 
obj是 null 或不是class实例返回 false

"Blob,Clob"字段的映射
Blob单字节存储，适合保存2进制，图片数据
Clob多字节存储，适合大型文本数据
P137


3.实体映射策略
实体逻辑结构，实体读写性能的设计策略

"Component"将多个类融入在一个对象中	
{
	name="表名"
	class="类名"
}
"Component-Property" 
{
	同实体类property
}

'hibernate3属性延迟加载功能'
设置之后只有在调用TUser.getResume()时才从数据库读取信息
其实是将重量级字段单独拿出来建一个类

其中易加载的数据和重量级数据分开加载，
通过'class-polymorphism='explicit 申明显示多态关系,   
只有在明确指定类名时才返回实例
createQuery("from TUserProfile").list();返回TUserProfile
createQuery("from Object").list();返回TUserProfile的父类对象

"继承"
当两个类继承同一个父类
在hibernate中ploymorphism='implicit'申明影示多态关系
CreateQuery("from 父类名")得到他的所有子类对象
局限性会低效率并且不解媾，改为如下
"一对一"
'joined-subclass'可以嵌套：自动采用Parent的子类进行影射
Parent.hbm.xml
<joined-subclass name="类名" table="表名">  
"joined-subclass:key"{
	column="字段"
}
"joined-subclass:property "{
	同property
}

"class: discriminator"根据同一表中的某一字段，将表创建成多个类
{
	name="类名"
	column="字段名"
}

"subclass":拆分类：将表按照某一字段值拆为新类
subclass{ 和class层级差不多
	name="";
	无table
	discriminator-value"具体字段一个值"
}
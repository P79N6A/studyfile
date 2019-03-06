ibatis dynamic标签：作用是做动态sql

'dynamic有如下条件比较元素''isGreaterThan'，'isNotNull'，'isEmpty'

元素下有如下属性：'prepend'只要'检验到所属元素为true就'
按prepend的值'组装其中的sql'

dynamic中的'prepend会覆盖第一个''元素的prepend为真''的属性'
所以'第一个'一定要'设置prepend''不然会覆盖第二个'；
<dynamic prepend="">
	<isNotEmpty prepend="AND" property="User.name">
		A = #User.name#
	</isNotEmpty>
</dynamic>


Iterate：<iterate  property="" 可选,:'从'传入的'参数集合中使用属性名'去'获取值'


forEach有三种类型
分别是list，[](array)，map
有如下属性
item：循环体中的具体对象。支持属性点路径访问item.name
	list和数组中是对象，map中是value
collection：要做foreach的对象，作为入参时，List<?>对象默认用list代替作为键，
	数组对象有array代替作为键，Map对象用map代替作为键
	如果User有属性List ids。入参是User对象，那么这个collection = "ids"
	如果User有属性Ids ids;其中Ids是个对象，Ids有个属性List id;
	入参是User对象，那么collection = "ids.id"
separator：元素之间的分隔符，例如在in()的时候，separator=","会自动在元素中间用","隔开，
	避免手动输入逗号导致sql错误，如in(1,2,)这样。该参数可选

open：foreach代码的开始符号，一般是(和close=")"合用。常用在in(),values()时。该参数可选
index：在list和数组中,index是元素的序号，在map中，index是元素的key，该参数可选。

map的属性如果不是集合或map,做参数时，直接用key就可以了

<select id="getCpProfileNamesByIds" resultType="string">  
	select name from mega_mis_smpp where id in  
	<foreach item="ids" index="index" collection="array" open="(" separator="," close=")">  
		#{ids}
	</foreach>   
</select>

全名：character data   ：字符数据//就是把里面的内容看做文本，不做转译
在标记CDATA下，所有的标记、实体引用都被忽略，而被XML处理程序一视同仁地当做字符数据看待，CDATA的形式如下：
/*   <![CDATA[文本内容]]>  这里面的都作为文本来处理   */
CDATA的文本内容中不能出现字符串“]]>”，另外，CDATA不能嵌套。
DTD实例:
指定类型为CDATA以后就可以在XML中被用于实例,
例如下面payment 元素的type属性被指定为CDATA类型后在XML中就可以赋于"check"的字符数据。
<!ATTLIST payment type CDATA "check">
XML 实例:
XML 解析器通常会解析 XML 文档中所有的文本。
当某个 XML 元素被解析时，其标签之间的文本也会被解析：
<message>此文本也会被解析</message>解析器之所以这么做是因为 XML 元素可包含其他元素，就像这个例子中，
其中的 <name> 元素包含着另外的两个元素(first 和 last)：
<name><first>Bill</first><last>Gates</last></name>而解析器会把它分解为像这样的子元素：

<'isEqual'>'比较属性值和静态值'或另一个属性值是否'相等'。
<'isNotEqual'>'比较属性值和静态'值或另一个属性值是否'不相等'。

<'isGreaterThan'>'比较属性值是否大于'静态值或另一个'属性值'。
<'isGreaterEqual'>'比较属性值是否大于等于'静态值或另一个'属性值'。

<isLessThan>比较属性值是否小于静态值或另一个属性值。
<isLessEqual>比较属性值是否小于等于静态值或另一个属性值。

/*实例见custPerson.xml*/
<resultMap id="get-CustPersonDraftList-result" class="custPersonBO">
	<result property="custPersonVO.id" column="id" jdbcType="NUMERIC" nullValue="0" />
	<result property="pageControlData.resultCount" column="resultCount" jdbcType="NUMERIC"
	  nullValue="0" />
</resultMap>

<select id="loadPersonInfoDraftList" parameterClass="custPersonBO" resultMap="get-CustPersonDraftList-result">
	 <![CDATA[
	 WITH resultTable AS (
	 SELECT DISTINCT A.id,
	 A.NAME,
	 A.LINKMAN_TYPE
	 ]]>
	 <dynamic prepend="">
	      <isNotEmpty prepend="AND" property="custPersonVO.lastUpdateDate">
	      	<![CDATA[(A.LAST_UPDATE_TIME >= to_date(#custPersonVO.lastUpdateDate#,'YYYY-MM-DD'))]]>
	      </isNotEmpty>
	 </dynamic>
	 <![CDATA[
		 )
		 select rs.NAME,
		 rs.id,
		 rs.LINKMAN_TYPE,
		 rs.companyName
		 rs.resultCount
	 ]]>
</select>
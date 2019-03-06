整体流程：
请求-->controller接受请求-->controller返回对应页面-->页面通过js发送请求-->controller接受请求去后台取数据

通过页面请求找controller：
在url倒数第二个地方找到view位置

controller相关
controller中@RequestMapping(value = "/fansView", produces = { "application/json;charset=UTF-8" })
value对应的就是url
return new ModelAndView("couponType");其中的字符串就是jsp页面
也可以调用后台，返回json数据

首页 http://localhost:8080/udream_biz/udream/
需要的java文件：

实体类位置 udream_facade模块下   继承BaseVo
udream_facade.src.main.java.com.zycx.udream.vo.CouponTypeVo.java


映射类位置 udream_facade模块下   继承BaseModel
udream_facade.src.main.java.com.zycx.udream.model.CouponType.java
映射文件对应换做了  extends BaseModel 的类，需要注解，这样才能实现访问数据库


services接口位置  udream_facade模块下	
CouponTypeService
udream_facade.src.main.java.com.zycx.udream.service.CouponTypeService.java


services实现类位置 biz-module模块下  继承CouponTypeService
biz-module.src.main.java.com.zycx.udream.service.impl.CouponTypeServiceImpl.java


Dao接口位置 udream_facade	继承GeneralDao<CouponType>
udream_facade.src.main.java.com.zycx.udream.dao.CouponTypeDao.java


Dao实现类位置	biz-module模板下 继承GeneralDaoSupport<CouponType>（hibernate操作抽象化） 实现 CouponTypeDao
biz-module.src.main.java.com.zycx.udream.dao.impl.CouponTypeDaoImpl.java


只有实现类在module中，其他全在udream_facade中


Dao实现类bean不加入.xml文件
services实现类bean四处注入doubb服务的地方

biz-module   cbcloud-dubbo.xml
<dubbo:service interface="com.zycx.udream.service.CouponTypeService"
		ref="couponTypeService" version="test_server" />
			
udream_biz   cbcloud-dubbo.xml
<dubbo:reference id="couponTypeService" interface="com.zycx.udream.service.CouponTypeService" check="false" version="test_server"  />

udream_customer	udream-dubbo.xml
<dubbo:reference id="couponTypeService" interface="com.zycx.udream.service.CouponTypeService" check="false" version="test_server"  />

udream_customer	udream-dubbo.xml  
<dubbo:reference id="couponTypeService" interface="com.zycx.udream.service.CouponTypeService" check="false" version="dev" />
barber_module.src.main.resources.config.cbcloud-dubbo.xml

hibernate sql支持

String sql="select {usr.*} from T_User usr"//hibernate 可以直接变字段为对象  传参数时候一定要指定对象的所属类,其中对象一定要用{}表示
List list=session.createSQLQuert(sql,"usr",TUser.class).list();

sql获取特定的字段  select u.id as {usr.id},u.name as {usr.name} from T_User u
u是表别名	usr是对象别名

createSQLQuery{
	sql string 是sql文
	"实体类别名"
	类名.class
}.list();

session.createSQLQuery(sql,"usr",TUser.class)方法中，我们将执行的sql传入，指定其实体对象别名usr，实体对象类型TUser.class
在一次sql执行过程中对多个实体对象同时操作
String sql "select {usr.*},{addr.*} from T_User usr inner join T_Address addr on usr.id=addr.user_id";

与hql相同，native sql在实体映射文件中进行配置   P214

sqlQuery	执行原生sql
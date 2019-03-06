/**
 *uniqueResult 可以返回唯一的一个值(对象) 
 */
session.createQuery(" select count(*) from Student where name like :name ")
.setParameter("name","%刘%").uniqueResult();

//select count(*) from Student where name like :name
/**
 *基于投影，通过在列表中存储一个对象数组   类似聚合函数
 */
 String str="select stu.sex,count(*) "
+" from Student stu group by stu.sex";
List<Object[]> obj=session.createQuery(str).setParameter().list();

//"select stu.sex,count(*) from Student stu group by stu.sex"
/**
 *基于导航(1对多)，没有左右关联，效率不高
 */
  String str="select stu from "
+"Student stu where stu.classroom.id=?";
session.createQuery(str).setParameter(0,1).list();

/**
 *使用in设置'基于列表'的查询，此处的查询需要'使用别名'
 *使用in的查询条件必须在其他查询条件最后     in使用数组
 */
  String str="select stu from"
+"Student stu where stu.name like ? and stu.classroom.id in(:clas)";
session.createQuery(str).setParameter(0,"%张%").
setParameterList("clas",new Integer[]{1,2}).list();

//"select stu from Student stu where stu.name like ? and stu.classroom.id in(:clas)"
//session.createQuery(str).setParameter(0,"%张%").
//setParameterList("clas",new Integer[]{1,2}).list();

/**
 *分页查询
 *使用setFirstResult和setMaxResult可以完成分页的offset和pagesize设置
 */
 String str="select stu from "
+" Student stu where stu.name like ? and stu.classromm.id in(:clas) ";
session.createQuery(str).setParameter(0,"%张%").
setParameterList("clas",new Integer[]{1,2})
.setFirstResult(0).setMaxResults(15)
.list();

/**
 *通过is null 查询为空的对象不能用=null
 */
 String str="select stu from"
+"Student stu where stu.name is null";
session.createQuery(str).setParameter(0,"%张%").
setParameterList("clas",new Integer[]{1,2})
.setFirstResult(0).setMaxResults(15)
.list();
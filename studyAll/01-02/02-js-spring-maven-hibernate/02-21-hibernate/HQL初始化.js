基本的sql查询
基于对象的查询
Query q=session.createQuery("From Sp");
List<Sp>s=q.list();

select"不能select *,换用链式查询"	
String sql="Select spe from Sp spe";

Query q=session.createQuery(sql);

//加入查询条件
String sql=" select se.a from Sp se where se.b like '%张%' "
Query q=sesion.createQuery(sql).list();

//基于？条件查询 jdbc最小1  hibernate是0
String sql="from Spe where name like ?"
Query q=sesion.createQuery(sql).setParamter(0,"%李%").list();
//基于别名进行查询使用：xx  说明别名的名称
String sql="from Spe where name like :name and sex=:sex"

Query q=sesion.createQuery(sql)
.setParamter("name","%李%")
.setParamter("sex","男").list();
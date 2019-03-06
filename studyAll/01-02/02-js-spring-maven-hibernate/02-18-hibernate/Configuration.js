'Configuration' 负责管理hibernate的配置信息{
	数据库URL，用户，密码，驱动
	数据库适配器（dialect）
}

[这些配置在hibernate.cfg.xml或者hibernate.properties中] 
Configuration con=new Configuration().configure();会加载xml文件。
产生获取sessionfactory的对象

不用hibernate.cfg.xml采用如下方式加载该对象	不用hibernate
Configuration con=new Configuration().configure(new File("D:\\my.xml"));

'SessionFactory'创建SessionFactory对象
SessionFactory sessionFactory=con.buildSessionFactory();
SessionFactory保存了映射关系。维护二级缓存，和连接池
一般一个数据库用一个SessionFactory

'Session'进行持久化操作的对象
Session =SessionFactory.opensession();
{
	save;		session.save(user);保存用户 
	get;		user=session.get(User.class,new Integer(1))根据Id查用户
	update;
	delete;		session.delete(user);session.delete("from User where id=1 ");
	find;(hibernate2)		session.find("from User where id=1 ")
	
	Query;(hibernate3)
	query=session.cresteQuery("from User user where user.name like ? ")
	
	Criteria;(hibernate3) criteria=session.createCriteria(User.class);
	criteria.add(Expression.eq("name","Cartier"));
}
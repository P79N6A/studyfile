//User类
//在类名上注解，表明是哪个表产生的类
@Entity
@Table(name="T_User")


多对一//多对一选择作为多的一方来维护两者的关系
在get方法上加入注解，来维护关系
//注解为主键  @Id
@Id
@GeneratedValue
public int getID(){
	reutn id;
}

//在get方法上加column,表示往表中插入字段
//columnDefinition里可以写相关的sql
column(name="create_date";columnDefinition="")


@ManyToOne(fetch="LAZY")//启用懒加载	
@JoinCloumn(name="cid")//表示由Student类的'cid'作为外键，来维护多对一的关系
getUserClass(){
}


//UserClass类
@OneToMany(mappedBY="userClass")//mappedBY表示由对方的userClass来维护关系
@LazyCollection(LazyCollectionOption.EXTRA) //设置查询size用count
getUser(){
}


多对多
方法一
Admin类
@Entity
@Table
@ManyToMany(mappedBy="roles")表示有admin类中的roles属性来维护关系
getRole(){
	return Role;
}


Role类
//t_role_admin 表示role表中的字段 rid
@ManyToMany
//表示两个多对多的表的外键分别是  rid,sid
@JoinTable(name="t_role_admin",JoinColumns={@JoinColumn(name=“rid”)}，inverseJoinColumns={joinColunm（name=“sid”）})
getAdmin(){
	return admin;
}

方法二
Admin类
@Entity	
@Table
@oneToMany(mappedBy="roles")
getRoles(){
	return Roles;
}


Role类
@Entity
@Table
@oneToMany(mappedBy="admin")
@lazyConnection(LazyCollertioption.EXTRA)
getAdmins(){
	return Admins;
}

AdminRole类
@Entity
@Table
@ManyToone(name="rid")
getRole(){
	return Role;
}

@ManyToone(name="Aid")
getAdmin(){
	return Admin;
}
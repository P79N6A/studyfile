@Entity //表明该类是ejb的实体bean
@table(name="t_idCard")//表明对应t_idCard表

//在IdCard中维护关系。需要在getPerson处加入JoinColumn
@OneToOne//在维护关系的字段与对应Column是一对一
@JoinColum(name="pid")//在维护关系的类的get方法上加这个，表明两类间用person的pid来维护关系
public Person getPerson(){
	return Person;
}

//在Person中用mappedBy申明由对方维护关系
@OneToOne(mappedBy="person")
public IdCard getId(){
	return idCard;
}
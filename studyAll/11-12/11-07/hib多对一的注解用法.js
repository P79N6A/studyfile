@Entity
@table(table="tbl_student")
public class Student{
	@ManyToOne(fench="LAZY")
	@JoinClumon(name="cid")
	private Class cla;
}

@Entity
@Table(table="tbl_class")
public class Class{
	@OneToMany(mappedBy="cla")//mappedBY表示由对方的cla来维护表
	@LazyCollection(LazyCollectionOption.EXTRA)//设置查询size用count
	private Student stu;
}

"select stu from Student stu join stu.cid cla where cla.id=2";

"查询属性"
List<Object[]> stu=session
.createQuery("Select stu.id,stu.name,stu.sex,cla.name from Student stu join Class cla").list();

'这个Object做数据传输明显很困难；我们用Dto类解决'
'Dto类'只做数据传输
定义一些包含这些属性的类
public class StudentDto{
	private int sid;
	private String sname;
	private String sex;
	private String cname;
	//构造方法
}

String hql="select new package.StudentDto(stu.id as sid,stu.name as sname,stu.sex as sex,cla.name as cname)"+
	" from Student stu join Class cla";
List<StudentDto> stu=session.createQuery().list();

首先'Method类代表一个方法'，所以'invoke'（调用）就是'调用Method'类'代表的方法'。
它可以让你实现动态调用，例如你可以动态的传入参数。下面是一个简单的例子


'1.getMethod'
返回某个类的'所有公用'（public）'方法'包括其'继承类'的公用方法，当然也包括它所实现'接口'的方法。
public class MethodTest{
    public static void main(String[] args) {
        String [] names ={"tom","tim","allen","alice"};
        //规定方法所在类
        Class<?> clazz = Test.class;
        try{
        	//规定调用的方法  指定所在类 和 方法
            Method method = clazz.getMethod("sayHi", String.class);//初始化method方法
            for(String name:names)
            	//调用方法 指定一个所在类对象
                method.invoke(clazz.newInstance(),name);//method动态调用方法'sayHi'，传参数是name
        } catch (NoSuchMethodException e) {
            e.printStackTrace();
        } catch (IllegalAccessException e){
            e.printStackTrace();
        } catch (IllegalArgumentException e){
            e.printStackTrace();
        } catch (InvocationTargetException e){
            e.printStackTrace();
        } catch (InstantiationException e){
            e.printStackTrace();
        }
    }
}

class Test{
    public void sayHi(String name){
        System.out.println("Hi "+name);
    }
}


'2.getDeclaredMethod'
'对象表示的类'或'接口声明的'所有方法
protected Class<Entity> entityClazz;
protected Method setEnabledFlag;
/**
 * 构造方法
 */
@SuppressWarnings("unchecked")
public BaseDaoImpl() {
	//返回表示此 Class 所表示的实体（类、接口、基本类型或 void）的直接超类的 Type
    Type type = getClass().getGenericSuperclass();
    if (type instanceof ParameterizedType) {
    	//ParameterizedType获取java泛型参数类型
        this.entityClazz = (Class<Entity>) ((ParameterizedType) type).getActualTypeArguments()[0];
        //getActualTypeArguments()返回表示此类型实际类型参数的 Type 对象的数组。[0]就是这个数组中第一个了。。
        //简而言之就是'获得超类的泛型参数'的'实际类型';
    } else {
        this.entityClazz = null;
    }

    if(null!=entityClazz){
        try {
            setEnabledFlag = entityClazz.getDeclaredMethod("setEnabledFlag", String.class);
        } catch (Exception e) {
            
        }
    }
}


public class GenericDAO {
	private Class entityClass;
	protected GenericDAO() {
		Type type = getClass().getGenericSuperclass();
    	Type trueType = ((ParameterizedType) type).getActualTypeArguments()[0];
    	this.entityClass = (Class) trueType;
    }
}


//逻辑删除
public void logicDelete(Entity obj) {
    try {
        setEnabledFlag.invoke(obj, "N");//Entity中必须有setEnabledFlag方法
        getHibernateService().update(obj);
    } catch (Exception e) {
        e.printStackTrace();
    }
}
//


'关于缓存'
//所有ROOT部门
Object obj = cache2Service.get(dept_pix + "0");//根据键，得到缓存
List<FbpDeptsSampleVl> rootDept = null;
if (null == obj) {//缓存空：取根部门，同时将根部门放在缓存中
	rootDept = fbpDeptsDao.getRootDept();
	cache2Service.put(dept_pix + "0", rootDept);
} else {//否则直接取缓存中的部门
	rootDept = (List<FbpDeptsSampleVl>) obj;
}


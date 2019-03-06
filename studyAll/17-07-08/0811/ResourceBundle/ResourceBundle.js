对于java基础很好的人来说，这个应该是简单的不能再简单的了。不过估计一些java新手不一定
会知道（比如我，上次为别人写一个东西，需要从外存读文件来设置对象的值，因为不知道有
ResourceBundle这种东西，就自己用FileReader在那搞，折腾了半天，最后还不能把配置文件
和jar包打在一起发布，郁闷）。

我们可以'在每个对象'中'用ResourceBundle来读配置文件'设置自己的值，'也可以''用一个固定'
的'对象去读取'然后'保存下来以便以后使用'。在'每个class中'都去'读配置文件'会'导致代码散乱'，
所以，只'用一个class'来进行'读取是比较合理的做法'。另外，由于I/O的速度比较慢，
'如果'负责读取配置文件的'class是'在每次'用到这些配置'项的时候'去读文件'，就'容易成为'
'性能上的瓶颈'。为避免这样的情况，可以在'初始化的时候'就把配置项'一次全部读入'，
'并保存在静态成员变量中'。不过'不排除'会'有''对配置项进行动态读取'的'需求'
（因为'某些应用'是'不能停掉'的，比如'应用服务器'。在这些应用运行期间'更新了配置文件'，
就'需要在不不关闭应用'的情况'下重新读入'配置项）。以下的例子'只考虑'了'静态读取'的情况，
如果是'动态读取'，则'可以把''读取配置文件的代码''放到某个方法中'，'通过对某个事件的响应'
来'调用该方法更新配置项'。

假设我们用来'读取配置文件的class叫TestResourceBundle'，配置项的'值来自'一个叫
'property_en.properties的文件'（该文件应该'放到TestResourceBundle所对应的CLASSPATH'
的目录），有'两个值需要配置'：'name和value'。首先，'需要在该class中定义一些字符串常量'，
如下：

public static final String PROPERTIES_FILE_NAME = "property";
public static final String MY_NAME_KEY = "name";
public static final String MY_VALUE_KEY = "value";

其中'PROPERTIES_FILE_NAME'指出了'文件的名字'。实际读取的文件应该是'property_en.properties'，
但是'只需要告诉'ResourceBundle'文件名'是"property"'就足够''了'。下划线和后面的"en"表示
的是'本地化信息'。这里的en代表"ENGLISH"，后缀'properties是默认的'。MY_NAME_KEY
和MY_VALUE_KEY表示配置项在'配置文件中的名字'，用ResourceBundle的'getString方法'
'根据这些名字去读取相应的值'。

然后，定义'需要配置的变量'。这些变量应该是'静态的'：
private static String myName;
private static String myValue;

然后进行静态初始化：
static {
 try {
   ResourceBundle bundle = ResourceBundle
     .getBundle(PROPERTIES_FILE_NAME, Locale.ENGLISH);
   myName = bundle.getString(MY_NAME_KEY).trim();
   myValue = bundle.getString(MY_VALUE_KEY).trim();
 }
 catch(Exception ex) {
   System.err.println(  "[Property]:Can't Load property.properties");
   myName = "default name";
   myValue = "default value";
   System.out.println(  "myName will use the default value: " + myName);
   System.out.println(  "myValue will use the default value: " + myValue);
 }
}
 
ResourceBundle bundle = ResourceBundle
  .getBundle(PROPERTIES_FILE_NAME, Locale.ENGLISH);
'这行代码''初始化了一个ResourceBundle'，'Locale.ENGLISH'用于指明本地化情况，
因此'会从'"property_en.properties"中去'读取配置项'。如果是'Locale.CHINA'，
则会'从property_zh.properties中读取'。这种机制使得程序的本地化变得简单。
 myName = bundle.getString(MY_NAME_KEY).trim();
这行代码'读入配置文件中名为"name"的变量的值'，并'赋给静态变量myName'。
此外这段代码还包含了例外处理，当读取失败的时候，配置项会使用缺省值。
这样，该类就通过ResourceBundle读取外存上的配置文件对数据进行了配置。

property_en.properties文件的内容如下
# properties sample
name=sega
value=100

其中以'#'开头的行为注释，ResourceBundle在遇到这些行的时候会忽略掉。

以下为完整的测试代码：

public class TestResourceBundle {
 public static final String PROPERTIES_FILE_NAME = "property";
 public static final String MY_NAME_KEY = "name";
 public static final String MY_VALUE_KEY = "value";
 
 private static String myName;
 private static String myValue;
 static {
   try {
     ResourceBundle bundle = ResourceBundle
  .getBundle(PROPERTIES_FILE_NAME, Locale.ENGLISH);
     myName = bundle.getString(MY_NAME_KEY).trim();
     myValue = bundle.getString(MY_VALUE_KEY).trim();
   }
   catch(Exception ex) {
  System.err.println(    "[Property]:Can't Load property.properties");
  myName = "default name";
  myValue = "default value";
  System.out.println(    "myName will use the default value: " + myName);
  System.out.println(    "myValue will use the default value: " + myValue);
   }
 }
 
 public void print() {
  System.out.println("My name is: " + myName);
  System.out.println("My value is: " + myValue);
 }
 public static void main(String[] args) {
  TestResourceBundle test = new TestResourceBundle();
  test.print();
 }
}
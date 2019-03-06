一、'编程规约'
(一)'命名规约'
1. 【强制】代码中的'命名'均'不能以下划线'或'美元符号'开始，也'不能以下划线'或'美元符号结束'。 
反例： _name / __name / $Object / name_ / name$ / Object$

2. 【强制】代码中的'命名严禁'使'用拼音'与'英文混合'的方式，更不允许直接使用中文的方式。 
说明：'正确的英文拼写'和'语法'可以'让阅读者''易于理解'，'避免歧义'。注意，即使纯拼音命名方式 也要避免采用。 
反例： DaZhePromotion [打折] / getPingfenByName() [评分] / int 某变量 = 3 
正例： 'alibaba / taobao / youku / hangzhou' 等'国际通用的名称'，可'视同英文'。

3. 【强制】'类名使用 UpperCamelCase 风格'，必须遵从'驼峰形式'，
但'以下情形例外'：（领域模型 的相关命名）'DO / BO / DTO / VO' 等。 
正例：'MarcoPolo / UserDO / XmlService / TcpUdpDeal / TaPromotion'
反例：macroPolo / UserDo / XMLService / TCPUDPDeal / TAPromotion 

4. 【强制】'方法名'、'参数名'、'成员变量'、'局部变量'都统一使'用 lowerCamelCase 风格'，必须遵从驼峰形式。 
正例： 'localValue / getHttpMessage() / inputUserId' 

5. 【强制】'常量命名全部大写'，'单词间用下划线隔开'，力求语义表达完整清楚，'不要嫌名字长'。
 正例： 'MAX_STOCK_COUNT' 
 反例： MAX_COUNT 
 
6. 【强制】'抽象类'命名'使用 Abstract' '或' 'Base' '开头'；'异常类'命名使'用' 'Exception' '结尾'；
'测试类' 命名以它要测试的类的名称开始，'以' 'Test' '结尾'。 

7. 【强制】'中括号'是'数组类型'的'一部分'，'数组定义'如下：'String[] args'; 
反例：请勿使用 String args[]的方式来定义。 
                                           
8. 【强制】'POJO 类'中'布尔类型'的变量，都'不要加 is'，否则'部分框架'解析会'引起序列化错误'。 
反例：定义为基本数据类型 boolean isSuccess；的属性，它的方法也是 isSuccess()，
'RPC 框架'在'反向解析'的时候，'“以为”对应的属性名称''是 success'，'导致属性获取不到'，进而抛出异常。

9. 【强制】'包名'统一使用'小写'，'点分隔符'之间有且'仅有一个自然语义'的'英语单词'。
'包名统一使用 单数'形式，但是'类名如果有复数'含义，'类名''可'以使'用复数形式'。 
正例： 应用工具类包名为 'com.alibaba.open.util'、'类名为 MessageUtils'（此规则参考 spring 的框架结构）

10. 【强制】'杜绝完全不规范'的'缩写'，避免望文不知义。 
反例：'AbstractClass'“缩写”命名成 AbsClass；condition“缩写”命名成 condi，
此类 '随意缩写'严重'降低了代码'的'可阅读性'。

11. 【推荐】'如果'使'用到'了'设计模式'，建议'在类名中''体现出具体模式'。 
说明：将'设计模式'体现在名字中，'有利于阅读者'快速'理解架构设计思想'。 
正例：	public class OrderFactory;
		public class LoginProxy;
		public class ResourceObserver; 

12. 【推荐】'接口类'中的'方法和属性''不要加'任何'修饰符号'（public 也不要加），
保持代码的简洁 性，并'加上有效'的'Javadoc注释'。
尽量'不要在接口'里'定义变量'，如果'一定要定义'变量，肯定'是与接口方法相关'，并且'是整个应用的基础常量'。 
正例：接口方法签名：void f();     
	  接口基础常量表示：String COMPANY = "alibaba"; 
反例：接口方法定义：public abstract void f(); 
说明：'JDK8' 中'接口允许'有'默认实现'，那么这个'default'方法，'是对所有实现类''都有'价值的'默认实现'。 

13. '接口和实现类'的'命名有两套规则'： 
1）【强制】对于'Service和DAO类'，基于SOA的理念，'暴露出来的服务一定是接口'，'内部的实现类用Impl'的'后缀与接口区别'。
正例：'CacheServiceImpl' '实现' 'CacheService' 接口。  
2）【推荐】如果是'形容能力的接口名称'，'取对应'的'形容词做接口名'（通常是–able 的形式）。 
正例：'AbstractTranslator' '实现' 'Translatable'。 
 
14. 【参考】'枚举类'名建议'带上Enum后缀'，枚举'成员名称'需要'全大写'，'单词间'用'下划线隔开'。 
说明：'枚举'其实就'是特殊的常量类'，且'构造方法'被'默认'强制是'私有'。 
正例：枚举名字：'DealStatusEnum'，成员名称：'SUCCESS / UNKOWN_REASON'。 
 
15. 【参考】各层命名规约：  
A) 'Service/DAO' 层方法命名'规约'  
1） '获取单个对象'的方法用'get 做前缀'。   
2） '获取多个对象'的方法用'list 做前缀'。    
3） '获取统计值'的方法用'count 做前缀'。   
4） '插入的方法'用'save'（推荐）或 insert 做前缀。   
5） '删除的方法'用'remove'（推荐）或 delete 做前缀。    
6） '修改的方法'用'update' 做前缀。 

B) '领域模型'命名'规约'   
1） '数据对象'：'xxxDO'，'xxx' 即'为数据表名'。    
2） 数据'传输对象'：'xxxDTO'，'xxx' 为'业务领域相关的名称'。   
3） '展示对象'：'xxxVO'，'xxx' 一般'为网页名称'。    
4） 'POJO' 是 'DO/DTO/BO/VO' 的'统称'，'禁止命名成' 'xxxPOJO'。 

(二) '常量定义'
1. 【强制】'不允许''出现'任何'魔法值'（即未经定义的常量）'直接出现在代码中'。  
反例： String key="Id#taobao_"+tradeId；         cache.put(key, value); 

2. 【强制】'long' 或者'Long初始赋值'时，'必须使用大写的L'，不能是小写的 l，小写容易跟数字 1 混淆，造成误解。 
说明：Long a = 2l; 写的是数字的 21，还是 Long 型的 2? 
		
3. 【推荐】'不要使用一个常量类''维护所有常量'，应该'按常量功能'进行'归类，分开维护'。
如：'缓存相关'的'常量放在类'：'CacheConsts' 下；'系统配置相关的常量'放在类：'ConfigConsts' 下。 
说明：大而全的常量类，非得使用查找功能才能定位到修改的常量，不利于理解和维护。 

4. 【推荐】'常量的复用层次'有'五层'：'跨应用''共享'常量、'应用内''共享'常量、'子工程'内'共享'常量、
'包内共享'常量、'类内共享'常量。  
1） '跨应用共享'常量：'放置在二方库'中，通常是 client.jar 中的 constant 目录下。  
2） '应用内共享'常量：'放置在一方库'的 modules 中的 constant 目录下。   
反例：易懂变量也要统一定义成应用内共享常量，两位攻城师在两个类中分别定义了 表示“是”的变量：    
类 A 中：
	public static final String YES = "yes";     
类 B 中：
	public static final String YES = "y";    
A.YES.equals(B.YES)，预期是 true，
但实际返回为 false，导致产生线上问题。 
 3） '子工程内部共享常量'：即在'当前子工程的 constant 目录下'。  
 4） '包内共享'常量：即'在当前包'下'单独的 constant 目录下'。 
 5） '类内共享'常量：'直接在类内部' private static final '定义'。 
 
5. 【推荐】如果'变量值''仅在一个范围内变化''用 Enum 类'。
说明： 如果'存在名称之外'的'延伸属性''应使用 enum 类型'，下面正例中的'数字就是延伸信息'，
'表示一年中'的'第几个季节'。
正例：
public enum SeasonEnum {
	SPRING(1), SUMMER(2), AUTUMN(3), WINTER(4);
	private int seq;
	SeasonEnum(int seq){
		this.seq = seq;
	}
}

(三) '格式规约'
1. 【强制】'大括号'的'使用约定'。如果是'大括号内为空'，则'简洁地写成{}'即可，'不需要换行'；
如果是'非空代码块'则： 
1） '左大括号前不换行'。 
2） '左大括号后换行'。 
3） '右大括号前换行'。  
4） '右大括号后还有 else 等代码则不换行'；表示'终止右大括号后必须换行'。 

2. 【强制】 '左括号'和'后一个字符'之间'不出现空格'；同样，'右括号'和'前一个字符'之间也'不出现空 格'。
详见第 5 条下方正例提示。 

3. 【强制】'if/for/while/switch/do' 等'保留字'与'左右括号之间''都必须加空格'。 

4. 【强制】'任何运算符''左右''必须加'一个'空格'。 
说明：运算符包括赋值运算符=、逻辑运算符&&、加减乘除符号、三目运行符等。 

5. 【强制】'缩进采用 4 个空格'，'禁止使用 tab 字符'。

说明：如果使用 tab 缩进，必须设置 1 个 tab 为 4 个空格。IDEA 设置 tab 为 4 个空格时， 
请勿勾选 Use tab character；而在 eclipse 中，必须勾选 insert spaces for tabs。 

正例： （涉及 1-5 点） 
public static void main(String args[]) {
	// 缩进 4 个空格
	String say = "hello";
	// 运算符的左右必须有一个空格
	int flag = 0;
	// 关键词 if 与括号之间必须有一个空格，括号内的 f 与左括号，0 与右括号不需要空格
	if (flag == 0) {
		System.out.println(say);
	}
	// 左大括号前加空格且不换行；左大括号后换行
	if (flag == 1) {
		System.out.println("world");
		// 右大括号前换行，右大括号后有 else，不用换行
	} else {
		System.out.println("ok");
		// 在右大括号后直接结束，则必须换行
	}
}

6. 【强制】'单行字符数限制不超过 120 个'，'超出需要换行'，'换行时''遵循如下原则：'  
1） '第二行''相对第一行''缩进 4 个空格'，从'第三行开始'，'不再继续缩进'，参考示例。 
2） '运算符''与下文''一起换行'。 
3） '方法调用的点符号''与下文一起换行'。  
4） '在多个参数超长'，'逗号后进行换行'。 
5） '在括号前不要换行'，见反例。

正例： 
StringBuffer sb = new StringBuffer();  
//超过 120 个字符的情况下，换行缩进 4 个空格，并且方法前的点符号一起换行  
sb.append("zi").append("xin")...    
	.append("huang")...  
	.append("huang")...  
	.append("huang");  

反例： 
StringBuffer sb = new StringBuffer();  
//超过 120 个字符的情况下，不要在括号前换行 
sb.append("zi").append("xin")...append      
	("huang");   
//参数很多的方法调用可能超过 120 个字符，不要在逗号前换行 
method(args1, args2, args3, ...      
		, argsX);

7. 【强制】方法'参数在定义'和'传入时'，'多个参数逗号'后边'必须加空格'。 
正例：'下例中''实参的"a"','后边必须'要'有一个空格'。 
	method("a", "b", "c");  

8. 【强制】'IDE' 的 'text file encoding' '设置为 UTF-8'; 
'IDE 中''文件的换行符''使用 Unix 格式'， 不要使用 windows 格式。 

9. 【推荐】没有必要增加若干空格来使某一行的字符与上一行的相应字符对齐。 
正例： 
int a = 3;  
long b = 4L;  
float c = 5F;  
StringBuffer sb = new StringBuffer();  
说明：增加 sb 这个变量，如果需要对齐，则给 a、b、c 都要增加几个空格，
在变量比较多的 情况下，是一种累赘的事情。 
 
10. 【推荐】方法体内的执行语句组、变量的定义语句组、不同的业务逻辑之间或者不同的语义 之间插入一个空行。
相同业务逻辑和语义之间不需要插入空行。 说明：没有必要插入多行空格进行隔开



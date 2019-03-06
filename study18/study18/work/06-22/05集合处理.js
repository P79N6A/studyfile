1. 【强制】关于'hashCode和equals'的处理，遵循如下规则：
1）'只要重写 equals'，就'必须重写 hashCode'。
2）因为'Set''存储的是''不重复'的'对象'，'依据hashCode 和 equals'进行'判断'，
所以'Set''存储'的'对象'必'须重写'这'两个方法'。
3）如果'自定义对象''作为Map的键'，那么'必须重写hashCode和equals'。
说明：'String' '重写'了 'hashCode 和 equals' 方法，所以'我们可以'非常'愉快地使用 String 对象'
'作为key来使用'。

2. 【强制】'ArrayList的subList结果''不可强转成ArrayList'，否则'会抛出' 'ClassCastException'
异常， 即 java.util.RandomAccessSubList cannot be cast to java.util.ArrayList。
说明：'subList' '返回'的是'ArrayList'的'内部类 SubList'，并'不是 ArrayList 而是 ArrayList'
'的'一个'视图'，对于'SubList''子列表'的所有操作'最终会反映到原列表上'。

3. 【强制】'在subList场景中'， 高度'注意对原集合元素'的'增加或删除'， '均会导致''子列表'的'遍历'、
'增加'、'删除''产生 ConcurrentModificationException' 异常。

4. 【强制】'使用集合''转数组''的方法'，'必须使用集合的' 'toArray(T[] array)'，'传入'的是'类型完全'
'一样的数组'，'大小就是 list.size()'。
说明： 使用 'toArray 带参方法'，'入参分配'的'数组空间不够大'时， 'toArray' '方法内部''将重新分配'
'内存空间'，并'返回新数组地址'； 如果'数组元素个数''大于实际所需'，'下标为''[list.size()]'
的'数组元素将被置为' null，'其它数组元素''保持原值'，因此'最好''将方法入参'数组大小'定义'
'与集合元素''个数一致'。
正例：
	List<String> list = new ArrayList<String>(2);
	list.add("guan");
	list.add("bao");
	String[] array = new String[list.size()];
	array = list.toArray(array);
反例： '直接使用 toArray' '无参方法'存在问题，'此方法返回值''只能是 Object[]类'，若'强转'其它
类型数组'将出现 ClassCastException 错误'。

5. 【强制】'使用工具类' 'Arrays.asList()'把'数组转换成集合'时，'不能使用'其'修改集合'
'相关的方法'， '它的add/remove/clear' 方法'会抛出' 'UnsupportedOperationException' 异常。
说明：'asList'的返回'对象是'一个'Arrays内部类'，并'没有实现''集合'的'修改方法'。
Arrays.asList'体现的是''适配器模式'，只'是转换接口'，'后台的数据'仍'是数组'。
String[] str = new String[] {"you","wu"};
List list = Arrays.asList(str);
第一种情况： 'list.add("yangguanbao")'; 运行时异常。
第二种情况： 'str[0] = "gujin"'; 那么' list.get(0)也会随之修改'。

6. 【强制】 '泛型通配符 '<? extends T>来 '接收返回的数据 '，'此写法'的'泛型集合''不能使用 add 方法'， 
'而<? super T>''不能使用 get 方法'，'作为接口调用赋值时''易出错'。
说明： 扩展说一下 PECS(Producer Extends Consumer Super)原则： '第一'、 '频繁往外读取'内
容的，适合'用<? extends T>'。 第二、 '经常往里插入'的，适合'用<? super T>'。
		
7. 【强制】'不要在 foreach 循环'里'进行元素'的'remove/add''操作'。
'remove'元素请'使用 Iterator方式'，如果'并发操作'，需要'对 Iterator 对象加锁'。
正例：
List<String> list = new ArrayList<>();
list.add("1");
list.add("2");
Iterator<String> iterator = list.iterator();
while (iterator.hasNext()) {
	String item = iterator.next();
	if (删除元素的条件) {
		iterator.remove();
	}
}

反例：
for (String item : list) {
	if ("1".equals(item)) {
		list.remove(item);
	}
}

说明：以上代码的执行结果肯定会出乎大家的意料，那么试一下把“1”换成“2”，会是同样的
结果吗？

8. 【强制】 在 'JDK7版本及以上'， 'Comparator' '实现类''要满足'如下'三个条件'，
'不然 Arrays.sort'，'Collections.sort' 会'报 IllegalArgumentException 异常'。
说明： 三个条件如下
1） 'x， y' 的'比较结果''和 y， x '的'比较结果相反'。
2） 'x>y'， 'y>z'， '则 x>z'。
3） 'x=y'， '则 x， z 比较结果'和 'y， z 比较结果相同'。
反例： 下例中没有处理相等的情况，实际使用中可能会出现异常：
new Comparator<Student>() {
	@Override
	public int compare(Student o1, Student o2) {
		return o1.getId() > o2.getId() ? 1 : -1;
	}
};

9. 【推荐】'集合泛型定义'时， 在'JDK7及以上'，'使用diamond' 语法'或全省略'。
说明： '菱形泛型'，即 'diamond'， '直接使用<>'来'指代'前边'已经指定的类型'。
正例：
// <> diamond 方式
HashMap<String, String> userCache = new HashMap<>(16);
// 全省略方式
ArrayList<User> users = new ArrayList(10);

10. 【推荐】'集合初始化'时，'指定集合''初始值大小'。
说明：'HashMap'使'用 HashMap(int initialCapacity)' '初始化'。
正例：'initialCapacity' = (需要存储的'元素个数 / 负载因子') + 1。'注意负载因子'
（即 loaderfactor） '默认为0.75'， 如果'暂时无法确定初始值大小'，请'设置为16'（即默认值） 。

反例：'HashMap 需要放置 1024 个元素'， 由于'没有设置容量'初始大小，随着'元素不断增加'，
'容量7次被迫扩大'， resize'需要重建hash表'，'严重影响性能'。

11. 【推荐】'使用entrySet''遍历Map类集合KV'，而'不是keySet'方式'进行遍历'。
说明：'keySet'其实是'遍历了2次'，'一次'是'转为Iterator对象'，'另一次'是'从hashMap'
中'取出key'所'对应的value'。而'entrySet只'是'遍历了一次''就把key' 和 'value' '都放到了entry中'，
效率更高。'如果是 JDK8'，使'用 Map.foreach 方法'。
正例：'values()'返回的'是V值集合'，'是'一个'list集合对象'；'keySet()''返回'的是'K值集合'，
'是'一个'Set集合对象'；'entrySet()''返回'的是 'K-V' '值组合集合'。

12.【推荐】'高度注意''Map类集合' 'K/V' 能'不能存储 null' 值'的情况'，如下表格：
集合类				Key			  Value			Super		说明
Hashtable 		  不允许为 null 不允许为 null   Dictionary  线程安全
ConcurrentHashMap 不允许为 null 不允许为 null   AbstractMap 锁分段技术（JDK8:CAS）
TreeMap           不允许为 null   允许为 null   AbstractMap 线程不安全
HashMap             允许为 null   允许为 null   AbstractMap 线程不安全
反例： '由于HashMap'的'干扰'，'很多人认为''ConcurrentHashMap'是'可以置入 null 值'，而事实上，
'存储 null 值'时会'抛出 NPE 异常'。

13.【参考】'合理利用好''集合'的'有序性'(sort)和'稳定性'(order)，'避免集合'的'无序性'(unsort)和
'不稳定性'(unorder)'带来的负面影响'。
说明：'有序性'是'指遍历的结果'是'按某种比较规则''依次排列'的。'稳定性'指'集合每次遍历'
的'元素次序''是一定的'。如：'ArrayList 是 order/unsort'；'HashMap 是 unorder/unsort'；
'TreeSet 是order/sort'。

14.【参考】利用'Set元素''唯一的特性'，可以'快速''对一个集合'进行'去重操作'，'避免使用List的'
'contains方法进行遍历、对比、去重操作'。

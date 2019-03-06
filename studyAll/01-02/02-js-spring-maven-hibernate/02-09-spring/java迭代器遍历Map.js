先获取map的key
再调用map的get(key)方法
Iterator<Object>it =a.keySet().iterator();
while(it.hasNext()){
	Object o=it.next();
	String s=a.get(o);
	System.out.println(s);
}
'beanfactory装配bean'  
'bean''不会马上实例化'，'使用时'才会'实例化'，'节约内存'，'速度慢'

'applicationContext装配bean' 
'运用与否'都'作为singleton'实例'加载过了'，速度块，耗内存

选择applicationContext

'获取applicationContext对象的方法'获取
1.classPathXmlApplicationContext
2.filesystemXmlApplicationContext(数据路径);
FileSystemXmlApplicationContext("//JAVAWORKSPACE//spring//src//applicationContext.xml");

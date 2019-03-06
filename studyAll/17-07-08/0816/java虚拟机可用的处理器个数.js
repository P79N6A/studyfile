要显示java虚拟机可用的处理器个数，可以通过Runtime类的availableProcessors()方法得到。
要获得Runtime类的实例，需要调用其静态方法getRuntime(),如下例所示：

int processors = Runtime.getRuntime().availableProcessors();
service = Executors.newFixedThreadPool(processors);

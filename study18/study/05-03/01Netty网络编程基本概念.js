特别感谢老王的博客，地址https://blog.csdn.net/haoyuyang/article/list/1?
其他参考 https://blog.csdn.net/erlang_hell/article/details/52071192

https://blog.csdn.net/haoyuyang/article/details/53231585
1.阻塞IO—Socket
Socket又称'套接字'，应用'程序'通常'通过“套接字”'向网络'发'出'请求'或'应答'网络'请求'。

'Socket和ServerSocket类'库'位于java.net'包中。'ServerSocket用于''服务器端'，
'Socket'是'建立'网络'连接'时使用的。在连接'成功时'，应用程序'两端'都会'产生'一个
Socket'实例'，'操作'这个'实例'，'完成'所需的'会话'。对于一个网络连接来说，套接字
是平等的，不会因为在服务器端或在客户端而产生不同的级别。不管是
ServerSocket还是Socket，它们的工作都是通过SocketImpl类及其子类完成的。

'套接字'的'连接过程'可以'分为四'个'步'骤：'服务器监听'、'客户端请求'服务器、'服务器'端
'连接确认'、'客户端连接确认'并'进行通信'。

（1）'服务器监听'：服务器端套接字并'不定位具体'的客户端'套接字'，而是'处于等待'
'连接'的'状态'，实时监控网络状态。

（2）'客户端请求'：客户端的'套接字提出'连接'请求'，要连接的'目标'是'服务器端'的'套接字'。
为此，'客户端的套接字'必须首先'描述'要连接的'服务器端'的'套接字'，'指出服务器端'的
'套接字'的'地址和端口号'，然后'向服务器'端'套接字''提出'连接'请求'。

（3）'服务器'端'连接确认'：当'服务器端'的套接字'监听到'或者说接收到'客户端套接字'的
'连接请求'，它'就响应'客户端套接字的请求，'建立'一个'新的线程'，把'服务器'端'套接字'的
'描述''发'送'给客户端'。

（4）'客户'端'连接确认'：一旦'客户端确认'了此描述，'连接就建立好了'，双方开始通信。
而'服务器'端'套接字'继续'处于监听状态'，继续'接收其他客户端''套接字'的'连接请求'。

借用一下网上的Socket通信模型图片：



Socket通信步骤：
①'创建''ServerSocket'和'Socket'

②'打开'连接到'Socket的输入/输出流'

③'按照协议'对Socket进行'读写操作'

④'关闭'输入输出'流'、'关闭Socket'

服务器端：
①'创建ServerSocket'对象，'绑定监听端口'

②'通过accept()'方法'监听客户端请求'

③'建立连接后'，通过'输入流''读取'客户端发送的'请求信息'

④通过'输出流'向客户端'发送响应信息'

⑤'关闭'相关'资源'

客户端：
①'创建Socket'对象，'指明'需要连接的'服务器'的'地址'和'端口号'

②'连接建立'后，通过'输出流'向服务器端'发送请求'信息

③通过'输入流''获取'服务器'响应'信息

④'关闭响应'资源

下面看一个简单的小例子：

'服务器端''响应工具类'：
public class ServerHandler implements Runnable {

    private Socket socket;

    public ServerHandler(Socket socket) {
        this.socket = socket;
    }

    @Override
    public void run() {
        BufferedReader bufferedReader = null;
        PrintWriter printWriter = null;
        try {
            bufferedReader = new BufferedReader(new InputStreamReader(socket.getInputStream()));
            printWriter = new PrintWriter(socket.getOutputStream(), true);

            while (true) {
                String info = bufferedReader.readLine();
                if(info == null)
                    break;
                System.out.println("客户端发送的消息：" + info);
                printWriter.println("服务器端响应了客户端请求....");
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if(bufferedReader != null){
                try {
                    bufferedReader.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
            if(printWriter != null){
                try {
                    printWriter.close();
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
            if(socket != null){
                try {
                    socket.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
            socket = null;
        }
    }
}

'服务器'端：
public class Server {
    private static int PORT = 8379;
    public static void main(String[] args) {
        ServerSocket serverSocket = null;
        try {
            serverSocket = new ServerSocket(PORT);
            System.out.println("服务器端启动了....");
            //进行阻塞
            Socket socket = serverSocket.accept();
            //启动一个线程来处理客户端请求
            new Thread(new ServerHandler(socket)).start();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if(serverSocket != null){
                try {
                    serverSocket.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
            serverSocket = null;
        }
    }
}

客户端：
public class Client {
    private static int PORT = 8379;
    private static String IP = "127.0.0.1";

    public static void main(String[] args) {
        BufferedReader bufferedReader = null;
        PrintWriter printWriter = null;
        Socket socket = null;
        try {
            socket = new Socket(IP, PORT);
            printWriter = new PrintWriter(socket.getOutputStream(), true);
            bufferedReader = new BufferedReader(new InputStreamReader(socket.getInputStream()));

            printWriter.println("客户端请求了服务器....");
            String response = bufferedReader.readLine();
            System.out.println("Client：" + response);
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if(bufferedReader != null){
                try {
                    bufferedReader.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
            if(printWriter != null){
                try {
                    printWriter.close();
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
            if(socket != null){
                try {
                    socket.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            } else {
                socket = null;
            }
        }
    }
}

以上的代码有个问题，就是'每次'有'客户端请求'服务器端'都会创建'一个'线程'，
当'线程过多时'，服务器端可能'会宕机'。解决这个问题，可以'使用'JDK提供的
'线程池'（伪异步）。'其它地方'都'不变'，将服务器端的代码修改成如下即可：
public class Server {
    private static int PORT = 8379;
    public static void main(String[] args) {
        ServerSocket serverSocket = null;
        try {
            serverSocket = new ServerSocket(PORT);
            System.out.println("服务器端启动了....");
            //进行阻塞
            Socket socket = null;
            //启动一个线程来处理客户端请求
            //new Thread(new ServerHandler(socket)).start();
            HandlerExecutorPool pool = new HandlerExecutorPool(50, 1000);
            while (true) {
                socket = serverSocket.accept();
                pool.execute(new ServerHandler(socket));
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if(serverSocket != null){
                try {
                    serverSocket.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
            serverSocket = null;
        }
    }
}

其中HandlerExecutorPool为'自定义的线程池'，代码如下：
public class HandlerExecutorPool {

    private ExecutorService executor;

    public HandlerExecutorPool(int maxSize, int queueSize) {
        this.executor = new ThreadPoolExecutor(Runtime.getRuntime().availableProcessors(), maxSize, 120L, TimeUnit.SECONDS,new ArrayBlockingQueue<>(queueSize));
    }

    public void execute(Runnable task) {
        executor.execute(task);
    }
}

2.IO（BIO）与NIO的区别
其本质就是'阻塞'和'非阻塞'的区别。

'阻塞'概念：应用程序在'获取'网络'数据'的时候，如果网络'传输'数据很'慢'，那么
程序'就'一直'等着'，直'到传输完毕''为止'。

非阻塞概念：应用程序直接可以获取已经准备就绪的数据，无需等待。

'IO'为'同步阻塞'形式，'NIO'为'同步非阻塞'形式。NIO没有实现异步，在'JDK1.7'之'后'，
升级了NIO库包，'支持异步非阻塞'通信模型，即NIO2.0(AIO)。

同步和异步：同步和异步一般是面向操作系统与应用程序对IO操作的层面上来
区别的。①'同步'时，应用程序会'直接参与IO读写'操作，并且'应用程序'会直接'阻塞'
'到某一'个'方法'上，直到'数据'准备'就绪'（BIO）；'或'者'采用轮询'的策略实时'检查'
'数据'的'就绪状态'，如果'就绪则''获取数据'（NIO）。②'异步'时，则'所有的IO''读写'
操作都'交给操作系统'处理，'与应用程序''没有'直接'关系'，应用'程序'并'不关心'IO'读写'，
当'操作系统''完成'IO读写操作'时'，会向应用程序'发出通知'，应用程序'直接获取数据''即可'。

'同步'说的'是Server服务端'的'执行方式'，'阻塞'说的'是'具体的'技术'，接收数据的方式、状态（io、nio）。

3.NIO编程介绍
学习'NIO编程'，首先需要了解几个概念：

（1）'Buffer（缓冲区）'

'Buffer''是'一个'对象'，它包'含一些'需要'写入'或者'读取的数据'。在'NIO类库'中'加入'
'Buffer'对象，体现了新类库与原IO的一个重要区别。'在面向流'的'IO中'，'可'以
'直接'将数据'写入'或'读取到Stream对象'中。在'NIO类库'中，所有的'数据都是'用
'缓冲区处理'的（读写）。 '缓冲区'实质上是一个数组，通常它'是一个字节'
'数组'（ByteBuffer），也可以使用其他类型的数组。这个数组'为缓冲区提供'
了访问数据的'读写等操作'属性，如位置、容量、上限等概念，具体的可以参考API文档。

'Buffer类型'：最'常使用'的是'ByteBuffer'，实际上'每一种'java'基本类型'都'对应了一种缓存区'（'除了Boolean类型'）。

①ByteBuffer
②CharBuffer
③ShortBuffer
④IntBuffer
⑤LongBuffer
⑥FloatBuffer
⑦DoubleBuffer

（2）Channel（管道、通道）

'Channel'就'像'自来水'管道一样'，网络数据'通过Channel读取'和'写入'，通道'与流'的'不同'
之处'在于''通道'是'双向'的，而'流只能'在'一个方向'上'移动'（一个'流'必'须是InputStream'
或者'OutputStream'的'子类'），'而通道可'以'用于读、写''或'者二者'同时进行'，最关键的
是'可以和''多路复用器''集合'起来，有'多种'的'状态位'，'方便'多路复用器去'识别'。通道分
为'两大类'：'一'类是用于网络读写的'SelectableChannel'，'另一'类是用于文件操作的
'FileChannel'，我们使用的'SocketChannel'和'ServerSocketChannel'
都'是SelectableChannel的子类'。


（3）Selector（选择器、多路复用器）

是NIO编程的基础，非常重要。'多路复用器'提供'选择'已经'就绪的任务'的'能力'。
简单说，就是'Selector'会'不断的轮询'注册在其上的'通道'（Channel），如果'某个'
'通道''发生'了'读写操作'，这个'通道'就'处于''就绪状态'，会'被'Selector'轮询出来'，
然后'通过SelectionKey'可以'取得就绪'的'Channel集合'，从而'进行后续'的'IO操作'。
一个'多路复用器'（Selector）'可'以'负责成千上万'的'通道'（Channel），没有上限。
这也是JDK使用了epoll代替传统的select实现，获得连接句柄（客户端）没有限制。
那也就意味着我们'只要一个线程'负责'Selector'的'轮询'，就'可以接入成千上万'个'客户端'，
这是JDK NIO库的巨大进步。

'Selector线程''类似'一个'管理者'（Master），管理了成千上万个管道，然后'轮询'哪个
管道的数据'已经准备好了'，'通知CPU执行''IO'的'读'取或'写'入操作。

'Selector模式'：当'IO事件'（管道）'注册到选择器'以后，'Selector'会'分配给每个管道'
一个'key值'，相当于标签。Selector选择器是'以轮询的方式'进行'查找注册'的'所有IO'
事件（管道），'当IO事件'（管道）准备'就绪后'，'Selector'就'会识别'，会'通过key'值
来'找到相应'的'管道'，'进行'相关的'数据处理'操作（从管道中读取或写入数据，
写到缓冲区中）。'每个管道'都会'对选择器'进行注册'不同'的事件'状态'，以'便选择器查找'。

事件状态：

SelectionKey.OP_CONNECT

SelectionKey.OP_ACCEPT

SelectionKey.OP_READ

SelectionKey.OP_WRITE

NIO通信模型图解：
(见页面)

下面用'代码'来'演示'一下'Buffer'、'Channel'、'Selector'的使用。

以'IntBuffer为例'，'讲解'一下'Buffer的常用API'：
public class IntBufferTest {
    public static void main(String[] args) {
        //1、基本操作
        //创建指定长度的缓冲区
        /*IntBuffer buffer = IntBuffer.allocate(10);
        buffer.put(11); //position位置：0->1
        buffer.put(5); //position位置：1->2
        buffer.put(32); //position位置：2->3
        System.out.println("未调用flip复位方法前的buffer：" + buffer);
        //把位置复位为0，也就是position位置由3->0
        buffer.flip();
        //比较未调用flip方法和调用之后buffer的limit可以发现，不进行复位操作的话，position的值为3，limit的值为10
        // 因为缓冲区中已有11、5、32三个元素，也就意味着put()方法会使position向后递增1
        System.out.println("调用flip复位方法后的buffer：" + buffer);
        System.out.println("buffer容量为：" + buffer.capacity());
        System.out.println("buffer限制为：" + buffer.limit());
        System.out.println("获取下标为1的元素：" + buffer.get(1));
        System.out.println("调用get(index)方法后的buffer：" + buffer); //调用get(index)方法，不会改变position的值
        buffer.put(1, 4); //将buffer位置为1的值替换为4，调用put(index，value)不会改变position的值
        System.out.println("调用put(index, value)方法后的buffer：" + buffer);

        for(int i=0; i<buffer.limit(); i++) {
            //调用get方法会使缓冲区的位置(position)向后递增一位
            System.out.print(buffer.get() + "\t");
        }
        System.out.println("\nbuffer对象遍历之后buffer为：" + buffer);*/


        //2、wrap方法的使用
        /*int[] arr = new int[]{1, 2, 3};
        IntBuffer buffer = IntBuffer.wrap(arr);
        System.out.println("wrap(arr)方法：" + buffer);
        //IntBuffer.wrap(array, postion, length)表示容量为array的长度，但是可操作的元素为位置postion到length的数组元素
        buffer = IntBuffer.wrap(arr, 0, 2);
        System.out.println("wrap(arr, 0, 2)：" + buffer);*/

        //3、其他方法
        IntBuffer buffer = IntBuffer.allocate(10);
        int[] arr = new int[]{1, 2, 3};
        buffer.put(arr);
        System.out.println("调用put(arr)方法后的buffer：" + buffer);
        //一种复制方法，buffer1的pos、lim、cap与buffer的一样
        IntBuffer buffer1 = buffer.duplicate();
        System.out.println("buffer1：" + buffer1);

        buffer.position(1); //将buffer的position设置为1，不建议使用。功能相当于flip()方法，但是从运行结果可以看出，lim依然等于10
        System.out.println("调用position()方法后的buffer：" + buffer);
        System.out.println("buffer的可读数据量：" + buffer.remaining()); //计算出从pos到lim的长度
        int[] arr1 = new int[buffer.remaining()];
        //将缓冲区的数据放入arr1中
        buffer.get(arr1);
        for(Integer i : arr1) {
            System.out.print(Integer.toString(i) + ",");
        }
        System.out.println();

        //比较flip()方法和position(index)方法的区别
        buffer1.flip();
        System.out.println("buffer1的可读数量：" + buffer1.remaining());
        arr1 = new int[buffer1.remaining()];
        buffer1.get(arr1);
        for(Integer i : arr1) {
            System.out.print(Integer.toString(i) + ",");
        }
    }
}


接下来是'Buffer、Channel、Selector'的一个'入门的小例子'：
Server端：
public class Server implements Runnable {

    private Selector selector;
    private ByteBuffer buffer = ByteBuffer.allocate(1024);

    public Server(int port) {
        try {
            //1 打开多复用器
            selector = Selector.open();
            //2 打开服务器通道
            ServerSocketChannel ssc = ServerSocketChannel.open();
            //3 设置服务器通道为非阻塞方式
            ssc.configureBlocking(false);
            //4 绑定地址
            ssc.bind(new InetSocketAddress(port));
            //5 把服务器通道注册到多路复用选择器上，并监听阻塞状态
            ssc.register(selector, SelectionKey.OP_ACCEPT);
            System.out.println("Server start, port：" + port);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @Override
    public void run() {
        while (true) {
            try {
                //1 必须让多路复用选择器开始监听
                selector.select();
                //2 返回所有已经注册到多路复用选择器上的通道的SelectionKey
                Iterator<SelectionKey> keys = selector.selectedKeys().iterator();
                //3 遍历keys
                while (keys.hasNext()) {
                    SelectionKey key = keys.next();
                    keys.remove();
                    if(key.isValid()) { //如果key的状态是有效的
                        if(key.isAcceptable()) { //如果key是阻塞状态，则调用accept()方法
                            accept(key);
                        }
                        if(key.isReadable()) { //如果key是可读状态，则调用read()方法
                            read(key);
                        }
                    }
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    private void accept(SelectionKey key) {
        try {
            //1 获取服务器通道
            ServerSocketChannel ssc = (ServerSocketChannel) key.channel();
            //2 执行阻塞方法
            SocketChannel sc = ssc.accept();
            //3 设置阻塞模式为非阻塞
            sc.configureBlocking(false);
            //4 注册到多路复用选择器上，并设置读取标识
            sc.register(selector, SelectionKey.OP_READ);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private void read(SelectionKey key) {
        try {
            //1 清空缓冲区中的旧数据
            buffer.clear();
            //2 获取之前注册的SocketChannel通道
            SocketChannel sc = (SocketChannel) key.channel();
            //3 将sc中的数据放入buffer中
            int count = sc.read(buffer);
            if(count == -1) { // == -1表示通道中没有数据
                key.channel().close();
                key.cancel();
                return;
            }
            //读取到了数据，将buffer的position复位到0
            buffer.flip();
            byte[] bytes = new byte[buffer.remaining()];
            //将buffer中的数据写入byte[]中
            buffer.get(bytes);
            String body = new String(bytes).trim();
            System.out.println("Server：" + body);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static void main(String[] args) {
        new Thread(new Server(8379)).start();
    }
}

客户端：
public class Client {
    public static void main(String[] args) {
        InetSocketAddress address = new InetSocketAddress("127.0.0.1", 8379);
        SocketChannel sc = null;
        ByteBuffer buffer = ByteBuffer.allocate(1024);
        try {
            //打开通道
            sc = SocketChannel.open();
            //建立连接
            sc.connect(address);
            while (true) {
                byte[] bytes = new byte[1024];
                System.in.read(bytes);
                //把输入的数据放入buffer缓冲区
                buffer.put(bytes);
                //复位操作
                buffer.flip();
                //将buffer的数据写入通道
                sc.write(buffer);
                //清空缓冲区中的数据
                buffer.clear();
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if(sc != null) {
                try {
                    sc.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }
}


3、AIO
在'NIO'的'基础上''引入了''异步通道'的'概念'，并提供了'异步文件'和'异步套接字通道'的
'实现'，从而在真正意义上'实现了''异步非阻塞'，之前的'NIO只是非阻塞'而'并非异步'。
'AIO'不需要'通过对多路复用器''对注册的通道'进行'轮询操作'即'可实现异步读写'，
从而简化NIO编程模型。

①AsynchronousServerSocketChannel

②AsynchronousSocketChannel

下面看代码：

Server端：
public class Server {
    //线程池
    private ExecutorService executorService;
    //线程组
    private AsynchronousChannelGroup channelGroup;
    //服务器通道
    public AsynchronousServerSocketChannel channel;

    public Server(int port) {
        try {
            //创建线程池
            executorService  = Executors.newCachedThreadPool();
            //创建线程组
            channelGroup = AsynchronousChannelGroup.withCachedThreadPool(executorService, 1);
            //创建服务器通道
            channel = AsynchronousServerSocketChannel.open(channelGroup);
            //绑定地址
            channel.bind(new InetSocketAddress(port));
            System.out.println("server start, port：" + port);
            channel.accept(this, new ServerCompletionHandler());
            Thread.sleep(Integer.MAX_VALUE);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static void main(String[] args) {
        Server server = new Server(8379);
    }
}

ServerCompletionHandler类：
public class ServerCompletionHandler implements CompletionHandler<AsynchronousSocketChannel, Server> {
    @Override
    public void completed(AsynchronousSocketChannel channel, Server attachment) {
        //当有下一个客户端接入的时候，直接调用Server的accept方法，这样反复执行下去，保证多个客户端都可以阻塞
        attachment.channel.accept(attachment, this);
        read(channel);
    }

    private void read(AsynchronousSocketChannel channel) {
        //读取数据
        ByteBuffer buffer = ByteBuffer.allocate(1024);
        channel.read(buffer, buffer, new CompletionHandler<Integer, ByteBuffer>() {
            @Override
            public void completed(Integer resultSize, ByteBuffer attachment) {
                attachment.flip();
                System.out.println("Server->" + "收到客户端发送的数据长度为：" + resultSize);
                String data = new String(buffer.array()).trim();
                System.out.println("Server->" + "收到客户端发送的数据为：" + data);
                String response = "服务器端响应了客户端。。。。。。";
                write(channel, response);
            }

            @Override
            public void failed(Throwable exc, ByteBuffer attachment) {
                exc.printStackTrace();
            }
        });
    }

    private void write(AsynchronousSocketChannel channel, String response) {
        try {
            ByteBuffer buffer = ByteBuffer.allocate(1024);
            buffer.put(response.getBytes());
            buffer.flip();
            channel.write(buffer).get();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public void failed(Throwable exc, Server attachment) {
        exc.printStackTrace();
    }
}


客户端：
public class Client implements Runnable {

    private AsynchronousSocketChannel channel;

    public Client() throws IOException {
        channel = AsynchronousSocketChannel.open();
    }

    public void connect() {
        channel.connect(new InetSocketAddress("127.0.0.1", 8379));
    }

    public void write(String data) {
        try {
            channel.write(ByteBuffer.wrap(data.getBytes())).get();
            read();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void read() {
        ByteBuffer buffer = ByteBuffer.allocate(1024);
        try {
            channel.read(buffer).get();
            buffer.flip();
            byte[] bytes = new byte[buffer.remaining()];
            buffer.get(bytes);
            String data = new String(bytes, "UTF-8").trim();
            System.out.println(data);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public void run() {
        while (true) {

        }
    }

    public static void main(String[] args) {
        try {
            Client c1 = new Client();
            Client c2 = new Client();
            Client c3 = new Client();

            c1.connect();
            c2.connect();
            c3.connect();

            new Thread(c1).start();
            new Thread(c2).start();
            new Thread(c3).start();

            Thread.sleep(1000);

            c1.write("c1 aaa");
            c2.write("c2 bbbb");
            c3.write("c3 ccccc");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}








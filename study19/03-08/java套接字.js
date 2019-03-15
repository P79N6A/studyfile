Java网络编程（五）'使用TCP/IP'的'套接字（Socket）进行通信'
https://blog.csdn.net/u011134399/article/details/50518673
	
使用TCP/IP的套接字（Socket）进行通信

套接字Socket的引入
　　'为了'能够'方便地开发网络应用软件'，由美国伯克利大学'在Unix上'
'推出了'一种'应用程序访问通信协议的''操作系统'用'调用socket'（套接字）。
　　'socket的出现'，'使程序'员'可以很方便地访问TCP/IP'，从而'开发各种网络应用的程序'。
　　随着Unix的应用推广，套接字在编写网络软件中得到了极大的普及。
后来，套接字又被引进了Windows等操作系统中。Java语言也引入了套接字编程模型。
 
'什么是Socket？'
　　'Socket''是'连接运行在网络上的'两个程序间'的'双向通讯的端点'。
使'用Socket进行网络通信的过程'
　　'服务器'程序'将一个套接字''绑定到'一个特定的'端口'，
并'通过此套接字'等待和'监听'客户的连接'请求'。
　　'客户程序''根据'服务器程序所在的'主机名'和'端口号''发出'连接'请求'。
　　如果'一切正常'，'服务器接受'连接'请求'。
并'获得'一个新的绑定到不同端口地址的'套接字'。（不可能有两个程序同时占用一个端口）。
　　'客户和服务器''通过读写套接字'进行'通讯'。
　　'使用ServerSocket''和Socket''实现''服务器端'和'客户端'的'Socket通信'。
　　其中：
　　左边ServerSocket类的构造方法可以传入一个端口值来构建对象。
　　'accept()'方法'监听'向这个socket的连接并'接收连接'。
它将会阻塞直到连接被建立好。
连接'建立好后'它会'返回'一个'Socket对象'。
　　连接'建立好后'，'服务器端'和'客户端'的'输入流和输出流'就'互为彼此'，
即'一端的输出流''是另一端的输入流'。
总结：使'用ServerSocket'和'Socket实现服务器端'和'客户端的Socket通信'
　　(1)'建立Socket连接'
　　(2)'获得输入/输出流'
　　(3)'读/写数据'
　　(4)'关闭输入/输出流'
　　(5)'关闭Socket'

通信程序测试
　　建立服务器端和客户端如下：　

public class TcpServer {
	public static void main(String[] args) throws Exception {
		// 创建服务器端的socket对象
		ServerSocket ss = new ServerSocket(5000);
		// 监听连接
		Socket socket = ss.accept();
		// 直到连接建立好之后代码才会往下执行
		System.out.println("Connected Successfully!");
	}
}

TcpClient
public class TcpClient {
	public static void main(String[] args) throws Exception {
		Socket socket = new Socket("127.0.0.1", 5000);
	}
}

	然后'先运行服务器'端，'再运行''客户端'，可以看到，
运行客户端'之后''输出服务器端'的后续'代码'。
	表明'连接建立后'才会往下执行。
一个'比较简陋的通信程序'：

TcpServer2
public class TcpServer {
	public static void main(String[] args) throws Exception {
		// '创建服务器端的socket对象'
		ServerSocket ss = new ServerSocket(5000);
		// '监听连接'
		Socket socket = ss.accept();
		// '直到连接建立好之后代码才会往下执行'
		System.out.println("Connected Successfully!");
		// '获得服务器端的输入流，从客户端接收信息'
		InputStream is = socket.getInputStream();
		// '服务器端的输出流，向客户端发送信息'
		OutputStream os = socket.getOutputStream();
		byte[] buffer = new byte[200];
		int length = 0;
		length = is.read(buffer);
		String str = new String(buffer, 0, length);
		System.out.println(str);
		// '服务器端的输出'
		os.write("Welcome".getBytes());
		// '关闭资源'
		is.close();
		os.close();
		socket.close();
	}
}
 

TcpClient2
public class TcpClient {
	public static void main(String[] args) throws Exception {
		Socket socket = new Socket("127.0.0.1", 5000);
		// '客户端的输出流'
		OutputStream os = socket.getOutputStream();
		// '将信息写入流,把这个信息传递给服务器'
		os.write("hello world".getBytes());
		// '从服务器端接收信息'
		InputStream is = socket.getInputStream();
		byte[] buffer = new byte[200];
		int length = is.read(buffer);
		String str = new String(buffer, 0, length);
		System.out.println(str);
		// 关闭资源
		is.close();
		os.close();
		socket.close();
	}
}

　　先'运行服务器'，再运行客户端。之后可以在'服务器和客户端的控制台'上'进行输入操作'，
另一端将会收到输入的信息并输出。

使'用线程实现服务器端'与'客户端的双向通信'
　　用'两个线程'，'一个'线程专门'用于处理服务器端的读'，
另'一个'线程专门'用于处理服务器端的写'。

　　客户端同理。
　　代码如下，程序共有六个类。
　　服务器端和其输入输出线程：

MainServer
public class MainServer {
	public static void main(String[] args) throws Exception {
		ServerSocket serverSocket = new ServerSocket(4000);
		while (true) {
			// 一直处于监听状态,这样可以处理多个用户
			Socket socket = serverSocket.accept();
			// 启动读写线程
			new ServerInputThread(socket).start();
			new ServerOutputThread(socket).start();
		}
	}
}

ServerInputThread
public class ServerInputThread extends Thread {
	private Socket socket;

	public ServerInputThread(Socket socket) {
		super();
		this.socket = socket;
	}

	@Override
	public void run() {
		try {
			// 获得输入流
			InputStream is = socket.getInputStream();
			while (true) {
				byte[] buffer = new byte[1024];
				int length = is.read(buffer);
				String str = new String(buffer, 0, length);
				System.out.println(str);
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}

ServerOutputThread
public class ServerOutputThread extends Thread {
	private Socket socket;

	public ServerOutputThread(Socket socket) {
		super();
		this.socket = socket;
	}

	@Override
	public void run() {
		try {
			OutputStream os = socket.getOutputStream();
			while (true) {
				BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
				String line = reader.readLine();
				os.write(line.getBytes());
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}
 
'客户端'和'其输入输出线程'（其输入输出线程'和服务器端的完全一样'）：　　
public class MainClient {
	public static void main(String[] args) throws Exception {
		Socket socket = new Socket("127.0.0.1", 4000);

		new ClientInputThread(socket).start();
		new ClientOutputThread(socket).start();

	}
}

ClientInputThread
public class ClientInputThread extends Thread {
	private Socket socket;

	public ClientInputThread(Socket socket) {
		super();
		this.socket = socket;
	}

	@Override
	public void run() {
		try {
			// 获得输入流
			InputStream is = socket.getInputStream();
			while (true) {
				byte[] buffer = new byte[1024];
				int length = is.read(buffer);
				String str = new String(buffer, 0, length);
				System.out.println(str);
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}

ClientOutputThread
public class ClientOutputThread extends Thread {
	private Socket socket;

	public ClientOutputThread(Socket socket) {
		super();
		this.socket = socket;
	}

	@Override
	public void run() {
		try {
			OutputStream os = socket.getOutputStream();
			while (true) {
				BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
				String line = reader.readLine();
				os.write(line.getBytes());
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}
 
　　经测试成功。即从服务器端控制台输入，可以从客户端接收到并输出；
也可以反过来，从客户端控制台输入，那么服务器端会同时输出。

多个客户端的程序实验
　　可以'启动多个''客户端'，同时'与服务器进行交互'。
这里还是'采用'上面的'MainServer'和'MainClient'及其输入输出线程代码。

　　这部分做实验的时候需要使用命令行，
因为'Eclipse'里面每次Run的时候都会重新启动程序，
即'想要Run第二个客户端'的时候'总是先关闭''第一个客户端'（因为它们运行的是同一个程序），
这样，即只能有一个客户端存在。
　　在命令行运行的方法如下：
　　因为源文件带有包名，所以编译采用：
　　javac –d . 源文件名.java
　　注意d和.之间有一个空格。
　　可以使用通配符编译所有的源文件，即使用：
　　javac –d . *.java
　　编译之后执行：
　　java 完整包名+类名
　　先启动服务器程序，之后新开命令行窗口启动客户端程序，结果如下：

 （一个客户端时交互正常）

　　（多个客户端交互异常）

　　经实验，发现在'一个服务'器'多个客户端'的情况下，
'客户端''可以流畅地向服务器发送信息'，但是当'服务器发送信息时'，
就'会出现问题'，并'不是每一个客户端''都能收到信息'。

　　如图中，当服务器发送语句时，
第一个客户端收到了（并且是发送后多按下一个回车才收到），第二个客户端没有收到。

　　后面试验了几个语句都是这样：

'实现服务器''支持''多客户机通信'
　　服务器端的程序需'要为每一个''与客户机连接的socket''建立一个线程'，
来'解决同时通信的问题'。
　　'服务器'端应该'管理一个socket的集合'。
　　即要'完成一个功能'完善'的客户端''和服务器通信'程序，代码'还是需要进一步完善的'。


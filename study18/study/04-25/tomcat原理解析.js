    前段时间去面试，被人问到了'tomcat实现原理'。由于平时没怎么关注容器的实现细节，
这个问题基本没回答上来。所以最近花了很多时间一直在网上找资料和看tomcat的源码
来研究里面处理一个HTTP请求的流程。网上讲tomcat的帖子比较多，大多都是直接切入
主题看其源码，从我个人感受来说直接研究其源码实现比较难理解和非常枯燥，
需要由简到难，慢慢深入。

二  一个简单tomcat服务器实现

        'tomat是'一个'servlet容器'，来'处理http请求'。
在平时的使用中我们都会再浏览器中输入http地址来访问服务资源，
比如格式http://host[":"port][abs_path]。
从'浏览器到服务端'的'一次请求'都'遵循http协议'，在网络上其实走仍然是tcp协议，
即我们常'使用'的'socket'来'处理'客户端和服务器的'交互'。
'根据'输入的'http地址'可以'知道服务器'的'IP'地址和'端口'，
根据这两个参数就可以'定位到服务器'的唯一地址。
'tomcat根据'http地址'端口后'面的'资源路径'就可以知道'反馈'什么样的'资源给浏览器'。
下面给出了一个非常简单的代码模拟了tomcat的简单实现

package com;  
import java.io.*;  
import java.net.ServerSocket;  
import java.net.Socket;  
import java.net.URLDecoder;  
import java.util.StringTokenizer;  
  
public class TomcatServer {  
  
    private final static int PORT = 8080;  
  
    public static void main(String[] args) {
        try {
            ServerSocket server = new ServerSocket(PORT);//根据端口号启动一个serverSocket  
            ServletHandler servletHandler=new ServletHandler(server);  
            servletHandler.start();  
        } catch (Exception e) {  
            e.printStackTrace();  
        }  
  
    }  
  
    private static class ServletHandler extends Thread{  
        ServerSocket server=null;  
        public ServletHandler(ServerSocket server){  
            this.server=server;  
        }  
  
        @Override  
        public void run() {
            while (true) {
                try {
                    Socket client = null;  
                    client = server.accept();//ServerSocket阻塞等待客户端请求数据  
                    if (client != null) {
                        try {
                            System.out.println("接收到一个客户端的请求");  
                            //根据客户端的Socket对象获取输入流对象。  
                            //封装字节流到字符流  
                            BufferedReader reader = new BufferedReader(new InputStreamReader(client.getInputStream()));  
                            // GET /test.jpg /HTTP1.1  
                            //http请求由三部分组成，分别是：请求行、消息报头、请求正文。  
                            //这里取的第一行数据就是请求行。http协议详解可以参考http://www.cnblogs.com/li0803/archive/2008/11/03/1324746.html说的很详细  
                            String line = reader.readLine();  
                            System.out.println("line: " + line);  
                            //拆分http请求路径，取http需要请求的资源完整路径  
                            String resource = line.substring(line.indexOf('/'),line.lastIndexOf('/') - 5);  
                            System.out.println("the resource you request is: "+ resource);  
                            resource = URLDecoder.decode(resource, "UTF-8");  
                            //获取到这次请求的方法类型，比如get或post请求  
                            String method = new StringTokenizer(line).nextElement().toString();  
                            System.out.println("the request method you send is: "+ method);  
                            //继续循环读取浏览器客户端发出的一行一行的数据  
                            while ((line = reader.readLine()) != null) {  
                                if (line.equals("")) {//当line等于空行的时候标志Header消息结束  
                                    break;  
                                }  
                                System.out.println("the Http Header is : " + line);  
                            }  
                            //如果是POST的请求，直接打印POST提交上来的数据  
                            if ("post".equals(method.toLowerCase())) {  
                                System.out.println("the post request body is: "  
                                        + reader.readLine());  
                            }else if("get".equals(method.toLowerCase())){  
                                //判断是get类型的http请求处理  
                                //根据http请求的资源后缀名来确定返回数据  
  
                                //比如下载一个图片文件，我这里直接给定一个图片路径来模拟下载的情况  
                                if (resource.endsWith(".jpg")) {  
                                    transferFileHandle("d://123.jpg", client);  
                                    closeSocket(client);  
                                    continue;  
  
                                } else {  
  
                             //直接返回一个网页数据  
                             //其实就是将html的代码以字节流的形式写到IO中反馈给客户端浏览器。  
                             //浏览器会根据http报文“Content-Type”来知道反馈给浏览器的数据是什么格式的，并进行什么样的处理  
                             PrintStream writer = new PrintStream(client.getOutputStream(), true);  
                             writer.println("HTTP/1.0 200 OK");// 返回应答消息,并结束应答  
                             writer.println("Content-Type:text/html;charset=utf-8");  
                             writer.println();  
                             //writer.println("Content-Length:" + html.getBytes().length);// 返回内容字节数  
                             writer.println("<html><body>");  
                             writer.println("<a href='www.baidu.com'>百度</a>");  
                             writer.println("<img src='https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo/bd_logo1_31bdc765.png'></img>");  
                             writer.println("</html></body>");  
  
                             //writer.println("HTTP/1.0 404 Not found");// 返回应答消息,并结束应答  
                             writer.println();// 根据 HTTP 协议, 空行将结束头信息  
                             writer.close();  
                             closeSocket(client);//请求资源处理完毕，关闭socket链接  
                             continue;  
                                }  
                            }  
  
                        } catch (Exception e) {  
                            System.out.println("HTTP服务器错误:"  
                                    + e.getLocalizedMessage());  
                        }  
                    }  
                } catch (Exception e) {  
                    e.printStackTrace();  
                }  
            }  
        }  
  
        private void closeSocket(Socket socket) {  
            try {  
                socket.close();  
            } catch (IOException ex) {  
                ex.printStackTrace();  
            }  
            System.out.println(socket + "离开了HTTP服务器");  
        }  
  
        private void transferFileHandle(String path, Socket client) {  
  
            File fileToSend = new File(path);  
  
            if (fileToSend.exists() && !fileToSend.isDirectory()) {  
                try {  
                    //根据Socket获取输出流对象，将访问的资源数据写入到输出流中  
                    PrintStream writer = new PrintStream(client.getOutputStream());  
                    writer.println("HTTP/1.0 200 OK");// 返回应答消息,并结束应答  
                    writer.println("Content-Type:application/binary");  
                    writer.println("Content-Length:" + fileToSend.length());// 返回内容字节数  
                    writer.println();// 根据 HTTP 协议, 空行将结束头信息  
  
                    FileInputStream fis = new FileInputStream(fileToSend);  
                    byte[] buf = new byte[fis.available()];  
                    fis.read(buf);  
                    writer.write(buf);  
                    writer.close();  
                    fis.close();  
                } catch (IOException e) {  
                    e.printStackTrace();  
                }  
            }  
        }  
  
    }  
  
}  


三  实践

    1.在浏览器中输入http://localhost:8080/123.jpg 链接，可以看到浏览器里面就将123.jpg下载到本地了。

    2.在浏览器中输入一个服务器不能识别的请求后缀比如http://localhost:8080/123.jpg1，可以看到浏览器打开了一个网页。如下图：点击里面的百度链接可以跳转



    3.后台tomcat服务器打印的http请求报文

      接收到一个客户端的请求
line: GET /123.jpg1 HTTP/1.1
the resource you request is: /123.jpg1
the request method you send is: GET
the Http Header is : Host: localhost:8080
the Http Header is : Connection: keep-alive
the Http Header is : Pragma: no-cache
the Http Header is : Cache-Control: no-cache
'the Http Header is : Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8'
the Http Header is : Upgrade-Insecure-Requests: 1
the Http Header is : User-Agent: Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.106 Safari/537.36
the Http Header is : Accept-Encoding: gzip, deflate, sdch
the Http Header is : Accept-Language: zh-CN,zh;q=0.8
Socket[addr=/0:0:0:0:0:0:0:1,port=57864,localport=8080]离开了HTTP服务器

四  总结

从整个代码和测试情况来看，一次'http请求'其实就'是一次socket套接字'的'处理'。
浏览器发起scoket的请求，tomcat服务器接受请求，并根据请求的路径定位客
户端需要访问的资源。  只是socket客户端和服务器数据在交互时，都遵守着
http协议规范。当然真正的tomcat容器比这个demo实现要复杂的很多，
这个简易的tomcat服务器能够帮我们更好的理解tomcat源码。


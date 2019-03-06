1  
读数据

1.1   使用 Hadoop URL 读数据

'想要使java识别出hdfs开头的URL'标示需要一点 额外 的工作要做：'通过URL的setURLStreamHandlerFactory()方法'为 
java'设置一个FSUrlStreamHandlerFactory'。这个方法'在每个JVM中只能调用一次'，所以它通常会被'放在一个static block'中执行（如下所示），
但 是 如果'你的'某部分'程序' （ 例如一个你无法修改源代码的第三方组件 ） 已经'调用了这个方法'，那'你就不能通过URL来这样读取数据了' 。
相关代码如下：

static  {

URL. setURLStreamHandlerFactory ( new  FsUrlStreamHandlerFactory());

}

public   static   void  main(String[]  args ) {

InputStream  in  =  null ;

try  {

in  =  new  URL( "hdfs://172.20.59.227:8888/user/myuser/output10" ).openStream();

IOUtils. copyBytes ( in , System.out , 4096,  false );

}  catch  (MalformedURLException  e ) {

e .printStackTrace();

}  catch  (IOException  e ) {

e .printStackTrace();

}  finally  {

IOUtils. closeStream ( in );

}

}

上例中我们使用了Hadoop中IOUtils类的两个静态方法： 
1）'IOUtils.copyBytes()'，其中'in表示拷贝源'，System.out表示'拷贝目的地'（也就是要拷贝到标准输出中去），
4096表示用来'拷贝的buffer大小'，'false表明拷贝完成后我们并不关闭拷贝源 和 拷贝目的地'（因为System.out并不需要关闭，
in可以在finally语句中被关闭）。 
2）IOUtils.closeStream( in )，用来关闭 in 流。

执行结果如下：

2014-11-30 10:43:44,667 WARN  conf.Configuration ( Configuration.java:<clinit>(191) ) - DEPRECATED: hadoop-site.xml found in the classpath. Usage of hadoop-site.xml is deprecated. Instead use core-site.xml, mapred-site.xml and hdfs-site.xml to override properties of core-default.xml, mapred-default.xml and hdfs-default.xml respectively

hello, today is xx. i am happy to play with hadoop

yes, if you do,everything is possible

this example is just a case.

如果'没有设置 FSUrlStreamHandlerFactory '，即缺少上例中的 static block ，'程序则会报错 畸形的URL异常' ，如下所示：

java.net.MalformedURLException : unknown protocol: hdfs

at java.net.URL.<init>( URL.java:590 )

at java.net.URL.<init>( URL.java:480 )

at java.net.URL.<init>( URL.java:429 )

at org.seandeng.hadoop.fs.URLCat.main( URLCat.java:27 )

1.2   '使用 FileSystem 读取数据'

Hadoop文件系统中的文件是用'Hadoop的Path对象来表示的'（而不是java中的java.io.File对象）。
可以'把一个Path对象看做Hadoop文件系统中的某一个URL'，如上例中的' hdfs://172.20.59.227:8888/user/myuser/output10 '。 
下面列出了几个'Filesystem的用于抽取Filesystem实例的几个静态方法'：

public   static  FileSystem get(Configuration  conf )

public   static  FileSystem  get (URI  uri , Configuration  conf )

public   static  FileSystem get( final  URI  uri ,  final  Configuration  conf , final  String  user )

一个'Configuration对象封装'了'客户端或服务器端的配置信息'，'这些配置信息是通过从'conf/core-site.xml之类的'配置文件中读取出来的键值'
对'来设置的'。下面我们一一说明上面的三个方法： 
1）'第一个方法返回一个默认的文件系统'（在conf/core-site.xml中通过fs.default.name来指定的，如果在conf/core-site.xml中没有设置则返回本地文件系统）。 
2）'第二个方法通过uri来指定要返回的文件系统'（例如，如果uri是上个测试例子中的 'hdfs://172.20.59.227:8888/user/myuser/output10' ，
	即'以hdfs标识开头'，那么'就返回一个hdfs文件系统'，如果'uri中没有相应的标识则返回本地文件系统'）。 
3）'第三个方法返回文件系统的机理同（2）是相同的'，但它同时又'限定了该文件系统的用户'，'这在安全方面是很重要的'。

有时候你可能想要使用一个本地文件系统，你可以使用另一个很方便的方法： 
public static LocalFileSystem getLocal(Configuration conf) throws IOException

'得到一个文件系统的实例后'，我们可以'调用该实例的open()方法'来'打开某个给定文件的输入流'（第一个方法使用一个默认的4KB的输入缓冲）：

示例代码如下 ：

public   static   void  main(String[]  args ) {

String  uri  =  "hdfs://172.20.59.227:8888/user/myuser/files/aaa.txt" ;

Configuration  configuration  =  new  Configuration();

try  {

FileSystem  fs  = FileSystem. get (URI. create ( uri ),  configuration );

InputStream  in  =  null ;

try  {

in  =  fs .open( new  Path( uri ));

IOUtils. copyBytes ( in , System. out , 4096,  false );

}  catch  (Exception  e ) {

e .printStackTrace();

}  finally  {

IOUtils. closeStream ( in );

}

}  catch  (IOException  e ) {

e .printStackTrace();

}

}

运行结果如下所示：

2014-11-30 11:01:49,139 WARN  conf.Configuration ( Configuration.java:<clinit>(191) ) - DEPRECATED: hadoop-site.xml found in the classpath. Usage of hadoop-site.xml is deprecated. Instead use core-site.xml, mapred-site.xml and hdfs-site.xml to override properties of core-default.xml, mapred-default.xml and hdfs-default.xml respectively

hello, today is xx. i am happy to play with hadoop

yes, if you do,everything is possible

this example is just a case.

1.3   FSDataInputStream

与 'URL 的 openStream() 方法返回 InputStream 不同'， 'FileSystem 的 open() 方法返回的是一个  FSDataInputStream 对象'
（继承关系： java.io.InputStream -->java.io.FilterInputStream-->java.io.DataInputStream--> org.apache.hadoop.fs.FSDataInputStream ）。
由于 'FSDataInputStream 实现了 Closeable ,DataInput,PositionedReadable, Seekable 等接口'，你可以'从流中的任意一个位置读取数据'。 
Seekable '接口的 seek() 和 getPos() 方法允许我们跳转到流中的某个位置'并'得到其位置' 。

'如果调用 seek() 时指定了一个超过文件长度的位移值，会抛出 IOException 异常'。 
'与 java.io.Inputstream 的 skip() 方法指明一个相对位移值不同'， 'seek() 方法使用的是绝对位移值。如下所示的代码通过 seek() 方法两次读取了输入文件'：

public   static   void  main(String[]  args )  throws  Exception {

String  uri  =  "hdfs://172.20.59.227:8888/user/myuser/files/aaa.txt" ;

Configuration  configuration  =  new  Configuration();

FileSystem  fs  = FileSystem. get (URI. create ( uri ),  configuration );

FSDataInputStream  in  =  null ;

try  {

in  =  fs .open( new  Path( uri ));

IOUtils. copyBytes ( in , System. out , 4096,  false );

in .seek(0);  //  回到文件的起点

IOUtils. copyBytes ( in , System. out , 4096,  false );

}  finally  {

IOUtils. closeStream ( in );

}

}

执行结果如下：

2014-11-30 11:06:58,209 WARN  conf.Configuration ( Configuration.java:<clinit>(191) ) - DEPRECATED: hadoop-site.xml found in the classpath. Usage of hadoop-site.xml is deprecated. Instead use core-site.xml, mapred-site.xml and hdfs-site.xml to override properties of core-default.xml, mapred-default.xml and hdfs-default.xml respectively

hello, today is xx. i am happy to play with hadoop

yes, if you do,everything is possible

this example is just a case.

hello, today is xx. i am happy to play with hadoop

yes, if you do,everything is possible

this example is just a case.

需要注意的是'调用seek()方法的代价比较高，应尽量避免使用'。你的程序应该基于流式访问来构建，而不是执行一大堆seek。     

'FSDataInputStream也实现了 PositionedReadable 接口'，这'允许你从流中的某个给定位置读取给定长度的内容' 。

2   写数据

'FileSystem类有很多方法用来创建一个文件'，最简单的就是'以预创建文件的Path对象为参数的create(Path f)方法'，该方法返回一个用来写入数据的输出流：

public  FSDataOutputStream  create (Path  f )  throws  IOException

该方法'还有几个重载的方法'，通过这些重载的方法'你可以指定是否覆盖该文件名已存在的文件'，'这个文件的备份数'，用来'写数据的buffer size'，
该文件的block大小和文件权限等。

'create()方法会创建指定的文件名中包含的任何不存在的父目录'，这样'虽然很方便'，但'不推荐使用'
（因为如果某个父目录中存在其他数据，会被覆盖掉从而导致文件丢失）。如果你想要当父目录不存在时该创建操作失败，
你可以在调用create()方法之前调用exists()方法检查指明的父目录是否存在，如果存在则报错以让create()失败 。 exists()方法 如下所示：

/** Check if exists.

*  @param  f source file

*/

public   boolean   exists (Path  f )  throws  IOException

'create()方法还有一个重载方法可以让你传递一个回调的 接 口 ( Progressable )' ，这样'你的程序就会知道你的数据被写入了多少'，
即写入的进度（progress）：

public   interface  Progressable {

/**

* Report progress to the  Hadoop  framework.

*/

  public   void  progress();

}

'除了创建一个新文件以写入数据以外'，我们'还可以使用append()方法向一个已存在文件添加数据'：

public FSDataOutputStream append(Path f) throws IOException

有了这个函数，'应用程序就可以向那些不能限制大小的文件写数据了'。'append操作在Hadoop的fileSystem中是可选的'，例如'HDFS实现了它，但S3就没有'。

下面这个例子展示了'如何从本地文件系统拷贝一个文件到HDFS'，我们在'每64KB大小的数据写入之后调用一次progress()函数'，这个函数每被调用一次打印一个句点：

public   static   void  main(String[]  args )  throws  Exception {

String  localSrc  =  "Z:\\cygwin\\home\\myuser\\hadoop-1.0.0\\bin\\DUCEAP-0.5.0-B2610.log" ;

String  dst  = "hdfs://172.20.59.227:8888/user/myuser/files/DUCEAP-0.5.0-B2610.log" ;

InputStream  in  =  new  BufferedInputStream( new  FileInputStream( localSrc ));

Configuration  conf  =  new  Configuration();

FileSystem  fs  = FileSystem. get (URI. create ( dst ),  conf );

OutputStream  out  =  fs .create( new  Path( dst ),  new  Progressable() {

public   void  progress() {

System. out .print( "." );

}

});

IOUtils. copyBytes ( in ,  out , 4096,  true );

}

执行结果如下:

2014-11-30 11:10:52,227 WARN  conf.Configuration ( Configuration.java:<clinit>(191) ) - DEPRECATED: hadoop-site.xml found in the classpath. Usage of hadoop-site.xml is deprecated. Instead use core-site.xml, mapred-site.xml and hdfs-site.xml to override properties of core-default.xml, mapred-default.xml and hdfs-default.xml respectively

........................................

'2.1   FSDataOutputStream'

'FileSystem中的create()方法返回一个FSDataOutputStream，''像FSDataInputStream一样，它也有一个用于查询位移的方法'
（但并'没有类似于FSDataInputStream中seek()的方法'，因为Hadoop'不允许向流中的任意位置写数据'，我们'只能在一个文件的末尾处添加数据'）：

public   class  FSDataOutputStream  extends  DataOutputStream  implements  Syncable {

  public   long   getPos ()  throws  IOException ;

}

2.2   mkdirs

mkdirs() 方法是 在给定目录下创建一个子目录 ，代码如下所示：

public   static   void  main(String[] args )  throws  IOException {

String  uri  =  "hdfs://172.20.59.227:8888//user/myuser/" ;

Configuration  conf  =  new  Configuration();

FileSystem  fs  = FileSystem. get (URI. create ( uri ),  conf );

Path  path  =  new  Path( "/user/myuser/newDir" );

fs .mkdirs( path );

FileStatus  stat  =  fs .getFileStatus( path );

System. out .println(System. currentTimeMillis ());

System. out .println( stat .getModificationTime());

}

执行结果如下：

2014-11-30 12:01:07,451 WARN  conf.Configuration ( Configuration.java:<clinit>(191) ) - DEPRECATED: hadoop-site.xml found in the classpath. Usage of hadoop-site.xml is deprecated. Instead use core-site.xml, mapred-site.xml and hdfs-site.xml to override properties of core-default.xml, mapred-default.xml and hdfs-default.xml respectively

1417320069145

1417320069081

'3   删除数据'

'使用FIleSystem的delete()方法可以永久的删除一个文件或目录'：

public boolean delete(Path f, boolean recursive) throws IOException

如果'传入的Path f是一个文件或者空目录'，'recursive的值会被忽略掉'。'当recursive值为true时'，'给定的非空目录连同其内容会被一并删除掉'。

'4   查询文件系统 信息'

'4.1   文件元数据： FileStatus'

'任何文件系统的典型功能'就是'能够遍历它的目录结构'从而'获取有关目录'和'文件的信息'。'Hadoop中的FileStatus类为文件和目录包装了其元数据'
（包括'文件长度'，'block大小'，'冗余度'，'修改时间'，'文件所有者和权限等信息'），
其'getFileStatus()方法提供了获取某个给定文件''或目录的 FileStatus对象的途径'，如下所示：

package  org.seandeng.hadoop.fs;

import  java.io.FileNotFoundException;

import  java.io.IOException;

import  java.io.OutputStream;

import  org.apache.hadoop.conf.Configuration;

import  org.apache.hadoop.fs.FileStatus;

import  org.apache.hadoop.fs.FileSystem;

import  org.apache.hadoop.fs.Path;

import  org.apache.hadoop.hdfs.MiniDFSCluster;

import  org.junit.After;

import  org.junit.Before;

import  org.junit.Test;

import   static  org.junit.Assert.*;

import   static  org.hamcrest.Matchers.*;

public   class  ShowFileStatusTest {

private  MiniDFSCluster  cluster ;  // use an in-process HDFS cluster for testing （这个类在最新的Hadoop1.0.4中已经被废弃了）                                     

private  FileSystem  fs ;

@Before

public   void  setUp()  throws  IOException {

Configuration  conf  =  new  Configuration();

if  (System. getProperty ( "test.build.data" ) ==  null ) {

System. setProperty ( "test.build.data" ,  "/tmp" );

}

cluster  =  new  MiniDFSCluster( conf , 1,  true ,  null );

fs  =  cluster .getFileSystem();

OutputStream  out  =  fs .create( new  Path( "/dir/file" ));

out .write( "content" .getBytes( "UTF-8" ));

out .close();

}

@After

public   void  tearDown()  throws  IOException {

if  ( fs  !=  null ) {

fs .close();

}

if  ( cluster  !=  null ) {

cluster .shutdown();

}

}

@Test (expected = FileNotFoundException. class )

public   void  throwsFileNotFoundForNonExistentFile()  throws  IOException {

fs .getFileStatus( new  Path( "no-such-file" ));

}

@Test

public   void  fileStatusForFile()  throws  IOException {

Path  file  =  new  Path( "/dir/file" );

FileStatus  stat  =  fs .getFileStatus( file );

assertThat ( stat .getPath().toUri().getPath(),  is ( "/dir/file" ));

assertThat ( stat .isDir(),  is ( false ));

assertThat ( stat .getLen(),  is (7L));

assertThat ( stat .getModificationTime(),

is ( l essThanOrEqualTo (System. currentTimeMillis ())));

assertThat ( stat .getReplication(),  is (( short ) 1));

assertThat ( stat .getBlockSize(),  is (64 * 1024 * 1024L));

assertThat ( stat .getOwner(),  is ( "myuser" ));

assertThat ( stat .getGroup(),  is ( "supergroup" ));

assertThat ( stat .getPermission().toString(),  is ( "rw-r--r--" ));

}

@Test

public   void  fileStatusForDirectory()  throws  IOException {

Path  dir  =  new  Path( "/dir" );

FileStatus  stat  =  fs .getFileStatus( dir );

assertThat ( stat .getPath().toUri().getPath(),  is ( "/dir" ));

assertThat ( stat .isDir(),  is ( true ));

assertThat ( stat .getLen(),  is (0L));

assertThat ( stat .getModificationTime(),

is ( lessThanOrEqualTo (System. currentTimeMillis ())));

assertThat ( stat .getReplication(),  is (( short ) 0));

assertThat ( stat .getBlockSize(),  is (0L));

assertThat ( stat .getOwner(),  is ( "myuser" ));

assertThat ( stat .getGroup(),  is ( "supergroup" ));

assertThat ( stat .getPermission().toString(),  is ( "rwxr-xr-x" ));

}

}

4.2   Listing files

除了从某个单一文件或目录获取文件信息以外，你可能还需要列出某个目录中的所有文件，这就要使用FileSystem的listStatus()方法了：

p ublic   FileStatus[] listStatus(Path f)  
public FileStatus[] listStatus(Path f, PathFilter filter)

public FileStatus[] listStatus(Path[] files) 
public FileStatus[] listStatus(Path[] files, PathFilter filter) 

当传入参数是一个文件时，它获取此文件的FileStatus对象，当传入文件是目录时，它返回零个或多个FileStatus对象，分别代表该目录下所有文件的对应信息。 
重载后的函数允许你指定一个PathFilter来进一步限定要匹配的文件或目录。 
下面我们使用listStatus()方法获得参数中指定的 目录 的元数据信息，存放在一个FIleStatus数组中，再使用stat2Paths()方法 把 FileStatus数组转化为Path数组，最后打印出文件名来：

public   static   void  main(String[]  args )  throws  Exception {

String  uri  =  "hdfs://172.20.59.227:8888/user/myuser/" ;

Configuration  conf  =  new  Configuration();

FileSystem  fs  = FileSystem. get (URI. create ( uri ),  conf );

Path[]  paths  =  new  Path[1];

paths [0] =  new  Path( uri );

FileStatus[]  status  =  fs .listStatus( paths );

Path[]  listedPaths  = FileUtil. stat2Paths ( status );

for  (Path  p  :  listedPaths ) {

System. out .println( p );

}

}

执行结果如下：

2014-11-30 11:38:44,549 WARN  conf.Configuration ( Configuration.java:<clinit>(191) ) - DEPRECATED: hadoop-site.xml found in the classpath. Usage of hadoop-site.xml is deprecated. Instead use core-site.xml, mapred-site.xml and hdfs-site.xml to override properties of core-default.xml, mapred-default.xml and hdfs-default.xml respectively

hdfs://172.20.59.227:8888/user/myuser/files

hdfs://172.20.59.227:8888/user/myuser/input

hdfs://172.20.59.227:8888/user/myuser/input2

hdfs://172.20.59.227:8888/user/myuser/output10

4.3   文件模式

在某个单一操作中处理一些文件是很常见的。例如一个日志处理的MapReduce作业可能要分析一个月的日志量。如果一个文件一个文件或者一个目录一个目录的声明那就太麻烦了，我们可以使用通配符来匹配多个文件。Hadoop提供了两种方法来处理文件组：

public FileStatus[] globStatus(Path pathPattern) 
public FileStatus[] globStatus(Path pathPattern, PathFilter filter) 

globStatus()方法返回匹配文件模式的多个文件的FileStatus数组（以Path排序）。一个可选的PathFilter可以用来进一步限制匹配模式。Hadoop中的匹配符与Unix中bash相同，如下所示：


假设某个日志文件的组织结构如下： 

则对应于该组织结构有如下表示：

 4.4   PathFilter

使用文件模式有时候并不能有效的描述你想要的一系列文件，例如如果你想排除某个特定文件就很难。所以FileSystem的listStatus()和globStatus()方法就提供了一个可选参数：PathFilter——它允许你一些更细化的控制匹配：

public interface PathFilter { 
boolean accept(Path path); 
}

PathFilter的作用就像java.io.FileFilter，只不过前者针对Path对象，而后者针对File对象。下面我们用PathFIlter来排除一个符合给定正则表达式的文件：

public class RegexExcludePathFilter implements PathFilter {

private final String regex;

public RegexExcludePathFilter(String regex) {

this.regex = regex;

}

public boolean accept(Path path) {

return !path.toString().matches(regex);

}

}

RegexExcludePathFilter 只让不匹配给定正则表达式的文件通过，我们通过文件模式（ file pattern ）得到所需的文件集后，再用 RegexExcludePathFilter 来过滤掉我们不需要的文件：

fs.globStatus(new Path("/2007/*/*"), new RegexExcludeFilter("^.*/2007/12/31$"))

这样我们就得到： /2007/12/30

注意： Filter 只能根据文件名来过滤文件，是不能通过文件的属性（如修改时间，文件所有者等）来过滤文件的。 
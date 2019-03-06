1.该如何'查看java'的'版本信息'
看了很多的文档，按照文档'安装完'毕，'遇到下面情况'。
The program 'java' can be found in the following packages:
* gcj-4.4-jre-headless
* gcj-4.6-jre-headless
* openjdk-6-jre-headless
* gcj-4.5-jre-headless
* openjdk-7-jre-headless
这上面'是什么意思'？
其实这个是常见的错误，'意思是'我们'有下面的包'，但是'还没'有'安装'。
明明已经安装了，为什么会出现这个情况。环境变量的那个错误。
安装是否成功，我们还可以通过另外的方式，'./java -version'具体看下图可知
http://www.aboutyun.com/data/attachment/album/201402/01/163911y4peeu6zcwdec4ee.jpg

如果'看不到版本'信息，你的'包'就'有问题'，需要另外下载可用jdk包。
注释：
首先在usr目录里面'创建java'目录
mkdir java
然后'加压安装包'
tar zxvf 安装包目录+安装包

2.环境变量设置

如果未配置或则环境变量设置错误，可能会遇到下面错误：
The program 'java' can be found in the following packages:
* gcj-4.4-jre-headless
* gcj-4.6-jre-headless
* openjdk-6-jre-headless
* gcj-4.5-jre-headless
* openjdk-7-jre-headless

'PATH配置'
这里提供'一个简单的方法'：

通过下面命令
export PATH=$PATH:/usr/java/jdk1.7.0_51/bin


通过cat命令，可以查看

现在在执行 java -version就ok了

CLASSTH配置

上面只是配置了PATH,还需在配置CLASSTH
export CLASSPATH=.:/usr/java/jdk1.7.0_51/jre/lib
执行配置完毕


java.sh配置
因为'重启之后'，很有'会被还原'，下面还'需要配置java.sh'
这里可以通过
'cd /etc/profile.d'
'vi java.sh'
把'下面两行''放到java.sh'
'export PATH=$PATH:/usr/java/jdk1.7.0_51/bin'
'export CLASSPATH=.:/usr/java/jdk1.7.0_51/jre/lib'
保存。这样就配置完毕了。

--------------------------------------------------------------------------------------------------------------------------------------------------------
实例
下面运行一个简单的java小程序
通过命令 vi hello.java
会看到文本，把下面放到hello.java

public class hello
{
public static void main(String args[])
{
System.out.println("hello java");
}
}
，保存
然后运行
javac hello.java

这里需要注意的是大小写，注意文件名和类名保持一致

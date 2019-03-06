'工具/原料'
jdk8
jmeter-3.2
方法/步骤
需要下载'安装jdk'。而且jmeter3.2以上需要最低jdk8。
'直接使用exe安装文件安装'(百度搜索下载地址)。
安装'完毕后'，'验证java'安装。
win+r打开cmd命令。
执行 java -version查看输出结果

'安装jmeter'。
jmeter无需安装，'解压即可'。
我这里有三个版本的jmeter了。都放在了c:\work目录下。
'进入 apache-jmeter-3.2\bin'
'找到jmeter.bat'，'双击'执行即可'启动jmeter'。
但是这里为了每次启动jmeter方便，需要设置环境变量。这样就可以直接cmd命令执行jmeter启动了。

桌面，右键点击 我的电脑（此电脑），选择 属性。
然后按图选择，设置：
JMETER_HOME=C:\work\apache-jmeter-3.2\
找到环境变量Path。点击编辑，添加jmeter环境变量。
截图不是文本模式。
文本模式，在编辑Path后，在后面添加;%JMETER_HOME%\bin;
一定要注意英文分号。
验证环境变量是否配置成功。

cmd命令输入
jmeter -v   #查看版本信息。
jmeter   -?  #查看所有操作命令。
'启动jmeter'，直接'输入jmeter回车'。
截图可以看到启动信息。

'提示不要使用GUI'来'进行压力测试'。'GUI模式''可以'用来'创建和调试脚本'。
如果'运行测试'，需'要使用非GUI模式'，即命令行：
jmeter -n -t [jmx file] -l [results file] -e -o [Path to output folder]

而且需'要根据实际需求'来'调整java内存'。



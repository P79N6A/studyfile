最早Git是在Linux上开发的，很长一段时间内，Git也只能在Linux和Unix系统上跑。
不过，慢慢地有人把它移植到了Windows上。现在，Git可以在Linux、Unix、Mac
和Windows这几大平台上正常运行了。

要使用Git，第一步当然是安装Git了。根据你当前使用的平台来阅读下面的文字：

在Linux上安装Git
首先，你可以试着输入git，看看系统有没有安装Git：

$ git
The program 'git' is currently not installed. You can install it by typing:
sudo apt-get install git
像上面的命令，有很多Linux会友好地告诉你Git没有安装，还会告诉你如何安装Git。

如果你碰巧用Debian或Ubuntu Linux，通过一条sudo apt-get install git就可以直接完成Git的安装，
非常简单。

老一点的Debian或Ubuntu Linux，要把命令改为sudo apt-get install git-core，
因为以前有个软件也叫GIT（GNU Interactive Tools），结果Git就只能叫git-core了。
由于Git名气实在太大，后来就把GNU Interactive Tools改成gnuit，git-core正式改为git。

如果是其他Linux版本，可以直接通过源码安装。先从Git官网下载源码，然后解压，
依次输入：./config，make，sudo make install这几个命令安装就好了。

在Mac OS X上安装Git
如果你正在使用Mac做开发，有两种安装Git的方法。

一是安装homebrew，然后通过homebrew安装Git，具体方法请参考homebrew的文档：http://brew.sh/。

第二种方法更简单，也是推荐的方法，就是直接从AppStore安装Xcode，Xcode集成了Git，
不过默认没有安装，你需要运行Xcode，选择菜单“Xcode”->“Preferences”，
在弹出窗口中找到“Downloads”，选择“Command Line Tools”，点“Install”就可以完成安装了。
install-git-by-xcode
Xcode是Apple官方IDE，功能非常强大，是开发Mac和iOS App的必选装备，而且是免费的！


在'Windows'上'安装Git'
在Windows上使用Git，可以从'Git官网'直接'下载安装程序'，（网速慢的同学请移步国内镜像），
然后按'默认选项安装即可'。

安装完成后，在开始菜单里找到“Git”->“Git Bash”，蹦出一个类似命令行窗口的东西，
就说明Git安装成功！

install-git-on-windows

安装完成后，还'需要'最后'一步设置'，在'命令行输入'：
$ git config --global user.name "Your Name"
$ git config --global user.email "email@example.com"
因为Git是分布式版本控制系统，所以，每个机器都必须自报家门：你的名字和Email地址。
你也许会担心，如果有人故意冒充别人怎么办？这个不必担心，首先我们相信大家都是善良
无知的群众，其次，真的有冒充的也是有办法可查的。

注意git config命令的'--global'参数，用了这个参数，表示'你这台机'器上'所有的Git'
仓库都'会使用这个配置'，当然'也可以对某个仓库''指定'不同的'用户名和Email地址'。

感觉本站内容不错，读后有收获？





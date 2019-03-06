零基础学习hadoop,没有想象的那么困难，也没有想象的那么容易。在刚接触云计算，曾经想过培训，
但是培训机构的选择就让我很纠结。所以索性就自己学习了。整个过程整理一下，给大家参考，
欢迎讨论，共同学习。
从一开始什么都不懂，到能够搭建集群，开发。整个过程，只'要有Linux基础'，'虚拟机化'和'java基础'，
其实hadoop,没有太大的困难。
  
首先整体说一下学习过程给大家借鉴：
首先查阅了资料，什么是hadoop，至于这方面，你可以参考这个帖子hadoop新手学习指导。
对这个有了整体的认识之后开始下面内容。(新手请务必参考hadoop新手学习指导，否则后面可能看不懂)

我们知道hadoop，有'单机安装'，'伪分布安装'和'分布安装'。
同时hadoop的环境是Linux，所以我们还需要'安装Linux系统'。因为我们的习惯是使用windows，
所以对于Linux上来就安装软件之类的，困难度很大。并且我们'要搭建集群'，需'要多台硬件'的，
不可能为了搭建集群，去买三台电脑。

从成本和使用我们需要懂虚拟化方面的知识。这里的虚拟化其实就是我们需要懂得虚拟机的使用。
因为hadoop安装在Linux中，才能真正发挥作用。所以我们也不会使用windows。

(这里补充硬件的选择:最关键的是内存，2G内存是有点卡的,4G有点勉强的,8G用起来顺畅)

基于以上内容。所以我们需要懂得
'1.虚拟化'
'2.Linux'
'3.java基础'

下面来详细介绍

1.虚拟化
刚开始学习，上来就'安装'了虚拟机'wmware station',然后'创建虚拟机，安装Linux'。但是问题来了。
虚拟机的网络难住，因为缺乏这方面的知识，所以不得不停下来，学习虚拟机的网络，该怎么搞。
虚拟机网络分为三种：
'1.briage'
'2.host-only'
'3.nat'
这不是很简单的吗？网上资料也不少。可是事情并没有想象的那么简单，
因为'nat'虽然'能上网'，但是虚拟系统'无法和本局域网'中的'其他真实主机进行通讯'。
'桥接模式'全都'需要手工配置'，而且这里还'需要明白'自己是'本机拨号上网'，'还是路由拨号上网'。
'host-only'创建一个'与网内其他机器'相隔离的'虚拟系统'，这个更不行。这些都'不适合'我们的'hadoop集群'。
hadoop要求主机与虚拟机与外部网络（能上网），这三者都是通的，在安装的过程中，才不会遇到麻烦。
所以这就是虚拟化方面的困难。
下面总结了在虚拟化方面需要做的：


虚拟化零基础入门
此文章让你明白为什么虚拟化，虚拟化的价值
虚拟机入门二，虚拟机的三种网络模式
详细介绍了虚拟化三种网络模式
搭建集群必备虚拟化网络知识


上面了解三种网络模式，这三种网络模式该如何才能上网。
对于上面你可能了解的还不够，下面咱们论坛会员具体实践指导，可以与他们相互交流：

集群搭建：主机宽带拨号上网，虚拟机使用桥接模式，该如何ping通外网
集群搭建必备：虚拟机之一实现Host-only方式上网
集群搭建必备：nat模式设置静态ip，达到上网与主机相互通信


上面是三种不同网络模式下，如何达到，'虚拟机，主机，网络三者互通'。

上面的知识具备了我们开始动手：
第一步：下载软件

'VMware Workstation' 10.0.0简体中文正式版官方下载地址
ubuntu-desktop 版：是图形界面
'ubuntu-12.04-desktop-amd64'
链接: http://pan.baidu.com/s/1eQxHLFO 密码: nnkv 

新手指导windows使用虚拟机安装Linux（ubuntu）：包括下载及安装指导
上面的帖子很齐全，包括wmware下载Linux桌面版下载。还有安装指导，
包括下面需要讲解的Linux安装指导

第二步：
下载我们就需要安装和使用

VMware workstation安装linux（ubuntu）配置详解

在这里我们安装完毕虚拟机，安装完毕Linux，我们需要返回第一步，进行网络设置。
但是在网络设置中，我们会遇到各种各样的困难，因为缺乏Linux知识。
同时这里补充一些虚拟化的基础知识：
虚拟网卡概述


VMware虚拟机网络设置方法
虚拟机（Linux操作系统）三种网络模式切换遇到的问题

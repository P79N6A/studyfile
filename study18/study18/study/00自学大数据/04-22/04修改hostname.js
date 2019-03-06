 对于新手可以带着下面问题
1.如何修改hostname？
2.怎么样修改，重启后不会被还原？

1.临时修改
$hostname newhostname
重启之后又变回原来的样子了


2.永久修改
'第一步：sudo vi /etc/hostname'
  

  
接着再修改hosts文件，终输入：'sudo vi /etc/hosts'  找到127.0.1.1.这时候就会生效。


对于上面如果是'单纯的修改hostname是没有问题的'。
但是使用过程中'容易遇到问题'，我们'还可以使用本机ip和hostname绑定'
  


这一行，'把它右边的旧主机名'改'成你的新主机名'即可。'重启网络'
sudo /etc/init.d/networking restart
或则
reboot
重新启动计算机生效
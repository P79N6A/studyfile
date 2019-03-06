配置'SSH无'登陆'验证'，在很多场景下是'非常方便'的，尤其是在'管理大型集群服务时'，
'避免'了繁琐的'密码验证'，在安全级别越高的服务器上，通常密码的设置更复杂，
'配置SSH'，不仅可以'用密钥''保证节点'间'通信的安全'性，同时也'降低'了频繁'输入密码'登陆的'耗时'，
大大'提高'了'管理效率'。散仙写此篇文章，也是给准备入手Hadoop的道友们先做好一个基础的准备，
当然你也可以不配置SSH，只要你愿意频繁输入Slave节点的密码来登陆。
 

1. 'SSH无密码验证的原理' 

'Master'作'为客户端'，要'实现无密码''公钥认证'，'连'接'到服务'器'Salve上时'，
需'要在Master'上'生成'一个'密钥对'，'包括'一个'公钥'和一个'私钥'，而后'将公钥''复制到''所有'的'Salve'上。
当'Master通过''SSH链接'到'Salve'上'时'，'Salve'会'生成'一个'随机数'并'用Master的公钥'对随机数进行'加密'，
并'发送给Master'。Master'收到加密数'之后再用私钥'解密'，并将解密数'回传给Salve'，
Salve'确认解密数无误'之后就'允许Master进行连接'了。这就是一个公钥认证过程，
期间不需要手工输入密码，'重要的过程'是'将Master'上产生的'公钥复制到Salve上'。 


2.SSH无密码登陆的几种关系 

通常情况下，'一个集群服务'下至少'有一个Master'和'若干个Slave'
，那么'无密码登陆'通常'指'的是'由Master到'任意一个'Slave的无验证'的'单向登陆'，
意思就是'只能从Master'登陆'到Slave'是'不需要密码'的，但是如果你想从Slave无验证登陆到Master，
或者你想在Slave与Slave之间进行无验证登陆，这些都是不可行的，除非，
你进行了密钥对的双向验证，才可以双向登陆，我们在这里先不去议论相互间登陆有没有意义，
可能某些情况下或许需要这些方式。 



节点名	IP地址
Master	10.2.143.5
Slave	10.2.143.36


下面开始步入正题，散仙使用的是CentOS6.4版本的，配置的是'2个节点之间'的'双向的SSH无验证登陆'，
其他几种系统的也大同小异，我们首先使用root用户登陆，在'network中修改机器名'，
并在'hosts文件'中'添加映射'信息，然后执行保存退出，'Slave机'按'同样'方法'配置'，具体操作见下图 


然后我们'在Master'，'Slave机'上分别'用root用户''建一个hadoop'用户，
并设置密码，注意用户名，密码保持一致。 


然后，'登入'hadoop'用户'，'执行以下命令'，'生成密钥对'，并'把公钥文件''写入授权文件'中，并赋值权限， 
    'ssh-keygen –t rsa –P '' '
    'cat ~/.ssh/id_rsa.pub >> ~/.ssh/authorized_keys '
    'chmod 600 ~/.ssh/authorized_keys '
最后'切换root'用户，'配置sshd'，取消被注释的公钥字段， 
    'RSAAuthentication yes' # '启用 RSA 认证' 
    'PubkeyAuthentication yes' # '启用公钥私钥配对认证方式'
    'AuthorizedKeysFile .ssh/authorized_keys' # 公钥文件路径（和上面生成的文件同） 
并保存设置，然后重启sshd，即可测试本机的SSH，如下图所示。 




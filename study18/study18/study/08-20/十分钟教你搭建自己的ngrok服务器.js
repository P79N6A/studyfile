内网穿透想必开发过微信的同志都很了解，大部分人选择网上寻找各种现成的，
比如ngrok官网、ittun-ngrok、sunny-ngrok或者花生壳之类的。
但是世界上没有免费的午餐，要不就是收费，
要不就是免费但是偶尔会出现连接失败的问题（当然大多数时间是没有问题的）。

偶然，正在测试微信的某些功能，但是正在使用的ittun-ngrok连接失败了。
导致测试无法进行，最终萌生出自己搭建一个ngrok服务器的想法。

'1、必要条件'
（1）'服务器'，'用来搭建ngrok的服务器'，'必须有公网ip'，并且'可以正常访问'
（本次测试使用的是'Ubuntu 16.04 64位'）。 
（2）'域名'，用来'生成访问域名'。

'2、安装git 和Golang'
apt-get install build-essential golang mercurial git
'Golang，Go语言支持'，因为'Ngrok是基于Go语言编写的'

'3、下载源码'，当然也'可以不安装git'，'但是需要手动上传代码到需要的位置'。
'此处使用非官方地址'，'修复了部分包无法获取'（摘自网络）
git clone https://github.com/tutumcloud/ngrok.git ngrok


下载下来的目录结构 


'4、生成自签名证书'
'使用ngrok.com官方服务时'，我们'使用的是''官方的SSL证书'。'自建ngrokd服务'，'如果不想买SSL证书'，
我们'需要生成''自己的自签名证书'，'并编译一个''携带该证书的ngrok客户端'。

'证书生成过程'需'要一个NGROK_BASE_DOMAIN'。 '以ngrok官方随机生成的地址xxx.ngrok.com为例'，
'其NGROK_BASE_DOMAIN'就'是“ngrok.com”'，'如果你要提供服务的地址为''“example.ngrok.xxx.com”'，
那'NGROK_BASE_DOMAIN就应该 是''“ngrok.xxx.com”'。本次测试，'由于没有多余的域名'，
我'替换成自己的二级域名''“weixin.yangjiace.xyz”'。

cd ngrok

NGROK_DOMAIN="weixin.yangjiace.xyz"

openssl genrsa -out base.key 2048

openssl req -new -x509 -nodes -key base.key -days 10000 -subj "/CN=$NGROK_DOMAIN" -out base.pem

openssl genrsa -out server.key 2048

openssl req -new -key server.key -subj "/CN=$NGROK_DOMAIN" -out server.csr

openssl x509 -req -in server.csr -CA base.pem -CAkey base.key -CAcreateserial -days 10000 -out server.crt

'执行完成后'需'要替换证书'

cp base.pem assets/client/tls/ngrokroot.crt

'5、编译'
make release-server release-client

'编译成功后'会'在bin目录下找到ngrokd和ngrok'这'两个文件'。其中'ngrokd' 就'是服务端程序'了。 

'6、启动服务端'
./bin/ngrokd -tlsKey=server.key -tlsCrt=server.crt -domain="weixin.yangjiace.xyz" 
	-httpAddr=":80" -httpsAddr=":443"

'httpAddr、httpsAddr' 分别'是 ngrok 用来转发 http、https 服务的端口'，'可以随意指定'。
'ngrokd' 还'会开一个 4443 端口'用来'跟客户端通讯'（可'通过 -tunnelAddr=”:xxx” 指定'）。
'由于微信限制不能出现端口号'，'因此这个使用了80、443端口'。

'7、编译客户端'
（1）windows
GOOS=windows GOARCH=amd64 make release-client  
（2）mac

GOOS=darwin GOARCH=amd64 make release-client
'执行对应的命令''会在bin目录下''生成相对应的windows、mac目录'，'ngrok.exe就存放在对应目录下。'
'将对应的ngrok.exe下载到本地'。

'8、设置本地客户端'
（1）'在同级目录'下'新建一个配置文件ngrok.cfg'
server_addr: "weixin.yangjiace.xyz:4443"  
trust_host_root_certs: false  

（2）'同级目录下''新建一个启动脚本startup.bat'
@echo on
cd %cd%
#ngrok -proto=tcp 22
#ngrok start web
ngrok -config=ngrok.cfg -log=ngrok.log -subdomain=yjc 8080

其中，'-config''指向配置文件'，'-log''存放日志文件位置'，'-subdomain为自定义的域名前缀'。
'8080为端口号'。

（3）'启动'，'点击启动脚本startup.bat完成启动'。 

9、'设置为系统程序'，'并后台运行'。

'服务器在运行ngrok时'，'如果关闭会话窗口'，'会导致服务中断'，很显然这不是我们想要的结果，
我们需要服务不断的在后台运行，当需要的时候在停止。

'在/etc/systemd/system/''目录下创建服务ngrok.service'，内容为

[Unit]
Description=ngrok
After=network.target

[Service]
ExecStart=/myweb/ngrok/bin/ngrokd -tlsKey=/myweb/ngrok/server.key 
-tlsCrt=/myweb/ngrok/server.crt -domain="weixin.yangjiace.xyz" 
	-httpAddr=":80" -httpsAddr=":443"

[Install]
WantedBy=multi-user.target

其中要'根据自己的实际目录''修改相对应的目录'。

这样我们'就可以了通过systemctl start ngrok.service启动服务'。然后就可以愉快的玩耍了。


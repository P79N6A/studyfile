1、安装Postman
1
下载postman，这里提供两种方式。
1、通过postman官方网站直接点击百度搜索“postman”
就可以找到。
点击“get it now it's free!”进入chrome商店下载
注意：chrome商店需要到“墙外”在才能下载。
如何在Chrome下使用Postman进行rest请求测试
2
'2、离线安装：'
文件已经放在百度云上：
'链接: http://pan.baidu.com/s/1bni9Dzp 密码: kkgb'
解压下载的文件“Postman-REST-Client_v0.8.1”，内容文件结构如下：
如何在Chrome下使用Postman进行rest请求测试
3
'打开Chrome，依次选择“选项”>>"更多工具">>“扩展程序”'，
'也可以在地址栏里直接输入：“chrome://extensions/”'
打开后如下图
'勾选“开发者模式”'
'然后点击“加载已解压的扩展程序”，选择刚才我们下载并解压出来的文件夹。'
如何在Chrome下使用Postman进行rest请求测试
如何在Chrome下使用Postman进行rest请求测试
4
安装好后如图：
如何在Chrome下使用Postman进行rest请求测试
END
2、进行Restful请求测试
打开chrome的“应用”，或者直接在地址栏里输入“chrome://apps/”也可以打开应用页面
打开postman
如何在Chrome下使用Postman进行rest请求测试
Get请求：
在地址栏里输入请求url：http://localhost:9998/api/user
选择“GET”方式，
点击"Url params",添加url params key:id , value:1
点击“send”得到json数据如下：
如何在Chrome下使用Postman进行rest请求测试
如果想要Post请求：
在地址栏里输入请求url：http://localhost:9998/api/user/1
选择“POST”方式，
点击"application/x-www-form-urlencoded",
添加key:name , value:baidu-lulee007
添加key:sex , value:man
如何在Chrome下使用Postman进行rest请求测试
注意：请求支不支持post请求是由服务端决定。
如果服务端需要请求类型为json，需要在“headers”添加
key:Content-Type   , value:application/json
选择“raw”,并添加：
{
    "id": 1,
    "data": {
        "name": "baidu-lulee007",
        "sex": "man"
    }
}
如何在Chrome下使用Postman进行rest请求测试步骤阅读

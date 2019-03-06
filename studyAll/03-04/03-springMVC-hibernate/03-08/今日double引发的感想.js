今天启动项目报这个错
//com.alibaba.dubbo.rpc.RpcException: Failed to invoke the method save in
这是因为controller模块调用double资源的版本没有对应造成的

在项目的配置文件中会'有一些公共变量'这些会'单独拿出来写'
比如'数据库的连接'
比如'版本号'

由于'double的版本'号是'在常量文件中的'，所有'在调用{$Double.version}时''调用不到'
需'要比对版本是否对应'这时候要找到管理这个常量的文件，修改成一个版本就可以了
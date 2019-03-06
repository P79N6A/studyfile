https://blog.csdn.net/aduocd/article/details/47415741

目的：使'用JMeter''做接口测试'，输入'参数格式为JSON'

步骤：

1.'添加线程组'、'HTTP请求''默认值'、'察看结果树'等参考《JMeter实现bugfree登录接口测试》。
这里不再赘述。

2.'添加HTTP请求'
  在Body Data中写上输入的参数。参数的格式为JSON。

3. 此时如果直接运行会出现如下报错。
这是因为，JMeter中传递JSON格式的参数时，需要在“HTTP信息头管理器”中添加信息头。

4. 添加“HTTP信息头管理器”。

5.再次运行，结果正确。

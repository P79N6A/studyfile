https://www.cnblogs.com/jiu0821/p/5986164.html

在http Load Testing 中，json数据的提交是个让人头疼的问题。
本文详细介绍'如何进行JMeter的json测试提交'，以及'如何将其参数化'。

Step 1 http json 请求'采样器的录制'
这个工具很多，可以使用 JMeter 代理录制，也可以使用 Badboy。

Step 2 '为该采样器''添加 HTTP 信息管理器'
鼠标右击该采样器，右键菜单选择 "添加" -> 配置元件 -> HTTP 信息头管理器，
然后信息头添加一条名称为 Content-Type，值为 application/json 即可：

添加好 HTTP 信息管理器之后，选中该采样器，编辑其 Content encoding 为 UTF-8：

Step 3 为该采样器添加响应断言
比如请求返还的 json 串里，"status":0 代表处理成功，
status 值为其他表示各种处理失败。那么鼠标右击该采样器，
右键菜单选择 "添加" -> 断言 -> 响应断言，要测试的响应字段选中 "响应文本"，
模式匹配规则选中 "Substring"，要测试的模式添加并编辑其内容为 "status":0。

Step 4 编辑采样器的 json 格式
选中该采样器，Parameters 叶项里复制该 json 串，然后点击 Body Data 叶项，
粘贴该 json 串于其中的输入域中(关于 json 串的提取，可以使用 Badboy 自己录制的，
也可以使用 Chrome 浏览器自带工具 "JavaScript 控制台 - Network" 进行捕捉)，
最后调整 json 数据的展现格式如下图所示：

这时可以进行 http json 提交了，但是数据还都是写死的。
那么怎么样把这些 json 数据参数化呢，就像其他非 json 提交的采样器一样？

Step 5 使用函数将 http json 数据参数化
 像其他采样器一样使用函数助手生成一个引用字符串，比如

${__Random(0,9,random_num_0_9)}

，它的作用是随机生成 0 - 9 之间的一个数字。
 然后编辑 Body Data 里的 json 串里需要参数化的地方，使用

${__Random(0,9,random_num_0_9)}

覆盖需要参数化的部分：

Step 6 使用 CSV Data Set Config 将 json 数据参数化
右键单击 Thread Group，右键菜单选择 "添加" -> 配置元件 -> 
CSV Data Set Config，Filename 输入 
e:/defonds/work/20141105/json.txt(要使用绝对路径)，
Variable Names 输入 cityCode,cityName,subCategoryCode,subCategoryName，
编辑 e:/defonds/work/20141105/json.txt 内容如下图所示：

最后编辑 Body Data 里的 json 串里需要参数化的地方，
使用 ${cityCode} 等参数覆盖需要参数化的部分：

这时候你就可以使用参数化的 json 串进行压力测试啦：

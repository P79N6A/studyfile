网址资料	http://www.open-open.com/lib/view/open1438785141958.html

请假为例
1.员工使用账户登录系统——'点击请假——上级登录系统点击允许'；
请假记录,会在自动录入电脑

定义：将'一组任务'组织起来以'完成某个经营'过程

定义了任务的'触发顺序'和'触发条件'，'每个任务'可以'由一个或多个软件系统完成'，
也可以由'一个或一组人'完成，还可以由一个或多个人与软件系统协作完

//类似如下
提交申请--审批【部门经理】--审批【总经理】

在Java领域，Activity是主流的工作流系统
（Activity的开发者是从Jbpm开发者出来的）

activity工作流学习要点
1.1个插件
在Eclipse中安装Activity插件，让你可以在Eclipse中绘制Activity工作流图

2. 1个引擎
ProcessEngine对象，Activity工作流引擎。这是Activiti工作的核心。
负责生成流程运行时的各种实例及数据、监控和管理流程的运行。
所有的操作都是从获取引擎开始的，所以一般会把引擎作为全局变量
ProcessEngine processEngine =ProcessEngines.getDefaultProcessEngine();

3. 1个配置文件
activiti.cfg.xml。Activiti核心配置文件，
配置流程引擎创建工具的基本参数和数据库连接池参数

4. 5种数据库表
Activiti的后台是有数据库的支持，所有的表都以ACT_开头。 第二部分是表示表的用途的两个字母标识。用途也和服务的API对应。

ACT_RE_*: 'RE'表示repository。 这个前缀的表包含了流程定义和流程静态资源（图片，规则，等等）。

ACT_RU_*: 'RU'表示runtime。 这些运行时的表，包含流程实例，任务，变量，异步任务，等运行中的数据。 Activiti只在流程实例执行过程中保存这些数据，在流程结束时就会删除这些记录。 这样运行时表可以一直很小速度很快。

ACT_ID_*: 'ID'表示identity。 这些表包含身份信息，比如用户，组等等。

ACT_HI_*: 'HI'表示history。 这些表包含历史数据，比如历史流程实例，变量，任务等等。

ACT_GE_*: 通用数据，用于不同场景下，如存放资源文件。

5. 23张表
不同的表存放不同方面的数据，有流程定义表、任务结点表、流程变量表、任务历史表等等。

6. 5项Service
不同的Service类对应不同的功能。
比如TaskService，是activiti的任务服务类。可以从这个类中获取任务的信息。
而HistoryService，则是activiti的查询历史信息的类。在一个流程执行完成后，
这个对象为我们提供查询历史信息。

7. 7项基本操作
设计流程图（各种组件，如连线、用户任务、网关）
流程定义增删改查
流程变量增删改查
启动流程定义
任务增删改查
完成任务
历史信息查询


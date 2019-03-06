先'启动zk'
再'启动SsoServerStart'
再'启动ApiJettyStarter'

'开发者模式'下'启用postman'检查接口

've-api' '其他外部服务'（如 APP服务器）
通过'http协议'对外'发布restful接口': {“status”:”ok”,”result”:{},”reason”:””}
've-web' '提供界面供浏览器访问'


'v-comm-util'(工具类)
'v-model'(bean)
'v-service'（接口层）


've-venue' 场馆、约赛、门票、拍卖、教练 等信息管理服务
've-order' 订单、支付系统
've-judge' 用户评论系统
've-sso' 用户信息管理服务、 注册、登陆认证服务
've-job' 定时任务、 自动处理 系统


zookeeper 管理服务注册、发 现；服务负载均衡。


1.一个bean
2.一个dao
3.一个dao映射文件   *Mapper  注意 resultMap 中 jdbcType必须大写
4.一个service（写在service层）  需要注册到 spring-office-reference.xml文件中
5.一个service对应实现  @Service("")  调用spring serveice注解
6.一个service对应代理  @Service 调用pay1 serveice注解  @Resource(name = "userServiceImpl")'这里是serviceImpl'  private UserService userServiceImpl;
7.一个controller调用service（写在api或者web层）调用资源使用pay1 @Reference private ChnAreaService chnAreaService;

spring mvc 支持REST风格的请求方法，GET、POST、PUT和DELETE四种请求方法分别代表了数据库CRUD中的select、insert、update、delete，
主键生产策略:调用 StringUtils.uuid19();



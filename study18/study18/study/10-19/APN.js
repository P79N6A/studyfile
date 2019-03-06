
实现'主动推送'，还是需要结合我们应用的业务逻辑来判断具体什么时候、推送什么信息
这里就详细介绍下'Java服务器端''调用JPushAPI'

工具/原料
JPush相关包
方法/步骤
去下载jpush服务端sdk。

如果使用maven直接在pom.xml中加入对应的依赖包

在原有的基础上加上：

<dependency>

           <groupId>com.google.code.gson</groupId>

           <artifactId>gson</artifactId>

           <version>2.2.4</version>

       </dependency>

  <dependency>

      <groupId>cn.jpush.api</groupId>

      <artifactId>jpush-client</artifactId>

      <version>3.2.3</version>

  </dependency>

  <dependency>

    <groupId>net.sf.json-lib</groupId>

    <artifactId>json-lib</artifactId>

    <version>2.4</version>

    <classifier>jdk15</classifier>

   </dependency>

Java服务端调用JPushAPI
使用推送的关键在于构建PushPayload

先构建一个推送所有平台、所有设备的推送对象

public static PushPayload buildPushAllPayload(String alert) {

        return PushPayload.alertAll(alert);

}

Java服务端调用JPushAPI
因为IOS和Android通知的显示形式不一样，所以我们这两者分开写，分别单独推送。

根据别名、内容、标题，构建一个推送IOS平台的推送对象

这里可以对别名进行统一处理，譬如jpush不支持别名中含点号，而我们的账号中都是含有点号的，这里就可以统一替换，而不用每次调用时替换

同样在客户端登陆时需要把点号换成"_"进行设置别名。

public static PushPayload buildIOSPayload(String alias,String alert) {

        return PushPayload.newBuilder()

                .setPlatform(Platform.ios_winphone())

                .setAudience(Audience.alias(alias.replace(".", "_")))

                .setNotification(Notification.newBuilder()

                .setAlert(alert)

                .build())

                 .build();

    }

Java服务端调用JPushAPI
根据别名、内容、标题，构建一个推送Android和windows phone平台的推送对象

public static PushPayload buildAndroidWinphonePayload(String alias,

    String alert,String title) {

        return PushPayload.newBuilder()

                .setPlatform(Platform.android())

                .setAudience(Audience.alias(alias.replace(".", "_")))

                .setNotification(Notification.newBuilder()

                .setAlert(alert)

                .addPlatformNotification(AndroidNotification.newBuilder()

                .setTitle(title).build())

                .build())

                 .build();

    }

Java服务端调用JPushAPI
测试

写个main方法测试下如何吧

appKey、masterSecret对应你的应用申请的key和secret

这时候我们传别名的时候，可以直接用原有的包含“.”的账号

Java服务端调用JPushAPI
如果别名不存在，会抛出异常。 Your request params is invalid.

用对应的账号登陆下客户端，这时JPush才知道别名对应哪个设备，再发送ok成功了。去设备上看下结果

Java服务端调用JPushAPI
Java服务端调用JPushAPI
移动设备显示效果

这是Android的显示效果，内容只会显示部分，而IOS可以显示内容详情，

所以有时才有需求要根据平台分别推送。

Java服务端调用JPushAPI
注意项：

发个不同平台分别推送的部分代码

如果你的账号只登陆了一个IOS设备，推送Android平台时就会抛异常，所以两个推送不能写在一个异常处理块中，同样这样异常信息也不用处理啦，太多啦。。。

Java服务端调用JPushAPI
END
经验内容仅供参考，如果您需解决具体问题(尤其法律、医学等领域)，建议您详细咨询相关领域专业人士。
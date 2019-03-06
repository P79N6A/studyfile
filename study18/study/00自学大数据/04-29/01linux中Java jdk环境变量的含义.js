环境变量详解

JAVA_HOME 用于'指定JDK'的'主目录'
JRE_HOME 用于'指定JRE'的'主目录'
'CLASSPATH' 有什么作用呢？'编java程序'的时候会'用到import'， 当'要用的class'，
'在某'一个.'jar下'时，你'需要'在'编译时引入'，'jvm'自动'去找CLASSPATH'环境变量引入'下面的jar'包， 
这就是CLASSPATH环境变量的作用。
'PATH'用于'指定系统''查找命令'的'路径'，我们在'命令行'中的一个'命令敲下'去，
'系统会在''PATH'指定'的目录中'去'寻找'这个'命令'，如果找到了就执行，'找不到'就'报错'，
就是我们常见的”Command not found ”，所以我们要'要用到的java'和'javac等工具'路径'添加到PATH中'。
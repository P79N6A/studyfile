在Eclipse中向远程git提交代码时，在'Unstaged Changes''未提交'列表中
'显示'如.buildpath、  .project、.classpath、 .prefs 、.metadata 、.MF
后后缀的文件是我们'不需要提交'的，并且还很多这些文件，'影响'我们'查看'
自己更改或新写的代码文件，很烦人吧。

去除方法：

1.打开Navigator视图（不是我们写代码常用的Project Explorer的视图（此视图就是我们的Workspace））
如果找不到'Navigator'视图：'Windows——Show View——Navigator'

2.在项目的顶级目录里'找到'全名为'.gitignore'的配置文件（没有就自己新建一个.gitignore的空白文件），

注意：'顶级项目''没'有'.gitignore'配置文件也'需要新建一个'，比如cms-cms项目，'不然''有些'文件还是'过滤不掉'



3.打开此文件一般里面'一般有'内容：'/target/'

没有此内容或者是有其他内容不管他，回车，在后面追加如下内容：

.buildpath
.project
.settings/
META-INF/
.externalToolBuilders/
.classpath
.prefs
.metadata
.MF
.component
.jsdtscope
.container
.name
.launch
.gitignore

.checkstyle

.externalToolBuilders/



上面的列表就是git提交代码时忽略所有匹配到这些后缀的文件，你也可以在上面追加其他里不想提交的内容

版权声明
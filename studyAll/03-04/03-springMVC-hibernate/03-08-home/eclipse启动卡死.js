eclipse启动无响应，停留在Loading workbench状态
   做开发的同学们或多或少的都会遇到eclipse启动到一定程度时，就进入灰色无响应状态再也不动了。启动画面始终停留在Loading workbench状态。反复重启，状态依旧。

   多数情况下，应该是非正常关闭eclipse工作区的文件状态错误所导致的。

   在工作区目录中，有一个.metadata目录，里面是工作区及各插件的信息，删除此目录，再重启eclipse，果然可以正常启动eclipse了，但原来工作区的配置和项目信息也都消失，直接显示的是eclipse欢迎界面。 

   那么怎么做才能保证之前的配置不丢失呢？这时想到启动停止时显示的状态:"Loading workbench"，看来和这个workbench插件有关。查看工作空间中的.metadata/.plugins目录，在众多文件夹中 
	com.collabnet.subversion.merge          org.eclipse.search 
	org.eclipse.compare                           org.eclipse.team.core 
	org.eclipse.core.resources                  org.eclipse.team.cvs.core 
	org.eclipse.core.runtime               org.eclipse.team.ui 
	org.eclipse.debug.core                 org.eclipse.ui.ide 
	org.eclipse.debug.ui                   org.eclipse.ui.intro 
	org.eclipse.dltk.core                    org.eclipse.ui.views.log 
	org.eclipse.dltk.core.index.sql.h2     org.eclipse.ui.workbench 
	org.eclipse.dltk.ui                           org.eclipse.ui.workbench.texteditor 
	org.eclipse.epp.usagedata.recording    org.eclipse.wb.discovery.core 
	org.eclipse.jdt.core                             org.eclipse.wst.internet.cache 
	org.eclipse.jdt.ui                                 org.eclipse.wst.jsdt.core 
	org.eclipse.ltk.core.refactoring          org.eclipse.wst.jsdt.ui 
	org.eclipse.ltk.ui.refactoring            org.eclipse.wst.jsdt.web.core 
	org.eclipse.m2e.core                    org.eclipse.wst.sse.ui 
	org.eclipse.m2e.logback.configuration  org.eclipse.wst.validation 
	org.eclipse.mylyn.bugzilla.core        org.eclipse.wst.xml.core 
	org.eclipse.mylyn.tasks.ui             org.tigris.subversion.subclipse.core 
	org.eclipse.php.core                   org.tigris.subversion.subclipse.graph 
	org.eclipse.php.ui                     org.tigris.subversion.subclipse.ui 

发现了两个： org.eclipse.ui.workbench 和org.eclipse.ui.workbench.texteditor。删了这两个目录，重新启动eclipse。正常启动且原项目信息正确加载。
1、项目上右键 ——> 'Team ——> pull'
如果报错：
依次打开：Window ——> Preferences ——> Team ——> Git ——> 
Configuration ——> Respostitory Settings ——> Location
后面的Open打开

打开之后添加内容：

[branch "master"] 
    remote = origin 
    merge = refs/heads/master 
[remote "origin"] 
    "url = 自己的Git地址"
    "fetch = +refs/heads/*:refs/remotes/origin/* "
        
2、再次在项目上右键 ——> 'Team ——> pull'，就可以下载最新代码了。
如果已经是最新代码则会显示Nothing to update


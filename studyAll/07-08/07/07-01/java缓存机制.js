1.'通过文件缓存'：把'数据存储在磁盘上'，最好做一下'序列化与反序列化'

2.'内存缓存'，也就是'实现一个类中静态Map'，'对这个Map进行常规的增删改查'
由于在'内存溢出需要删除早期的缓存'，这就要求'保存创建时间'
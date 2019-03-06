'group有两种用法，一是以组为单位',并没有聚合函数
//SELECT c.id,c.udream_nickname customerName,c.sex ,c.mobile FROM user c  group by c.id

'二是按组做计算'，带有聚合函数
//select class,count(*) from students group by class

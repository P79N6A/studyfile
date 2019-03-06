/*(?queryEndYear is null or (substr(t.pm_msg_sub_time,1,10)<=?queryEndYear) )*/
'oralce'中'截取字符'的'函数''substr'（字段，起始位1开始，长度）
'substr'('clumon','staIndex','length');
'tochar'把'字段类型'转'化为string型'  把字段转化为String型
to_char(sysdate,'yyyy-mm-dd hh24:mi:ss');to_char(clu,'filter');
to_char(clumo,'yyyy-mm-dd hh24:mi:ss');to_char(clumon,fler);
'Union'和'Union All'的区别 
Union 'Union 对结果''做了合并处理 Union' 
Union All '没有对结果''做去重处理' 'Union All 效率更好'
select * from student where id<4 union select * from student where t.id>2 and id<4
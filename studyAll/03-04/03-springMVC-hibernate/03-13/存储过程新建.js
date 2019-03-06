//在mysql中执行存储过程需要动点手脚，就是使用delimiter
//在下面delimiter是吧；转化为//的意思

delimiter//
create procedure pro_getname(name varchar(50))
begin
	start transaction;
	update t_barber set en_name =name  where user_id='13434785279';
commit;
select * from t_barber where en_name='张飞';
end//


//这是一个把用户13434785279改名的存储过程
//delimiter
//在下面delimiter是转化';'用的

delimiter//
create procuedure p(name varchar(50))
begin
	start transaction;
	update t_barber set en_name =name where user_id='13434785279';
commit;
end//

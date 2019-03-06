DELIMITER//
CREATE PROCEDURE pro_X(pId int(9),name varchar(50))
BEGIN
DECLARE areaId VARCHAR(255);-- 发型师编号
DECLARE areaName VARCHAR(255);-- 发型师名字
DECLARE areaStatus VARCHAR(255);  -- 门店Id
DECLARE count VARCHAR(255);  -- 总数
DECLARE done INT DEFAULT FALSE;
DECLARE cur CURSOR FOR   
SELECT
t_areainfo.id areaId,
t_areainfo.`name` areaName,
t_areainfo.`status` areaStatus
FROM
t_areainfo;  -- 游标查询记录转给临时表

DECLARE CONTINUE HANDLER FOR SQLSTATE '02000' SET done = 1;-- 申明游标找不到值时，停止循环

CREATE TEMPORARY TABLE `temp_orderlist` (
		`barberId` LONG COLLATE utf8_unicode_ci DEFAULT NULL,  -- 编号
		`barberName` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,-- 发型师名字
		`storeId` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,-- 门店Id
		`count` decimal(10,0) DEFAULT NULL -- 总量
)ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

OPEN cur;
read_loop: LOOP
	FETCH cur INTO areaId,areaName,areaStatus;
	IF done THEN
				LEAVE read_loop; -- LEAVE label用来退出任何被标注的流程控制结构它和BEGIN ... END或循环一起被使用
	END IF;
	set @count =(select count(o.id) from t_areainfo o where o.parentId=pId);
	INSERT INTO temp_orderlist()values(areaId,areaName,areaStatus,@count);
END LOOP;
CLOSE cur;
set @sql = CONCAT('SELECT * from temp_orderlist o',' where 1=1');

prepare strsql from @sql;
execute strsql;
deallocate prepare strsql;
drop TEMPORARY table temp_orderlist;

COMMIT;
END//

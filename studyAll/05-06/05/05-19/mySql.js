NOW()函数 '返回当前日期和时间'; 2008-12-29 16:25:46

CURDATE()函数 '仅仅返回当前日期'; 2008-12-29

CURTIME()函数 '仅仅返回当前时间'; 16:25:46

select now(),curdate(),curtime();

CREATE TABLE ORDERS
{
	ORDERID INT NOT NULL,
	PRODUCTNAME VARCHAR(50) NOT NULL,
	QRDERDATE DATETIME NOT NULL DEFAULT NOW(),
	PRIMARY KEY(ORDERID)
}


oracle 是sysdate
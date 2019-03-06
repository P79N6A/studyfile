with resultTable as

WITH语句'不允许嵌套'，之前定义的WITH语句可以在它后面的任何一个WITH语句中使用
 
WITH <alias_name> AS (subquery_sql_statement)
SELECT <column_name_list> FROM <alias>;
 
exp： 
WITH A AS
	(SELECT * FROM DUAL)
SELECT * FROM A;
定义了'with'语句'必须''在后文中''使用'
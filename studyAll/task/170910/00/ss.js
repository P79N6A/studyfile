有一个查询如下：

1	SELECT c.CustomerId, CompanyName  
2	FROM Customers c  
3	WHERE EXISTS(  
4	    SELECT OrderID FROM Orders o  
5	    WHERE o.CustomerID = cu.CustomerID)  
这里面的'EXISTS是如何运作'呢？'子查询''返回的是''OrderId字段'，可是'外面的查询要找的是''CustomerID和CompanyName字段'，
这两个字段肯定不在OrderID里面啊，这是如何匹配的呢？

'EXISTS'用于检'查子查询''是否至少会''返回一行数据'，该子查询实际上并不返回任何数据，而是'返回值True或False。'

EXISTS '指定一个子查询，检测行的存在'。语法：'EXISTS subquery'。参数 subquery 是'一个受限的 SELECT 语句'
（不允许有 COMPUTE 子句和 INTO 关键字）。'结果类型为 Boolean'，如果'子查询包含行'，则'返回 TRUE'。

在'子查询中使用 NULL 仍然返回结果集'
这个例子在'子查询中指定 NULL'，并'返回结果集'，通过使用' EXISTS 仍取值为 TRUE'。

1	SELECT CategoryName
2	FROM Categories
3	WHERE EXISTS (SELECT NULL)
4	ORDER BY CategoryName ASC
比较使用 EXISTS 和 IN 的查询
这个例子'比较了两个语义类似的查询'。第一个查询使用 EXISTS 而第二个查询使用 IN。注意两个查询返回相同的信息。

1	SELECT DISTINCT pub_name
2	FROM publishers
3	WHERE EXISTS
4	    (SELECT *
5	    FROM titles
6	    WHERE pub_id = publishers.pub_id
7	    AND type = 'business')
1	SELECT distinct pub_name
2	FROM publishers
3	WHERE pub_id IN
4	    (SELECT pub_id
5	    FROM titles
6	    WHERE type = 'business')
比较使用 EXISTS 和 = ANY 的查询
本示例显示查找与出版商住在同一城市中的作者的两种查询方法：第一种方法使用 = ANY，第二种方法使用 EXISTS。注意这两种方法返回相同的信息。

1	SELECT au_lname, au_fname
2	FROM authors
3	WHERE exists
4	    (SELECT *
5	    FROM publishers
6	    WHERE authors.city = publishers.city)
1	SELECT au_lname, au_fname
2	FROM authors
3	WHERE city = ANY
4	    (SELECT city
5	    FROM publishers)
比较使用 EXISTS 和 IN 的查询
本示例所示查询查找由位于以字母 B 开头的城市中的任一出版商出版的书名：

1	SELECT title
2	FROM titles
3	WHERE EXISTS
4	    (SELECT *
5	    FROM publishers
6	    WHERE pub_id = titles.pub_id
7	    AND city LIKE 'B%')
1	SELECT title
2	FROM titles
3	WHERE pub_id IN
4	    (SELECT pub_id
5	    FROM publishers
6	    WHERE city LIKE 'B%')
使用 NOT EXISTS
NOT EXISTS 的作用与 EXISTS 正相反。如果子查询没有返回行，则满足 NOT EXISTS 中的 WHERE 子句。本示例查找不出版商业书籍的出版商的名称：

1	SELECT pub_name
2	FROM publishers
3	WHERE NOT EXISTS
4	    (SELECT *
5	    FROM titles
6	    WHERE pub_id = publishers.pub_id
7	    AND type = 'business')
8	ORDER BY pub_name
又比如以下 SQL 语句：

1	select distinct 姓名 from xs
2	where not exists (
3	select * from kc
4	where not exists (
5	select * from xs_kc
6	where 学号=xs.学号 and 课程号=kc.课程号
7	)
把最外层的查询xs里的数据一行一行的做里层的子查询。

中间的 exists 语句只做出对上一层的返回 true 或 false，因为查询的条件都在 where 学号=xs.学号 and 课程号=kc.课程号这句话里。每一个 exists 都会有一行值。它只是告诉一层，最外层的查询条件在这里成立或都不成立，返回的时候值也一样回返回上去。直到最高层的时候如果是 true（真）就返回到结果集。为 false（假）丢弃。

1	where not exists
2	select * from xs_kc
3	where 学号=xs.学号 and 课程号=kc.课程号
这个 exists 就是告诉上一层，这一行语句在我这里不成立。因为他不是最高层，所以还要继续向上返回。

select distinct 姓名 from xs where not exists （这里的 exists 语句收到上一个为 false 的值。他在判断一下，结果就是为 true（成立），由于是最高层所以就会把这行的结果（这里指的是查询条件）返回到结果集。

几个重要的点：

最里层要用到的醒询条件的表比如:xs.学号、kc.课程号等都要在前面的时候说明一下select * from kc,select distinct 姓名 from xs
不要在太注意中间的exists语句.
把exists和not exists嵌套时的返回值弄明白
生命只有一次。
//所用数据：
SELECT a.deptno, a.employename, a.salary
  FROM t_salary a

000001         李可                        1000
000001         李强                        2000
000001         杨彦军                      4000
000002         童家道                      3000
000002         姜文                        3000
000002         罗文                        3000
000003         窨嫡                        3000
000003         童家道                      3000
000003         童家道                      3000
000004         于名                        4000


//'sum()over()'分组统计函数			可以'返回多条记录'，'不同于聚合函数'，'返回减少条记录'
//使用代码：'PARTITION 是英语区分的意思'
SELECT A.deptno, A.employename,A.salary,
--1 '按照名称''进行分区'，'同时按照''名称进行合计' 		合计
SUM(A.salary)OVER(PARTITION BY A.employename) AS SUM_INC_ONLY,
--2 '按照名称进行累计'  累加
SUM(A.salary)OVER(ORDER BY A.employename) AS SUM_INC,
--3   和 1 效果相同 
SUM(A.salary)OVER(PARTITION BY A.employename ORDER BY A.employename) AS SUM_INC_NAME,
--4 '按照部门分组'，'部门内进行合计'。'名称相同时进行累计' 
SUM(A.salary)OVER(PARTITION BY A.deptno ORDER BY A.employename) AS SUM_INC_DEP,
--5 '按照部门,名称分组，部门名称相同时进行合计' 
SUM(A.salary)OVER(PARTITION BY A.deptno,A.employename ) AS SUM_INC_DEP_NAM
FROM t_salary A


所得结果：													1.							2.					3.								4.						5.
DEPTNO     EMPLOYENAME     				SALARY     	 SUM_INC_ONLY     			  SUM_INC     		SUM_INC_NAME     				SUM_INC_DEP     SUM_INC_DEP_NAM
000002     		姜文    					3000    		3000    					3000    			3000    						3000    				3000
000001     		李可    					1000    		1000    					4000    			1000    						1000    				1000
000001     		李强    					2000    		2000    					6000    			2000    						3000    				2000
000002     		罗文    					3000    		3000    					9000    			3000    						6000    				3000
000002     		童家道    				3000   		    9000    					18000    			9000    						9000    				3000
000003     		童家道    				3000    		9000   						18000    			9000    						6000    				6000
000003     		童家道    				3000    		9000   						18000    			9000    						6000    				6000
000001     		杨彦军    				4000    		4000   						22000    			4000    						7000    				4000
000004     		于名    					4000    		4000   						26000    			4000    						4000    				4000
000003     		窨嫡    					3000    		3000   						29000    			3000    						9000    				3000


'SUM()OVER(partition by)'函数介绍
'开窗函数'          
     Oracle从8.1.6开始提供分析函数，'分析函数用于计算基于组的'某种'聚合值'，
     它'和聚合函数的不同之处'是：对于'每个组返回多行'，而'聚合函数对于每个组只返回一行'。
  
     
1：over后的写法：
     over（order by salary） 按照salary排序进行'累计'，'order by是'个'默认的开窗函数'
     over（partition by deptno）按'照部门分区'
     over（partition by deptno order by salary）
     
2：开窗的窗口范围：
     over（order by salary range between 5 preceding and 5 following）
     '窗口范围'为'当前行数据幅度减5加5'后'的范围内的'。


//sum(s)over(order by s range between 2 preceding and 2 following) 表示加2减2的范围内的求和

select name,class,s, sum(s)over(order by s range between 2 preceding and 2 following) mm from t2
    name	 class   s         mm
    adf        3        45        45  --45加2减2即43到47，但是s在这个范围内只有45
    asdf       3        55        55
    cfe         2        74        74
    3dd        3        78       158 --78在76到80范围内有78，80，求和得158
    fda         1        80       158
    gds        2        92        92
    ffd         1        95        190
    dss         1        95       190 
    ddd        3        99       198
    gf           3        99       198
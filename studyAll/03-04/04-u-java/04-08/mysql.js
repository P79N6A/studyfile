select b.id as id,b.nickname as name,
b.sex as sex, 
(select ifnull(sum(money),0) from t_order o where o.barber_id = b.id)
from t_barber b 
order by b.id desc
//在这个sql中，是直接查中间表作为一个字段，而不是在关联条件中做关联的mysql中可行，oracle中不清楚

ifnull类似oracle中的nvl
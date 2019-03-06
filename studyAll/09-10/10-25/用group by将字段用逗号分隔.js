with temp as(
  select 'China' nation ,'Guangzhou' city from dual union all
  select 'China' nation ,'Shanghai' city from dual union all
  select 'China' nation ,'Beijing' city from dual union all
  select 'USA' nation ,'New York' city from dual union all
  select 'USA' nation ,'Bostom' city from dual union all
  select 'Japan' nation ,'Tokyo' city from dual
)
select nation,listagg(city,',') within GROUP (order by city)
from temp
group by nation;

基础语法：'LISTAGG(XXX,XXX) WITHIN GROUP( ORDER BY XXX)';

listagg()函数可以实现'多列记录聚合为一条'记录,把它当作SUM()函数来使用就可以了。
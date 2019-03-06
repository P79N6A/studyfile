--delete select t.*, t.rowid from ecc_fnd.ecc_fnd_system_resource t where t.resource_name in ('增加客户（组织）授权个人','取消客户（组织）授权个人','操作权限分配','增加客户（个人）授权个人','取消客户（个人）授权个人','增加客户（组织）授权部门','取消客户（组织）授权部门','增加客户个人授权个人','取消客户个人授权个人'); 
DELETE FROM ECC_FND.ECC_FND_GROUP_RES WHERE GROUP_DEPT_ID in (84169911,84169912,84169913,84169914,84169915,84169916,84169917);
DELETE FROM ecc_fnd.ecc_fnd_group_user_exte WHERE GROUPUSER_ID in (47169911,47169912);
DELETE FROM ecc_fnd.ecc_fnd_system_resource WHERE RESOURCE_ID in (30169910,30169911,30169912,30169913,30169914,30169915,30169916)
DELETE FROM ECC_FND.ECC_FND_ACL_GROUP WHERE GROUP_ID in (50169911,50169912);
DELETE FROM ECC_FND.ECC_FND_TITLE WHERE TITLE_ID in (38169910,38169911);

DELETE FROM ECC_FND.ECC_FND_GROUP_USER_EXTE WHERE GROUPUSER_ID in (37460);
DELETE FROM ecc_fnd.ECC_FND_GROUP_RES WHERE GROUP_DEPT_ID in (15678940);
DELETE FROM ecc_fnd.ecc_fnd_system_resource WHERE RESOURCE_ID in (19322899);

DELETE FROM ECC_FND.ECC_FND_ACCESS_CONTROL WHERE ID in (1,2,3,4,5,6,7,8,9,10,11,12);
DELETE FROM ECC_FND.ECC_FND_AUTHORITY_CODE WHERE ID in (1,2,3,4,5,6,7,8,9,10,11,12);
DELETE FROM ECC_CUST.ECC_CUST_PERSON_NEWDIC WHERE ID in (1,2,3);
DELETE FROM ecc_fnd.ecc_fnd_iecc_property WHERE PROPERTY_TYPE = 'CUST_VISIT_MODE' and property_id in (select t.PROPERTY_ID from ecc_fnd.ecc_fnd_iecc_property t where t.PROPERTY_TYPE = 'CUST_VISIT_MODE' and t.PROPERTY_ID in (76));
DELETE FROM ecc_fnd.ecc_fnd_iecc_property WHERE PROPERTY_TYPE = 'secret_project_Type' and property_id in (select t.PROPERTY_ID from ecc_fnd.ecc_fnd_iecc_property t where t.PROPERTY_TYPE = 'secret_project_Type' and t.PROPERTY_ID in (1,2,3));
DELETE FROM ecc_fnd.ecc_fnd_iecc_property WHERE PROPERTY_TYPE = 'BELONG_SYSTEM' and property_id in (select t.property_id from ecc_fnd.ecc_fnd_iecc_property t where t.PROPERTY_TYPE = 'BELONG_SYSTEM' and t.property_id in (1,2));

select t.*, t.rowid from ecc_fnd.ecc_fnd_system_resource t where t.RESOURCE_ID in(30169910,30169911,30169912,30169913,30169914,30169915,30169916);
select t.*, t.rowid from ECC_FND.ECC_FND_ACL_GROUP t where t.GROUP_ID in(50169911,50169912);
--增加权限组（ 跟甲方要 GROUP_ID)

select t.*, t.rowid from ECC_FND.ECC_FND_GROUP_RES t where t.GROUP_DEPT_ID in(84169911,84169912,84169913,84169914,84169915,84169916,84169917);
--增加权限组与菜单的关系 （ 跟甲方要 GROUP_DEPT_ID)

select t.*, t.rowid from ECC_FND.ECC_FND_TITLE t where t.TITLE_ID in(38169910,38169911);
--增加角色（跟甲方要TITLE_ID）

select t.*, t.rowid from ecc_fnd.ecc_fnd_group_user_exte t where t.GROUPUSER_ID in(47169911,47169912);
--角色与权限组的关系 （跟甲方要GROUPUSER_ID）



select t.*, t.rowid from ecc_fnd.ecc_fnd_system_resource t where t.RESOURCE_ID in(19322899);
--开关菜单 （找甲方要RESOURCE_ID）

--把开关菜单给了基础数据管理员1000000的权限组1000000 （需要甲方提供：系统管理_基础数据维护员 ID，GROUP_DEPT_ID主键，

 
select t.*, t.rowid from ECC_FND.ECC_FND_GROUP_RES t where t.GROUP_DEPT_ID in(15678940);


--SELECT TITLE_ID FROM ECC_FND.ECC_FND_TITLE WHERE TITLE_NAME ='系统管理_基础数据维护员'; --1000000
--SELECT GROUP_ID FROM ECC_FND.ECC_FND_ACL_GROUP WHERE GROUP_NAME = '系统管理_基础数据维护员组'; -- 1000000 两个值刚好相同而已
--系统管理_基础数据维护员 角色 所在的 系统管理_基础数据维护员组 拥有 这个菜单：客户公关开关（19322899）的权限；


select t.*, t.rowid from ECC_FND.ECC_FND_GROUP_USER_EXTE t where t.GROUPUSER_ID in(37460);


--delete from ECC_FND.ECC_FND_ACCESS_CONTROL
--delete from  ECC_FND.ECC_FND_AUTHORITY_CODE 

-- 这里有问题 2016-9-9
select t.*, t.rowid from ECC_FND.ECC_FND_ACCESS_CONTROL t where t.ID in(1,2,3,4,5,6,7,8,9,10,11,12);


select t.*, t.rowid from ECC_FND.ECC_FND_AUTHORITY_CODE t where t.ID in(1,2,3,4,5,6,7,8,9,10,11,12);



--插入字典表：
-- delete from ECC_CUST.ECC_CUST_PERSON_NEWDIC

/*=======*/
select t.*, t.rowid from ECC_CUST.ECC_CUST_PERSON_NEWDIC t where t.ID in(1,2,3);


--插入字典表：
-- select * from ecc_fnd.ecc_fnd_iecc_property where property_type = 'CUST_VISIT_MODE'  and PROPERTY_ID =76;

/*=======*/
select t.PROPERTY_ID from ecc_fnd.ecc_fnd_iecc_property t where t.PROPERTY_TYPE = 'CUST_VISIT_MODE' and t.PROPERTY_ID in (76)


--删除字段”其他“，
--select * from ecc_fnd.ecc_fnd_iecc_property where ecc_fnd.ecc_fnd_iecc_property.property_type = 'CUST_VISIT_MODE' and  ecc_fnd.ecc_fnd_iecc_property.chinese_name='其他';
--select t.*,t.rowid from ecc_fnd.ecc_fnd_iecc_property t where t.PROPERTY_TYPE = 'secret_project_Type';

/*=======*/
select t.PROPERTY_ID from ecc_fnd.ecc_fnd_iecc_property t where t.PROPERTY_TYPE = 'secret_project_Type' and t.PROPERTY_ID in (1,2,3)

/*=======*/
select t.property_id from ecc_fnd.ecc_fnd_iecc_property t where t.PROPERTY_TYPE = 'BELONG_SYSTEM' and t.property_id in (1,2)

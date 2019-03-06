//createSQLQuery而不使用createQuery
String sql = " SELECT count(id) cnt FROM t_hairstyle t WHERE t.customer_id = :id ";
Query query = getSession()
		.createSQLQuery(sql)
		.addScalar("cnt", StandardBasicTypes.INTEGER)
		.setParameter("id", id);
//指定更加明确的返回值类型
.addScalar("cnt", StandardBasicTypes.INTEGER)
'StandardBasicTypes'下面有hibernate自定义的一些类型
addScalar指定返回值类型，方便将返回值直接绑定到hibernate的model上

//将返回数组直接映射成javaBean
query.setResultTransformer(Transformers.aliasToBean(ProductBillInfo.class));

'需要注意的'
(1)这种转换实体类很严格,必须连'属性名字'要和'数据库字段高度一致'注解此时没很大作用.
(2)'实体类可'以'比表字段少'一些字段.
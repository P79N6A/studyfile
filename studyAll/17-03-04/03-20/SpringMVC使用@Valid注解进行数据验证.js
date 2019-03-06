简洁版：
1.在SpringMVC 配置文件中添加 <mvc:annotation-driven />

2.@Valid要紧挨着JavaBean（即PersonScope）,同时方法包含传递参数(Errors result)

3.如下判断是否验证不通过
if(result.getErrorCount() > 0){
	//验证失败去相应的页面
	return "页面";
}

4.bean中的相关注解
'@NotEmpty' 不可为空
'@Length'规定该字段长度范围
'@Email'规定该字段是邮箱格式
'@Past' 被注释的元素必须是一个过去的日期
'@NumberFormat' 格式化数字
'@DateTimeFormat' 格式化日期
'@JsonIgnore' 作用是json序列化时将java bean中的一些属性忽略掉,序列化和反序列化都受影响。

@NotEmpty 用在集合类上面
@NotBlank 用在String上面
@NotNull    用在基本类型上



Constraint    详细信息
@Null    被注释的元素必须为 null
@NotNull    被注释的元素必须不为 null
@AssertTrue    被注释的元素必须为 true
@AssertFalse    被注释的元素必须为 false
@Min(value)    被注释的元素必须是一个数字，其值必须大于等于指定的最小值
@Max(value)    被注释的元素必须是一个数字，其值必须小于等于指定的最大值
@DecimalMin(value)    被注释的元素必须是一个数字，其值必须大于等于指定的最小值
@DecimalMax(value)    被注释的元素必须是一个数字，其值必须小于等于指定的最大值
@Size(max, min)    被注释的元素的大小必须在指定的范围内
@Digits (integer, fraction)    被注释的元素必须是一个数字，其值必须在可接受的范围内
@Past    被注释的元素必须是一个过去的日期
@Future    被注释的元素必须是一个将来的日期
@Pattern(value)    被注释的元素必须符合指定的正则表达式


表 2. Hibernate Validator 附加的 constraint

Constraint    详细信息
@Email    被注释的元素必须是电子邮箱地址
@Length    被注释的字符串的大小必须在指定的范围内
@NotEmpty    被注释的字符串的必须非空
@Range    被注释的元素必须在合适的范围内
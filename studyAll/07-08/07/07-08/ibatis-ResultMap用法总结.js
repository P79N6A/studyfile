<resultMap id="myId" class="myClass">
</resultMap>

1.columnIndex：将所查数据按下标赋值给javaBean的属性
2.dbType：明确指出字段对应数据库的类型
3.resultMapping：一个数据是list，map，array时需要
	在resultMapping中配合这个数据对应的resultMap
	他的值是已存在的resultMap的ID
4.nullValue：该字段为空时，设置对应javaBean的默认值


/*继承*/
<resultMap id="BaseResultMap" class="com.xxx.DClass" >
	<result column="ID" property="id" jdbcType="DECIMAL" />
</resultMap>
<resultMap id="BaseResultMapAndTaskId"  class="com.xxx.DClass"  extends="BaseResultMap">  
	<result column="TASK_ID" property="taskId" jdbcType="VARCHAR" />
</resultMap>
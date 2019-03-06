使用in

and t.DIVISOR_ID in 
<foreach collection="riskDivisorInfo.selIds" item="e" open="(" separator="," close=")">
	#{e}
</foreach>

collection 存放参数 item表示参数转化之后的称谓

效果是 
and t.DIVISOR_ID in (riskDivisorInfo.selIds.id1,riskDivisorInfo.selIds.id2,riskDivisorInfo.selIds.id3...)
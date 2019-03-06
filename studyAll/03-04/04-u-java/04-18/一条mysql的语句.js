 if(ISNULL(t_fans_temp.mark) || LENGTH(trim(t_fans_temp.mark))<1, c.we_chat_nickname, t_fans_temp.mark) customerName,
 
 '这个语句意思是 ：t_fans_temp.mark is null 成立取值c.we_chat_nickname；LENGTH(trim(t_fans_temp.mark))<1成立 取值t_fans_temp.mark'
 
 
if(xBoolean || yBoolean, aclum, bclum);
xBoolean || yBoolean 是 true 返回 aclum
xBoolean || yBoolean 是 false 返回 bclum
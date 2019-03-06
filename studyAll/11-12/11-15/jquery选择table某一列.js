jquery选择table表格的某一列:
//find 获得DOM集合的每个元素后代。每个元素的后代
//children仅沿着DOM树向下遍历单一层级。仅儿子辈
$('table tr').find('td').eq(2);


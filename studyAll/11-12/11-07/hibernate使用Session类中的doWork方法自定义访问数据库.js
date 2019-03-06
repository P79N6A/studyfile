1.写'一个类Vo类实现work接口','重写其中的execute(Connection connection)方法'，来使用jdbc API执行sql语句

2.在调用时候，使用'doWork(Vo vo)',来执行其中的代码
//在调用的时候使用doWork(Vo vo)，来执行其中的代码
public void execute(Connection connection) throws SQLException {
	pageUtil.setOrderByColumn("barberId");
	// 拼接查询条件
	switch (type) {
	case "week":
		searchValue = " and DATEDIFF(o.guess_begin_time,now())>=0 and DATEDIFF(o.guess_begin_time,now())<=7 ";
		break;
	case "month":
		searchValue = "  and DATEDIFF(o.guess_begin_time,now())>=0 and DATEDIFF(o.guess_begin_time,now())<=30 ";
		break;
	default:
		searchValue = " and date_format(o.guess_begin_time,'%y-%m-%d')=date_format(SYSDATE(),'%y-%m-%d') ";
		break;
	}
	//执行游标 
	CallableStatement call = connection.prepareCall("{call proc_order(?,?,?,?,?,?)}");
	//给游标付参数  
	call.setString("searchValue", searchValue);
	call.setLong("shopId", shopId);
	call.setInt("page", (pageUtil.getCurrentPage() - 1) * pageUtil.getPageSize());
	call.setInt("rows", pageUtil.getPageSize());
	call.setString("orderMethod", pageUtil.getOrderMethod());
	call.setString("orderByColumn", pageUtil.getOrderByColumn());
	//得到结果集，遍历后付给VO类，把VO类加入集合中
	ResultSet result = call.executeQuery();
	List<OrderRecodeVo> list = new ArrayList<OrderRecodeVo>();
	while (result.next()) {
		OrderRecodeVo vo = new OrderRecodeVo();
		vo.setBarberId(result.getLong("barberId"));
		vo.setBarberName(result.getString("barberName"));
		vo.setStoreId(result.getLong("storeId"));
		vo.setOrderCount(result.getLong("orderCount"));
		vo.setTodayCount(result.getLong("todayCount"));
		vo.setWeekCount(result.getLong("weekCount"));
		vo.setMonthCount(result.getLong("monthCount"));
		vo.setHistoryCount(result.getLong("historyCount"));
		list.add(vo);
	}
	//把Vo集合付给pageUtil，这样就能拿到分页类了
	pageUtil.setEntitys(list);
	
}
//调用时，就用doWork(vo)拿到pageUtil就能获得分页类了  
public PageUtil<OrderRecodeVo> getOrderRecodeList(PageUtil<OrderRecodeVo> page,Map<String, Object> params) {
	OrderListWork work = new OrderListWork();
	work.setPageUtil(page);
	getSessionFactory().getCurrentSession().doWork(work);
}
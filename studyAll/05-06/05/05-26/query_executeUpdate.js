public int updateQueuedStatusByQueuedId(long queuedId, int queuedStatus) {
	String sql = "UPDATE t_queued SET queued_status =:queuedStatus WHERE id=:queuedId ";
	Query query = getSession()
			.createSQLQuery(sql)
			.setParameter("queuedStatus", queuedStatus)
			.setParameter("queuedId", queuedId);
	int updNum = query.executeUpdate();
	return updNum;
}
//hibernate执行更新操作
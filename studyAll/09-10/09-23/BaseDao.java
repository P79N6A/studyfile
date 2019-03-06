package com.zte.pub.common.dao;

import java.io.Serializable;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.hibernate.Session;

import bee.besta.common.util.Pagination;

public interface BaseDao<Entity> {

	public void insert(Entity obj);

	public void delete(Entity obj);

	public void update(Entity obj);

	public void flush();

	public Entity getById(Long id, Class className);

	public Entity getById(Long id);

	public Entity getById(Serializable id, Class className);

	public void insert(List<Entity> objList);

	public Date getCurrentDate();

	public void delete(List<Entity> objList);

	public void update(List<Entity> objList);

	public Long getSequence(final String sequenceName);

	public Pagination findPaginationBySql(String sql, int pageIndex, int pageSize);

	public Pagination findPaginationBySql(String sql, int pageIndex, int pageSize, boolean withRowsCount);

	public Integer bulkUpdate(final String hql, final Object[] parameterArray);

	public <T> List<T> findByProperty(String name, Object value, Class<T> entityClazz);

	public <T> List<T> findByProperty(Map<String, Object> conditionMap, Class<T> entityClazz);
	public <T> List<T> findByProperty(String name, Object value, Class<T> entityClazz, Boolean noEnabledFlag);
	/**
	 * 注意，本方法专用于SQL维护，将使用support数据源
	 * 
	 * @param sql
	 */
	public void excuteSql(String sql);
	/**
     * 逻辑删除
     * @param id
     */
    public void logicDelete(Long... id);
    
    /**
     * 逻辑删除
     * @param obj
     */
    public void logicDelete(Entity obj);
	/**
	 * 根据SQL查询结果
	 * 
	 * @param sql
	 * @param params
	 * @param returnClass
	 * @return
	 */
	public Object findDataBySql(final String sql, final Object[] params, final Class returnClass);

	public void saveOrUpdate(Object entity);
	/**
     * 分页查询
     * @param queryString   HQL
     * @param page  当前页
     * @param rows  分页显示行数
     * @param params    参数
     * @return
     */
    Pagination<Entity> pageQuery(CharSequence queryString, int page, int rows, Map<String, Object> params);
    /**
     * 逻辑删除列表
     * @param objList
     */
    public void logicDelete(List<Entity> objList);

    /**
     * 根据参数查找所有不区分有效标识
     * @param name	参数名称
     * @param value	参数值
     * @param entityClazz
     * @return
     */
	List<Entity> findAllByProperty(String name, Object value, Class<Entity> entityClazz);

	public Session getSession();
}

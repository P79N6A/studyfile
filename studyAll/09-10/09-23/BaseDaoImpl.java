package com.zte.pub.common.internal.dao;

import java.io.IOException;
import java.io.Serializable;
import java.lang.reflect.Method;
import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import bee.base.ioc.annotation.Inject;
import bee.base.ioc.annotation.ServiceLocator;
import bee.besta.common.util.Pagination;
import bee.besta.hibernate.service.HibernateHandler;
import bee.besta.hibernate.service.HibernateManager;
import bee.besta.hibernate.service.HibernateService;

import com.zte.pub.common.constant.Format;
import com.zte.pub.common.constant.ServiceType;
import com.zte.pub.common.dao.BaseDao;
import com.zte.pub.common.util.help.DateUtil;
import com.zte.pub.common.util.help.StringUtil;

public class BaseDaoImpl<Entity> implements BaseDao<Entity> {
	private final Logger logger = LoggerFactory.getLogger(BaseDaoImpl.class);
	private static ThreadLocal<Calendar> calInstance = new ThreadLocal<Calendar>();
	private static String defaultChar32 = null;
	protected Class<Entity> entityClazz;
    protected Method setEnabledFlag;
	@Inject
	@ServiceLocator(ServiceType.OSGI)
	protected HibernateService hibernateService;

	/**
     * 构造方法
     */
    @SuppressWarnings("unchecked")
    public BaseDaoImpl() {
        Type type = getClass().getGenericSuperclass();
        if (type instanceof ParameterizedType) {
            this.entityClazz = (Class<Entity>) ((ParameterizedType) type).getActualTypeArguments()[0];
        } else {
            this.entityClazz = null;
        }

        if(null!=entityClazz){
            try {
                setEnabledFlag = entityClazz.getDeclaredMethod("setEnabledFlag", String.class);
            } catch (Exception e) {
                
            }
        }
    }

	protected HibernateManager getHibernateService4Support() {
		// 数据库维护帐号
		return hibernateService.getHibernateManager("support");
	}

	protected HibernateManager getHibernateService() {
		if (hibernateService.getDefaultHibernateManager() == null) {
			try {
				logger.warn("BaseDaoImpl：HibernateManager获取为null，延迟4秒再继续");
				Thread.sleep(4000);
			} catch (InterruptedException e) {
				logger.error(e.getMessage(), e);
			}
		}
		return hibernateService.getDefaultHibernateManager();
	}
	/**
	 * 重载 方法支持多数据源
	 * @param alias
	 * @return
	 */
	protected HibernateManager getHibernateService(String alias) {
		HibernateManager hibernateManager = null;
		if(StringUtil.isEmpty(alias)){
			 hibernateManager = hibernateService.getDefaultHibernateManager();
		}else{
			hibernateManager = hibernateService.getHibernateManager(alias);
		}
		
		return hibernateManager;
	}

	@Override
	public void delete(Entity obj) {
		getHibernateService().delete(obj);
	}

	@Override
	public void flush() {
		getHibernateService().executeQuery(new HibernateHandler() {
			@Override
			public Object doInHibernate(Session session) {
				session.flush();
				return null;
			}
		});
	}

	@Override
	public void delete(List<Entity> objList) {
		for (Entity obj : objList) {
			getHibernateService().delete(obj);
		}
	}

	@Override
	public Entity getById(Long id) {
		if (id == null) {
			return null;
		}

		return getHibernateService().get(entityClazz, id);
	}

	@Override
	public Entity getById(Long id, Class className) {
		if (id == null) {
			return null;
		}
		return (Entity) getHibernateService().get(className, id);
	}

	@Override
	public Entity getById(Serializable id, Class className) {
		if (id == null) {
			return null;
		}
		return (Entity) getHibernateService().get(className, id);
	}
	@Override
	public <T> List<T> findByProperty(String name, Object value, Class<T> entityClazz, Boolean noEnabledFlag) {
		if (noEnabledFlag) {
			String hql = "from  " + entityClazz.getSimpleName() + " where " + name + "=?";
			return getHibernateService().findList(hql, value);
		} else {
			return findByProperty(name, value, entityClazz);
		}
	}
	@Override
	public <T> List<T> findByProperty(String name, Object value, Class<T> entityClazz) {
		//String hql = "from  " + entityClazz.getSimpleName() + " where " + name + "=? and enabledFlag='Y'";
		String hql = "from  " + entityClazz.getSimpleName() + " where " + name + "=? ";

		return getHibernateService().findList(hql, value);
	}

	@Override
	public <T> List<T> findByProperty(Map<String, Object> conditionMap, Class<T> entityClazz) {
		StringBuilder hql = new StringBuilder();
		hql.append("from  ");
		hql.append(entityClazz.getSimpleName());
		hql.append(" where  ");

		for (String key : conditionMap.keySet()) {
			hql.append(key);
			hql.append("=?  and ");
		}
		hql.append("enabledFlag='Y' ");

		return getHibernateService().findList(hql.toString(), conditionMap.values().toArray(new Object[0]));
	}

	@Override
	public void insert(Entity obj) {
		getHibernateService().save(obj);
	}

	@Override
	public void insert(List<Entity> objList) {
		for (Entity obj : objList) {
			getHibernateService().save(obj);
		}
	}

	@Override
	public void saveOrUpdate(Object entity) {
		getHibernateService().saveOrUpdate(entity);
	}

	/**
	 * 根据SQL查询结果
	 * 
	 * @param sql
	 * @param params
	 * @param returnClass
	 * @return
	 */
	@Override
	public Object findDataBySql(final String sql, final Object[] params, final Class returnClass) {
		return getHibernateService().executeQuery(new HibernateHandler() {
			/**
			 * 
			 */
			private static final long serialVersionUID = -2765800121190401357L;

			@Override
			public Object doInHibernate(Session session) {
				if (StringUtil.isBlank(sql)) {
					return null;
				}
				SQLQuery query = session.createSQLQuery(sql);
				if (params != null && params.length > 0) {
					for (int i = 0; i < params.length; i++) {
						query.setParameter(i, params[i]);
					}
				}
				if (returnClass != null) {
					query.addEntity(returnClass);
				}
				return query.list();
			}
		});
	}

	@Override
	public void update(Entity obj) {
		getHibernateService().update(obj);
	}

	@Override
	public void update(List<Entity> objList) {
		for (Entity obj : objList) {
			getHibernateService().update(obj);
		}
	}

	private static Calendar getCalendar() {
		Calendar result = calInstance.get();
		if (result == null) {
			result = Calendar.getInstance();
			calInstance.set(result);
		}
		return result;
	}

	/**
	 * 给hql、sql查询语句加相等查询条件，如果value为空或nullValues中的任何一个值的时候，<br/>
	 * 将不会在加入查询条件。注意：value在加入到查询条件时，<b>不加</b>单引号，如果是日期类型只精确到秒
	 * 
	 * <pre>
	 * // sql中会增加内容 &quot;boe_header_id=20001&quot;
	 * addCondEqual(sql, &quot;boe_header_id&quot;, 20001L);
	 * 
	 * // sql中不会增加任何内容
	 * addCondEqual(sql, &quot;boe_header_id&quot;, 10000L, 10000L);
	 * </pre>
	 * 
	 * @param hql_sql
	 *            hql、sql查询语句，具体类型可以为StringBuilder或StringBuffer
	 * @param name
	 *            hbm对象属性名称或字段名
	 * @param value
	 *            属性值
	 * @param nullValues
	 *            无效值数组，如果value等于此数据组中的任何一个，则忽略这个条件
	 */
	public static void addEqCond(Appendable hql_sql, String name, Object value, Object... nullValues) {
		if (value instanceof String) {
			value = value.toString().trim();
		}

		if (value == null || "".equals(value)) {
			return;
		}

		for (Object nullVal : nullValues) {
			if (value.equals(nullVal)) {
				return;
			}
			if (nullVal instanceof String && nullVal.equals(value.toString())) {
				return;
			}
		}

		if (value instanceof Date) {
			String s = Format.DATEFORMAT.format((Date) value);
			value = "to_date('" + s + "','yyyy-mm-dd,hh24:mi:ss')";
		}

		try {
			hql_sql.append(" and ").append(name).append("=").append(value.toString());
		} catch (IOException e) {
			throw new RuntimeException(e);
		}
	}

	/**
	 * 给hql、sql查询语句加like查询条件
	 * 
	 * @param hql_sql
	 *            hql、sql查询语句，具体类型可以为StringBuilder或StringBuffer
	 * @param name
	 *            hbm对象属性名称或字段名
	 * @param value
	 *            属性值
	 * @param ignoreCase
	 *            区分大小写
	 */
	public static void addLikeCond(Appendable hql_sql, String name, String value, boolean ignoreCase) {
		if (StringUtil.isBlank(value)) {
			return;
		}

		try {
			value = "'%" + value.trim().replaceAll("'", "''") + "%'";
			if (ignoreCase) {
				value = value.toUpperCase();
				hql_sql.append(" and upper(").append(name).append(")");
				hql_sql.append(" like").append(value);
			} else {
				hql_sql.append(" and ").append(name);
				hql_sql.append(" like").append(value);
			}
		} catch (IOException e) {
			throw new RuntimeException(e);
		}
	}

	/**
	 * 给hql、sql查询语句加like查询条件，不区分大小写
	 * 
	 * @param hql_sql
	 * @param name
	 * @param value
	 */
	public static void addLikeCond(Appendable hql_sql, String name, String value) {
		addLikeCond(hql_sql, name, value, true);
	}

	/**
	 * 给hql、sql查询语句添加需要替换字符的Like查询条件
	 * 
	 * @param hql_sql
	 * @param name
	 * @param value
	 */
	public static void addRplLikeCond(Appendable hql_sql, Map<String, Object> cond, String name, String value) {
		if (value == null || "".equals(value.trim())) {
			return;
		}
		try {
			value = value.trim().replaceAll("'", "''");
			if (value.contains("?") || value.contains("*")) {
				value = value.replaceAll("\\?", "_").replaceAll("\\*", "%");
				hql_sql.append(" and ").append(name).append(" like :").append(name);
				cond.put(name, value);
			} else {
				hql_sql.append("  and  ").append(name).append(" = :").append(name);
				cond.put(name, value);
			}
		} catch (IOException e) {
			throw new RuntimeException(e);
		}
	}

	/**
	 * 给hql、sql查询语句添加需要替换字符的Like查询条件
	 * 
	 * @param hql_sql
	 * @param name
	 * @param value
	 */
	public static void addRplLikeCond(Appendable hql_sql, String name, String value) {
		if (value == null || "".equals(value.trim())) {
			return;
		}
		try {
			value = value.trim().replaceAll("'", "''");
			if (value.contains("?") || value.contains("*")) {
				value = value.replaceAll("\\?", "_").replaceAll("\\*", "%");
				value = "'" + value + "'";
				hql_sql.append(" and ").append(name);
				hql_sql.append(" like ").append(value);
			} else {
				value = "'" + value + "'";
				hql_sql.append("  and  ").append(name);
				hql_sql.append(" = ").append(value);
			}
		} catch (IOException e) {
			throw new RuntimeException(e);
		}
	}

	/**
	 * 给hql、sql查询语句加相等查询条件,如果value为空或nullValues中的任何一个值的时候，将不会<br/>
	 * 在加入查询条件。注意：value值在加入hql时要加上<b>单引号</b>；
	 * 
	 * <pre>
	 * // 则sql会增加内容&quot;boe_num='NUM_20001'&quot;
	 * addCondEqual(sql, &quot;boe_num&quot;, &quot;NUM_20001&quot;);
	 * // 则sql不会增加任何内容
	 * addCondEqual(sql, &quot;boe_num&quot;, &quot;NUM_20001&quot;, &quot;NUM_20001&quot;);
	 * </pre>
	 * 
	 * @param hql_sql
	 *            hql、sql查询语句，具体类型可以为StringBuilder或StringBuffer
	 * @param name
	 *            hbm对象属性名称或字段名
	 * @param value
	 *            属性值
	 * @param nullValues
	 *            无效值数组，如果value等于此数据组中的任何一个，则忽略这个条件
	 */
	public static void addEqQCond(Appendable hql_sql, String name, String value, String... nullValues) {
		if (value != null) {
			value = value.trim();
		}

		if (value == null || "".equals(value)) {
			return;
		}

		for (Object nullVal : nullValues) {
			if (value.equals(nullVal)) {
				return;
			}
		}

		value = value.replace("'", "''");
		try {
			hql_sql.append(" and ").append(name).append("='").append(value).append("'");
		} catch (IOException e) {
			throw new RuntimeException(e);
		}
	}

	/**
	 * 添加开始日期、结束日期查询条件
	 * 
	 * @param hql_sql
	 *            hql、sql查询语句，具体类型可以为StringBuilder或StringBuffer
	 * @param name
	 *            hbm对象属性名称或字段名
	 * @param minDate
	 *            开始日期
	 * @param maxDate
	 *            结果日期
	 */
	public static void addDateRangeCond(Appendable hql_sql, String name, Date minDate, Date maxDate) {
		Calendar calendar = getCalendar();
		if (minDate != null) {
			minDate = clearTime(minDate);
			calendar.setTime(minDate);
			calendar.add(Calendar.SECOND, -1);
			String min = dateToSqlValue4ORA(calendar.getTime());

			try {
				hql_sql.append(" and ").append(name).append(">").append(min);
			} catch (IOException e) {
				throw new RuntimeException(e);
			}
		}

		if (maxDate != null) {
			maxDate = clearTime(maxDate);
			calendar.setTime(maxDate);
			calendar.add(Calendar.DAY_OF_MONTH, 1);
			String max = dateToSqlValue4ORA(calendar.getTime());
			try {
				hql_sql.append(" and ").append(name).append("<").append(max);
			} catch (IOException e) {
				throw new RuntimeException(e);
			}
		}
	}

	/**
	 * 添加开始日期、结束日期查询条件
	 * 
	 * @param hql_sql
	 *            hql、sql查询语句，具体类型可以为StringBuilder或StringBuffer
	 * @param name
	 *            hbm对象属性名称或字段名
	 * @param minDate
	 *            开始日期
	 * @param maxDate
	 *            结果日期
	 */
	public static void addDateRangeCond(Appendable hql_sql, String name, Long minDate, Long maxDate) {
		if (minDate != null) {
			minDate = (minDate / 1000000) * 1000000;

			try {
				hql_sql.append(" and ").append(name).append(">=").append(minDate.toString());
			} catch (IOException e) {
				throw new RuntimeException(e);
			}
		}

		if (maxDate != null) {
			maxDate = (maxDate / 1000000 + 1) * 1000000;
			try {
				hql_sql.append(" and ").append(name).append("<").append(maxDate.toString());
			} catch (IOException e) {
				throw new RuntimeException(e);
			}
		}
	}

	/**
	 * 清除时间里的时分秒，只留日期
	 * 
	 * @param date
	 * @return new date
	 */
	private static Date clearTime(Date date) {
		if (date == null) {
			return null;
		}

		Calendar calendar = getCalendar();
		calendar.setTime(date);
		int y = calendar.get(Calendar.YEAR);
		int m = calendar.get(Calendar.MONTH);
		int d = calendar.get(Calendar.DAY_OF_MONTH);
		calendar.clear();
		calendar.set(Calendar.YEAR, y);
		calendar.set(Calendar.MONTH, m);
		calendar.set(Calendar.DAY_OF_MONTH, d);
		return calendar.getTime();
	}

	private static String dateToSqlValue4ORA(Date date) {
		String s = Format.DATEFORMAT.format(date);
		return "to_date('" + s + "','yyyy-mm-dd,hh24:mi:ss')";
	}

	/**
	 * 把时间日期转换成Long类型，如"2008-10-11 8:15:00"转换以后为:20081011081500
	 * 
	 * @param date
	 * @return
	 */
	public static Long dateTimeToLong(Date date) {
		if (date == null) {
			return null;
		}

		Calendar calendar = getCalendar();
		calendar.setTime(date);
		Long result = (long) calendar.get(Calendar.YEAR);
		result = result * 100 + calendar.get(Calendar.MONTH);
		result = result * 100 + calendar.get(Calendar.DAY_OF_MONTH);
		result = result * 100 + calendar.get(Calendar.HOUR_OF_DAY);
		result = result * 100 + calendar.get(Calendar.MINUTE);
		result = result * 100 + calendar.get(Calendar.SECOND);
		return result;
	}

	/**
	 * 把时间日期成Long类型，如"2008-10-11 8:15:00"转换以后为:20081011000000
	 * 
	 * @param date
	 * @return
	 */
	public static Long dateToLong(Date date) {
		if (date == null) {
			return null;
		}

		Calendar calendar = getCalendar();
		calendar.setTime(date);
		Long result = (long) calendar.get(Calendar.YEAR);
		result = result * 100 + calendar.get(Calendar.MONTH) + 1;
		result = result * 100 + calendar.get(Calendar.DAY_OF_MONTH);
		result = result * 1000000;
		return result;
	}

	@Override
	@SuppressWarnings("unchecked")
	public Long getSequence(final String sequenceName) {
		List<Object> list;
		list = (List<Object>) getHibernateService().executeQuery(new HibernateHandler() {
			@Override
			public Object doInHibernate(Session session) {
				String sql = "select " + sequenceName + ".nextval from dual";
				List<Object> list = session.createSQLQuery(sql).list();
				return list;
			}
		});
		Object o = list.get(0);
		return Long.valueOf(o + "");
	}

	/**
	 * 字符串进行char(32)类型格式化
	 * 
	 * @param source
	 * @return
	 */
	public static String formatStringToChar32(String source) {
		if (source == null) {
			return null;
		}
		int length = source.length();
		if (length > 32) {
			return source;
		}
		String ret = new String(getdefaultChar32());
		return source + ret.substring(length);
	}

	private static String getdefaultChar32() {
		if (defaultChar32 == null) {
			defaultChar32 = "";
			for (int i = 0; i < 32; i++) {
				defaultChar32 = defaultChar32 + " ";
			}
		}
		return defaultChar32;
	}

	@Override
	public Pagination findPaginationBySql(String sql, int pageIndex, int pageSize) {
		return findPaginationBySql(sql, pageIndex, pageSize, true);
	}

	@Override
	@SuppressWarnings("rawtypes")
	public Pagination findPaginationBySql(final String sql, final int pageIndex, final int pageSize,
			final boolean withRowsCount) {
		return (Pagination) getHibernateService().executeQuery(new HibernateHandler() {
			private static final long serialVersionUID = 4031993095961565445L;

			@Override
			public Object doInHibernate(Session session) {
				SQLQuery query = session.createSQLQuery(sql);

				// 分页，当pageSize<=0时不分页
				if (pageSize > 0) {
					query.setFirstResult((pageIndex - 1) * pageSize);
					query.setMaxResults(pageSize);
				}
				List items = query.list();
				long rowsCount = 0;

				// 是否计算记录总数
				if (withRowsCount) {
					rowsCount = getRowsCountBySql(sql);
				}
				Pagination pagination = new Pagination(pageIndex, pageSize, rowsCount);
				pagination.setItems(items);
				return pagination;
			}
		});
	}

	public Long getRowsCountBySql(String queryString) {
		queryString = parseSelectCount(queryString);
		Pagination pagination = findPaginationBySql(queryString, 0, 0, false);
		Object result = pagination.getItems().get(0);
		return Long.valueOf(result + "");
	}

	/** 解析select类型的hql/sql, 生成 select count(1) from xxx形式 */
	private static String parseSelectCount(String queryString) {
		String hql = queryString.toLowerCase();
		int noBlankStart = 0;
		for (int len = hql.length(); noBlankStart < len; noBlankStart++) {
			if (hql.charAt(noBlankStart) > ' ') {
				break;
			}
		}

		int pair = 0;
		// 如果hql直接以from开始，默认前面有select关键字
		if (!followWithWord(hql, "select", noBlankStart)) {
			pair = 1;
		}

		int fromPos = -1;
		for (int i = noBlankStart; i < hql.length();) {
			if (followWithWord(hql, "select", i)) {
				pair++;
				i += "select".length();
				continue;
			}

			if (followWithWord(hql, "from", i)) {
				pair--;
				if (pair == 0) {
					fromPos = i;
					break;
				} else {
					i += "from".length();
				}
				continue;
			}

			i++;
		}

		if (fromPos == -1) {
			throw new IllegalArgumentException("parse count sql error, check your sql/hql");
		}

		String countHql = "select count(*) " + queryString.substring(fromPos);
		return countHql;
	}

	private static boolean followWithWord(String s, String sub, int pos) {
		int i = 0;
		for (; pos < s.length() && i < sub.length(); pos++, i++) {
			if (s.charAt(pos) != sub.charAt(i)) {
				return false;
			}
		}

		if (i < sub.length()) {
			return false;
		}

		if (pos >= s.length()) {
			return true;
		} else {
			return !isAlpha(s.charAt(pos));
		}
	}

	private static boolean isAlpha(char c) {
		return c == '_' || ('0' <= c && c <= '9') || ('a' <= c && c <= 'z') || ('A' <= c && c <= 'Z');
	}

	@Override
	public Integer bulkUpdate(final String hql, final Object[] parameterArray) {
		return (Integer) this.getHibernateService().executeQuery(new HibernateHandler() {

			@Override
			public Object doInHibernate(Session session) {
				Query query = session.createQuery(hql.toString());
				for (int i = 0; i < parameterArray.length; i++) {
					query.setParameter(i, parameterArray[i]);
				}
				return query.executeUpdate();
			}

		});
	}

	@Override
	public Date getCurrentDate() {
		Date obj = (Date) getHibernateService().executeQuery(new HibernateHandler() {
			@Override
			public Object doInHibernate(Session session) {
				Object dataObj = session.createSQLQuery("select to_char(sysdate,'yyyy-MM-dd hh24:mi:ss') from dual")
						.uniqueResult();
				return DateUtil.parse(dataObj.toString(), null);
			}
		});
		return obj;
	}
    
    public void logicDelete(List<Entity> objList) {
        if(null!=objList){
            for (Entity obj : objList) {
                try {
                    setEnabledFlag.invoke(obj, "N");
                    getHibernateService().update(obj);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        }
    }

    public void logicDelete(Long... ids) {
        if(null!=ids){
            for(long id : ids){
                Entity obj = getById(id);
                if(null!=obj){
                    try {
                        setEnabledFlag.invoke(obj, "N");
                        getHibernateService().update(obj);
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                }
            }
        }
    }

    public void logicDelete(Entity obj) {
        try {
            setEnabledFlag.invoke(obj, "N");
            getHibernateService().update(obj);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
	@Override
	public void excuteSql(String sql) {
		getHibernateService4Support().executeSql(sql);
	}
	   @Override
	    public Pagination<Entity> pageQuery(CharSequence queryString, int page, int rows, Map<String, Object> params) {
	        Pagination<Entity> p = null;
	        if (null == params) {
	            p = getHibernateService().findPagination(queryString, page, rows);
	        } else {
	            p = getHibernateService().findPagination(queryString, params, page, rows);
	        }
	        
	        return p;
	    }

	@Override
	public List<Entity> findAllByProperty(String name, Object value, Class<Entity> entityClazz) {
		String hql = "from  " + entityClazz.getSimpleName() + " where " + name + "=? ";
		if("FbpLookupValues".equals(entityClazz.getSimpleName())){
			hql = "from  " + entityClazz.getSimpleName() + " where " + name + "=? and enabledFlag='Y'";
		}
		if("AppCustomerContact".equals(entityClazz.getSimpleName())){
			hql = "from  " + entityClazz.getSimpleName() + " where " + name + "=? and enabledFlag='Y'";
		}
		return getHibernateService().findList(hql, value);
	}
	
	public Session getSession() {
		Session obj = (Session) getHibernateService().executeQuery(new HibernateHandler() {
			@Override
			public Session doInHibernate(Session session) {
				return session;
			}
		});
		return obj;
	}	 
}

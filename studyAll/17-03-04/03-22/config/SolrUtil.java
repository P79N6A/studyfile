package com.xgd.risk.web.utils;


import org.apache.commons.lang.StringUtils;
import org.apache.http.impl.client.SystemDefaultHttpClient;
import org.apache.log4j.Logger;
import org.apache.solr.client.solrj.SolrClient;
import org.apache.solr.client.solrj.SolrQuery;
import org.apache.solr.client.solrj.SolrServerException;
import org.apache.solr.client.solrj.impl.CloudSolrClient;
import org.apache.solr.client.solrj.response.QueryResponse;






import com.xgd.risk.web.vo.MerchScoreInfoParamVo;

import java.io.IOException;

/**
 * Solr查询工具类
 * Created by weijiangsen on 2017/01/17.
 */
@SuppressWarnings("deprecation")
public class SolrUtil {
    private static final Logger logger = Logger.getLogger(SolrUtil.class);
    //private static final int DEFAULT_PAGE_NUMBER = 5000;    // 默认分页查询数量
    private SolrClient solrClient;
    private String collection;

    public SolrUtil(String solrZkHosts, String collection) {
        this.solrClient = getSolrClient(solrZkHosts);
        this.collection = collection;
    }

    /**
     * 获取SolrClient
     *
     * @param solrZkHosts
     * @return
     */
    private SolrClient getSolrClient(String solrZkHosts) {
        SystemDefaultHttpClient cl = new SystemDefaultHttpClient();
        SolrClient client = new CloudSolrClient(solrZkHosts, cl);
        return client;
    }

    /**
     * 查询Solr结果数量
     *
     * @param queryStr 查询条件
     * @return Solr查询结果数量
     * @throws IOException
     * @throws SolrServerException
     */
    public long getNumFound(String queryStr) throws IOException, SolrServerException {
        SolrQuery solrQuery = new SolrQuery();
        solrQuery.setQuery(queryStr);
        //solrQuery.setTermsMaxCount(1000);
        logger.info("Solr查询：" + queryStr);
        QueryResponse resp = solrClient.query(collection, solrQuery);
        if (resp != null) {
            return resp.getResults().getNumFound();
        }
        return 0;
    }

    public QueryResult getQueryResult(MerchScoreInfoParamVo entity,Integer pageNo,Integer pageSize,String queryStr,String sortColumn, SolrQuery.ORDER order, String... fields) throws IOException, SolrServerException {
        return getQueryResult(entity,pageNo,pageSize,queryStr,sortColumn,order,pageSize,fields);
    }

    public QueryResult getQueryResult(MerchScoreInfoParamVo entity,Integer pageNo,Integer pageSize,String queryStr,String sortColumn, SolrQuery.ORDER order, int pageNumber,String... fields) throws IOException, SolrServerException {
        return getQueryResult(entity,pageNo,pageSize,queryStr, pageNumber, sortColumn, order,fields);
    }

    /**
     * @param queryStr   查询条件
     * @param pageNumber 分页查询单页数量
     * @param sortColumn 排序字段
     * @param order      排序方式(asc、desc)
     * @return
     * @throws IOException
     * @throws SolrServerException
     */
    public QueryResult getQueryResult(MerchScoreInfoParamVo entity,Integer pageNo,Integer pageSize,String queryStr, int pageNumber, String sortColumn, SolrQuery.ORDER order,String... fields) throws IOException, SolrServerException {
        SolrQuery solrQuery = new SolrQuery();
        
        //solrQuery.add(name, val)
        /*solrQuery.set("F_MERCH_NAME", merchantName);
        solrQuery.set("F_TERM_NO", termNo);*/
        
        if(StringUtils.isNotBlank(entity.getMerchantName())) {
        	solrQuery.setFilterQueries("MERCHANTNAME:*" + entity.getMerchantName() + "*");
        }
        if (StringUtils.isNotBlank(entity.getAccid())) {
        	solrQuery.setFilterQueries("ACCID:" + entity.getAccid());
		}
        
        //级别
        if(StringUtils.isNotBlank(entity.getGrade())){
        	solrQuery.setFilterQueries("GRADE:" + entity.getGrade());
        }
        
        //状态
        if(StringUtils.isNotBlank(entity.getStatus())){
        	solrQuery.setFilterQueries("STATUS:" + entity.getStatus());
        }
        
        if(fields != null && fields.length > 0) {
        	solrQuery.setFields(fields);
        }
        // 第一页： pageNo = 1
        //solrQuery.setStart((page.getPageNo()-1));
        //solrQuery.setRows(page.getPageSize());
        solrQuery.setQuery(queryStr).setFields(fields);
        //solrQuery.setQuery(queryStr);
        if (sortColumn != null && order != null) {
            solrQuery.addSort(sortColumn, order);
        }
        return new QueryResult(solrQuery,pageNo-1, pageSize, getNumFound(queryStr),solrClient,collection);
    }
}





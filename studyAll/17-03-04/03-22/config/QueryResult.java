package com.xgd.risk.web.utils;

import org.apache.solr.client.solrj.SolrClient;
import org.apache.solr.client.solrj.SolrQuery;
import org.apache.solr.client.solrj.SolrServerException;
import org.apache.solr.client.solrj.response.QueryResponse;
import org.apache.solr.common.SolrDocumentList;

import java.io.IOException;

/**
 * Created by weijiangsen on 2017/01/04.
 */
public class QueryResult {
    // solr查询总数
    private long numFound;
    // 查询起始行
    private int start;
    // 分页查询单页数量
    private int pageNumber;
    private SolrQuery solrQuery;
    private SolrClient solrClient;
    private String collection;

    public QueryResult(SolrQuery solrQuery, int start,int pageNumber, long numFound, SolrClient solrClient, String collection) {
        this.solrQuery = solrQuery;
        this.pageNumber = pageNumber;
         //this.pageNumber = 100;
        this.numFound = numFound;
        
        this.solrClient = solrClient;
        this.collection = collection;
        this.start = start;
    }

    /**
     * 返回当前页solr查询结果
     *
     * @return
     * @throws IOException
     * @throws SolrServerException
     */
    public SolrDocumentList next() throws IOException, SolrServerException {
        SolrDocumentList result = null;
        solrQuery.setStart(start).setRows(pageNumber);
        numFound -= pageNumber;
        start += pageNumber;
        QueryResponse resp = solrClient.query(collection, this.solrQuery);
        if (resp != null) {
            result = resp.getResults();
        }
        return result;
    }
    
    public QueryResponse query() throws IOException, SolrServerException {
        solrQuery.setStart(start).setRows(pageNumber);
        numFound -= pageNumber;
        start += pageNumber;
        QueryResponse resp = solrClient.query(collection, this.solrQuery);
        return resp;
        
    }

    /**
     * 是否还有查询结果
     *
     * @return
     */
    public boolean hasNext() {
        return numFound > 0 ? true : false;
    }

    /**
     * 返回solr查询总数
     *
     * @return
     */
    public long getNumFound() {
        return numFound;
    }

}

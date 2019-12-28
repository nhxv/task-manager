package com.nhxv.taskmanager.dao;

import com.nhxv.taskmanager.model.TaskArchive;
import org.hibernate.search.query.dsl.QueryBuilder;
import org.hibernate.search.jpa.FullTextEntityManager;
import org.hibernate.search.jpa.FullTextQuery;
import org.hibernate.search.jpa.Search;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Repository
public class TaskArchiveDaoImpl implements TaskArchiveDao {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<TaskArchive> findTaskArchives(String searchText) {
        FullTextQuery jpaQuery = searchTaskArchivesQuery(searchText);
        List<TaskArchive> taskArchiveList = jpaQuery.getResultList();
        return taskArchiveList;
    }

    private FullTextQuery searchTaskArchivesQuery(String searchText) {
        FullTextEntityManager fullTextEntityManager = Search.getFullTextEntityManager(entityManager);
        QueryBuilder queryBuilder = fullTextEntityManager.getSearchFactory().buildQueryBuilder().forEntity(TaskArchive.class).get();
        org.apache.lucene.search.Query luceneQuery = queryBuilder
                .keyword()
                .wildcard()
                .onFields("name", "employeeName")
                .boostedTo(5f)
                // more queries field
//                .andField("userDetail.firstName")
                .matching(searchText + "*")
                .createQuery();
        FullTextQuery jpaQuery = fullTextEntityManager.createFullTextQuery(luceneQuery, TaskArchive.class);
        return jpaQuery;
    }
}

package com.gestao.repository.search;

import com.gestao.domain.Produto;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Produto entity.
 */
public interface ProdutoSearchRepository extends ElasticsearchRepository<Produto, Long> {
}

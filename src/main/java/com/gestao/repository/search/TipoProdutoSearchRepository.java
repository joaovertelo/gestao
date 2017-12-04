package com.gestao.repository.search;

import com.gestao.domain.TipoProduto;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the TipoProduto entity.
 */
public interface TipoProdutoSearchRepository extends ElasticsearchRepository<TipoProduto, Long> {
}

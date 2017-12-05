package com.gestao.repository.search;

import com.gestao.domain.PedidoProduto;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the PedidoProduto entity.
 */
public interface PedidoProdutoSearchRepository extends ElasticsearchRepository<PedidoProduto, Long> {
}

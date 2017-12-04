package com.gestao.repository;

import com.gestao.domain.TipoProduto;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the TipoProduto entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TipoProdutoRepository extends JpaRepository<TipoProduto, Long> {

}

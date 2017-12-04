package com.gestao.repository;

import com.gestao.domain.PedidoProduto;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the PedidoProduto entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PedidoProdutoRepository extends JpaRepository<PedidoProduto, Long> {

}

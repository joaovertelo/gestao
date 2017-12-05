package com.gestao.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.gestao.domain.PedidoProduto;

import com.gestao.repository.PedidoProdutoRepository;
import com.gestao.repository.search.PedidoProdutoSearchRepository;
import com.gestao.web.rest.errors.BadRequestAlertException;
import com.gestao.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing PedidoProduto.
 */
@RestController
@RequestMapping("/api")
public class PedidoProdutoResource {

    private final Logger log = LoggerFactory.getLogger(PedidoProdutoResource.class);

    private static final String ENTITY_NAME = "pedidoProduto";

    private final PedidoProdutoRepository pedidoProdutoRepository;

    private final PedidoProdutoSearchRepository pedidoProdutoSearchRepository;

    public PedidoProdutoResource(PedidoProdutoRepository pedidoProdutoRepository, PedidoProdutoSearchRepository pedidoProdutoSearchRepository) {
        this.pedidoProdutoRepository = pedidoProdutoRepository;
        this.pedidoProdutoSearchRepository = pedidoProdutoSearchRepository;
    }

    /**
     * POST  /pedido-produtos : Create a new pedidoProduto.
     *
     * @param pedidoProduto the pedidoProduto to create
     * @return the ResponseEntity with status 201 (Created) and with body the new pedidoProduto, or with status 400 (Bad Request) if the pedidoProduto has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/pedido-produtos")
    @Timed
    public ResponseEntity<PedidoProduto> createPedidoProduto(@RequestBody PedidoProduto pedidoProduto) throws URISyntaxException {
        log.debug("REST request to save PedidoProduto : {}", pedidoProduto);
        if (pedidoProduto.getId() != null) {
            throw new BadRequestAlertException("A new pedidoProduto cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PedidoProduto result = pedidoProdutoRepository.save(pedidoProduto);
        pedidoProdutoSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/pedido-produtos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /pedido-produtos : Updates an existing pedidoProduto.
     *
     * @param pedidoProduto the pedidoProduto to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated pedidoProduto,
     * or with status 400 (Bad Request) if the pedidoProduto is not valid,
     * or with status 500 (Internal Server Error) if the pedidoProduto couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/pedido-produtos")
    @Timed
    public ResponseEntity<PedidoProduto> updatePedidoProduto(@RequestBody PedidoProduto pedidoProduto) throws URISyntaxException {
        log.debug("REST request to update PedidoProduto : {}", pedidoProduto);
        if (pedidoProduto.getId() == null) {
            return createPedidoProduto(pedidoProduto);
        }
        PedidoProduto result = pedidoProdutoRepository.save(pedidoProduto);
        pedidoProdutoSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, pedidoProduto.getId().toString()))
            .body(result);
    }

    /**
     * GET  /pedido-produtos : get all the pedidoProdutos.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of pedidoProdutos in body
     */
    @GetMapping("/pedido-produtos")
    @Timed
    public List<PedidoProduto> getAllPedidoProdutos() {
        log.debug("REST request to get all PedidoProdutos");
        return pedidoProdutoRepository.findAll();
        }

    /**
     * GET  /pedido-produtos/:id : get the "id" pedidoProduto.
     *
     * @param id the id of the pedidoProduto to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the pedidoProduto, or with status 404 (Not Found)
     */
    @GetMapping("/pedido-produtos/{id}")
    @Timed
    public ResponseEntity<PedidoProduto> getPedidoProduto(@PathVariable Long id) {
        log.debug("REST request to get PedidoProduto : {}", id);
        PedidoProduto pedidoProduto = pedidoProdutoRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(pedidoProduto));
    }

    /**
     * DELETE  /pedido-produtos/:id : delete the "id" pedidoProduto.
     *
     * @param id the id of the pedidoProduto to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/pedido-produtos/{id}")
    @Timed
    public ResponseEntity<Void> deletePedidoProduto(@PathVariable Long id) {
        log.debug("REST request to delete PedidoProduto : {}", id);
        pedidoProdutoRepository.delete(id);
        pedidoProdutoSearchRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/pedido-produtos?query=:query : search for the pedidoProduto corresponding
     * to the query.
     *
     * @param query the query of the pedidoProduto search
     * @return the result of the search
     */
    @GetMapping("/_search/pedido-produtos")
    @Timed
    public List<PedidoProduto> searchPedidoProdutos(@RequestParam String query) {
        log.debug("REST request to search PedidoProdutos for query {}", query);
        return StreamSupport
            .stream(pedidoProdutoSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }

}

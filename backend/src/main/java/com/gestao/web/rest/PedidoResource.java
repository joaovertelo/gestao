package com.gestao.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.gestao.domain.Pedido;

import com.gestao.repository.PedidoRepository;
import com.gestao.repository.search.PedidoSearchRepository;
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
 * REST controller for managing Pedido.
 */
@RestController
@RequestMapping("/api")
public class PedidoResource {

    private final Logger log = LoggerFactory.getLogger(PedidoResource.class);

    private static final String ENTITY_NAME = "pedido";

    private final PedidoRepository pedidoRepository;

    private final PedidoSearchRepository pedidoSearchRepository;

    public PedidoResource(PedidoRepository pedidoRepository, PedidoSearchRepository pedidoSearchRepository) {
        this.pedidoRepository = pedidoRepository;
        this.pedidoSearchRepository = pedidoSearchRepository;
    }

    /**
     * POST  /pedidos : Create a new pedido.
     *
     * @param pedido the pedido to create
     * @return the ResponseEntity with status 201 (Created) and with body the new pedido, or with status 400 (Bad Request) if the pedido has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/pedidos")
    @Timed
    public ResponseEntity<Pedido> createPedido(@RequestBody Pedido pedido) throws URISyntaxException {
        log.debug("REST request to save Pedido : {}", pedido);
        if (pedido.getId() != null) {
            throw new BadRequestAlertException("A new pedido cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Pedido result = pedidoRepository.save(pedido);
        pedidoSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/pedidos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /pedidos : Updates an existing pedido.
     *
     * @param pedido the pedido to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated pedido,
     * or with status 400 (Bad Request) if the pedido is not valid,
     * or with status 500 (Internal Server Error) if the pedido couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/pedidos")
    @Timed
    public ResponseEntity<Pedido> updatePedido(@RequestBody Pedido pedido) throws URISyntaxException {
        log.debug("REST request to update Pedido : {}", pedido);
        if (pedido.getId() == null) {
            return createPedido(pedido);
        }
        Pedido result = pedidoRepository.save(pedido);
        pedidoSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, pedido.getId().toString()))
            .body(result);
    }

    /**
     * GET  /pedidos : get all the pedidos.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of pedidos in body
     */
    @GetMapping("/pedidos")
    @Timed
    public List<Pedido> getAllPedidos() {
        log.debug("REST request to get all Pedidos");
        return pedidoRepository.findAll();
        }

    /**
     * GET  /pedidos/:id : get the "id" pedido.
     *
     * @param id the id of the pedido to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the pedido, or with status 404 (Not Found)
     */
    @GetMapping("/pedidos/{id}")
    @Timed
    public ResponseEntity<Pedido> getPedido(@PathVariable Long id) {
        log.debug("REST request to get Pedido : {}", id);
        Pedido pedido = pedidoRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(pedido));
    }

    /**
     * DELETE  /pedidos/:id : delete the "id" pedido.
     *
     * @param id the id of the pedido to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/pedidos/{id}")
    @Timed
    public ResponseEntity<Void> deletePedido(@PathVariable Long id) {
        log.debug("REST request to delete Pedido : {}", id);
        pedidoRepository.delete(id);
        pedidoSearchRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/pedidos?query=:query : search for the pedido corresponding
     * to the query.
     *
     * @param query the query of the pedido search
     * @return the result of the search
     */
    @GetMapping("/_search/pedidos")
    @Timed
    public List<Pedido> searchPedidos(@RequestParam String query) {
        log.debug("REST request to search Pedidos for query {}", query);
        return StreamSupport
            .stream(pedidoSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }

}

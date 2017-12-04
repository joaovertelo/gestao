package com.gestao.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.gestao.domain.TipoProduto;

import com.gestao.repository.TipoProdutoRepository;
import com.gestao.repository.search.TipoProdutoSearchRepository;
import com.gestao.web.rest.errors.BadRequestAlertException;
import com.gestao.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing TipoProduto.
 */
@RestController
@RequestMapping("/api")
public class TipoProdutoResource {

    private final Logger log = LoggerFactory.getLogger(TipoProdutoResource.class);

    private static final String ENTITY_NAME = "tipoProduto";

    private final TipoProdutoRepository tipoProdutoRepository;

    private final TipoProdutoSearchRepository tipoProdutoSearchRepository;

    public TipoProdutoResource(TipoProdutoRepository tipoProdutoRepository, TipoProdutoSearchRepository tipoProdutoSearchRepository) {
        this.tipoProdutoRepository = tipoProdutoRepository;
        this.tipoProdutoSearchRepository = tipoProdutoSearchRepository;
    }

    /**
     * POST  /tipo-produtos : Create a new tipoProduto.
     *
     * @param tipoProduto the tipoProduto to create
     * @return the ResponseEntity with status 201 (Created) and with body the new tipoProduto, or with status 400 (Bad Request) if the tipoProduto has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/tipo-produtos")
    @Timed
    public ResponseEntity<TipoProduto> createTipoProduto(@Valid @RequestBody TipoProduto tipoProduto) throws URISyntaxException {
        log.debug("REST request to save TipoProduto : {}", tipoProduto);
        if (tipoProduto.getId() != null) {
            throw new BadRequestAlertException("A new tipoProduto cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TipoProduto result = tipoProdutoRepository.save(tipoProduto);
        tipoProdutoSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/tipo-produtos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /tipo-produtos : Updates an existing tipoProduto.
     *
     * @param tipoProduto the tipoProduto to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated tipoProduto,
     * or with status 400 (Bad Request) if the tipoProduto is not valid,
     * or with status 500 (Internal Server Error) if the tipoProduto couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/tipo-produtos")
    @Timed
    public ResponseEntity<TipoProduto> updateTipoProduto(@Valid @RequestBody TipoProduto tipoProduto) throws URISyntaxException {
        log.debug("REST request to update TipoProduto : {}", tipoProduto);
        if (tipoProduto.getId() == null) {
            return createTipoProduto(tipoProduto);
        }
        TipoProduto result = tipoProdutoRepository.save(tipoProduto);
        tipoProdutoSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, tipoProduto.getId().toString()))
            .body(result);
    }

    /**
     * GET  /tipo-produtos : get all the tipoProdutos.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of tipoProdutos in body
     */
    @GetMapping("/tipo-produtos")
    @Timed
    public List<TipoProduto> getAllTipoProdutos() {
        log.debug("REST request to get all TipoProdutos");
        return tipoProdutoRepository.findAll();
        }

    /**
     * GET  /tipo-produtos/:id : get the "id" tipoProduto.
     *
     * @param id the id of the tipoProduto to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the tipoProduto, or with status 404 (Not Found)
     */
    @GetMapping("/tipo-produtos/{id}")
    @Timed
    public ResponseEntity<TipoProduto> getTipoProduto(@PathVariable Long id) {
        log.debug("REST request to get TipoProduto : {}", id);
        TipoProduto tipoProduto = tipoProdutoRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(tipoProduto));
    }

    /**
     * DELETE  /tipo-produtos/:id : delete the "id" tipoProduto.
     *
     * @param id the id of the tipoProduto to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/tipo-produtos/{id}")
    @Timed
    public ResponseEntity<Void> deleteTipoProduto(@PathVariable Long id) {
        log.debug("REST request to delete TipoProduto : {}", id);
        tipoProdutoRepository.delete(id);
        tipoProdutoSearchRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/tipo-produtos?query=:query : search for the tipoProduto corresponding
     * to the query.
     *
     * @param query the query of the tipoProduto search
     * @return the result of the search
     */
    @GetMapping("/_search/tipo-produtos")
    @Timed
    public List<TipoProduto> searchTipoProdutos(@RequestParam String query) {
        log.debug("REST request to search TipoProdutos for query {}", query);
        return StreamSupport
            .stream(tipoProdutoSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }

}

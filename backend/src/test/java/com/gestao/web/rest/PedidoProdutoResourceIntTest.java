package com.gestao.web.rest;

import com.gestao.GestaoApp;

import com.gestao.domain.PedidoProduto;
import com.gestao.repository.PedidoProdutoRepository;
import com.gestao.repository.search.PedidoProdutoSearchRepository;
import com.gestao.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static com.gestao.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the PedidoProdutoResource REST controller.
 *
 * @see PedidoProdutoResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GestaoApp.class)
public class PedidoProdutoResourceIntTest {

    private static final Integer DEFAULT_QUANTIDADE = 1;
    private static final Integer UPDATED_QUANTIDADE = 2;

    private static final Integer DEFAULT_PRECO = 1;
    private static final Integer UPDATED_PRECO = 2;

    @Autowired
    private PedidoProdutoRepository pedidoProdutoRepository;

    @Autowired
    private PedidoProdutoSearchRepository pedidoProdutoSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restPedidoProdutoMockMvc;

    private PedidoProduto pedidoProduto;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PedidoProdutoResource pedidoProdutoResource = new PedidoProdutoResource(pedidoProdutoRepository, pedidoProdutoSearchRepository);
        this.restPedidoProdutoMockMvc = MockMvcBuilders.standaloneSetup(pedidoProdutoResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PedidoProduto createEntity(EntityManager em) {
        PedidoProduto pedidoProduto = new PedidoProduto()
            .quantidade(DEFAULT_QUANTIDADE)
            .preco(DEFAULT_PRECO);
        return pedidoProduto;
    }

    @Before
    public void initTest() {
        pedidoProdutoSearchRepository.deleteAll();
        pedidoProduto = createEntity(em);
    }

    @Test
    @Transactional
    public void createPedidoProduto() throws Exception {
        int databaseSizeBeforeCreate = pedidoProdutoRepository.findAll().size();

        // Create the PedidoProduto
        restPedidoProdutoMockMvc.perform(post("/api/pedido-produtos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(pedidoProduto)))
            .andExpect(status().isCreated());

        // Validate the PedidoProduto in the database
        List<PedidoProduto> pedidoProdutoList = pedidoProdutoRepository.findAll();
        assertThat(pedidoProdutoList).hasSize(databaseSizeBeforeCreate + 1);
        PedidoProduto testPedidoProduto = pedidoProdutoList.get(pedidoProdutoList.size() - 1);
        assertThat(testPedidoProduto.getQuantidade()).isEqualTo(DEFAULT_QUANTIDADE);
        assertThat(testPedidoProduto.getPreco()).isEqualTo(DEFAULT_PRECO);

        // Validate the PedidoProduto in Elasticsearch
        PedidoProduto pedidoProdutoEs = pedidoProdutoSearchRepository.findOne(testPedidoProduto.getId());
        assertThat(pedidoProdutoEs).isEqualToComparingFieldByField(testPedidoProduto);
    }

    @Test
    @Transactional
    public void createPedidoProdutoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = pedidoProdutoRepository.findAll().size();

        // Create the PedidoProduto with an existing ID
        pedidoProduto.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPedidoProdutoMockMvc.perform(post("/api/pedido-produtos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(pedidoProduto)))
            .andExpect(status().isBadRequest());

        // Validate the PedidoProduto in the database
        List<PedidoProduto> pedidoProdutoList = pedidoProdutoRepository.findAll();
        assertThat(pedidoProdutoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllPedidoProdutos() throws Exception {
        // Initialize the database
        pedidoProdutoRepository.saveAndFlush(pedidoProduto);

        // Get all the pedidoProdutoList
        restPedidoProdutoMockMvc.perform(get("/api/pedido-produtos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(pedidoProduto.getId().intValue())))
            .andExpect(jsonPath("$.[*].quantidade").value(hasItem(DEFAULT_QUANTIDADE)))
            .andExpect(jsonPath("$.[*].preco").value(hasItem(DEFAULT_PRECO)));
    }

    @Test
    @Transactional
    public void getPedidoProduto() throws Exception {
        // Initialize the database
        pedidoProdutoRepository.saveAndFlush(pedidoProduto);

        // Get the pedidoProduto
        restPedidoProdutoMockMvc.perform(get("/api/pedido-produtos/{id}", pedidoProduto.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(pedidoProduto.getId().intValue()))
            .andExpect(jsonPath("$.quantidade").value(DEFAULT_QUANTIDADE))
            .andExpect(jsonPath("$.preco").value(DEFAULT_PRECO));
    }

    @Test
    @Transactional
    public void getNonExistingPedidoProduto() throws Exception {
        // Get the pedidoProduto
        restPedidoProdutoMockMvc.perform(get("/api/pedido-produtos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePedidoProduto() throws Exception {
        // Initialize the database
        pedidoProdutoRepository.saveAndFlush(pedidoProduto);
        pedidoProdutoSearchRepository.save(pedidoProduto);
        int databaseSizeBeforeUpdate = pedidoProdutoRepository.findAll().size();

        // Update the pedidoProduto
        PedidoProduto updatedPedidoProduto = pedidoProdutoRepository.findOne(pedidoProduto.getId());
        // Disconnect from session so that the updates on updatedPedidoProduto are not directly saved in db
        em.detach(updatedPedidoProduto);
        updatedPedidoProduto
            .quantidade(UPDATED_QUANTIDADE)
            .preco(UPDATED_PRECO);

        restPedidoProdutoMockMvc.perform(put("/api/pedido-produtos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedPedidoProduto)))
            .andExpect(status().isOk());

        // Validate the PedidoProduto in the database
        List<PedidoProduto> pedidoProdutoList = pedidoProdutoRepository.findAll();
        assertThat(pedidoProdutoList).hasSize(databaseSizeBeforeUpdate);
        PedidoProduto testPedidoProduto = pedidoProdutoList.get(pedidoProdutoList.size() - 1);
        assertThat(testPedidoProduto.getQuantidade()).isEqualTo(UPDATED_QUANTIDADE);
        assertThat(testPedidoProduto.getPreco()).isEqualTo(UPDATED_PRECO);

        // Validate the PedidoProduto in Elasticsearch
        PedidoProduto pedidoProdutoEs = pedidoProdutoSearchRepository.findOne(testPedidoProduto.getId());
        assertThat(pedidoProdutoEs).isEqualToComparingFieldByField(testPedidoProduto);
    }

    @Test
    @Transactional
    public void updateNonExistingPedidoProduto() throws Exception {
        int databaseSizeBeforeUpdate = pedidoProdutoRepository.findAll().size();

        // Create the PedidoProduto

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restPedidoProdutoMockMvc.perform(put("/api/pedido-produtos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(pedidoProduto)))
            .andExpect(status().isCreated());

        // Validate the PedidoProduto in the database
        List<PedidoProduto> pedidoProdutoList = pedidoProdutoRepository.findAll();
        assertThat(pedidoProdutoList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deletePedidoProduto() throws Exception {
        // Initialize the database
        pedidoProdutoRepository.saveAndFlush(pedidoProduto);
        pedidoProdutoSearchRepository.save(pedidoProduto);
        int databaseSizeBeforeDelete = pedidoProdutoRepository.findAll().size();

        // Get the pedidoProduto
        restPedidoProdutoMockMvc.perform(delete("/api/pedido-produtos/{id}", pedidoProduto.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean pedidoProdutoExistsInEs = pedidoProdutoSearchRepository.exists(pedidoProduto.getId());
        assertThat(pedidoProdutoExistsInEs).isFalse();

        // Validate the database is empty
        List<PedidoProduto> pedidoProdutoList = pedidoProdutoRepository.findAll();
        assertThat(pedidoProdutoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchPedidoProduto() throws Exception {
        // Initialize the database
        pedidoProdutoRepository.saveAndFlush(pedidoProduto);
        pedidoProdutoSearchRepository.save(pedidoProduto);

        // Search the pedidoProduto
        restPedidoProdutoMockMvc.perform(get("/api/_search/pedido-produtos?query=id:" + pedidoProduto.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(pedidoProduto.getId().intValue())))
            .andExpect(jsonPath("$.[*].quantidade").value(hasItem(DEFAULT_QUANTIDADE)))
            .andExpect(jsonPath("$.[*].preco").value(hasItem(DEFAULT_PRECO)));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PedidoProduto.class);
        PedidoProduto pedidoProduto1 = new PedidoProduto();
        pedidoProduto1.setId(1L);
        PedidoProduto pedidoProduto2 = new PedidoProduto();
        pedidoProduto2.setId(pedidoProduto1.getId());
        assertThat(pedidoProduto1).isEqualTo(pedidoProduto2);
        pedidoProduto2.setId(2L);
        assertThat(pedidoProduto1).isNotEqualTo(pedidoProduto2);
        pedidoProduto1.setId(null);
        assertThat(pedidoProduto1).isNotEqualTo(pedidoProduto2);
    }
}

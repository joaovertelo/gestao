package com.gestao.web.rest;

import com.gestao.GestaoApp;

import com.gestao.domain.TipoProduto;
import com.gestao.repository.TipoProdutoRepository;
import com.gestao.repository.search.TipoProdutoSearchRepository;
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
 * Test class for the TipoProdutoResource REST controller.
 *
 * @see TipoProdutoResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GestaoApp.class)
public class TipoProdutoResourceIntTest {

    private static final String DEFAULT_NOME = "AAAAAAAAAA";
    private static final String UPDATED_NOME = "BBBBBBBBBB";

    @Autowired
    private TipoProdutoRepository tipoProdutoRepository;

    @Autowired
    private TipoProdutoSearchRepository tipoProdutoSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTipoProdutoMockMvc;

    private TipoProduto tipoProduto;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TipoProdutoResource tipoProdutoResource = new TipoProdutoResource(tipoProdutoRepository, tipoProdutoSearchRepository);
        this.restTipoProdutoMockMvc = MockMvcBuilders.standaloneSetup(tipoProdutoResource)
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
    public static TipoProduto createEntity(EntityManager em) {
        TipoProduto tipoProduto = new TipoProduto()
            .nome(DEFAULT_NOME);
        return tipoProduto;
    }

    @Before
    public void initTest() {
        tipoProdutoSearchRepository.deleteAll();
        tipoProduto = createEntity(em);
    }

    @Test
    @Transactional
    public void createTipoProduto() throws Exception {
        int databaseSizeBeforeCreate = tipoProdutoRepository.findAll().size();

        // Create the TipoProduto
        restTipoProdutoMockMvc.perform(post("/api/tipo-produtos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tipoProduto)))
            .andExpect(status().isCreated());

        // Validate the TipoProduto in the database
        List<TipoProduto> tipoProdutoList = tipoProdutoRepository.findAll();
        assertThat(tipoProdutoList).hasSize(databaseSizeBeforeCreate + 1);
        TipoProduto testTipoProduto = tipoProdutoList.get(tipoProdutoList.size() - 1);
        assertThat(testTipoProduto.getNome()).isEqualTo(DEFAULT_NOME);

        // Validate the TipoProduto in Elasticsearch
        TipoProduto tipoProdutoEs = tipoProdutoSearchRepository.findOne(testTipoProduto.getId());
        assertThat(tipoProdutoEs).isEqualToComparingFieldByField(testTipoProduto);
    }

    @Test
    @Transactional
    public void createTipoProdutoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = tipoProdutoRepository.findAll().size();

        // Create the TipoProduto with an existing ID
        tipoProduto.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTipoProdutoMockMvc.perform(post("/api/tipo-produtos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tipoProduto)))
            .andExpect(status().isBadRequest());

        // Validate the TipoProduto in the database
        List<TipoProduto> tipoProdutoList = tipoProdutoRepository.findAll();
        assertThat(tipoProdutoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNomeIsRequired() throws Exception {
        int databaseSizeBeforeTest = tipoProdutoRepository.findAll().size();
        // set the field null
        tipoProduto.setNome(null);

        // Create the TipoProduto, which fails.

        restTipoProdutoMockMvc.perform(post("/api/tipo-produtos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tipoProduto)))
            .andExpect(status().isBadRequest());

        List<TipoProduto> tipoProdutoList = tipoProdutoRepository.findAll();
        assertThat(tipoProdutoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllTipoProdutos() throws Exception {
        // Initialize the database
        tipoProdutoRepository.saveAndFlush(tipoProduto);

        // Get all the tipoProdutoList
        restTipoProdutoMockMvc.perform(get("/api/tipo-produtos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tipoProduto.getId().intValue())))
            .andExpect(jsonPath("$.[*].nome").value(hasItem(DEFAULT_NOME.toString())));
    }

    @Test
    @Transactional
    public void getTipoProduto() throws Exception {
        // Initialize the database
        tipoProdutoRepository.saveAndFlush(tipoProduto);

        // Get the tipoProduto
        restTipoProdutoMockMvc.perform(get("/api/tipo-produtos/{id}", tipoProduto.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(tipoProduto.getId().intValue()))
            .andExpect(jsonPath("$.nome").value(DEFAULT_NOME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingTipoProduto() throws Exception {
        // Get the tipoProduto
        restTipoProdutoMockMvc.perform(get("/api/tipo-produtos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTipoProduto() throws Exception {
        // Initialize the database
        tipoProdutoRepository.saveAndFlush(tipoProduto);
        tipoProdutoSearchRepository.save(tipoProduto);
        int databaseSizeBeforeUpdate = tipoProdutoRepository.findAll().size();

        // Update the tipoProduto
        TipoProduto updatedTipoProduto = tipoProdutoRepository.findOne(tipoProduto.getId());
        // Disconnect from session so that the updates on updatedTipoProduto are not directly saved in db
        em.detach(updatedTipoProduto);
        updatedTipoProduto
            .nome(UPDATED_NOME);

        restTipoProdutoMockMvc.perform(put("/api/tipo-produtos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTipoProduto)))
            .andExpect(status().isOk());

        // Validate the TipoProduto in the database
        List<TipoProduto> tipoProdutoList = tipoProdutoRepository.findAll();
        assertThat(tipoProdutoList).hasSize(databaseSizeBeforeUpdate);
        TipoProduto testTipoProduto = tipoProdutoList.get(tipoProdutoList.size() - 1);
        assertThat(testTipoProduto.getNome()).isEqualTo(UPDATED_NOME);

        // Validate the TipoProduto in Elasticsearch
        TipoProduto tipoProdutoEs = tipoProdutoSearchRepository.findOne(testTipoProduto.getId());
        assertThat(tipoProdutoEs).isEqualToComparingFieldByField(testTipoProduto);
    }

    @Test
    @Transactional
    public void updateNonExistingTipoProduto() throws Exception {
        int databaseSizeBeforeUpdate = tipoProdutoRepository.findAll().size();

        // Create the TipoProduto

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restTipoProdutoMockMvc.perform(put("/api/tipo-produtos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tipoProduto)))
            .andExpect(status().isCreated());

        // Validate the TipoProduto in the database
        List<TipoProduto> tipoProdutoList = tipoProdutoRepository.findAll();
        assertThat(tipoProdutoList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteTipoProduto() throws Exception {
        // Initialize the database
        tipoProdutoRepository.saveAndFlush(tipoProduto);
        tipoProdutoSearchRepository.save(tipoProduto);
        int databaseSizeBeforeDelete = tipoProdutoRepository.findAll().size();

        // Get the tipoProduto
        restTipoProdutoMockMvc.perform(delete("/api/tipo-produtos/{id}", tipoProduto.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean tipoProdutoExistsInEs = tipoProdutoSearchRepository.exists(tipoProduto.getId());
        assertThat(tipoProdutoExistsInEs).isFalse();

        // Validate the database is empty
        List<TipoProduto> tipoProdutoList = tipoProdutoRepository.findAll();
        assertThat(tipoProdutoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchTipoProduto() throws Exception {
        // Initialize the database
        tipoProdutoRepository.saveAndFlush(tipoProduto);
        tipoProdutoSearchRepository.save(tipoProduto);

        // Search the tipoProduto
        restTipoProdutoMockMvc.perform(get("/api/_search/tipo-produtos?query=id:" + tipoProduto.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tipoProduto.getId().intValue())))
            .andExpect(jsonPath("$.[*].nome").value(hasItem(DEFAULT_NOME.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TipoProduto.class);
        TipoProduto tipoProduto1 = new TipoProduto();
        tipoProduto1.setId(1L);
        TipoProduto tipoProduto2 = new TipoProduto();
        tipoProduto2.setId(tipoProduto1.getId());
        assertThat(tipoProduto1).isEqualTo(tipoProduto2);
        tipoProduto2.setId(2L);
        assertThat(tipoProduto1).isNotEqualTo(tipoProduto2);
        tipoProduto1.setId(null);
        assertThat(tipoProduto1).isNotEqualTo(tipoProduto2);
    }
}

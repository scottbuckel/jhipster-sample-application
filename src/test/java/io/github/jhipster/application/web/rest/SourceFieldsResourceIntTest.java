package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.JhipsterSampleApplicationApp;

import io.github.jhipster.application.domain.SourceFields;
import io.github.jhipster.application.repository.SourceFieldsRepository;
import io.github.jhipster.application.web.rest.errors.ExceptionTranslator;

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
import org.springframework.util.Base64Utils;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;


import static io.github.jhipster.application.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the SourceFieldsResource REST controller.
 *
 * @see SourceFieldsResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JhipsterSampleApplicationApp.class)
public class SourceFieldsResourceIntTest {

    private static final String DEFAULT_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_TITLE = "BBBBBBBBBB";

    private static final String DEFAULT_CONTENT = "AAAAAAAAAA";
    private static final String UPDATED_CONTENT = "BBBBBBBBBB";

    private static final Instant DEFAULT_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private SourceFieldsRepository sourceFieldsRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restSourceFieldsMockMvc;

    private SourceFields sourceFields;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SourceFieldsResource sourceFieldsResource = new SourceFieldsResource(sourceFieldsRepository);
        this.restSourceFieldsMockMvc = MockMvcBuilders.standaloneSetup(sourceFieldsResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static SourceFields createEntity(EntityManager em) {
        SourceFields sourceFields = new SourceFields()
            .title(DEFAULT_TITLE)
            .content(DEFAULT_CONTENT)
            .date(DEFAULT_DATE);
        return sourceFields;
    }

    @Before
    public void initTest() {
        sourceFields = createEntity(em);
    }

    @Test
    @Transactional
    public void createSourceFields() throws Exception {
        int databaseSizeBeforeCreate = sourceFieldsRepository.findAll().size();

        // Create the SourceFields
        restSourceFieldsMockMvc.perform(post("/api/source-fields")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sourceFields)))
            .andExpect(status().isCreated());

        // Validate the SourceFields in the database
        List<SourceFields> sourceFieldsList = sourceFieldsRepository.findAll();
        assertThat(sourceFieldsList).hasSize(databaseSizeBeforeCreate + 1);
        SourceFields testSourceFields = sourceFieldsList.get(sourceFieldsList.size() - 1);
        assertThat(testSourceFields.getTitle()).isEqualTo(DEFAULT_TITLE);
        assertThat(testSourceFields.getContent()).isEqualTo(DEFAULT_CONTENT);
        assertThat(testSourceFields.getDate()).isEqualTo(DEFAULT_DATE);
    }

    @Test
    @Transactional
    public void createSourceFieldsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = sourceFieldsRepository.findAll().size();

        // Create the SourceFields with an existing ID
        sourceFields.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSourceFieldsMockMvc.perform(post("/api/source-fields")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sourceFields)))
            .andExpect(status().isBadRequest());

        // Validate the SourceFields in the database
        List<SourceFields> sourceFieldsList = sourceFieldsRepository.findAll();
        assertThat(sourceFieldsList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkTitleIsRequired() throws Exception {
        int databaseSizeBeforeTest = sourceFieldsRepository.findAll().size();
        // set the field null
        sourceFields.setTitle(null);

        // Create the SourceFields, which fails.

        restSourceFieldsMockMvc.perform(post("/api/source-fields")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sourceFields)))
            .andExpect(status().isBadRequest());

        List<SourceFields> sourceFieldsList = sourceFieldsRepository.findAll();
        assertThat(sourceFieldsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = sourceFieldsRepository.findAll().size();
        // set the field null
        sourceFields.setDate(null);

        // Create the SourceFields, which fails.

        restSourceFieldsMockMvc.perform(post("/api/source-fields")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sourceFields)))
            .andExpect(status().isBadRequest());

        List<SourceFields> sourceFieldsList = sourceFieldsRepository.findAll();
        assertThat(sourceFieldsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllSourceFields() throws Exception {
        // Initialize the database
        sourceFieldsRepository.saveAndFlush(sourceFields);

        // Get all the sourceFieldsList
        restSourceFieldsMockMvc.perform(get("/api/source-fields?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(sourceFields.getId().intValue())))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE.toString())))
            .andExpect(jsonPath("$.[*].content").value(hasItem(DEFAULT_CONTENT.toString())))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())));
    }
    
    @Test
    @Transactional
    public void getSourceFields() throws Exception {
        // Initialize the database
        sourceFieldsRepository.saveAndFlush(sourceFields);

        // Get the sourceFields
        restSourceFieldsMockMvc.perform(get("/api/source-fields/{id}", sourceFields.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(sourceFields.getId().intValue()))
            .andExpect(jsonPath("$.title").value(DEFAULT_TITLE.toString()))
            .andExpect(jsonPath("$.content").value(DEFAULT_CONTENT.toString()))
            .andExpect(jsonPath("$.date").value(DEFAULT_DATE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingSourceFields() throws Exception {
        // Get the sourceFields
        restSourceFieldsMockMvc.perform(get("/api/source-fields/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSourceFields() throws Exception {
        // Initialize the database
        sourceFieldsRepository.saveAndFlush(sourceFields);

        int databaseSizeBeforeUpdate = sourceFieldsRepository.findAll().size();

        // Update the sourceFields
        SourceFields updatedSourceFields = sourceFieldsRepository.findById(sourceFields.getId()).get();
        // Disconnect from session so that the updates on updatedSourceFields are not directly saved in db
        em.detach(updatedSourceFields);
        updatedSourceFields
            .title(UPDATED_TITLE)
            .content(UPDATED_CONTENT)
            .date(UPDATED_DATE);

        restSourceFieldsMockMvc.perform(put("/api/source-fields")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedSourceFields)))
            .andExpect(status().isOk());

        // Validate the SourceFields in the database
        List<SourceFields> sourceFieldsList = sourceFieldsRepository.findAll();
        assertThat(sourceFieldsList).hasSize(databaseSizeBeforeUpdate);
        SourceFields testSourceFields = sourceFieldsList.get(sourceFieldsList.size() - 1);
        assertThat(testSourceFields.getTitle()).isEqualTo(UPDATED_TITLE);
        assertThat(testSourceFields.getContent()).isEqualTo(UPDATED_CONTENT);
        assertThat(testSourceFields.getDate()).isEqualTo(UPDATED_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingSourceFields() throws Exception {
        int databaseSizeBeforeUpdate = sourceFieldsRepository.findAll().size();

        // Create the SourceFields

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSourceFieldsMockMvc.perform(put("/api/source-fields")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sourceFields)))
            .andExpect(status().isBadRequest());

        // Validate the SourceFields in the database
        List<SourceFields> sourceFieldsList = sourceFieldsRepository.findAll();
        assertThat(sourceFieldsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteSourceFields() throws Exception {
        // Initialize the database
        sourceFieldsRepository.saveAndFlush(sourceFields);

        int databaseSizeBeforeDelete = sourceFieldsRepository.findAll().size();

        // Delete the sourceFields
        restSourceFieldsMockMvc.perform(delete("/api/source-fields/{id}", sourceFields.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<SourceFields> sourceFieldsList = sourceFieldsRepository.findAll();
        assertThat(sourceFieldsList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(SourceFields.class);
        SourceFields sourceFields1 = new SourceFields();
        sourceFields1.setId(1L);
        SourceFields sourceFields2 = new SourceFields();
        sourceFields2.setId(sourceFields1.getId());
        assertThat(sourceFields1).isEqualTo(sourceFields2);
        sourceFields2.setId(2L);
        assertThat(sourceFields1).isNotEqualTo(sourceFields2);
        sourceFields1.setId(null);
        assertThat(sourceFields1).isNotEqualTo(sourceFields2);
    }
}

package io.github.jhipster.application.web.rest;
import io.github.jhipster.application.domain.SourceFields;
import io.github.jhipster.application.repository.SourceFieldsRepository;
import io.github.jhipster.application.web.rest.errors.BadRequestAlertException;
import io.github.jhipster.application.web.rest.util.HeaderUtil;
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

/**
 * REST controller for managing SourceFields.
 */
@RestController
@RequestMapping("/api")
public class SourceFieldsResource {

    private final Logger log = LoggerFactory.getLogger(SourceFieldsResource.class);

    private static final String ENTITY_NAME = "sourceFields";

    private final SourceFieldsRepository sourceFieldsRepository;

    public SourceFieldsResource(SourceFieldsRepository sourceFieldsRepository) {
        this.sourceFieldsRepository = sourceFieldsRepository;
    }

    /**
     * POST  /source-fields : Create a new sourceFields.
     *
     * @param sourceFields the sourceFields to create
     * @return the ResponseEntity with status 201 (Created) and with body the new sourceFields, or with status 400 (Bad Request) if the sourceFields has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/source-fields")
    public ResponseEntity<SourceFields> createSourceFields(@Valid @RequestBody SourceFields sourceFields) throws URISyntaxException {
        log.debug("REST request to save SourceFields : {}", sourceFields);
        if (sourceFields.getId() != null) {
            throw new BadRequestAlertException("A new sourceFields cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SourceFields result = sourceFieldsRepository.save(sourceFields);
        return ResponseEntity.created(new URI("/api/source-fields/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /source-fields : Updates an existing sourceFields.
     *
     * @param sourceFields the sourceFields to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated sourceFields,
     * or with status 400 (Bad Request) if the sourceFields is not valid,
     * or with status 500 (Internal Server Error) if the sourceFields couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/source-fields")
    public ResponseEntity<SourceFields> updateSourceFields(@Valid @RequestBody SourceFields sourceFields) throws URISyntaxException {
        log.debug("REST request to update SourceFields : {}", sourceFields);
        if (sourceFields.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        SourceFields result = sourceFieldsRepository.save(sourceFields);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, sourceFields.getId().toString()))
            .body(result);
    }

    /**
     * GET  /source-fields : get all the sourceFields.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of sourceFields in body
     */
    @GetMapping("/source-fields")
    public List<SourceFields> getAllSourceFields() {
        log.debug("REST request to get all SourceFields");
        return sourceFieldsRepository.findAll();
    }

    /**
     * GET  /source-fields/:id : get the "id" sourceFields.
     *
     * @param id the id of the sourceFields to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the sourceFields, or with status 404 (Not Found)
     */
    @GetMapping("/source-fields/{id}")
    public ResponseEntity<SourceFields> getSourceFields(@PathVariable Long id) {
        log.debug("REST request to get SourceFields : {}", id);
        Optional<SourceFields> sourceFields = sourceFieldsRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(sourceFields);
    }

    /**
     * DELETE  /source-fields/:id : delete the "id" sourceFields.
     *
     * @param id the id of the sourceFields to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/source-fields/{id}")
    public ResponseEntity<Void> deleteSourceFields(@PathVariable Long id) {
        log.debug("REST request to delete SourceFields : {}", id);
        sourceFieldsRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}

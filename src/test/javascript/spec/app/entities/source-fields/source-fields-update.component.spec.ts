/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { SourceFieldsUpdateComponent } from 'app/entities/source-fields/source-fields-update.component';
import { SourceFieldsService } from 'app/entities/source-fields/source-fields.service';
import { SourceFields } from 'app/shared/model/source-fields.model';

describe('Component Tests', () => {
    describe('SourceFields Management Update Component', () => {
        let comp: SourceFieldsUpdateComponent;
        let fixture: ComponentFixture<SourceFieldsUpdateComponent>;
        let service: SourceFieldsService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [SourceFieldsUpdateComponent]
            })
                .overrideTemplate(SourceFieldsUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(SourceFieldsUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SourceFieldsService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new SourceFields(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.sourceFields = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new SourceFields();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.sourceFields = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});

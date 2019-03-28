/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { SourceFieldsComponent } from 'app/entities/source-fields/source-fields.component';
import { SourceFieldsService } from 'app/entities/source-fields/source-fields.service';
import { SourceFields } from 'app/shared/model/source-fields.model';

describe('Component Tests', () => {
    describe('SourceFields Management Component', () => {
        let comp: SourceFieldsComponent;
        let fixture: ComponentFixture<SourceFieldsComponent>;
        let service: SourceFieldsService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [SourceFieldsComponent],
                providers: []
            })
                .overrideTemplate(SourceFieldsComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(SourceFieldsComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SourceFieldsService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new SourceFields(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.sourceFields[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});

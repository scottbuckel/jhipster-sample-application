/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { SourceFieldsDetailComponent } from 'app/entities/source-fields/source-fields-detail.component';
import { SourceFields } from 'app/shared/model/source-fields.model';

describe('Component Tests', () => {
    describe('SourceFields Management Detail Component', () => {
        let comp: SourceFieldsDetailComponent;
        let fixture: ComponentFixture<SourceFieldsDetailComponent>;
        const route = ({ data: of({ sourceFields: new SourceFields(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [SourceFieldsDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(SourceFieldsDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(SourceFieldsDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.sourceFields).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});

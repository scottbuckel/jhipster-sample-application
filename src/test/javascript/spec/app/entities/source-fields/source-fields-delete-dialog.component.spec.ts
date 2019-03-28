/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { SourceFieldsDeleteDialogComponent } from 'app/entities/source-fields/source-fields-delete-dialog.component';
import { SourceFieldsService } from 'app/entities/source-fields/source-fields.service';

describe('Component Tests', () => {
    describe('SourceFields Management Delete Component', () => {
        let comp: SourceFieldsDeleteDialogComponent;
        let fixture: ComponentFixture<SourceFieldsDeleteDialogComponent>;
        let service: SourceFieldsService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [SourceFieldsDeleteDialogComponent]
            })
                .overrideTemplate(SourceFieldsDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(SourceFieldsDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SourceFieldsService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISourceFields } from 'app/shared/model/source-fields.model';
import { SourceFieldsService } from './source-fields.service';

@Component({
    selector: 'jhi-source-fields-delete-dialog',
    templateUrl: './source-fields-delete-dialog.component.html'
})
export class SourceFieldsDeleteDialogComponent {
    sourceFields: ISourceFields;

    constructor(
        protected sourceFieldsService: SourceFieldsService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.sourceFieldsService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'sourceFieldsListModification',
                content: 'Deleted an sourceFields'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-source-fields-delete-popup',
    template: ''
})
export class SourceFieldsDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ sourceFields }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(SourceFieldsDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.sourceFields = sourceFields;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/source-fields', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/source-fields', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}

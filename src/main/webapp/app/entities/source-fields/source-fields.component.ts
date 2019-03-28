import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { ISourceFields } from 'app/shared/model/source-fields.model';
import { AccountService } from 'app/core';
import { SourceFieldsService } from './source-fields.service';

@Component({
    selector: 'jhi-source-fields',
    templateUrl: './source-fields.component.html'
})
export class SourceFieldsComponent implements OnInit, OnDestroy {
    sourceFields: ISourceFields[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected sourceFieldsService: SourceFieldsService,
        protected jhiAlertService: JhiAlertService,
        protected dataUtils: JhiDataUtils,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.sourceFieldsService
            .query()
            .pipe(
                filter((res: HttpResponse<ISourceFields[]>) => res.ok),
                map((res: HttpResponse<ISourceFields[]>) => res.body)
            )
            .subscribe(
                (res: ISourceFields[]) => {
                    this.sourceFields = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInSourceFields();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ISourceFields) {
        return item.id;
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    registerChangeInSourceFields() {
        this.eventSubscriber = this.eventManager.subscribe('sourceFieldsListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}

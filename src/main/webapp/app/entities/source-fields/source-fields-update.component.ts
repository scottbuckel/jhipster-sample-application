import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { ISourceFields } from 'app/shared/model/source-fields.model';
import { SourceFieldsService } from './source-fields.service';
import { ISource } from 'app/shared/model/source.model';
import { SourceService } from 'app/entities/source';

@Component({
    selector: 'jhi-source-fields-update',
    templateUrl: './source-fields-update.component.html'
})
export class SourceFieldsUpdateComponent implements OnInit {
    sourceFields: ISourceFields;
    isSaving: boolean;

    sources: ISource[];
    date: string;

    constructor(
        protected dataUtils: JhiDataUtils,
        protected jhiAlertService: JhiAlertService,
        protected sourceFieldsService: SourceFieldsService,
        protected sourceService: SourceService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ sourceFields }) => {
            this.sourceFields = sourceFields;
            this.date = this.sourceFields.date != null ? this.sourceFields.date.format(DATE_TIME_FORMAT) : null;
        });
        this.sourceService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<ISource[]>) => mayBeOk.ok),
                map((response: HttpResponse<ISource[]>) => response.body)
            )
            .subscribe((res: ISource[]) => (this.sources = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.sourceFields.date = this.date != null ? moment(this.date, DATE_TIME_FORMAT) : null;
        if (this.sourceFields.id !== undefined) {
            this.subscribeToSaveResponse(this.sourceFieldsService.update(this.sourceFields));
        } else {
            this.subscribeToSaveResponse(this.sourceFieldsService.create(this.sourceFields));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ISourceFields>>) {
        result.subscribe((res: HttpResponse<ISourceFields>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackSourceById(index: number, item: ISource) {
        return item.id;
    }
}

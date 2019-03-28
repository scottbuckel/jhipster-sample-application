import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { ISourceFields } from 'app/shared/model/source-fields.model';

@Component({
    selector: 'jhi-source-fields-detail',
    templateUrl: './source-fields-detail.component.html'
})
export class SourceFieldsDetailComponent implements OnInit {
    sourceFields: ISourceFields;

    constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ sourceFields }) => {
            this.sourceFields = sourceFields;
        });
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    previousState() {
        window.history.back();
    }
}

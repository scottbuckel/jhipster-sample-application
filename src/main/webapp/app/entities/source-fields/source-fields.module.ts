import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleApplicationSharedModule } from 'app/shared';
import {
    SourceFieldsComponent,
    SourceFieldsDetailComponent,
    SourceFieldsUpdateComponent,
    SourceFieldsDeletePopupComponent,
    SourceFieldsDeleteDialogComponent,
    sourceFieldsRoute,
    sourceFieldsPopupRoute
} from './';

const ENTITY_STATES = [...sourceFieldsRoute, ...sourceFieldsPopupRoute];

@NgModule({
    imports: [JhipsterSampleApplicationSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        SourceFieldsComponent,
        SourceFieldsDetailComponent,
        SourceFieldsUpdateComponent,
        SourceFieldsDeleteDialogComponent,
        SourceFieldsDeletePopupComponent
    ],
    entryComponents: [
        SourceFieldsComponent,
        SourceFieldsUpdateComponent,
        SourceFieldsDeleteDialogComponent,
        SourceFieldsDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterSampleApplicationSourceFieldsModule {}

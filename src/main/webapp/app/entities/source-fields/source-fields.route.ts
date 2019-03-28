import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { SourceFields } from 'app/shared/model/source-fields.model';
import { SourceFieldsService } from './source-fields.service';
import { SourceFieldsComponent } from './source-fields.component';
import { SourceFieldsDetailComponent } from './source-fields-detail.component';
import { SourceFieldsUpdateComponent } from './source-fields-update.component';
import { SourceFieldsDeletePopupComponent } from './source-fields-delete-dialog.component';
import { ISourceFields } from 'app/shared/model/source-fields.model';

@Injectable({ providedIn: 'root' })
export class SourceFieldsResolve implements Resolve<ISourceFields> {
    constructor(private service: SourceFieldsService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ISourceFields> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<SourceFields>) => response.ok),
                map((sourceFields: HttpResponse<SourceFields>) => sourceFields.body)
            );
        }
        return of(new SourceFields());
    }
}

export const sourceFieldsRoute: Routes = [
    {
        path: '',
        component: SourceFieldsComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SourceFields'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: SourceFieldsDetailComponent,
        resolve: {
            sourceFields: SourceFieldsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SourceFields'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: SourceFieldsUpdateComponent,
        resolve: {
            sourceFields: SourceFieldsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SourceFields'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: SourceFieldsUpdateComponent,
        resolve: {
            sourceFields: SourceFieldsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SourceFields'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const sourceFieldsPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: SourceFieldsDeletePopupComponent,
        resolve: {
            sourceFields: SourceFieldsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SourceFields'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

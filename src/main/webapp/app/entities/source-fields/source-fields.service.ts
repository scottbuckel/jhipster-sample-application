import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ISourceFields } from 'app/shared/model/source-fields.model';

type EntityResponseType = HttpResponse<ISourceFields>;
type EntityArrayResponseType = HttpResponse<ISourceFields[]>;

@Injectable({ providedIn: 'root' })
export class SourceFieldsService {
    public resourceUrl = SERVER_API_URL + 'api/source-fields';

    constructor(protected http: HttpClient) {}

    create(sourceFields: ISourceFields): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(sourceFields);
        return this.http
            .post<ISourceFields>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(sourceFields: ISourceFields): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(sourceFields);
        return this.http
            .put<ISourceFields>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<ISourceFields>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<ISourceFields[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(sourceFields: ISourceFields): ISourceFields {
        const copy: ISourceFields = Object.assign({}, sourceFields, {
            date: sourceFields.date != null && sourceFields.date.isValid() ? sourceFields.date.toJSON() : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.date = res.body.date != null ? moment(res.body.date) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((sourceFields: ISourceFields) => {
                sourceFields.date = sourceFields.date != null ? moment(sourceFields.date) : null;
            });
        }
        return res;
    }
}

import { Moment } from 'moment';
import { ISource } from 'app/shared/model/source.model';

export interface ISourceFields {
    id?: number;
    title?: string;
    content?: any;
    date?: Moment;
    source?: ISource;
}

export class SourceFields implements ISourceFields {
    constructor(public id?: number, public title?: string, public content?: any, public date?: Moment, public source?: ISource) {}
}

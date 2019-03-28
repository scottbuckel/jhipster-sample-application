import { ISourceFields } from 'app/shared/model/source-fields.model';

export interface ISource {
    id?: number;
    name?: string;
    handle?: string;
    sourceFields?: ISourceFields[];
}

export class Source implements ISource {
    constructor(public id?: number, public name?: string, public handle?: string, public sourceFields?: ISourceFields[]) {}
}

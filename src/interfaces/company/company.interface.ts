import { Types, Document } from 'mongoose';
import { JwtPayload } from 'jsonwebtoken';

export interface WorkTimings {
    days: {
        start: { type: Date },
        end: { type: Date },
    },
    timings: {
        start: { type: Date },
        end: { type: Date }
    }
}
export interface ICompany extends Document {
    _id: Types.ObjectId,
    company_id: number,
    name: string,
    email: string,
    password: string,
    namespace?: string,
    work_timings: Array<WorkTimings>,
    created_at?: number
}


export interface IRegisterCompanyRequest {
    company_id?: ICompany['company_id'],
    name: ICompany['name'],
    email: ICompany['email'],
    password: ICompany['password'],
}
export interface ILoginCompanyRequest {
    email: ICompany['email'],
    password: ICompany['password']
}

export interface ICompanyResponse {
    _id?: ICompany['_id']
    statusCode?: number,
    company_id?: ICompany['company_id'];
    message?: string;
    namespace?: ICompany['namespace'];
    authToken?: JwtPayload | string;
}
export interface ICompanyLoginResponse extends ICompanyResponse {
    isMatched: boolean
}
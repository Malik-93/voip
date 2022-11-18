import { Types, Document } from 'mongoose';
export interface Iissue extends Document {
    _id: Types.ObjectId,
    title: string
    active?: boolean,
    created_at?: number
}
export interface IissueRequest {
    issue_id?: number,
    title: string,
}
export interface IissueResponse extends Iissue {
    issue_id: string
}


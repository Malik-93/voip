import { Types, Document } from 'mongoose';

export interface IFile extends Document {
    _id?: Types.ObjectId,
    files: Array<Express.Multer.File>
    created_at?: number,
}

export interface IChatCreateUpdateRequest {

}
export interface IChatResponse {

}
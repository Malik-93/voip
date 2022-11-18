import { Types, Document } from 'mongoose';
import { JwtPayload } from 'jsonwebtoken';

export interface IUser extends Document {
    _id: Types.ObjectId,
    _company_ref: Types.ObjectId,
    user_id: Types.ObjectId | any,
    first_name: string,
    last_name?: string,
    user_name: string,
    email: string,
    password: string,
    company_id?: number,
    namespace?: string,
    role?: {
        text: string,
        value: number
    },
    chats?: [{
        _chat_id: Types.ObjectId,
        ref: string
    }],
    socket_id?: string,
    created_at?: number,

}


export interface IRegisterUserRequest {
    user_id?: IUser['user_id'],
    last_name?: IUser['last_name'],
    auth_company?: any,
    first_name: IUser['first_name'],
    user_name: IUser['user_name'],
    email: IUser['email'],
    socket_id?: IUser['socket_id'],
    password: IUser['password'],
}
export interface ILoginUserRequest {
    email: IUser['email'],
    password: IUser['password']
}
export interface IUserProfileRequest {
    first_name?: IUser['first_name'],
    last_name?: IUser['last_name'],
    user_name?: IUser['user_name'],
    email?: IUser['email'],
    socket_id?: IUser['socket_id'],
}

export interface IUserResponse {
    user_id?: IUser['_id'],
    company_id?: IUser['company_id'],
    namespace?: IUser['namespace'],
    statusCode?: number,
    message?: string,
    authToken?: JwtPayload | string,
    socket_id?: IUser['socket_id'],
}
export interface IUserLoginResponse extends IUserResponse {
    isMatched: boolean
}

export interface IUserFilter {
    _id?: IUser['_id'],
    user_id?: IUser['user_id'],
    first_name?: IUser['first_name'],
    last_name?: IUser['last_name'],
    user_name?: IUser['user_name'],
    email?: IUser['email'],
}


import { Types, Document } from 'mongoose';
import { IUser } from '../user/user.interface';

export interface IChat extends Document {
    _id?: Types.ObjectId,
    _sender?: Types.ObjectId,
    _reciever?: Types.ObjectId,
    _issue?: Types.ObjectId,
    messages: Array<IMessage>,
    active?: boolean,
    created_at?: number,
}

export interface IMessage {
    _id?: Types.ObjectId,
    _chat_id?: any,
    _issue_id?: string,
    _sender?: IUser | string,
    _reciever?: IUser | string,
    message_id?: string,
    message_type?: number,
    text?: string,
    files?: Array<string> //strings in array would be the path of files e.g images, audios or videos
    seen?: boolean,
    active?: boolean,
    created_at?: number
}
export interface IChatCreateUpdateRequest {
    chat_id?: string,
    _id?: string,
    _sender?: IMessage['_sender'],
    _reciever?: IMessage['_reciever'],
    _issue_id?: string,
    message?: IMessage,
    messages?: Array<IMessage>,
    active?: IChat['active']
    created_at?: number,
}
export interface IChatResponse {
    message?: string,
    chat_id?: string,
    statusCode?: number,
}

export interface IAllChatsResponse extends IChatResponse {
    chats?: Array<IMessage>,
}

export interface IChatClose {
    chat_id: string,
    active?: boolean,
}

export interface IAssignChat {
    chat_id: string
}
export interface ITransferChat {
    chat_id: string,
    agent_id: string,
}
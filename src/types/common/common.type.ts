import { ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData, ISocket } from './../../interfaces/socket/socket.interface';
import { IUser } from './../../interfaces/user/user.interface';
import { ICompany } from './../../interfaces/company/company.interface';
import { Error, MongooseError } from 'mongoose';
import { MongoError } from 'mongodb';
export type _MongooseError = MongooseError;
export type _Error = Error;
export type _MongoError = MongoError;
export type _AuthCompany = ICompany;
export type _AuthUser = IUser;
export type _FilterUserUnion = '_id' | 'user_id' | 'email';
export type _FilterChatUnion = '_id' | 'chat_id';

export type IO = ClientToServerEvents & ServerToClientEvents & InterServerEvents & SocketData
export type ISocketElement = {
    namespace: string,
    socket: ISocket
}
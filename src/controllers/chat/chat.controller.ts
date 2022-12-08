import { IUser } from './../../interfaces/user/user.interface';
import { CODES } from './../../constants/voip.constants';
import { IAllChatsResponse, IAssignChat, IChat, IChatClose, IChatCreateUpdateRequest, IChatResponse, IMessage, ITransferChat } from './../../interfaces/chat/chat.interface';
import { ISocketElement, _AuthUser, _MongoError, _MongooseError } from '../../types/common/common.type';
import { controller_catch_error } from '../../helpers/error/error.helper';
import { Post, Tags, Route, Body, Request, Security, Example, Get, Delete } from "tsoa";
import ChatRepo from '../../repositories/chat';
import socket from './../../socket/';
import userRepository from '../../repositories/user';
@Tags("Chats")
@Route("/api/v1/chats")
class EnumController {
    @Security("api_key")
    @Post("/create_update")
    @Example<IChatCreateUpdateRequest>({
        "chat_id": "",
        "_issue_id": "63689c8f61bd259d310f268d",
        "message": {
            "message_type": 1,
            "text": "Hello",
            "seen": true,
            "active": true
        },
    })
    public async create_update(@Body() _chat: IChatCreateUpdateRequest, @Request() auth_user: _AuthUser): Promise<IChatResponse> {
        try {
            // console.log('auth_user', auth_user);

            let result: any = {};
            if (_chat.chat_id) {
                const db_chat = <IChat>await ChatRepo.chat_repo_find("_id", _chat.chat_id);
                if (!db_chat) {
                    result = {
                        message: `Chat having id as ${_chat.chat_id} not found!!`,
                        statusCode: CODES.API.STATUS_NOT_FOUND,
                    }
                } else {
                    await ChatRepo.chat_repo_update({ ..._chat, messages: [...db_chat.messages, { ..._chat.messages, text: _chat?.message?.text, _chat_id: _chat.chat_id, _reciever: _chat._reciever, _sender: auth_user.user_id }] }, auth_user);
                    result = {
                        message: `Chat having id as ${_chat.chat_id} updated!!`,
                        statusCode: CODES.API.STATUS_SUCCESS,
                    }
                }
            } else {
                const chat = await ChatRepo.chat_repo_create(_chat, auth_user);
                result = {
                    message: `Chat created successfully!!`,
                    chat_id: chat._id,
                    statusCode: CODES.API.STATUS_RECORD_CREATED,
                }
            }
            return result;
        } catch (error: any) {
            throw controller_catch_error(error);
        }
    }
    @Security("api_key")
    @Get("/get_active")
    public async get_active(@Request() auth_user: _AuthUser): Promise<IAllChatsResponse> {
        try {
            let result: any = {};
            const chats = await ChatRepo.chat_repo_get_active(auth_user);
            if (!chats.length) {
                result = {
                    message: `No Record found!!`,
                    statusCode: CODES.API.STATUS_NOT_FOUND,
                }
            } else {
                result = {
                    message: `Success!!`,
                    statusCode: CODES.API.STATUS_SUCCESS,
                    count: chats.length,
                    chats
                }
            }
            return result;
        } catch (error: any) {
            throw controller_catch_error(error);
        }
    }
    @Security("api_key")
    @Get("/get_all")
    public async get_all(@Request() auth_user: _AuthUser): Promise<IAllChatsResponse> {
        try {
            let result: any = {};
            const chats = await ChatRepo.chat_repo_get_all(auth_user);
            if (!chats.length) {
                result = {
                    message: `No Record found!!`,
                    statusCode: CODES.API.STATUS_NOT_FOUND,
                    chats: []
                }
            } else {
                result = {
                    message: `Success!!`,
                    statusCode: CODES.API.STATUS_SUCCESS,
                    count: chats.length,
                    chats
                }
            }
            return result;
        } catch (error: any) {
            throw controller_catch_error(error);
        }
    }
    @Security("api_key")
    @Post("/assign")
    @Example<IAssignChat>({ "chat_id": "63720ad1a07f4897726c6a2d" })
    public async assign(@Body() _chat: IAssignChat, @Request() auth_user: _AuthUser): Promise<IChatResponse> {
        try {
            const { user_id, user_name, namespace } = auth_user;
            let result: any = {};
            const db_chat = <IChat>await ChatRepo.chat_repo_find("_id", _chat.chat_id);
            if (!db_chat) {
                result = {
                    message: `Chat having id as ${_chat.chat_id} not found!!`,
                    statusCode: CODES.API.STATUS_NOT_FOUND,
                }
            } else if (db_chat._reciever) {
                result = {
                    message: `Chat having id as ${_chat.chat_id} already assigned to $user!!`,
                    statusCode: CODES.API.STATUS_NOT_FOUND,
                }
            } else {
                const company_socket = socket.get_io_list().find((s: ISocketElement) => s.namespace === namespace);
                if (company_socket) {
                    const users_list: Array<IUser> = await userRepository.user_repo_find_many([{ '_id': `${db_chat._sender}` }, { '_id': `${user_id}` }])
                    company_socket.socket.to(users_list.map(_u => _u.socket_id) as Array<string>).emit('chat_assigned', db_chat._id);
                    await ChatRepo.chat_repo_update({ chat_id: _chat.chat_id, _reciever: user_id }, auth_user);
                    result = {
                        message: `Chat having id as ${_chat.chat_id} assigned to ${user_name}!!`,
                        statusCode: CODES.API.STATUS_SUCCESS,
                    }
                } else console.log('Company socket not found!!')
            }
            return result;
        } catch (error: any) {
            throw controller_catch_error(error);
        }
    }
    @Security("api_key")
    @Post("/transfer")
    @Example<ITransferChat>({
        "chat_id": "63720ad1a07f4897726c6a2d",
        "agent_id": "63689c8f61bd259d310f268d"
    })
    public async transfer(@Body() _chat: ITransferChat, @Request() auth_user: _AuthUser): Promise<IChatResponse> {
        try {
            const { namespace } = auth_user;
            const { chat_id, agent_id } = _chat;
            let result: any = {};
            const db_chat = <IChat>await ChatRepo.chat_repo_find("_id", chat_id);
            if (!db_chat) {
                result = {
                    message: `Chat having id as ${chat_id} not found!!`,
                    statusCode: CODES.API.STATUS_NOT_FOUND,
                }
            } else {
                await ChatRepo.chat_repo_update({ chat_id: chat_id, _reciever: agent_id }, auth_user);
                // const company_socket = socket.get_io_list().find((s: ISocketElement) => s.namespace === namespace);
                // const users_list: Array<IUser> = await userRepository.user_repo_find_many([{ key: '_id', value: `${db_chat._sender}` }, { key: '_id', value: `${db_chat._reciever}` }])
                // company_socket.socket.to(users_list.map(_u => _u.socket_id) as Array<string>).emit('new_chat_initiated', null);
                result = {
                    message: `Chat having id as ${_chat.chat_id} transfered to ${agent_id}!!`,
                    statusCode: CODES.API.STATUS_SUCCESS,
                }
            }
            return result;
        } catch (error: any) {
            throw controller_catch_error(error);
        }
    }

    @Security("api_key")
    @Post("/close")
    public async close_chat(@Body() _chat: IChatClose, @Request() auth_user: _AuthUser): Promise<any> {
        try {
            const { namespace } = auth_user;
            let result: any = {};
            const db_chat = <IChat>await ChatRepo.chat_repo_find("_id", _chat.chat_id);
            if (!db_chat) {
                result = {
                    message: `Chat having id as ${_chat.chat_id} not found!!`,
                    statusCode: CODES.API.STATUS_NOT_FOUND,
                }
            } else {
                // console.log('[close_chat].auth_user', auth_user);
                const company_socket = socket.get_io_list().find((s: ISocketElement) => s.namespace === namespace);
                if (company_socket) {
                    await ChatRepo.chat_repo_close({ chat_id: _chat.chat_id, active: false }, auth_user);
                    const users_list: Array<IUser> = await userRepository.user_repo_find_many([{ '_id': `${db_chat._sender}` }, { '_id': `${db_chat._reciever}` }])
                    company_socket.socket.to(users_list.map(_u => _u.socket_id) as Array<string>).emit('chat_closed', db_chat._id);
                    result = {
                        message: `Chat having id as ${_chat.chat_id} closed!!`,
                        statusCode: CODES.API.STATUS_SUCCESS,
                    }
                } else console.log('Company socket not found!!')
            }
            return result;
        } catch (error: any) {
            throw controller_catch_error(error);
        }
    }
}

export default new EnumController();
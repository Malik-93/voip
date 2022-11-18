import { DATABASE_MODELS } from './../../constants/voip.constants';
import { _FilterChatUnion } from './../../types/common/common.type';
import { _AuthCompany, _AuthUser, _FilterUserUnion } from '../../types/common/common.type';
import Chat from "../../db/models/chat";
import { IChat, IChatClose, IChatCreateUpdateRequest } from '../../interfaces/chat/chat.interface';
import mongoose from 'mongoose';
const { USER, ISSUES } = DATABASE_MODELS;
class ChatRepository {
    public async chat_repo_find(key: IChatCreateUpdateRequest[_FilterChatUnion], value: any): Promise<any> {
        let _key: string = typeof key === 'string' ? key : '_id';
        try {
            return await Chat.findOne({ [_key]: value });
        } catch (error) {
            throw error;
        }
    };
    public async chat_repo_create(_chat: IChatCreateUpdateRequest, auth_user: _AuthUser): Promise<any> {
        const { _issue_id, _reciever, message, } = _chat;
        const { user_id } = auth_user;
        try {
            const _chat_id = new mongoose.Types.ObjectId
            const new_chat = new Chat({
                _id: _chat_id,
                _sender: user_id,
                messages: [{ ...message, _reciever, _sender: user_id, _chat_id }],
                _issue: _issue_id
            })
            return await new_chat.save();
        } catch (error) {
            throw error;
        }
    }
    public async chat_repo_update(_chat: IChatCreateUpdateRequest, auth_user: _AuthUser): Promise<any> {
        const { chat_id, messages, active, _reciever } = _chat;
        const { user_id } = auth_user;
        console.log('___user_id__', user_id);
        console.log('___reciever__', _reciever);
        try {
            const set: IChatCreateUpdateRequest = {};
            if (messages?.length) set.messages = messages;
            if (typeof active == 'boolean') set.active = active;
            if (_reciever) set._reciever = user_id;
            const result = await Chat.findByIdAndUpdate({ _id: chat_id }, { $set: set }, {});
            return result;
        } catch (error) {
            throw error;
        }
    }
    public async chat_repo_close(_chat: IChatClose, auth_user?: _AuthUser): Promise<any> {
        const { chat_id, active } = _chat;
        try {
            const result = await Chat.findByIdAndUpdate({ _id: chat_id }, { $set: { active } }, {});
            return result;
        } catch (error) {
            throw error;
        }
    }
    public async chat_repo_get_active(auth_user: _AuthUser): Promise<any> {
        const { user_id } = auth_user;
        try {
            const result = await Chat.find({
                $and: [
                    { "active": true },
                    {
                        $or: [
                            { "_sender": user_id },
                            { "_reciever": user_id },
                        ]
                    }
                ],
            },
                [],
                {
                    populate: [
                        {
                            path: "_issue",
                            model: ISSUES.MODEL_NAME,
                            // populate: {
                            //     path: "messages._sender",
                            // Within model if any relationship
                            // }
                        },
                        {
                            path: "_sender",
                            model: USER.MODEL_NAME,
                            // populate: {
                            //     path: "messages._sender",
                            // Within model if any relationship
                            // }
                        },
                        {
                            path: "_reciever",
                            model: USER.MODEL_NAME,
                            // populate: {
                            // Within model if any relationship
                            // }
                        },
                        {
                            path: "messages._sender",
                            model: USER.MODEL_NAME
                        },
                        {
                            path: "messages._reciever",
                            model: USER.MODEL_NAME
                        }
                    ]
                }
            );
            return result;
        } catch (error) {
            throw error;
        }
    }
    public async chat_repo_get_all(auth_user: _AuthUser): Promise<any> {
        const { user_id } = auth_user;
        try {
            const result = await Chat.find({ $and: [{ "active": true }, { "_reciever": { $eq: null } }] },
                [],
                {
                    populate: [
                        {
                            path: "_issue",
                            model: ISSUES.MODEL_NAME,
                            // populate: {
                            //     path: "messages._sender",
                            // Within model if any relationship
                            // }
                        },
                        {
                            path: "_sender",
                            model: USER.MODEL_NAME,
                            // populate: {
                            //     path: "messages._sender",
                            // Within model if any relationship
                            // }
                        },
                        {
                            path: "_reciever",
                            model: USER.MODEL_NAME,
                            // populate: {
                            // Within model if any relationship
                            // }
                        },
                        {
                            path: "messages._sender",
                            model: USER.MODEL_NAME
                        },
                        {
                            path: "messages._reciever",
                            model: USER.MODEL_NAME
                        }
                    ]
                }
            );
            return result;
        } catch (error) {
            throw error;
        }
    }
}

export default new ChatRepository();
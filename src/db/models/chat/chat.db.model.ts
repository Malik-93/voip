import mongoose, { Schema } from 'mongoose';
import { DATABASE_MODELS } from '../../../constants/voip.constants';
import { IChat, IMessage } from '../../../interfaces/chat/chat.interface';
const { CHAT, USER, ISSUES } = DATABASE_MODELS;
const messageSchema: Schema = new Schema<IMessage>({
    _sender: {
        type: Schema.Types.ObjectId,
        ref: USER.MODEL_SCHEMA_NAME,
        required: true
    },
    _reciever: {
        type: Schema.Types.ObjectId,
        ref: USER.MODEL_SCHEMA_NAME,
        required: false
    },
    _chat_id: {
        type: Schema.Types.ObjectId,
        ref: CHAT.MODEL_SCHEMA_NAME,
        required: true
    },
    message_type: {
        type: Number,
        default: 1
    },
    text: {
        type: String,
        default: ""
    },
    files: {
        type: [String], // strings in array would be the path of files e.g images, audios or videos
        default: [""]
    },
    seen: {
        type: Boolean,
        default: false
    },
    active: {
        type: Boolean,
        default: true
    },
    created_at: {
        type: Number,
        default: Date.now()
    }

})
const chatSchema: Schema = new Schema<IChat>({
    _id: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    _sender: {
        type: Schema.Types.ObjectId,
        ref: USER.MODEL_NAME,
        required: true
    },
    _reciever: {
        type: Schema.Types.ObjectId,
        ref: USER.MODEL_NAME,
        required: false
    },
    _issue: {
        type: Schema.Types.ObjectId,
        ref: ISSUES.MODEL_NAME,
        required: true
    },
    messages: {
        type: [messageSchema],
        default: [],
    },
    active: {
        type: Boolean,
        default: true
    },
    created_at: {
        type: Number,
        default: Date.now()
    }
});
export default mongoose.model<IChat>(CHAT.MODEL_NAME, chatSchema, CHAT.MODEL_SCHEMA_NAME);
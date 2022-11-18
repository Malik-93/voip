import { UserRoles } from './../../../enums/index';
import mongoose, { Schema } from 'mongoose';
import { REGEX, DATABASE_MODELS } from '../../../constants/voip.constants';
import { IUser } from '../../../interfaces/user/user.interface';
const { COMPANY, USER, CHAT } = DATABASE_MODELS;
const toLowerCase = (email: string) => email.toLowerCase();
const userSchema: Schema = new Schema<IUser>({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    _company_ref: {
        type: mongoose.Schema.Types.ObjectId,
        ref: COMPANY.MODEL_SCHEMA_NAME
    },
    user_id: {
        type: Number,
        trim: true,
        unique: true
    },
    company_id: {
        type: Number,
        default: 0
    },
    first_name: {
        type: String,
        required: true,
        trim: true,
        match: [REGEX.NAME, 'Please fill a valid first name']
    },
    last_name: {
        type: String,
        required: true,
        trim: true,
        match: [REGEX.NAME, 'Please fill a valid last name']
    },
    user_name: {
        type: String,
        required: true,
        trim: true,
        match: [REGEX.NAME, 'Please fill a valid username']
    },

    email: {
        type: String,
        required: true,
        trim: true,
        set: toLowerCase,
        unique: true,
        match: [REGEX.EMAIL, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: true,
        trim: true,
        match: [REGEX.PASSWORD, 'Please fill a valid password']
    },
    namespace: {
        type: String,
        default: ''
    },
    role: {
        text: {
            type: String,
            default: UserRoles[UserRoles.User]
        },
        value: {
            type: Number,
            default: UserRoles.User
        }
    },
    chats: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: CHAT.MODEL_SCHEMA_NAME
    }],
    socket_id: {
        type: String,
        default: ''
    },
    created_at: {
        type: Number,
        default: Date.now()
    }
});
export default mongoose.model<IUser>(USER.MODEL_NAME, userSchema, USER.MODEL_SCHEMA_NAME);
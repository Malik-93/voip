import { Iissue } from './../../../interfaces/issue/issue.interface';
import mongoose, { Schema } from 'mongoose';
import { DATABASE_MODELS } from '../../../constants/voip.constants';
const { ISSUES } = DATABASE_MODELS;
const issueSchema: Schema = new Schema<Iissue>({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    title: {
        type: String,
        default: ""
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
export default mongoose.model<Iissue>(ISSUES.MODEL_NAME, issueSchema, ISSUES.MODEL_SCHEMA_NAME);
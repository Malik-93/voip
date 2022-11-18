import mongoose, { Schema } from 'mongoose';
import { REGEX, DATABASE_MODELS } from '../../../constants/voip.constants';
import { ICompany, WorkTimings } from '../../../interfaces/company/company.interface';
const { COMPANY } = DATABASE_MODELS;
const toLowerCase = (email: string) => email.toLowerCase();
const workingTimingSchema: Schema = new Schema<WorkTimings>({
    days: {
        start: {
            type: Date,
        },
        end: {
            type:
                Date
        }
    },
    timings: {
        start: {
            type: Date,
        },
        end: {
            type:
                Date
        }
    }
})
const companySchema: Schema = new Schema<ICompany>({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    company_id: {
        type: Number,
        default: 0,
        unique: true
    },
    name: {
        type: String,
        required: true,
        trim: true,
        match: [REGEX.NAME, 'Please fill a valid name']
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
    work_timings: {
        type: [workingTimingSchema],
        required: true,
        default: []
    },
    created_at: {
        type: Number,
        default: Date.now()
    }
});
export default mongoose.model<ICompany>(COMPANY.MODEL_NAME, companySchema, COMPANY.MODEL_SCHEMA_NAME);
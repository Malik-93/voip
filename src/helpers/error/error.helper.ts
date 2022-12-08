import { _MongoError, _MongooseError } from './../../types/common/common.type';
import { CODES } from './../../constants/voip.constants';
import { Error } from 'mongoose';
const { MONGO } = CODES;
export const controller_catch_error = (error: any) => {
    // if (error instanceof Error.ValidationError) {
    //     const message = Object.values(error.errors).map((err) => err.message);
    //     error = {
    //         message
    //     };
    // }
    // else if ((error as _MongoError).code === MONGO.DUPLICATE_KEY_VALUE) {
    //     error = { ...(error as _MongoError) };
    // }
    return JSON.stringify(error);
}
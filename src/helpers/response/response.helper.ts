import { CustomResponse } from '../../models/response/Response';
import { CODES, MESSAGES } from '../../constants/voip.constants';
const { API } = CODES;
const { API_RESPONSE } = MESSAGES;
// console.log('__RESPONSE HELPER__');
export default {
    success: (
        message: string = API_RESPONSE.SUCCESS,
        statusCode: number = API.STATUS_SUCCESS,
        doc: any = {}
    ) => {
        return new CustomResponse(message, statusCode, doc)
    },
    info: (
        message: string = API_RESPONSE.INFO,
        statusCode: number = API.STATUS_SUCCESS,
        doc: any = {}
    ) => {
        return new CustomResponse(message, statusCode, doc)
    },
    error: (
        message: string = API_RESPONSE.ERROR,
        statusCode: number = API.STATUS_INTERNAL_SERVER_ERROR,
        error: any = {}
    ) => {
        return new CustomResponse(message, statusCode, error)
    }
}

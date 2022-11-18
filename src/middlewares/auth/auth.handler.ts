import { IReq } from './../../interfaces/common/common.interface';
import { CODES, MESSAGES } from './../../constants/voip.constants';
import { Request, Response, NextFunction } from 'express';
import JWT from 'jsonwebtoken';
import responseHelper from '../../helpers/response/response.helper';
const { API } = CODES;
const { API_RESPONSE } = MESSAGES;
export default {
    company_rights(_req: IReq, _res: Response, _next: NextFunction) {
        try {
            console.log("__request.headers.authorization", _req.headers.authorization);
            if (_req.headers['authorization']) {
                const token = _req.headers['authorization'].split(" ")[1];
                if (!token) {
                    return _res.status(API.STATUS_UN_AUTHORIZED).json(responseHelper.error('un-authorized', API.STATUS_UN_AUTHORIZED, { error: API_RESPONSE.UN_AUTH }));
                } else {
                    const decoded = JWT.verify(token, `${process.env.COMPANY_JWT_SECRET}`);
                    _req.auth_company = decoded;
                    _next();
                }
            } else {
                return _res.status(API.STATUS_UN_AUTHORIZED).json(responseHelper.error('un-authorized', API.STATUS_UN_AUTHORIZED, { error: API_RESPONSE.UN_AUTH }));
            }
        }
        catch (error) {
            return _res.status(API.STATUS_UN_AUTHORIZED).json(responseHelper.error('un-authorized', API.STATUS_UN_AUTHORIZED, error));
        }
    },

    async manager_rights(_req: IReq, _res: Response, _next: NextFunction) {
        try {
            if (_req.headers['authorization']) {
                const token = _req.headers['authorization'].split(" ")[1];
                if (!token) {
                    return _res.status(API.STATUS_UN_AUTHORIZED).json(responseHelper.error('un-authorized', API.STATUS_UN_AUTHORIZED, { error: API_RESPONSE.UN_AUTH }));
                } else {
                    const decoded = JWT.verify(token, `${process.env.USER_JWT_SECRET}`);
                    _req.auth_user = decoded;
                    _next();
                }
            } else {
                return _res.status(API.STATUS_UN_AUTHORIZED).json(responseHelper.error('un-authorized', API.STATUS_UN_AUTHORIZED, { error: API_RESPONSE.UN_AUTH }));
            }
        }
        catch (error) {
            return _res.status(API.STATUS_UN_AUTHORIZED).json(responseHelper.error('un-authorized', API.STATUS_UN_AUTHORIZED, error));
        }
    },

    async agent_rights(_req: IReq, _res: Response, _next: NextFunction) {
        try {
            if (_req.headers['authorization']) {
                const token = _req.headers['authorization'].split(" ")[1];
                if (!token) {
                    return _res.status(API.STATUS_UN_AUTHORIZED).json(responseHelper.error('un-authorized', API.STATUS_UN_AUTHORIZED, { error: API_RESPONSE.UN_AUTH }));
                } else {
                    const decoded = JWT.verify(token, `${process.env.USER_JWT_SECRET}`);
                    _req.auth_user = decoded;
                    _next();
                }
            } else {
                return _res.status(API.STATUS_UN_AUTHORIZED).json(responseHelper.error('un-authorized', API.STATUS_UN_AUTHORIZED, { error: API_RESPONSE.UN_AUTH }));
            }
        }
        catch (error) {
            return _res.status(API.STATUS_UN_AUTHORIZED).json(responseHelper.error('un-authorized', API.STATUS_UN_AUTHORIZED, error));
        }
    },
    async user_rights(_req: IReq, _res: Response, _next: NextFunction) {
        try {
            if (_req.headers['authorization']) {
                const token = _req.headers['authorization'].split(" ")[1];
                if (!token) {
                    return _res.status(API.STATUS_UN_AUTHORIZED).json(responseHelper.error('un-authorized', API.STATUS_UN_AUTHORIZED, { error: API_RESPONSE.UN_AUTH }));
                } else {
                    const decoded = JWT.verify(token, `${process.env.USER_JWT_SECRET}`);
                    _req.auth_user = decoded;
                    _next();
                }
            } else {
                return _res.status(API.STATUS_UN_AUTHORIZED).json(responseHelper.error('un-authorized', API.STATUS_UN_AUTHORIZED, { error: API_RESPONSE.UN_AUTH }));
            }
        }
        catch (error) {
            return _res.status(API.STATUS_UN_AUTHORIZED).json(responseHelper.error('un-authorized', API.STATUS_UN_AUTHORIZED, error));
        }
    }
}
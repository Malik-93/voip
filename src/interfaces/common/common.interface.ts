import { JwtPayload } from 'jsonwebtoken';
import { _AuthCompany, _AuthUser } from './../../types/common/common.type';
import { Request } from 'express';
export interface IReq extends Request {
    auth_company?: _AuthCompany | any,
    auth_user?: _AuthUser | any,
}
export interface TokenDecode {
    company_id: string,
    namespace: string,
    iat: number,
    exp: number,
}
export interface IUserTokenDecode extends TokenDecode {

}
import { IReq } from './../interfaces/common/common.interface';
import express, { Router, Request, Response, NextFunction } from 'express';
import response from '../helpers/response/response.helper';
import _user_controller from '../controllers/user';
import { CODES } from '../constants/voip.constants';
import auth from '../middlewares/auth';
const { API } = CODES;
const router: Router = express.Router();
router.post('/register', [auth.company_rights], async (req: IReq, res: Response, next: NextFunction) => {
    try {
        const result = await _user_controller.register_user(req.body, req.auth_company);
        return res.status(API.STATUS_SUCCESS).json(response.success(undefined, result.statusCode, result));
    } catch (error: any) {
        return res.status(API.STATUS_INTERNAL_SERVER_ERROR).json(response.error(undefined, undefined, error));
    }
});

router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await _user_controller.login_user(req.body);
        if (!result.user_id) {
            return res.status(200).json(response.info(undefined, result.statusCode, result));
        }
        return res.status(200).json(response.success(undefined, result.statusCode, result));
    } catch (error: any) {
        return res.status(500).json(response.error(undefined, undefined, error));
    }
});
router.post('/generic/login', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await _user_controller.login_generic(req.body);
        if (!result.user_id) {
            return res.status(200).json(response.info(undefined, result.statusCode, result));
        }
        return res.status(200).json(response.success(undefined, result.statusCode, result));
    } catch (error: any) {
        return res.status(500).json(response.error(undefined, undefined, error));
    }
});

router.post('/profile_update', [auth.user_rights], async (req: IReq, res: Response, next: NextFunction) => {
    try {
        const result = await _user_controller.update_user_profile(req.body, req.auth_user);
        if (!result.company_id) {
            return res.status(200).json(response.info(undefined, result.statusCode, result));
        }
        return res.status(200).json(response.success(undefined, result.statusCode, result));
    } catch (error: any) {
        return res.status(500).json(response.error(undefined, undefined, error));
    }
});
export = router;
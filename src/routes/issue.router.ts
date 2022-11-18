import { IReq } from '../interfaces/common/common.interface';
import express, { Router, Response, NextFunction } from 'express';
import response from '../helpers/response/response.helper';
import _issue_controller from '../controllers/issue';
import { CODES } from '../constants/voip.constants';
import authHandler from '../middlewares/auth';
const { API } = CODES;
const router: Router = express.Router();
router.post('/create_update', [authHandler.user_rights], async (req: IReq, res: Response, next: NextFunction) => {
    try {
        const result = await _issue_controller.create_update(req.body, req.auth_user);
        return res.status(API.STATUS_SUCCESS).json(response.success(undefined, undefined, result));
    } catch (error: any) {
        return res.status(API.STATUS_INTERNAL_SERVER_ERROR).json(response.error(undefined, undefined, error));
    }
});
router.get('/get_active', [authHandler.user_rights], async (req: IReq, res: Response, next: NextFunction) => {
    try {
        const result = await _issue_controller.get_active();
        return res.status(API.STATUS_SUCCESS).json(response.success(undefined, undefined, result));
    } catch (error: any) {
        return res.status(API.STATUS_INTERNAL_SERVER_ERROR).json(response.error(undefined, undefined, error));
    }
});
export = router;
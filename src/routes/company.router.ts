import express, { Router, Request, Response, NextFunction } from 'express';
import response from '../helpers/response/response.helper';
import _company_controller from '../controllers/company';
import { CODES } from './../constants/voip.constants';
const { API } = CODES;
const router: Router = express.Router();
router.post('/register', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await _company_controller.register_company(req.body);
        return res.status(API.STATUS_SUCCESS).json(response.success(undefined, result.statusCode, result));
    } catch (error: any) {
        return res.status(API.STATUS_INTERNAL_SERVER_ERROR).json(response.error(undefined, undefined, error));
    }
});

router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await _company_controller.login_company(req.body);
        if (!result.company_id) {
            return res.status(200).json(response.info(undefined, result.statusCode, result));
        }
        return res.status(200).json(response.success(undefined, result.statusCode, result));
    } catch (error: any) {
        return res.status(500).json(response.error(undefined, undefined, error));
    }
});
export = router;
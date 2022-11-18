import { IReq } from '../interfaces/common/common.interface';
import express, { Router, Request, Response, NextFunction } from 'express';
import response from '../helpers/response/response.helper';
import _enum_controller from '../controllers/enum';
import { CODES } from '../constants/voip.constants';
const { API } = CODES;
const router: Router = express.Router();
router.get('/enums', (req: Request, res: Response, next: NextFunction) => {
    try {
        const enums = _enum_controller.get_enums();
        console.log(enums);
        return res.status(API.STATUS_SUCCESS).json(response.success(undefined, undefined, enums));
    } catch (error: any) {
        return res.status(API.STATUS_INTERNAL_SERVER_ERROR).json(response.error(undefined, undefined, error));
    }
});
export = router;
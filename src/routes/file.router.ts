import { IReq } from '../interfaces/common/common.interface';
import express, { Router, Request, Response, NextFunction } from 'express';
import response from '../helpers/response/response.helper';
import _issue_controller from '../controllers/issue';
import { CODES } from '../constants/voip.constants';
import authHandler from '../middlewares/auth';
import multer_upload from '../utils/multer/multer.util';
const { API } = CODES;
const router: Router = express.Router();
router.post('/upload', async (req: IReq, res: Response, next: NextFunction) => {
    multer_upload(req, res, (error: any) => {
        try {
            if (error) throw error;
            // @ts-ignore
            const files: any[] = req?.files ?? [];
            return res.status(API.STATUS_SUCCESS).json(response.success('File uploaded successfully!', undefined, { files_info: files.map((f: any) => ({ ...f, uri: `${process.env.SERVER_URL}/${f.path}` })) }));
        } catch (error: any) {
            return res.status(API.STATUS_INTERNAL_SERVER_ERROR).json(response.error(undefined, undefined, error));
        }
    })
});
export = router;
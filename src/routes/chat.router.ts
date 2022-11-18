import { IChatClose, IChatCreateUpdateRequest, ITransferChat, IAssignChat } from './../interfaces/chat/chat.interface';
import { IReq } from '../interfaces/common/common.interface';
import express, { Router, Response, NextFunction } from 'express';
import response from '../helpers/response/response.helper';
import _chat_controller from '../controllers/chat';
import { CODES } from '../constants/voip.constants';
import authHandler from '../middlewares/auth';
const { API } = CODES;
const router: Router = express.Router();
router.post('/create_update', [authHandler.user_rights], async (req: IReq, res: Response, next: NextFunction) => {
    try {
        const body = <IChatCreateUpdateRequest>req.body;
        const result = await _chat_controller.create_update(body, req.auth_user);
        return res.status(API.STATUS_SUCCESS).json(response.success(undefined, undefined, result));
    } catch (error: any) {
        return res.status(API.STATUS_INTERNAL_SERVER_ERROR).json(response.error(undefined, undefined, error));
    }
});
router.get('/get_active', [authHandler.user_rights], async (req: IReq, res: Response, next: NextFunction) => {
    try {
        const result = await _chat_controller.get_active(req.auth_user);
        return res.status(API.STATUS_SUCCESS).json(response.success(undefined, undefined, result));
    } catch (error: any) {
        return res.status(API.STATUS_INTERNAL_SERVER_ERROR).json(response.error(undefined, undefined, error));
    }
});
router.get('/get_all', [authHandler.agent_rights], async (req: IReq, res: Response, next: NextFunction) => {
    try {
        const result = await _chat_controller.get_all(req.auth_user);
        return res.status(API.STATUS_SUCCESS).json(response.success(undefined, undefined, result));
    } catch (error: any) {
        return res.status(API.STATUS_INTERNAL_SERVER_ERROR).json(response.error(undefined, undefined, error));
    }
});
router.post('/assign', [authHandler.agent_rights], async (req: IReq, res: Response, next: NextFunction) => {
    try {
        const body = <IAssignChat>req.body;
        const result = await _chat_controller.assign(body, req.auth_user);
        return res.status(API.STATUS_SUCCESS).json(response.success(undefined, undefined, result));
    } catch (error: any) {
        return res.status(API.STATUS_INTERNAL_SERVER_ERROR).json(response.error(undefined, undefined, error));
    }
});
router.post('/close', [authHandler.user_rights], async (req: IReq, res: Response, next: NextFunction) => {
    try {
        const body = <IChatClose>req.body;
        const result = await _chat_controller.close_chat(body, req.auth_user);
        return res.status(API.STATUS_SUCCESS).json(response.success(undefined, undefined, result));
    } catch (error: any) {
        return res.status(API.STATUS_INTERNAL_SERVER_ERROR).json(response.error(undefined, undefined, error));
    }
});
router.post('/transfer', [authHandler.agent_rights], async (req: IReq, res: Response, next: NextFunction) => {
    try {
        const body = <ITransferChat>req.body;
        const result = await _chat_controller.transfer(body, req.auth_user);
        return res.status(API.STATUS_SUCCESS).json(response.success(undefined, undefined, result));
    } catch (error: any) {
        return res.status(API.STATUS_INTERNAL_SERVER_ERROR).json(response.error(undefined, undefined, error));
    }
});
export = router;
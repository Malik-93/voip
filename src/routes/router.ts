import express, { Router, Request, Response } from 'express';
import companyRouter from './company.router';
import userRouter from './user.router';
import enumRouter from './enum.router';
import chatRouter from './chat.router';
import issueRouter from './issue.router';
import fileRouter from './file.router';
const router: Router = express.Router();
router.get("/", (_req: Request, _res: Response) => {
    return _res.end(`${process.env.PROJECT} server is up and running...`);
});
router.use('/api/v1', enumRouter);
router.use('/api/v1/companies', companyRouter);
router.use('/api/v1/users', userRouter);
router.use('/api/v1/chats', chatRouter);
router.use('/api/v1/issues', issueRouter);
router.use('/api/v1/files', fileRouter);

export = router;
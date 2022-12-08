// import { DestinationCallback, FileNameCallback } from './../../types/multer/multer.type';
// import fs from 'fs';
// import path from 'path';
import multer, { FileFilterCallback } from 'multer';
import { IReq } from './../../interfaces/common/common.interface';
import { s3_client } from '../aws/aws.util';
import multerS3 from 'multer-s3';
import * as dotenv from 'dotenv';
dotenv.config();
const storage = multerS3({
    s3: s3_client,
    bucket: `${process.env.AWS_BUCKET_NAME}`,
    metadata: function (req: IReq, file: Express.Multer.File, next: (error: any, metadata?: any) => void) {
        next(null, { fieldName: file.fieldname });
    },
    key: function (req, file, next: (error: any, key?: string | undefined) => void) {
        next(null, `${process.env.AWS_BUCKET_FOLDER}/${Date.now().toString()}`)
    }
})
const fileFilter = (
    request: IReq,
    file: Express.Multer.File,
    next: FileFilterCallback
): void => {
    if (
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg'
    ) {
        next(null, true)
    } else {
        next(null, false)
    }
};
const multer_upload = multer({
    fileFilter,
    storage,
}).array('files', 3);
export default multer_upload;

// const storage = multer.diskStorage({
//     destination: (
//         request: IReq,
//         file: Express.Multer.File,
//         next: DestinationCallback
//     ): void => {
//         const isDirExist = fs.existsSync(MULTER_DIR);
//         if (!isDirExist) {
//             fs.mkdir(MULTER_DIR, { recursive: true }, (err: NodeJS.ErrnoException | null, folder_path: string | undefined) => {
//                 if (err) next(err, MULTER_DIR);
//                 next(null, folder_path as string);
//             })
//         } else next(null, MULTER_DIR);
//     },

//     filename: (
//         req: IReq,
//         file: Express.Multer.File,
//         next: FileNameCallback
//     ): void => {
//         var time = Math.random().toString(36).substring(7);
//         next(null, file.fieldname + '-' + time + path.extname(file.originalname));
//     }
// })
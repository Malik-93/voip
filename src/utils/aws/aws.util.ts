import AWS from 'aws-sdk';
import { S3Client, S3ClientConfig } from '@aws-sdk/client-s3';
import * as dotenv from 'dotenv';
dotenv.config();
const aws_configs: S3ClientConfig = {
    region: `${process.env.AWS_REGION}`,
    credentials: {
        accessKeyId: `${process.env.AWS_ACCESS_KEY}`,
        secretAccessKey: `${process.env.AWS_ACCESS_SECRET}`,
    }
}
AWS.config.update({
    region: `${process.env.AWS_REGION}`,
    accessKeyId: `${process.env.AWS_ACCESS_KEY}`,
    secretAccessKey: `${process.env.AWS_ACCESS_SECRET}`,
});

export const aws = AWS;
export const s3_client = new S3Client(aws_configs);
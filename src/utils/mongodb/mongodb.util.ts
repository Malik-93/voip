
import logger from '../logger/logger.util';
import * as dotenv from 'dotenv';
// eslint-disable-next-line @typescript-eslint/no-var-requires
import mongoose from 'mongoose';
dotenv.config();
mongoose.Promise = global.Promise;
const connection = mongoose.connect(`${process.env.MONGO_DB_URI}`, {
    autoIndex: true,
    // poolSize: 50,
    // bufferMaxEntries: 0,
    // useNewUrlParser: true,
    // keepAlive: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
    // reconnectTries: Number.MAX_VALUE,
    // reconnectInterval: 500,
    // useUnifiedTopology: true,
});
connection
    .then((db) => {
        logger.info('[MongoDB] - connected to database');
        console.log('[MongoDB] - connected to database');
    })
    .catch((err) => {
        logger.error('[MongoDB] - error connecting to database: ' + err);
        console.log('[MongoDB] - error connecting to database: ' + err);
    });

export = connection;
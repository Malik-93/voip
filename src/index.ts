

import * as http from 'http';
import app from './app';
import logger from './utils/logger/logger.util';
import SocketIO from "./socket";
import * as dotenv from 'dotenv';

dotenv.config();
const PORT = process.env.PORT || 8080;
const HttpServer = http.createServer(app);
SocketIO.init(HttpServer);
HttpServer.listen(PORT, () => {
    console.log(`[${process.env.PROJECT}] - server is running on port : ${PORT}`);
    logger.info(`[${process.env.PROJECT}] - server listening on port : ${PORT}`);
});
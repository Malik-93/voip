import { ISocket } from './../interfaces/socket/socket.interface';
import { IUserTokenDecode } from './../interfaces/common/common.interface';
import { verify_jwt } from './../helpers/jwt/token.helper';
import { Server as HttpServer } from 'http';
import { Server as SocketServer } from 'socket.io';
import CompanyRepo from '../repositories/company';
import socketRoom from './socket.room';
import { IO, ISocketElement } from '../types/common/common.type';
const list: Array<ISocketElement> = [];
export default {
    async init(server: HttpServer) {
        const io = new SocketServer<IO>(server);
        const namespaces = await this.get_companies();
        const length = namespaces.length;
        if (length) {
            for (let index = 0; index < length; index++) {
                const { namespace } = namespaces[index];
                io.of(namespace).on("connection", (socket: ISocket) => {
                    console.log('__Client Connected__', socket.id);
                    socketRoom(io, socket, `${namespace}`)
                    list.push({ namespace: `${namespace}`, socket });
                });
                // console.log('list', list.length);

            }
        } else {
            console.log("Socket not initialized...")
        }
    },
    get_io_list(): Array<ISocketElement> {
        return list;
    },
    async get_companies(): Promise<Array<any>> {
        const namespaces = await CompanyRepo.company_repo_get_all();
        return namespaces;

    }

}
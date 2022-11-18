import { Socket } from 'socket.io';
import { IUser } from '../user/user.interface';

export interface ServerToClientEvents {
    message: (a: any) => void;
    noArg: () => void;
    basicEmit: (a: number, b: string, c: Buffer) => void;
    withAck: (d: string, callback: (e: number) => void) => void;
}

export interface ClientToServerEvents {
    hello: () => void;
}

export interface InterServerEvents {
    ping: () => void;
}

export interface SocketData {
    name: string;
    age: number;
}

export interface ISocket extends Socket {
    auth_user?: IUser | any
}

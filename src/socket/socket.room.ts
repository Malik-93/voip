import { ISocket } from './../interfaces/socket/socket.interface';
import { IMessage } from './../interfaces/chat/chat.interface';
import userRepository from '../repositories/user';
import { IUser } from '../interfaces/user/user.interface';
import request from 'request';
// import * as dotenv from 'dotenv';
// dotenv.config();


export default (io: any, socket: ISocket, namespace: string) => {
    const auth_token = socket.handshake.auth.auth_token;
    // console.log('__namespace__', namespace);
    // console.log('__socket.auth_user__', socket.auth_user);
    // socket.join(`${namespace}`)
    socket.on('send_message', async (message_data: IMessage) => {
        const { _sender, _reciever, _chat_id, _issue_id } = message_data;
        // console.log('_chat_id', _chat_id);
        const reciever = <IUser>await userRepository.user_repo_find('_id', _reciever)
        const sender = <IUser>await userRepository.user_repo_find('_id', _sender)
        socket.to(`${reciever.socket_id}`).emit('incoming_message', { ...message_data, _sender: sender, _reciever: reciever, _chat_id });
        const payload = {
            "chat_id": _chat_id,
            // "_sender":  It will be fetched from auth_token
            "_reciever": _reciever,
            "_issue_id": _issue_id,
            "message": {
                "message_type": 1,
                "text": `${message_data.text}`,
                _reciever: reciever
            }
        }
        // const options = {
        //     host: 'localhost',
        //     port: 8080,
        //     path: '/api/v1/chats/create_update',
        //     method: 'POST',
        //     headers: {
        //         "Content-Type": "application/json",
        //         "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjM2ODljZDM2MWJkMjU5ZDMxMGYyNjkzIiwibmFtZXNwYWNlIjoiMDE0MDg4Ny1jdWJlZnVuZGVyLTE2Njc4MCIsImlhdCI6MTY2Nzg5NDYyMSwiZXhwIjoxNjk5NDMwNjIxfQ.zTpRqLe4-f6g8JaCkzc3-Unhc7FzoG4UD9qKiOp-ZN4`,
        //         'Content-Length': Buffer.byteLength(JSON.stringify(payload))

        //     }
        // };
        request.post(
            `${process.env.SERVER_URL}/api/v1/chats/create_update`,
            {
                json: payload,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `${auth_token}`
                }
            },
            async function (error, response, body) {
                // console.log('Response', response);
                if (!payload.chat_id) {
                    console.log('_sender', _sender);
                    socket.to(`${reciever.socket_id}`).emit('new_chat_initiated', null);
                }
                // console.log('Error', error);
                // console.log('Body', body);
                // if (!error && response.statusCode == 200) {
                //     console.log(body);
                // }
            }
        );
    })

}
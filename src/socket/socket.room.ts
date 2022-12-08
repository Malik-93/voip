import { SOCKET_EVENTS } from './../constants/voip.constants';
import { ISocket } from './../interfaces/socket/socket.interface';
import { IMessage } from './../interfaces/chat/chat.interface';
import userRepository from '../repositories/user';
import { IUser } from '../interfaces/user/user.interface';
import request from 'request';
const { INIT_NEW_CHAT, SEND_MESSAGE } = SOCKET_EVENTS;

export default (io: any, socket: ISocket, namespace: string) => {
    const auth_token = socket.handshake.auth.auth_token;
    // console.log('__namespace__', namespace);
    // console.log('__socket.auth_user__', socket.auth_user);
    // socket.join(`${namespace}`)
    socket.on(`${INIT_NEW_CHAT}`, async (message_data: IMessage) => {
        const { _issue_id } = message_data;
        const payload = {
            "chat_id": 0,
            "_issue_id": _issue_id,
            "message": {
                "message_type": 1,
                "text": `${message_data.text}`,
            }
        }
        request.post(
            `${process.env.SERVER_URL}/api/v1/chats/create_update`,
            {
                json: payload,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${auth_token}`
                }
            },
            async function (error, response, body) {
                // console.log('Response', response);
                const all_agents = await userRepository.user_repo_find_many([{ "role.value": 2 }]) as IUser[];
                if (all_agents.length)
                    socket.to(`${all_agents.map(_agent => `${_agent.socket_id}`)}`).emit('new_chat_initiated', null);

            }
        );
    })
    socket.on(SEND_MESSAGE, async (message_data: IMessage) => {
        const { _sender, _reciever, _chat_id } = message_data;
        // console.log('_chat_id', _chat_id);
        const reciever = <IUser>await userRepository.user_repo_find('_id', _reciever)
        const sender = <IUser>await userRepository.user_repo_find('_id', _sender)
        socket.to(`${reciever.socket_id}`).emit('incoming_message', { ...message_data, _sender: sender, _reciever: reciever, _chat_id });
    })

}
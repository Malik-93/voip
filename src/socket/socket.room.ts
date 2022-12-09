import { SOCKET_EVENTS } from './../constants/voip.constants';
import { ISocket } from './../interfaces/socket/socket.interface';
import { IMessage } from './../interfaces/chat/chat.interface';
import userRepository from '../repositories/user';
import { IUser } from '../interfaces/user/user.interface';
import request from 'request';
const { INIT_NEW_CHAT, SEND_MESSAGE } = SOCKET_EVENTS;
type Payload = {
    chat_id: number | string,
    message: {
        message_type: number,
        text: string

    }
}
export default (io: any, socket: ISocket, namespace: string) => {
    const auth_token = socket.handshake.auth.auth_token;
    // console.log('__namespace__', namespace);
    // console.log('__socket.auth_user__', socket.auth_user);
    // socket.join(`${namespace}`)
    const save_message = (payload: Payload) => {
        const data = {
            "chat_id": payload.chat_id,
            "message": payload.message
        }
        request.post(
            `${process.env.SERVER_URL}/api/v1/chats/create_update`,
            {
                json: data,
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
    }
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
        console.log('message_data', message_data);
        const { _sender, _reciever, _chat_id } = message_data;
        // @ts-ignore
        const reciever = <IUser>await userRepository.user_repo_find('_id', _reciever?._id)
        // @ts-ignore
        const sender = <IUser>await userRepository.user_repo_find('_id', _sender?._id);
        save_message({
            chat_id: _chat_id, message: {
                message_type: 1,
                text: message_data.text as string
            }
        })
        socket.to(`${reciever.socket_id}`).emit('incoming_message', { ...message_data, _sender: sender, _reciever: reciever, _chat_id });
    })

}
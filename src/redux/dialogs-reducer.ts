import {v1} from 'uuid';
import {ActionType, dialogPropsType, MessagesPropsType} from './store';

const CHANGE_NEW_MESSAGE_BODY = 'CHANGE-NEW-MESSAGE-BODY'
const SEND_MESSAGE = 'SEND-MESSAGE'

export const dialogsReducer = (state: dialogPropsType, action: ActionType)=> {
    switch (action.type) {
        case CHANGE_NEW_MESSAGE_BODY: {
            state.newMessageBody = action.body
            return state
        }
        case SEND_MESSAGE: {
            const newMessage: MessagesPropsType = {
                id: v1(),
                message: state.newMessageBody
            }
            state.messages.push(newMessage)
            state.newMessageBody = ''
            return state
        }
        default: {
            return state
        }
    }
}

export const updateNewMessageBodyActionCreator =(message: string)=> ({type: CHANGE_NEW_MESSAGE_BODY, body: message}) as const
export const sendMessageActionCreator =()=> ({type: SEND_MESSAGE}) as const
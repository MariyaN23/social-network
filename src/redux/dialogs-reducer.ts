import {v1} from 'uuid';
import {ActionType} from './redux-store';

const SEND_MESSAGE = 'social-network/dialogs/SEND-MESSAGE'

type DialogPropsType = {
    id: string
    name: string
}

type MessagesPropsType = {
    id: string
    message: string
}

export type dialogPropsType = {
    dialogs: DialogPropsType[]
    messages: MessagesPropsType[]
}

export type SendMessageActionType = ReturnType<typeof sendMessageActionCreator>

const initialState: dialogPropsType = {
    dialogs: [
        {id: v1(), name: 'Dimych'},
        {id: v1(), name: 'Valera'},
        {id: v1(), name: 'Svetlana'},
        {id: v1(), name: 'Oleg'},
        {id: v1(), name: 'Igor'},
        {id: v1(), name: 'Tolik'}
    ],
    messages: [
        {id: v1(), message: 'Hi'},
        {id: v1(), message: 'Yo'},
        {id: v1(), message: 'This is IT-kamasutra'},
        {id: v1(), message: 'Bye'},
        {id: v1(), message: 'Hi'},
        {id: v1(), message: 'Hi'},
    ]
}

export const dialogsReducer = (state: dialogPropsType = initialState, action: ActionType)=> {
    switch (action.type) {
        case SEND_MESSAGE: {
            const newMessage: MessagesPropsType = {
                id: v1(),
                message: action.payload.message
            }
            return {...state, messages: [...state.messages, newMessage]}
        }
        default: {
            return state
        }
    }
}

export const sendMessageActionCreator =(message: string) => ({type: SEND_MESSAGE, payload: {message}}) as const
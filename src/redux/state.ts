import {v1} from 'uuid';

const ADD_POST = 'ADD-POST'
const CHANGE_NEW_POST_TEXT = 'CHANGE-NEW-POST-TEXT'
const CHANGE_NEW_MESSAGE_BODY = 'CHANGE-NEW-MESSAGE-BODY'
const SEND_MESSAGE = 'SEND-MESSAGE'

export type PostPropsType = {
    id: string
    message: string
    likeCounts: number
}

export type DialogPropsType = {
    id: string
    name: string
}

export type MessagesPropsType = {
    id: string
    message: string
}

export type profilePagePropsType = {
    posts: PostPropsType[],
    newPostText: string
}

export type dialogPropsType = {
    dialogs: DialogPropsType[]
    messages: MessagesPropsType[]
    newMessageBody: string
}

export type sidebarPropsType = {}

export type RootStatePropsType = {
    profilePage: profilePagePropsType
    dialogsPage: dialogPropsType
    sidebar: sidebarPropsType
}

export type StoreType = {
    _state: RootStatePropsType
    addPost: () => void
    changeNewPostText: (newPostText: string) => void
    _callSubscriber: (state: RootStatePropsType) => void
    subscribe: (observer: () => void) => void
    dispatch: (action: ActionType) => void
}

type AddPostActionType = {
    type: 'ADD-POST'
}

type ChangeNewPostTextActionType = {
    type: 'CHANGE-NEW-POST-TEXT'
    newPostText: string
}

type ChangeNewMessageBodyActionType = {
    type: 'CHANGE-NEW-MESSAGE-BODY'
    body: string
}

type SendMessageActionType = {
    type: 'SEND-MESSAGE'
}

export type ActionType = AddPostActionType | ChangeNewPostTextActionType | ChangeNewMessageBodyActionType | SendMessageActionType

export const store = {
    _state: {
        profilePage: {
            posts: [
                {id: v1(), message: 'Hi, how are you?', likeCounts: 15},
                {id: v1(), message: 'It\'s my first post', likeCounts: 20}
            ],
            newPostText: '',
        },
        dialogsPage: {
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
            ],
            newMessageBody: ''
        },
        sidebar: {},
    },
    _callSubscriber(state: RootStatePropsType) {
    },

    getState() {
        return this._state
    },
    subscribe(observer: (state: RootStatePropsType) => void) {
        this._callSubscriber = observer
    },

    dispatch(action: ActionType) {
        switch (action.type) {
            case ADD_POST:
                const newPost: PostPropsType = {
                    id: v1(),
                    message: this._state.profilePage.newPostText,
                    likeCounts: 0
                }
                this._state.profilePage.posts.push(newPost)
                this._state.profilePage.newPostText = ''
                this._callSubscriber(this._state)
            break
            case CHANGE_NEW_POST_TEXT:
                this._state.profilePage.newPostText = action.newPostText
                this._callSubscriber(this._state)
            break
            case CHANGE_NEW_MESSAGE_BODY:
                this._state.dialogsPage.newMessageBody = action.body
                this._callSubscriber(this._state)
                break
            case SEND_MESSAGE:
                const newMessage: MessagesPropsType = {
                    id: v1(),
                    message: this._state.dialogsPage.newMessageBody
                }
                this._state.dialogsPage.messages.push(newMessage)
                this._state.dialogsPage.newMessageBody = ''
                this._callSubscriber(this._state)
                break
        }
    }
}

export const addPostActionCreator = ()=> ({type: ADD_POST}) as const
export const changeNewPostTextActionCreator =(text: string)=> ({type: CHANGE_NEW_POST_TEXT, newPostText: text}) as const
export const updateNewMessageBodyActionCreator =(message: string)=> ({type: CHANGE_NEW_MESSAGE_BODY, body: message}) as const
export const sendMessageActionCreator =()=> ({type: SEND_MESSAGE}) as const
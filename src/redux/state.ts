import {v1} from 'uuid';

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

export type ActionType = AddPostActionType | ChangeNewPostTextActionType

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
            ]
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

    addPost() {
        const newPost: PostPropsType = {
            id: v1(),
            message: this._state.profilePage.newPostText,
            likeCounts: 0
        }
        this._state.profilePage.posts.push(newPost)
        this._state.profilePage.newPostText = ''
        this._callSubscriber(this._state)
    },
    changeNewPostText(newPostText: string) {
        this._state.profilePage.newPostText = newPostText
        this._callSubscriber(this._state)
    },

    dispatch(action: ActionType) {
        switch (action.type) {
            case 'ADD-POST':
                const newPost: PostPropsType = {
                    id: v1(),
                    message: this._state.profilePage.newPostText,
                    likeCounts: 0
                }
                this._state.profilePage.posts.push(newPost)
                this._state.profilePage.newPostText = ''
                this._callSubscriber(this._state)
            break
            case 'CHANGE-NEW-POST-TEXT':
                this._state.profilePage.newPostText = action.newPostText
                this._callSubscriber(this._state)
            break
        }
    }
}
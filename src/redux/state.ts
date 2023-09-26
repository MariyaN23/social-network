export type PostPropsType = {
    id: number
    message: string
    likeCounts: number
}

export type DialogPropsType = {
    id: number
    name: string
}

export type MessagesPropsType = {
    id: number
    message: string
}

export type profilePagePropsType = {
    posts: PostPropsType[]
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

export const state: RootStatePropsType = {
    profilePage: {
        posts: [
            {id: 1, message: 'Hi, how are you?', likeCounts: 15},
            {id: 2, message: 'It\'s my first post', likeCounts: 20}
        ]
    },
    dialogsPage: {
        dialogs: [
            {id: 1, name: 'Dimych'},
            {id: 2, name: 'Valera'},
            {id: 3, name: 'Svetlana'},
            {id: 4, name: 'Oleg'},
            {id: 5, name: 'Igor'},
            {id: 6, name: 'Tolik'}
        ],
        messages: [
            {id: 1, message: 'Hi'},
            {id: 2, message: 'Yo'},
            {id: 3, message: 'This is IT-kamasutra'},
            {id: 4, message: 'Bye'},
            {id: 5, message: 'Hi'},
            {id: 6, message: 'Hi'},
        ]
    },
    sidebar: {}
}
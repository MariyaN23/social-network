import {combineReducers, createStore} from 'redux';
import {AddPostActionType, ChangeNewPostTextActionType, profileReducer} from './profile-reducer';
import {ChangeNewMessageBodyActionType, dialogsReducer, SendMessageActionType} from './dialogs-reducer';
import {sidebarReducer} from './sidebar-reducer';

export type StoreType = typeof store

export type ActionType = AddPostActionType | ChangeNewPostTextActionType | ChangeNewMessageBodyActionType | SendMessageActionType

const rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebar: sidebarReducer
})

export const store = createStore(rootReducer)

import {combineReducers, createStore} from 'redux';
import {AddPostActionType, ChangeNewPostTextActionType, profilePagePropsType, profileReducer} from './profile-reducer';
import {
    ChangeNewMessageBodyActionType,
    dialogPropsType,
    dialogsReducer,
    SendMessageActionType
} from './dialogs-reducer';
import {sidebarPropsType, sidebarReducer} from './sidebar-reducer';

export type RootStatePropsType = {
    profilePage: profilePagePropsType
    dialogsPage: dialogPropsType
    sidebar: sidebarPropsType
}

export type StoreType = typeof store

/*export type StoreType = {
    _state: RootStatePropsType
    _callSubscriber: (state: RootStatePropsType) => void
    subscribe: (observer: () => void) => void
    dispatch: (action: ActionType) => void
    getState: () => RootStatePropsType
}*/

export type ActionType = AddPostActionType | ChangeNewPostTextActionType | ChangeNewMessageBodyActionType | SendMessageActionType

const rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebar: sidebarReducer
})

export const store = createStore(rootReducer)
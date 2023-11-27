import {combineReducers, createStore} from 'redux';
import {AddPostActionType, ChangeNewPostTextActionType, profileReducer} from './profile-reducer';
import {
    ChangeNewMessageBodyActionType,
    dialogsReducer,
    SendMessageActionType
} from './dialogs-reducer';
import {sidebarReducer} from './sidebar-reducer';
import {FollowActionType, setUsersActionType, UnfollowActionType, usersReducer} from './users-reducer';

/*export type RootStatePropsType = {
    profilePage: profilePagePropsType
    dialogsPage: dialogPropsType
    usersPage: UsersPropsType
    sidebar: sidebarPropsType
}

export type StoreType = typeof store*/

/*export type StoreType = {
    _state: RootStatePropsType
    _callSubscriber: (state: RootStatePropsType) => void
    subscribe: (observer: () => void) => void
    dispatch: (action: ActionType) => void
    getState: () => RootStatePropsType
}*/

export type ActionType = AddPostActionType | ChangeNewPostTextActionType |
    ChangeNewMessageBodyActionType | SendMessageActionType |
    FollowActionType | UnfollowActionType | setUsersActionType


const rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage: usersReducer,
    sidebar: sidebarReducer,
})

export type AppStateType = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer)
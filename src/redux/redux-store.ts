import {combineReducers, createStore} from 'redux';
import {
    AddPostActionType,
    ChangeNewPostTextActionType,
    profileReducer,
    SetUsersProfileActionType
} from './profile-reducer';
import {
    ChangeNewMessageBodyActionType,
    dialogsReducer,
    SendMessageActionType
} from './dialogs-reducer';
import {sidebarReducer} from './sidebar-reducer';
import {
    FollowActionType,
    setCurrentPageActionType, setIsFetchingActionType,
    setUsersActionType, setUsersCountActionType,
    UnfollowActionType,
    usersReducer
} from './users-reducer';

export type ActionType = AddPostActionType | ChangeNewPostTextActionType |
    ChangeNewMessageBodyActionType | SendMessageActionType |
    FollowActionType | UnfollowActionType | setUsersActionType |
    setCurrentPageActionType | setUsersCountActionType | setIsFetchingActionType |
    SetUsersProfileActionType


const rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage: usersReducer,
    sidebar: sidebarReducer,
})

export type AppStateType = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer)
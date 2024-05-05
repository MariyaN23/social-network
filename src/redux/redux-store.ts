import {applyMiddleware, combineReducers, createStore} from 'redux';
import {
    AddPostActionType, DeletePostActionType,
    profileReducer,
    SetUsersProfileActionType, SetUsersStatusActionType
} from './profile-reducer';
import {
    dialogsReducer,
    SendMessageActionType
} from './dialogs-reducer';
import {sidebarReducer} from './sidebar-reducer';
import {
    FollowActionType,
    setCurrentPageActionType, setFilterActionType, setFollowingInProgressActionType, setIsFetchingActionType,
    setUsersActionType, setUsersCountActionType,
    UnfollowActionType,
    usersReducer
} from './users-reducer';
import {authReducer, SetErrorActionType, SetUserDataActionType} from './auth-reducer';
import thunk, {ThunkAction} from 'redux-thunk';
import {appReducer, SetInitializedActionType} from './app-reducer';

export type ActionType = AddPostActionType | SendMessageActionType |
    FollowActionType | UnfollowActionType | setUsersActionType |
    setCurrentPageActionType | setUsersCountActionType | setIsFetchingActionType |
    SetUsersProfileActionType | SetUserDataActionType | setFollowingInProgressActionType |
    SetUsersStatusActionType | setFilterActionType | SetErrorActionType |
    SetInitializedActionType | DeletePostActionType


const rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage: usersReducer,
    sidebar: sidebarReducer,
    auth: authReducer,
    app: appReducer,
})

export type AppStateType = ReturnType<typeof rootReducer>

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppStateType, unknown, ActionType>

export const store = createStore(rootReducer, applyMiddleware(thunk))

//@ts-ignore
window.store = store
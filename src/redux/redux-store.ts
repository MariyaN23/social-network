import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import {
    AddPostActionType,
    DeletePostActionType, likeActionType,
    profileReducer, SavePhotoSuccessActionType, setPostsActionType,
    SetUsersProfileActionType,
    SetUsersStatusActionType
} from './profile-reducer';
import {dialogsReducer, SendMessageActionType} from './dialogs-reducer';
import {sidebarReducer} from './sidebar-reducer';
import {
    FollowUnfollowActionType,
    setCurrentPageActionType,
    setFilterActionType,
    setFollowingInProgressActionType,
    setIsFetchingActionType,
    setUsersActionType,
    setUsersCountActionType,
    usersReducer
} from './users-reducer';
import {authReducer, SetCaptchaActionType, SetErrorActionType, SetUserDataActionType} from './auth-reducer';
import thunk, {ThunkAction} from 'redux-thunk';
import {appReducer, SetGlobalErrorActionType, SetInitializedActionType} from './app-reducer';
import {authorsReducer} from './authors-reducer';

export type ActionType = AddPostActionType | SendMessageActionType | setUsersActionType |
    setCurrentPageActionType | setUsersCountActionType | setIsFetchingActionType |
    SetUsersProfileActionType | SetUserDataActionType | setFollowingInProgressActionType |
    SetUsersStatusActionType | setFilterActionType | SetErrorActionType |
    SetInitializedActionType | DeletePostActionType | FollowUnfollowActionType |
    SavePhotoSuccessActionType | SetCaptchaActionType | SetGlobalErrorActionType | setPostsActionType | likeActionType

const rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage: usersReducer,
    sidebar: sidebarReducer,
    auth: authReducer,
    app: appReducer,
    authors: authorsReducer,
})

export type AppStateType = ReturnType<typeof rootReducer>

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppStateType, unknown, ActionType>

//export const store = createStore(rootReducer, applyMiddleware(thunk))

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
));

//@ts-ignore
window.store = store
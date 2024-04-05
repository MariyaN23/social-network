import {ActionType, AppStateType, AppThunk} from './redux-store';
import {ThunkDispatch} from 'redux-thunk';
import {api} from '../api/api';
import {AuthFormType} from '../components/login/LoginForm';

const SET_USER_DATA = 'SET-USER-DATA'
const SET_ERROR = 'SET-ERROR'

export type DataType = {
    id: string | null
    login: string | null
    email: string | null
}

type AuthPropsType = {
    data: DataType
    isAuth: boolean
    error: string
}

const initialState: AuthPropsType = {
    data: {
        id: null,
        login: null,
        email: null,
    },
    isAuth: false,
    error: ''
}

export const authReducer = (state: AuthPropsType = initialState, action: ActionType)=> {
    switch (action.type) {
        case SET_USER_DATA: {
            return {...state,
                data: {...state.data,
                    id: action.payload.id,
                    login: action.payload.login,
                    email: action.payload.email
                },
                isAuth: action.payload.isAuth}
        }
        case SET_ERROR: {
            return {...state, error: action.payload.error}
        }
        default: {
            return state
        }
    }
}

export type SetUserDataActionType = ReturnType<typeof setUserDataActionCreator>

export const setUserDataActionCreator = (data: DataType, isAuth: boolean) =>
    ({type: SET_USER_DATA, payload: {...data, isAuth}}) as const


export type SetErrorActionType = ReturnType<typeof setErrorActionCreator>

export const setErrorActionCreator = (error: string) =>
    ({type: SET_ERROR, payload: {error}}) as const

export const authThunkCreator =(): AppThunk =>
    (dispatch: ThunkDispatch<AppStateType, unknown, ActionType>, getState: () => AppStateType)=> {
        api.authMe()
            .then((data)=> {
                if (data.resultCode === 0) {
                    dispatch(setUserDataActionCreator(data.data, true))
                }
            })
    }

export const loginThunkCreator = (loginData: AuthFormType): AppThunk =>
    (dispatch: ThunkDispatch<AppStateType, unknown, ActionType>, getState: () => AppStateType)=> {
        api.login(loginData)
            .then((data)=> {
                if (data.resultCode === 0) {
                    dispatch(authThunkCreator())
                } else {
                    dispatch(setErrorActionCreator(data.messages[0]))
                }
            })
    }

export const logoutThunkCreator = (): AppThunk =>
    (dispatch: ThunkDispatch<AppStateType, unknown, ActionType>, getState: () => AppStateType)=> {
        api.logout()
            .then((data)=> {
                if (data.resultCode === 0) {
                    dispatch(setUserDataActionCreator(
                        {id: null,
                            login: null,
                            email: null,},
                        false))
                }
            })
    }
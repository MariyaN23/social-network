import {ActionType, AppStateType, AppThunk} from './redux-store';
import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {api} from '../api/api';
import {AuthFormType} from '../components/login/LoginForm';

const SET_USER_DATA = 'social-network/auth/SET-USER-DATA'
const SET_ERROR = 'social-network/auth/SET-ERROR'
const SET_CAPTCHA = 'social-network/auth/SET-CAPTCHA'

export type DataType = {
    id: string | null
    login: string | null
    email: string | null
}

type AuthPropsType = {
    data: DataType
    isAuth: boolean
    error: string
    captcha: string
}

const initialState: AuthPropsType = {
    data: {
        id: null,
        login: null,
        email: null,
    },
    isAuth: false,
    error: '',
    captcha: ''
}

export const authReducer = (state: AuthPropsType = initialState, action: ActionType) => {
    switch (action.type) {
        case SET_USER_DATA: {
            return {
                ...state,
                data: {
                    ...state.data,
                    id: action.payload.id,
                    login: action.payload.login,
                    email: action.payload.email
                },
                isAuth: action.payload.isAuth
            }
        }
        case SET_ERROR: {
            return {...state, error: action.payload.error}
        }
        case SET_CAPTCHA: {
            return {...state, captcha: action.payload.captcha}
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

export type SetCaptchaActionType = ReturnType<typeof setCaptchaActionCreator>

export const setCaptchaActionCreator = (captcha: string) =>
    ({type: SET_CAPTCHA, payload: {captcha}}) as const

export const authThunkCreator = (): ThunkAction<Promise<void>, AppStateType, unknown, ActionType> =>
    async (dispatch: ThunkDispatch<AppStateType, unknown, ActionType>) => {
        const data = await api.authMe()
        if (data.resultCode === 0) {
            dispatch(setUserDataActionCreator(data.data, true))
        }
    }

export const loginThunkCreator = (loginData: AuthFormType): AppThunk =>
    async (dispatch: ThunkDispatch<AppStateType, unknown, ActionType>) => {
        const data = await api.login(loginData)
        if (data.resultCode === 0) {
            dispatch(authThunkCreator())
            dispatch(setCaptchaActionCreator(''))
            dispatch(setErrorActionCreator(''))
        } else {
            if (data.resultCode === 10) {
                dispatch(getCaptchaThunkCreator())
            }
            dispatch(setErrorActionCreator(data.messages[0]))
        }
    }

export const logoutThunkCreator = (): AppThunk =>
    async (dispatch: ThunkDispatch<AppStateType, unknown, ActionType>, getState: () => AppStateType) => {
        const data = await api.logout()
        if (data.resultCode === 0) {
            dispatch(setUserDataActionCreator(
                {
                    id: null,
                    login: null,
                    email: null,
                },
                false))
        }
    }

export const getCaptchaThunkCreator = (): AppThunk =>
    async (dispatch: ThunkDispatch<AppStateType, unknown, ActionType>) => {
        const response = await api.getCaptcha()
        const captchaUrl = response.data.url
        dispatch(setCaptchaActionCreator(captchaUrl))
    }
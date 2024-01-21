import {ActionType} from './redux-store';

const SET_USER_DATA = 'SET-USER-DATA'

export type DataType = {
    id: string | null
    login: string | null
    email: string | null
}

type AuthPropsType = {
    data: DataType
    isAuth: boolean
}

const initialState: AuthPropsType = {
    data: {
        id: null,
        login: null,
        email: null,
    },
    isAuth: false
}

export const authReducer = (state: AuthPropsType = initialState, action: ActionType)=> {
    switch (action.type) {
        case SET_USER_DATA: {
            return {...state, data: {...action.data}, isAuth: true}
        }
        default: {
            return state
        }
    }
}

export type SetUserDataActionType = ReturnType<typeof setUserDataActionCreator>

export const setUserDataActionCreator = (data: DataType)=> ({type: SET_USER_DATA, data}) as const
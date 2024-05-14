import {ActionType, AppStateType, AppThunk} from './redux-store';
import {ThunkDispatch} from 'redux-thunk';
import {authThunkCreator} from './auth-reducer';

const SET_INITIALIZED = 'social-network/app/SET-INITIALIZED'
const SET_GLOBAL_ERROR = 'social-network/app/SET-GLOBAL-ERROR'

type AppPropsType = {
    initialized: boolean
    globalError: string
}

const initialState: AppPropsType = {
    initialized: false,
    globalError: ''
}

export const appReducer = (state: AppPropsType = initialState, action: ActionType) => {
    switch (action.type) {
        case SET_INITIALIZED: {
            return {...state, initialized: action.payload.initialized}
        }
        case SET_GLOBAL_ERROR: {
            return {...state, globalError: action.payload.globalError}
        }
        default: {
            return state
        }
    }
}

export type SetInitializedActionType = ReturnType<typeof setInitializedActionCreator>
export const setInitializedActionCreator = (initialized: boolean) =>
    ({type: SET_INITIALIZED, payload: {initialized}}) as const

export type SetGlobalErrorActionType = ReturnType<typeof setGlobalErrorActionCreator>
export const setGlobalErrorActionCreator = (globalError: string) =>
    ({type: SET_GLOBAL_ERROR, payload: {globalError}}) as const

export const initializeAppThunkCreator = (): AppThunk =>
    async (dispatch: ThunkDispatch<AppStateType, unknown, ActionType>) => {
        await dispatch(authThunkCreator())
        dispatch(setInitializedActionCreator(true))
    }

export const setGlobalErrorThunkCreator = (globalError: string): AppThunk =>
    (dispatch: ThunkDispatch<AppStateType, unknown, ActionType>) => {
        dispatch(setGlobalErrorActionCreator(globalError))
    }
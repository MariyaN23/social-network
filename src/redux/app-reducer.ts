import {ActionType, AppStateType, AppThunk} from './redux-store';
import {ThunkDispatch} from 'redux-thunk';
import {authThunkCreator} from './auth-reducer';

const SET_INITIALIZED = 'social-network/app/SET-INITIALIZED'

type AppPropsType = {
    initialized: boolean
}

const initialState: AppPropsType = {
    initialized: false
}

export const appReducer = (state: AppPropsType = initialState, action: ActionType) => {
    switch (action.type) {
        case SET_INITIALIZED: {
            return {...state, initialized: action.payload.initialized}
        }
        default: {
            return state
        }
    }
}

export type SetInitializedActionType = ReturnType<typeof setInitializedActionCreator>
export const setInitializedActionCreator = (initialized: boolean) =>
    ({type: SET_INITIALIZED, payload: {initialized}}) as const

export const initializeAppThunkCreator = (): AppThunk =>
    async (dispatch: ThunkDispatch<AppStateType, unknown, ActionType>) => {
        await dispatch(authThunkCreator())
        dispatch(setInitializedActionCreator(true))
    }
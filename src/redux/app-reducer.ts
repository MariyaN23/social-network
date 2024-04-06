import {ActionType, AppStateType, AppThunk} from './redux-store';
import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {authThunkCreator} from './auth-reducer';

const SET_INITIALIZED = 'SET-INITIALIZED'

type AppPropsType = {
    initialized: boolean
}

const initialState: AppPropsType = {
    initialized: false
}

export const appReducer = (state: AppPropsType = initialState, action: ActionType)=> {
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

export const initializeAppThunkCreator =(): AppThunk =>
    (dispatch: ThunkDispatch<AppStateType, unknown, ActionType>)=> {
    dispatch(authThunkCreator())
        .then(()=> dispatch(setInitializedActionCreator(true)))
    }
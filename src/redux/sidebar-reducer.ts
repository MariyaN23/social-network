import {ActionType} from './redux-store';

export type sidebarPropsType = {}

const initialState: sidebarPropsType = {}

export const sidebarReducer = (state: sidebarPropsType = initialState, action: ActionType)=>{
    return state
}
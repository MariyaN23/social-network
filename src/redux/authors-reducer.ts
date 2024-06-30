import {AuthorApiType} from '../api/api';
import {ActionType} from './redux-store';
import {mapToLookupTable, SET_POSTS} from './profile-reducer';

type AuthorsReducerStateType = {
    //allIds: string[]
    byId: {[key: string]: AuthorApiType}
}

const initialState: AuthorsReducerStateType = {
    //allIds: [],
    byId: {}
}

export const authorsReducer = (state: AuthorsReducerStateType = initialState, action: ActionType): AuthorsReducerStateType => {
    switch (action.type) {
        case SET_POSTS : {
            const authors = action.payload.posts.map(p => p.author)
            return {
                ...state,
                byId: mapToLookupTable(authors)
            }
        }
        default: {
            return state
        }
    }
}
import {AuthorApiType} from '../api/api';
import {ActionType} from './redux-store';
import {mapToLookupTable, SET_POSTS} from './profile-reducer';
import {SET_ALL_COMMENTS} from './comments-reducer';

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
                byId: {
                    ...state.byId,
                    ...mapToLookupTable(authors),
                    ...mapToLookupTable(action.payload.posts.map(p => p.lastComments).flat().map(c => c.author))
                }
            }
        }
        case SET_ALL_COMMENTS : {
            const authors = action.payload.comments.map(c => c.author)
            return {
                ...state,
                byId: {
                    ...state.byId,
                    ...mapToLookupTable(authors)
                }
            }
        }
        default: {
            return state
        }
    }
}
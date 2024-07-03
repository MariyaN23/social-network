import {ActionType, AppStateType, AppThunk} from './redux-store';
import {mapToLookupTable, SET_POSTS} from './profile-reducer';
import {api, CommentApiType} from '../api/api';
import {ThunkDispatch} from 'redux-thunk';

export const SET_ALL_COMMENTS = "social-network/profile/SET-ALL-COMMENTS"
export const DELETE_COMMENT = "social-network/profile/DELETE-COMMENT"

export type CommentType = Omit<CommentApiType, 'author'> & {authorId: string}

type CommentsReducerStateType = {
    byId: {[key: string]: CommentType}
}

const initialState: CommentsReducerStateType = {
    byId: {}
}

export const commentsReducer = (state: CommentsReducerStateType = initialState, action: ActionType): CommentsReducerStateType => {
    switch (action.type) {
        case SET_POSTS : {
            const comments = action.payload.posts.map(p => p.lastComments).flat().map(c=>{
                const copy: CommentType = {
                    id: c.id,
                    message: c.message,
                    authorId: c.author.id
                }
                return copy
            })
            return {
                ...state,
                byId: {
                    ...state.byId,
                    ...mapToLookupTable(comments)
                }
            }
        }
        case SET_ALL_COMMENTS: {
            const lookupTable = mapToLookupTable(action.payload.comments.map(c=>{
                const copy: CommentType = {
                    id: c.id,
                    message: c.message,
                    authorId: c.author.id
                }
                return copy
            }))
            return {
                ...state,
                byId: {
                    ...state.byId,
                    ...lookupTable
                }
            }
        }
        case DELETE_COMMENT: {
            const byIdCopy = {
               ...state.byId
            }
            delete byIdCopy[action.payload.commentId]
            return {...state, byId: byIdCopy}
        }
        default: {
            return state
        }
    }
}

export type SetAllCommentsActionType = ReturnType<typeof setAllCommentsActionCreator>
export const setAllCommentsActionCreator = (comments: CommentApiType[], postId: string) =>
    ({type: SET_ALL_COMMENTS, payload: {comments, postId}}) as const

export type DeleteCommentActionType = ReturnType<typeof deleteCommentActionCreator>
export const deleteCommentActionCreator = (postId: string, commentId: string) =>
    ({type: DELETE_COMMENT, payload: {postId, commentId}}) as const

export const fetchCommentsThunkCreator = (postId: string): AppThunk =>
    async (dispatch: ThunkDispatch<AppStateType, unknown, ActionType>) => {
        const comments = await api.getComments(postId)
        dispatch(setAllCommentsActionCreator(comments, postId))
    }

export const deleteCommentThunkCreator = (postId: string, commentId: string): AppThunk =>
    async (dispatch: ThunkDispatch<AppStateType, unknown, ActionType>) => {
    debugger
        await api.deleteComment(postId, commentId)
        dispatch(deleteCommentActionCreator(postId, commentId))
    }

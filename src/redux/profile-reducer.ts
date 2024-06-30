import {v1} from 'uuid';
import {ActionType, AppStateType, AppThunk} from './redux-store';
import {ThunkDispatch} from 'redux-thunk';
import {api, AuthorApiType, PostApiType} from '../api/api';
import {ProfileFormType} from '../components/profile/profileInfo/profileData/ProfileDataForm';
import {setGlobalErrorThunkCreator} from './app-reducer';

const ADD_POST = 'social-network/profile/ADD-POST'
const SET_USERS_PROFILE = 'social-network/profile/SET-USERS-PROFILE'
const SET_USERS_STATUS = 'social-network/profile/SET-USERS-STATUS'
const DELETE_POST = 'social-network/profile/DELETE-POST'
const SAVE_PHOTO_SUCCESS = 'social-network/profile/SAVE-PHOTO-SUCCESS'
export const SET_POSTS = 'social-network/profile/SET-POSTS'
const LIKE_POST = 'social-network/profile/LIKE-POST'


export type profilePagePropsType = {
    profile: ProfileType | null
    status: string
    allIds: string[]
    byId: {[key: string]: PostType}
}

export type AddPostActionType = ReturnType<typeof addPostActionCreator>
export type SetUsersProfileActionType = ReturnType<typeof setUsersProfileActionCreator>
export type SetUsersStatusActionType = ReturnType<typeof setUsersStatusActionCreator>
export type DeletePostActionType = ReturnType<typeof deletePostActionCreator>
export type SavePhotoSuccessActionType = ReturnType<typeof savePhotoSuccessActionCreator>
export type setPostsActionType = ReturnType<typeof setPostsActionCreator>
export type likeActionType = ReturnType<typeof likeActionCreator>

export type PostType = {
    id: string
    message: string
    likeCounts: number
    authorId: string
}

export type PhotosType = {
    small: string
    large: string
}

export type ContactsType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}

export type ProfileType = {
    aboutMe: string
    userId: string
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: ContactsType
    photos: PhotosType
}

const initialState: profilePagePropsType = {
    profile: null,
    status: '',
    allIds: [],
    byId: {}
}

/*type LookupTableType<T> = {[key: string]: T}

export const mapToLookupTable = <T extends {id: string}>(items: T[]): LookupTableType<T> => {
    const acc: LookupTableType<T> = {};
    return items.reduce((acc, item)=> {
        acc[item.id] = item;
        return acc
    }, acc)
}*/

export const mapToLookupTable = (items: any[]) => {
    return items.reduce((acc, item)=> {
        acc[item.id] = item
        return acc
    }, {})}

export const profileReducer = (state: profilePagePropsType = initialState, action: ActionType) => {
    switch (action.type) {
        case SET_POSTS : {
            return {
                ...state,
                allIds: action.payload.posts.map(p => p.id),
                byId: mapToLookupTable(action.payload.posts.map(p => {
                    const postCopy: PostType = {
                        id: p.id,
                        message: p.message,
                        likeCounts: p.likeCounts,
                        authorId: p.author.id
                    }
                    return postCopy
                }))
            }
        }
        case ADD_POST: {
            const newPost: PostType = {
                id: v1(),
                message: action.payload.post,
                likeCounts: 0,
                authorId: "1"
            }
            return {...state,
                allIds: [newPost.id, ...state.allIds],
                byId: {
                    [newPost.id]: newPost,
                    ...state.byId,
            }
            }
        }
        case LIKE_POST: {
            return {...state,
            byId: {
                ...state.byId,
                [action.payload.id]: {...state.byId[action.payload.id], likeCounts: state.byId[action.payload.id].likeCounts+1}
            }}
        }
        case SET_USERS_PROFILE: {
            return {...state, profile: action.profile}
        }
        case SET_USERS_STATUS: {
            return {...state, status: action.status}
        }
        case DELETE_POST: {
            const stateCopy = {...state,
                allIds: state.allIds.filter(id => id !== action.payload.id),
            }
            delete stateCopy.byId[action.payload.id]
            return stateCopy
        }
        case SAVE_PHOTO_SUCCESS: {
            debugger
            return state.profile ?
            {...state, profile: {...state.profile, photos: action.payload.photos}}
            : state
        }
        default: {
            return state
        }
    }
}

export const addPostActionCreator = (post: string, author: AuthorApiType) => ({type: ADD_POST, payload: {post, author}}) as const
export const setUsersProfileActionCreator = (profile: ProfileType | null) => ({
    type: SET_USERS_PROFILE,
    profile
}) as const
export const setUsersStatusActionCreator = (status: string) => ({type: SET_USERS_STATUS, status}) as const
export const deletePostActionCreator = (id: string) => ({type: DELETE_POST, payload: {id}}) as const
export const savePhotoSuccessActionCreator = (photos: PhotosType) => ({type: SAVE_PHOTO_SUCCESS, payload: {photos}}) as const
export const setPostsActionCreator = (posts: PostApiType[]) => ({type: SET_POSTS, payload: {posts}}) as const
export const likeActionCreator = (id: string) => ({type: LIKE_POST, payload: {id}}) as const

export const getUsersProfileThunkCreator = (userId: string): AppThunk =>
    async (dispatch: ThunkDispatch<AppStateType, unknown, ActionType>) => {
        const data = await api.getUsersProfile(userId)
        dispatch(setUsersProfileActionCreator(data))
    }

export const getUsersStatusThunkCreator = (userId: string): AppThunk =>
    async (dispatch: ThunkDispatch<AppStateType, unknown, ActionType>) => {
        const data = await api.getStatus(userId)
        dispatch(setUsersStatusActionCreator(data))
    }

export const updateUsersStatusThunkCreator = (status: string): AppThunk =>
    async (dispatch: ThunkDispatch<AppStateType, unknown, ActionType>, getState: () => AppStateType) => {
        const state = getState()
        if (state.profilePage.profile?.userId === state.auth.data.id) {
            const data = await api.updateStatus(status)
            if (data.data.resultCode === 0) {
                dispatch(setUsersStatusActionCreator(status))
            } else {
                dispatch(setGlobalErrorThunkCreator(data.data.messages[0]))
            }
        }
    }

export const savePhotoThunkCreator = (image: any): AppThunk =>
    async (dispatch: ThunkDispatch<AppStateType, unknown, ActionType>, getState: () => AppStateType) => {
    const response = await api.updatePhoto(image)
        if (response.data.resultCode === 0) {
            dispatch(savePhotoSuccessActionCreator(response.data.data.photos))
        }
    }

export const saveProfileThunkCreator = (profileData: ProfileFormType): AppThunk =>
    async (dispatch: ThunkDispatch<AppStateType, unknown, ActionType>, getState: () => AppStateType) => {
        const response = await api.updateProfile(profileData)
        const userId = getState().auth.data.id
        if (response.data.resultCode === 0) {
            dispatch(getUsersProfileThunkCreator(userId ? userId : ''))
        }
    }

export const fetchPostsThunkCreator = (): AppThunk =>
    async (dispatch: ThunkDispatch<AppStateType, unknown, ActionType>) => {
        const posts = await api.getPosts()
            dispatch(setPostsActionCreator(posts))
    }
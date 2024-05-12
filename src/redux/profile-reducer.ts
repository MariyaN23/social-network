import {v1} from 'uuid';
import {ActionType, AppStateType, AppThunk} from './redux-store';
import {ThunkDispatch} from 'redux-thunk';
import {api} from '../api/api';

const ADD_POST = 'social-network/profile/ADD-POST'
const SET_USERS_PROFILE = 'social-network/profile/SET-USERS-PROFILE'
const SET_USERS_STATUS = 'social-network/profile/SET-USERS-STATUS'
const DELETE_POST = 'social-network/profile/DELETE-POST'
const SAVE_PHOTO_SUCCESS = 'social-network/profile/SAVE-PHOTO-SUCCESS'

export type PostPropsType = {
    id: string
    message: string
    likeCounts: number
}

export type profilePagePropsType = {
    profile: ProfileType | null
    posts: PostPropsType[]
    status: string
}

export type AddPostActionType = ReturnType<typeof addPostActionCreator>
export type SetUsersProfileActionType = ReturnType<typeof setUsersProfileActionCreator>
export type SetUsersStatusActionType = ReturnType<typeof setUsersStatusActionCreator>
export type DeletePostActionType = ReturnType<typeof deletePostActionCreator>
export type SavePhotoSuccessActionType = ReturnType<typeof savePhotoSuccessActionCreator>

export type PhotosType = {
    small: string
    large: string
}

type ContactsType = {
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
    posts: [
        {id: v1(), message: 'Hi, how are you?', likeCounts: 15},
        {id: v1(), message: 'It\'s my first post', likeCounts: 20}
    ],
    status: ''
}

export const profileReducer = (state: profilePagePropsType = initialState, action: ActionType) => {
    switch (action.type) {
        case ADD_POST: {
            const newPost: PostPropsType = {
                id: v1(),
                message: action.payload.post,
                likeCounts: 0
            }
            return {...state, posts: [newPost, ...state.posts]}
        }
        case SET_USERS_PROFILE: {
            return {...state, profile: action.profile}
        }
        case SET_USERS_STATUS: {
            return {...state, status: action.status}
        }
        case DELETE_POST: {
            return {...state, posts: state.posts.filter(post => post.id !== action.payload.id)}
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

export const addPostActionCreator = (post: string) => ({type: ADD_POST, payload: {post}}) as const
export const setUsersProfileActionCreator = (profile: ProfileType | null) => ({
    type: SET_USERS_PROFILE,
    profile
}) as const
export const setUsersStatusActionCreator = (status: string) => ({type: SET_USERS_STATUS, status}) as const
export const deletePostActionCreator = (id: string) => ({type: DELETE_POST, payload: {id}}) as const
export const savePhotoSuccessActionCreator = (photos: PhotosType) => ({type: SAVE_PHOTO_SUCCESS, payload: {photos}}) as const

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
import {v1} from 'uuid';
import {ActionType, AppStateType, AppThunk} from './redux-store';
import {ThunkDispatch} from 'redux-thunk';
import {api} from '../api/api';

const ADD_POST = 'ADD-POST'
const SET_USERS_PROFILE = 'SET-USERS-PROFILE'
const SET_USERS_STATUS = 'SET-USERS-STATUS'

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

type PhotosType = {
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

export const profileReducer = (state: profilePagePropsType = initialState, action: ActionType)=> {
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
        default: {
            return state
        }
    }
}

export const addPostActionCreator = (post: string)=> ({type: ADD_POST, payload: {post}}) as const
export const setUsersProfileActionCreator =(profile: ProfileType | null) => ({type: SET_USERS_PROFILE, profile}) as const
export const setUsersStatusActionCreator =(status: string) => ({type: SET_USERS_STATUS, status}) as const

export const getUsersProfileThunkCreator =(userId: string): AppThunk =>
    (dispatch: ThunkDispatch<AppStateType, unknown, ActionType>, getState: () => AppStateType)=> {
    api.getUsersProfile(userId)
        .then(data => {
            dispatch(setUsersProfileActionCreator(data))
        })
    }

export const getUsersStatusThunkCreator =(userId: string): AppThunk =>
    (dispatch: ThunkDispatch<AppStateType, unknown, ActionType>, getState: () => AppStateType)=> {
        api.getStatus(userId)
            .then(data => {
                dispatch(setUsersStatusActionCreator(data))
            })
    }

export const updateUsersStatusThunkCreator =(status: string): AppThunk =>
    (dispatch: ThunkDispatch<AppStateType, unknown, ActionType>, getState: () => AppStateType)=> {
    const state = getState()
        if (state.profilePage.profile?.userId === state.auth.data.id) {
            api.updateStatus(status)
                .then(data => {
                    if (data.data.resultCode === 0) {
                        dispatch(setUsersStatusActionCreator(status))
                    }
                })
        }
    }
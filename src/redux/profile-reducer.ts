import {v1} from 'uuid';
import {ActionType, AppStateType, AppThunk} from './redux-store';
import {ThunkDispatch} from 'redux-thunk';
import {api} from '../api/api';

const ADD_POST = 'ADD-POST'
const CHANGE_NEW_POST_TEXT = 'CHANGE-NEW-POST-TEXT'
const SET_USERS_PROFILE = 'SET-USERS-PROFILE'

export type PostPropsType = {
    id: string
    message: string
    likeCounts: number
}

export type profilePagePropsType = {
    profile: ProfileType | null
    posts: PostPropsType[],
    newPostText: string
}

export type AddPostActionType = ReturnType<typeof addPostActionCreator>
export type ChangeNewPostTextActionType = ReturnType<typeof changeNewPostTextActionCreator>
export type SetUsersProfileActionType = ReturnType<typeof setUsersProfileActionCreator>

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
    newPostText: '',
}

export const profileReducer = (state: profilePagePropsType = initialState, action: ActionType)=> {
    switch (action.type) {
        case ADD_POST: {
            const newPost: PostPropsType = {
                id: v1(),
                message: state.newPostText,
                likeCounts: 0
            }
            return {...state, posts: [newPost, ...state.posts], newPostText: ''}
        }
        case CHANGE_NEW_POST_TEXT: {
            return {...state, newPostText: action.newPostText}
        }
        case SET_USERS_PROFILE: {
            return {...state, profile: action.profile}
        }
        default: {
            return state
        }
    }
}

export const addPostActionCreator = ()=> ({type: ADD_POST}) as const
export const changeNewPostTextActionCreator =(text: string) => ({type: CHANGE_NEW_POST_TEXT, newPostText: text}) as const
export const setUsersProfileActionCreator =(profile: ProfileType | null) => ({type: SET_USERS_PROFILE, profile}) as const

export const getUsersProfileThunkCreator =(userId: string): AppThunk =>
    (dispatch: ThunkDispatch<AppStateType, unknown, ActionType>, getState: () => AppStateType)=> {
    api.getUsersProfile(userId)
        .then(data => {
            dispatch(setUsersProfileActionCreator(data))
        })
    }
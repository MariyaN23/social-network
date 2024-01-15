import {ActionType} from './redux-store';

const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET-USERS'
const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE'
const SET_USERS_COUNT = 'SET-USERS-COUNT'

type LocationPropsType = {
    country: string
    city: string
}
type PhotosPropsType = {
    small: string
    large: string
}

export type UserType = {
    id: string
    photos: PhotosPropsType
    name: string
    status: string
    location: LocationPropsType
    followed: boolean
}

export type UsersType = {
    users: UserType[]
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
}

export type FollowActionType = ReturnType<typeof followActionCreator>
export type UnfollowActionType = ReturnType<typeof unfollowActionCreator>
export type setUsersActionType = ReturnType<typeof setUsersActionCreator>
export type setCurrentPageActionType = ReturnType<typeof setCurrentPageActionCreator>
export type setUsersCountActionType = ReturnType<typeof setUsersCountActionCreator>

const initialState: UsersType = {
    users: [],
    pageSize: 4,
    totalUsersCount: 21,
    currentPage: 1,
    isFetching: true,
}

export const usersReducer = (state: UsersType = initialState, action: ActionType): UsersType => {
    switch (action.type) {
        case FOLLOW: {
            return {...state, users: state.users.map(u => u.id === action.userId ? {...u, followed: true} : u)}
        }
        case UNFOLLOW: {
            return {...state, users: state.users.map(u => u.id === action.userId ? {...u, followed: false} : u)}
        }
        case SET_USERS: {
            return {...state, users: action.users}
        }
        case SET_CURRENT_PAGE: {
            return {...state, currentPage: action.currentPage}
        }
        case SET_USERS_COUNT: {
            return {...state, totalUsersCount: action.usersCount}
        }
        default:
            return state
    }
}

export const followActionCreator = (userId: string)=> ({type: FOLLOW, userId}) as const
export const unfollowActionCreator = (userId: string)=> ({type: UNFOLLOW, userId}) as const
export const setUsersActionCreator = (users: UserType[])=> ({type: SET_USERS, users}) as const
export const setCurrentPageActionCreator = (currentPage: number)=> ({type: SET_CURRENT_PAGE, currentPage}) as const
export const setUsersCountActionCreator = (usersCount: number)=> ({type: SET_USERS_COUNT, usersCount}) as const
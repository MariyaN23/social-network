import {ActionType} from './redux-store';

const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET-USERS'

type LocationPropsType = {
    country: string
    city: string
}

export type UserType = {
    id: string
    photoUrl: string
    fullName: string
    status: string
    location: LocationPropsType
    followed: boolean
}

export type UsersType = {
    users: UserType[]
}

export type FollowActionType = ReturnType<typeof followActionCreator>
export type UnfollowActionType = ReturnType<typeof unfollowActionCreator>
export type setUsersActionType = ReturnType<typeof setUsersActionCreator>

const initialState: UsersType = {
    users: []
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
        default:
            return state
    }
}

export const followActionCreator = (userId: string)=> ({type: FOLLOW, userId}) as const
export const unfollowActionCreator = (userId: string)=> ({type: UNFOLLOW, userId}) as const
export const setUsersActionCreator = (users: UserType[])=> ({type: SET_USERS, users}) as const
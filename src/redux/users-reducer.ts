import {ActionType} from './redux-store';
import {v1} from 'uuid';

const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET-USERS'

type LocationPropsType = {
    country: string
    city: string
}

export type userPropsType = {
    id: string
    photoUrl: string
    fullName: string
    status: string
    location: LocationPropsType
    followed: boolean
}

export type UsersPropsType = {
    users: userPropsType[]
}

export type FollowActionType = ReturnType<typeof followActionCreator>
export type UnfollowActionType = ReturnType<typeof unfollowActionCreator>
export type setUsersActionType = ReturnType<typeof setUsersActionCreator>

const initialState: UsersPropsType = {
    users: [
        {id: v1(), photoUrl: 'https://i.pinimg.com/474x/fe/bb/d4/febbd478ad268919fbf80b0b5e069165.jpg', fullName: 'Dmitriy K.', status: 'I\'m a boss', location: {country: 'Belarus', city: 'Minsk'}, followed: true},
        {id: v1(), photoUrl: 'https://nymock.com/cdn/shop/files/7_40dd5edf-993c-4e5e-abc8-eff4c4b7c73b.jpg?v=1695932057', fullName: 'Oleg N.', status: 'I\'m Oleg', location: {country: 'Russia', city: 'Moscow'}, followed: false},
        {id: v1(), photoUrl: 'https://scontent-waw1-1.xx.fbcdn.net/v/t1.6435-9/48368395_1087172471453961_7531645519165128704_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=dd63ad&_nc_ohc=8cNBLLLDddYAX9HcUtt&_nc_ht=scontent-waw1-1.xx&oh=00_AfCLPm9-uAd5UNKsz2kgQv90vpVYKfGdwvC8_i0NaXi-cA&oe=658BB135', fullName: 'Svetlana L.', status: 'I\'m Sveta', location: {country: 'Ukraine', city: 'Kiev'}, followed: true},
        {id: v1(), photoUrl: 'https://i.pinimg.com/736x/84/91/3c/84913ce28e78c83ae28eae12fd1eb64a.jpg', fullName: 'Valeriy P.', status: 'I like pizza with cheese', location: {country: 'Belarus', city: 'Minsk'}, followed: false},
    ],
}

export const usersReducer = (state: UsersPropsType = initialState, action: ActionType) => {
    switch (action.type) {
        case FOLLOW: {
            return {...state, users: state.users.map(u => u.id === action.userId ? {...u, followed: true} : u)}
        }
        case UNFOLLOW: {
            return {...state, users: state.users.map(u => u.id === action.userId ? {...u, followed: false} : u)}
        }
        case SET_USERS: {
            return {...state, users: [...state.users, ...action.users.users]}
        }
        default:
            return state
    }
}

export const followActionCreator = (userId: string)=> ({type: FOLLOW, userId}) as const
export const unfollowActionCreator = (userId: string)=> ({type: UNFOLLOW, userId}) as const
export const setUsersActionCreator = (users: UsersPropsType)=> ({type: SET_USERS, users}) as const
import {ActionType, AppStateType, AppThunk} from './redux-store';
import {api} from '../api/api';
import {ThunkDispatch} from 'redux-thunk';

const FOLLOW_UNFOLLOW = 'social-network/users/FOLLOW-UNFOLLOW'
const SET_USERS = 'social-network/users/SET-USERS'
const SET_CURRENT_PAGE = 'social-network/users/SET-CURRENT-PAGE'
const SET_USERS_COUNT = 'social-network/users/SET-USERS-COUNT'
const SET_IS_FETCHING = 'social-network/users/SET-IS-FETCHING'
const SET_FOLLOWING_IN_PROGRESS = 'social-network/users/SET-FOLLOWING-IN-PROGRESS'
const SET_FILTER = 'social-network/users/SET-FILTER'

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

export type FilterType = {
    term: string
    friend: null | boolean
}

export type UsersType = {
    users: UserType[]
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: string[]
    filter: FilterType
}

export type FollowUnfollowActionType = ReturnType<typeof followUnfollowActionCreator>
export type setUsersActionType = ReturnType<typeof setUsersActionCreator>
export type setCurrentPageActionType = ReturnType<typeof setCurrentPageActionCreator>
export type setUsersCountActionType = ReturnType<typeof setUsersCountActionCreator>
export type setIsFetchingActionType = ReturnType<typeof setIsFetchingActionCreator>
export type setFollowingInProgressActionType = ReturnType<typeof setFollowingInProgressActionCreator>
export type setFilterActionType = ReturnType<typeof setFilterActionCreator>

const initialState: UsersType = {
    users: [],
    pageSize: 4,
    totalUsersCount: 21,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [],
    filter: {
        term: '',
        friend: null as null | boolean
    }
}

export const usersReducer = (state: UsersType = initialState, action: ActionType): UsersType => {
    switch (action.type) {
        case FOLLOW_UNFOLLOW: {
            return {...state, users: state.users.map(u => u.id === action.userId ? {...u, followed: action.follow} : u)}
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
        case SET_IS_FETCHING: {
            return {...state, isFetching: action.isFetching}
        }
        case SET_FOLLOWING_IN_PROGRESS: {
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            }
        }
        case SET_FILTER: {
            return {...state, filter: action.payload}
        }
        default:
            return state
    }
}

export const followUnfollowActionCreator = (userId: string, follow: boolean) => ({type: FOLLOW_UNFOLLOW, userId, follow}) as const
export const setUsersActionCreator = (users: UserType[]) => ({type: SET_USERS, users}) as const
export const setCurrentPageActionCreator = (currentPage: number) => ({type: SET_CURRENT_PAGE, currentPage}) as const
export const setUsersCountActionCreator = (usersCount: number) => ({type: SET_USERS_COUNT, usersCount}) as const
export const setIsFetchingActionCreator = (isFetching: boolean) => ({type: SET_IS_FETCHING, isFetching}) as const
export const setFollowingInProgressActionCreator = (isFetching: boolean, userId: string) => ({
    type: SET_FOLLOWING_IN_PROGRESS,
    userId,
    isFetching
}) as const
export const setFilterActionCreator = (filter: FilterType) => ({type: SET_FILTER, payload: filter}) as const

export const getUsersThunkCreator = (currentPage: number, pageSize: number, filter: FilterType): AppThunk =>
    async (dispatch: ThunkDispatch<AppStateType, unknown, ActionType>) => {
        dispatch(setIsFetchingActionCreator(true))
        dispatch(setFilterActionCreator(filter))
        const data = await api.getUsers(currentPage, pageSize, filter)
        dispatch(setUsersActionCreator(data.items))
        dispatch(setUsersCountActionCreator(data.totalCount))
        dispatch(setIsFetchingActionCreator(false))
    }

export const followUnfollowThunkCreator = (userId: string, follow: boolean): AppThunk =>
    async (dispatch: ThunkDispatch<AppStateType, unknown, ActionType>) => {
        dispatch(setFollowingInProgressActionCreator(true, userId));
        const data = await (follow ? api.follow(userId) : api.unfollow(userId))
        if (data.resultCode === 0) {
            dispatch(followUnfollowActionCreator(userId,follow))
        }
        dispatch(setFollowingInProgressActionCreator(false, userId))
    }
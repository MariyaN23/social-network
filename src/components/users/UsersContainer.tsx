import {connect} from 'react-redux';
import {AppStateType} from '../../redux/redux-store';
import {
    followActionCreator, setCurrentPageActionCreator,
    setUsersActionCreator, setUsersCountActionCreator,
    unfollowActionCreator, UserType
} from '../../redux/users-reducer';
import {Users} from './Users';
import {Dispatch} from 'redux';

type MapStatePropsType = {
    users: UserType[]
    pageSize: number
    totalUsersCount: number
    currentPage: number
}

type MapDispatchPropsType = {
    follow: (userId: string)=> void
    unfollow: (userId: string)=> void
    setUsers: (users: UserType[])=> void
    setCurrentPage: (currentPage: number)=> void
    setUsersCount: (usersCount: number)=> void
}

export type UsersPropsType = MapStatePropsType & MapDispatchPropsType

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
    }
}

const mapDispatchToProps = (dispatch: Dispatch): MapDispatchPropsType => {
    return {
        follow: (userId: string) => {
            dispatch(followActionCreator(userId))
        },
        unfollow: (userId: string) => {
            dispatch(unfollowActionCreator(userId))
        },
        setUsers: (users: UserType[])=> {
            dispatch(setUsersActionCreator(users))
        },
        setCurrentPage: (currentPage: number) => {
            dispatch(setCurrentPageActionCreator(currentPage))
        },
        setUsersCount: (usersCount: number) => {
            dispatch(setUsersCountActionCreator(usersCount))
        }
    }
}

export const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users)
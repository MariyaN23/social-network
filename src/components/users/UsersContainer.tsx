import {connect} from 'react-redux';
import {AppStateType} from '../../redux/redux-store';
import {
    followActionCreator,
    setUsersActionCreator,
    unfollowActionCreator, UserType
} from '../../redux/users-reducer';
import {Users} from './Users';
import {Dispatch} from 'redux';

type MapStatePropsType = {
    users: UserType[]
}

type MapDispatchPropsType = {
    follow: (userId: string)=> void
    unfollow: (userId: string)=> void
    setUsers: (users: UserType[])=> void
}

export type UsersPropsType = MapStatePropsType & MapDispatchPropsType

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        users: state.usersPage.users
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
        }
    }
}

export const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users)
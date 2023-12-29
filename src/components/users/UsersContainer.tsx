import {connect} from 'react-redux';
import {AppStateType} from '../../redux/redux-store';
import {
    followActionCreator, setCurrentPageActionCreator,
    setUsersActionCreator, setUsersCountActionCreator,
    unfollowActionCreator, UserType
} from '../../redux/users-reducer';
import {Dispatch} from 'redux';
import React from 'react';
import axios from 'axios';
import {Users} from './Users';

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

export type UsersAPIPropsType = MapStatePropsType & MapDispatchPropsType

class UsersContainer extends React.Component<UsersAPIPropsType> {
    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.setUsers(response.data.items)
                this.props.setUsersCount(response.data.totalCount)
            })
    }
    onPageChanged = (currentPage: number) => {
        this.props.setCurrentPage(currentPage)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${currentPage}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.setUsers(response.data.items)
            })
    }
    render() {
        return <Users currentPage={this.props.currentPage}
                      onPageChanged={this.onPageChanged}
                      users={this.props.users}
                      follow={this.props.follow}
                      unfollow={this.props.unfollow}
        />
    }
}

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

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer)
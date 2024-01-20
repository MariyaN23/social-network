import {connect} from 'react-redux';
import {AppStateType} from '../../redux/redux-store';
import {
    followActionCreator as follow,
    setCurrentPageActionCreator as setCurrentPage,
    setIsFetchingActionCreator as setIsFetching,
    setUsersActionCreator as setUsers,
    setUsersCountActionCreator as setUsersCount,
    unfollowActionCreator as unfollow,
    UserType
} from '../../redux/users-reducer';
import React from 'react';
import axios from 'axios';
import {Users} from './Users';

type MapStatePropsType = {
    users: UserType[]
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
}

type MapDispatchPropsType = {
    follow: (userId: string)=> void
    unfollow: (userId: string)=> void
    setUsers: (users: UserType[])=> void
    setCurrentPage: (currentPage: number)=> void
    setUsersCount: (usersCount: number)=> void
    setIsFetching: (isFetching: boolean)=> void
}

export type UsersAPIPropsType = MapStatePropsType & MapDispatchPropsType

class UsersContainer extends React.Component<UsersAPIPropsType> {
    componentDidMount() {
        this.props.setIsFetching(true)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.setUsers(response.data.items)
                this.props.setUsersCount(response.data.totalCount)
                this.props.setIsFetching(false)
            })
    }
    onPageChanged = (currentPage: number) => {
        this.props.setIsFetching(true)
        this.props.setCurrentPage(currentPage)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${currentPage}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.setUsers(response.data.items)
                this.props.setIsFetching(false)
            })
    }
    render() {
        return <>
            <Users currentPage={this.props.currentPage}
                   onPageChanged={this.onPageChanged}
                   users={this.props.users}
                   follow={this.props.follow}
                   unfollow={this.props.unfollow}
                   isFetching={this.props.isFetching}
            />
        </>
    }
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching
    }
}

export default connect(mapStateToProps,  {
    follow,
    unfollow,
    setUsers,
    setCurrentPage,
    setUsersCount,
    setIsFetching})(UsersContainer)
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
import {Users} from './Users';
import {api} from '../../api/api';

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
        api.getUsers(this.props.currentPage, this.props.pageSize)
            .then(data => {
                this.props.setUsers(data.items)
                this.props.setUsersCount(data.totalCount)
                this.props.setIsFetching(false)
            })
    }
    onFollowClick = (userId: string)=> {
        api.follow(userId)
            .then((data)=> {
                if (data.resultCode === 0) {
                    this.props.follow(userId)
                }
            })
    }
    onUnfollowClick = (userId: string)=> {
        api.unfollow(userId)
            .then((data)=> {
                if (data.resultCode === 0){
                    this.props.unfollow(userId)
                }
            })
    }
    onPageChanged = (currentPage: number) => {
        this.props.setIsFetching(true)
        this.props.setCurrentPage(currentPage)
        api.getUsers(currentPage, this.props.pageSize)
            .then(data => {
                this.props.setUsers(data.items)
                this.props.setIsFetching(false)
            })
    }
    render() {
        return <>
            <Users currentPage={this.props.currentPage}
                   onPageChanged={this.onPageChanged}
                   users={this.props.users}
                   isFetching={this.props.isFetching}
                   onFollowClick={this.onFollowClick}
                   onUnfollowClick={this.onUnfollowClick}
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
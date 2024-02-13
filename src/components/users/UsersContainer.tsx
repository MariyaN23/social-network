import {connect} from 'react-redux';
import {AppStateType} from '../../redux/redux-store';
import {
    followActionCreator as follow,
    setCurrentPageActionCreator as setCurrentPage,
    setIsFetchingActionCreator as setIsFetching,
    setUsersActionCreator as setUsers,
    setUsersCountActionCreator as setUsersCount,
    unfollowActionCreator as unfollow,
    setFollowingInProgressActionCreator as setFollowingInProgress,
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
    followingInProgress: string[]
}

type MapDispatchPropsType = {
    follow: (userId: string)=> void
    unfollow: (userId: string)=> void
    setUsers: (users: UserType[])=> void
    setCurrentPage: (currentPage: number)=> void
    setUsersCount: (usersCount: number)=> void
    setIsFetching: (isFetching: boolean)=> void
    setFollowingInProgress: (isFetching: boolean, userId: string)=> void
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
        this.props.setFollowingInProgress(true, userId)
        api.follow(userId)
            .then((data)=> {
                if (data.resultCode === 0) {
                    this.props.follow(userId)
                }
                this.props.setFollowingInProgress(false, userId)
            })
    }
    onUnfollowClick = (userId: string)=> {
        this.props.setFollowingInProgress(true, userId)
        api.unfollow(userId)
            .then((data)=> {
                if (data.resultCode === 0){
                    this.props.unfollow(userId)
                }
                this.props.setFollowingInProgress(false, userId)
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
                   followingInProgress={this.props.followingInProgress}
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
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress,
    }
}

export default connect(mapStateToProps,  {
    follow,
    unfollow,
    setUsers,
    setCurrentPage,
    setUsersCount,
    setIsFetching,
    setFollowingInProgress
})(UsersContainer)
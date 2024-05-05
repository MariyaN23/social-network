import {connect} from 'react-redux';
import {AppStateType} from '../../redux/redux-store';
import {
    FilterType,
    followUnfollowThunkCreator,
    getUsersThunkCreator,
    setCurrentPageActionCreator as setCurrentPage,
    UserType
} from '../../redux/users-reducer';
import React from 'react';
import {Users} from './Users';
import {withAuthRedirectComponent} from '../../hoc/withAuthRedirectComponent';
import {compose} from 'redux';
import {
    getCurrentPage, getFilter,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount,
    getUsers
} from '../../redux/users-selectors';

type MapStatePropsType = {
    users: UserType[]
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: string[]
    filter: FilterType
}

type MapDispatchPropsType = {
    setCurrentPage: (currentPage: number)=> void
    getUsersThunkCreator: (currentPage: number, pageSize: number, filter: FilterType)=> void
    followUnfollowThunkCreator: (userId: string, follow: boolean)=> void
}

export type UsersAPIPropsType = MapStatePropsType & MapDispatchPropsType

class UsersContainer extends React.Component<UsersAPIPropsType> {
    componentDidMount() {
        this.props.getUsersThunkCreator(this.props.currentPage, this.props.pageSize, this.props.filter)
    }
    onFollowClick = (userId: string)=> {
        this.props.followUnfollowThunkCreator(userId, true)
    }
    onUnfollowClick = (userId: string)=> {
        this.props.followUnfollowThunkCreator(userId, false)
    }
    onPageChanged = (currentPage: number) => {
        this.props.setCurrentPage(currentPage)
        this.props.getUsersThunkCreator(currentPage, this.props.pageSize, this.props.filter)
    }
    onFilterChanged =(filter: FilterType)=> {
        this.props.getUsersThunkCreator(1, this.props.pageSize, filter)
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
                   onFilterChanged={this.onFilterChanged}
                   totalUsersCount={this.props.totalUsersCount}
            />
        </>
    }
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
        filter: getFilter(state)
    }
}

export default compose<React.ComponentType>(
    connect(mapStateToProps,  {
        setCurrentPage,
        getUsersThunkCreator,
        followUnfollowThunkCreator
    }),
    withAuthRedirectComponent
)(UsersContainer)
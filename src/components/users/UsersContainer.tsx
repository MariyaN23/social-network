import {connect} from 'react-redux';
import {AppStateType} from '../../redux/redux-store';
import {
    FilterType,
    followThunkCreator,
    getUsersThunkCreator,
    setCurrentPageActionCreator as setCurrentPage,
    UserType
} from '../../redux/users-reducer';
import React from 'react';
import {Users} from './Users';
import {withAuthRedirectComponent} from '../../hoc/withAuthRedirectComponent';
import {compose} from 'redux';

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
    followThunkCreator: (userId: string, follow: boolean)=> void
}

export type UsersAPIPropsType = MapStatePropsType & MapDispatchPropsType

class UsersContainer extends React.Component<UsersAPIPropsType> {
    componentDidMount() {
        this.props.getUsersThunkCreator(this.props.currentPage, this.props.pageSize, this.props.filter)
    }
    onFollowClick = (userId: string)=> {
        this.props.followThunkCreator(userId, true)
    }
    onUnfollowClick = (userId: string)=> {
        this.props.followThunkCreator(userId, false)
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
        filter: state.usersPage.filter
    }
}

export default compose<React.ComponentType>(
    connect(mapStateToProps,  {
        setCurrentPage,
        getUsersThunkCreator,
        followThunkCreator
    }),
    withAuthRedirectComponent
)(UsersContainer)
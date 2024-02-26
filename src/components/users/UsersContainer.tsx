import {connect} from 'react-redux';
import {AppStateType} from '../../redux/redux-store';
import {
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
}

type MapDispatchPropsType = {
    setCurrentPage: (currentPage: number)=> void
    getUsersThunkCreator: (currentPage: number, pageSize: number)=> void
    followThunkCreator: (userId: string, follow: boolean)=> void
}

export type UsersAPIPropsType = MapStatePropsType & MapDispatchPropsType

class UsersContainer extends React.Component<UsersAPIPropsType> {
    componentDidMount() {
        this.props.getUsersThunkCreator(this.props.currentPage, this.props.pageSize)
    }
    onFollowClick = (userId: string)=> {
        this.props.followThunkCreator(userId, true)
    }
    onUnfollowClick = (userId: string)=> {
        this.props.followThunkCreator(userId, false)
    }
    onPageChanged = (currentPage: number) => {
        this.props.setCurrentPage(currentPage)
        this.props.getUsersThunkCreator(currentPage, this.props.pageSize)
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

export default compose<React.ComponentType>(
    connect(mapStateToProps,  {
        setCurrentPage,
        getUsersThunkCreator,
        followThunkCreator
    }),
    withAuthRedirectComponent
)(UsersContainer)

/*
export default withAuthRedirectComponent(connect(mapStateToProps,  {
    setCurrentPage,
    getUsersThunkCreator,
    followThunkCreator
})(UsersContainer))*/

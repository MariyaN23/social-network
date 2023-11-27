import {connect} from 'react-redux';
import {RootStatePropsType} from '../../redux/redux-store';
import {
    followActionCreator,
    setUsersActionCreator,
    unfollowActionCreator,
    UsersPropsType
} from '../../redux/users-reducer';
import {Users} from './Users';

const mapStateToProps = (state: RootStatePropsType)=> {
    return {
        users: state.usersPage.users
    }
}

const mapDispatchToProps = (dispatch: any)=> {
    return {
        follow: (userId: string) => {
            dispatch(followActionCreator(userId))
        },
        unfollow: (userId: string) => {
            dispatch(unfollowActionCreator(userId))
        },
        setUsers: (users: UsersPropsType)=> {
            dispatch(setUsersActionCreator(users))
        }
    }
}

export const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users)
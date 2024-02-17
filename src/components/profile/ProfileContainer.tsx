import React from 'react';
import {Profile} from './Profile';
import {connect} from 'react-redux';
import {AppStateType} from '../../redux/redux-store';
import {
    addPostActionCreator as addPost,
    changeNewPostTextActionCreator as changeNewPostText,
    getUsersProfileThunkCreator,
    ProfileType
} from '../../redux/profile-reducer';
import {withRouter, WithRouterProps} from './withRouter';
import {Navigate} from 'react-router-dom';


type MapStatePropsType = {
    profile: ProfileType | null
    isAuth: boolean
}

type MapDispatchPropsType = {
    addPost: ()=> void
    changeNewPostText: (text: string)=> void
    getUsersProfileThunkCreator: (userId: string)=> void
}

export type ProfileAPIPropsType = MapStatePropsType & MapDispatchPropsType & WithRouterProps

class ProfileContainer extends React.Component<ProfileAPIPropsType> {
    componentDidMount() {
        let userId = this.props.params.userId
        if (!userId) {
            userId = '30289'
        }
        this.props.getUsersProfileThunkCreator(userId)
    }
    render() {
        if (!this.props.isAuth) return <Navigate to={'/login'} replace={true}/>
        return <>
            <Profile {...this.props} />
        </>
    }
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        profile: state.profilePage.profile,
        isAuth: state.auth.isAuth
    }
}

export default connect(mapStateToProps, {
    addPost,
    changeNewPostText,
    getUsersProfileThunkCreator
})(withRouter(ProfileContainer))
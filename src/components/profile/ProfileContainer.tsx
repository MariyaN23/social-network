import React from 'react';
import {Profile} from './Profile';
import {connect} from 'react-redux';
import {AppStateType} from '../../redux/redux-store';
import {
    addPostActionCreator as addPost, fetchPostsThunkCreator,
    getUsersProfileThunkCreator,
    getUsersStatusThunkCreator,
    ProfileType,
    savePhotoThunkCreator,
    saveProfileThunkCreator,
    updateUsersStatusThunkCreator
} from '../../redux/profile-reducer';
import {withRouter, WithRouterProps} from './withRouter';
import {withAuthRedirectComponent} from '../../hoc/withAuthRedirectComponent';
import {compose} from 'redux';
import {ProfileFormType} from './profileInfo/profileData/ProfileDataForm';

type MapStatePropsType = {
    profile: ProfileType | null
    status: string
    authId: string | null
}

type MapDispatchPropsType = {
    addPost: ()=> void
    changeNewPostText: (text: string)=> void
    getUsersProfileThunkCreator: (userId: string)=> void
    getUsersStatusThunkCreator: (userId: string)=> void
    updateUsersStatusThunkCreator: (status: string)=> void
    savePhotoThunkCreator: (image: any)=> void
    saveProfileThunkCreator: (profileData: ProfileFormType)=> void
    fetchPostsThunkCreator: ()=> void
}

export type ProfileAPIPropsType = MapStatePropsType & MapDispatchPropsType & WithRouterProps

class ProfileContainer extends React.Component<ProfileAPIPropsType> {
    componentDidMount() {
        let userId = this.props.params.userId
        this.props.getUsersProfileThunkCreator(userId)
        this.props.getUsersStatusThunkCreator(userId)
        this.props.fetchPostsThunkCreator()
    }
    render() {
        return <>
            <Profile {...this.props} />
        </>
    }
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        authId: state.auth.data.id,
    }
}

export default compose<React.ComponentType>(
    connect(mapStateToProps, {
        addPost,
        getUsersProfileThunkCreator,
        getUsersStatusThunkCreator,
        updateUsersStatusThunkCreator,
        savePhotoThunkCreator,
        saveProfileThunkCreator,
        fetchPostsThunkCreator
    }),
    withRouter,
    withAuthRedirectComponent
)(ProfileContainer)
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


type MapStatePropsType = {
    profile: ProfileType | null
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
        return <>
            <Profile {...this.props} profile={this.props.profile}/>
        </>
    }
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        profile: state.profilePage.profile
    }
}

export default connect(mapStateToProps, {
    addPost,
    changeNewPostText,
    getUsersProfileThunkCreator
})(withRouter(ProfileContainer))
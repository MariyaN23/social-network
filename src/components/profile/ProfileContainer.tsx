import React from 'react';
import {Profile} from './Profile';
import axios from 'axios';
import {connect} from 'react-redux';
import {AppStateType} from '../../redux/redux-store';
import {
    addPostActionCreator as addPost,
    changeNewPostTextActionCreator as changeNewPostText,
    ProfileType,
    setUsersProfileActionCreator as setUsersProfile
} from '../../redux/profile-reducer';
import {withRouter} from './withRouter';


type MapStatePropsType = {
    profile: ProfileType | null
    router?: any
}

type MapDispatchPropsType = {
    setUsersProfile: (profile: ProfileType | null)=> void
    addPost: ()=> void
    changeNewPostText: (text: string)=> void
}

export type ProfileAPIPropsType = MapStatePropsType & MapDispatchPropsType

class ProfileContainer extends React.Component<ProfileAPIPropsType> {
    componentDidMount() {
        let userId = this.props.router.params.userId
        if (!userId) {
            userId = 30289
        }
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${userId}`)
            .then(response => {
                this.props.setUsersProfile(response.data)
            })
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
    setUsersProfile
})(withRouter(ProfileContainer))
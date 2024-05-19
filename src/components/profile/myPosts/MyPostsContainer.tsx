import {addPostActionCreator, PostPropsType} from '../../../redux/profile-reducer';
import {AppStateType} from '../../../redux/redux-store';
import {connect} from 'react-redux';
import {MyPosts} from './MyPosts';
import {Dispatch} from 'redux';

type MapStatePropsType = {
    posts: PostPropsType[]
    photo: string | undefined
    owner: boolean
    userName: string | undefined
}

type MapDispatchPropsType = {
    addPost: (post: string)=> void
}

export type MyPostsPropsType = MapStatePropsType & MapDispatchPropsType

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        posts: state.profilePage.posts,
        photo: state.profilePage.profile?.photos.small,
        owner: state.profilePage.profile?.userId === state.auth.data.id,
        userName: state.profilePage.profile?.fullName,
    }
}

const mapDispatchToProps = (dispatch: Dispatch): MapDispatchPropsType => {
    return {
        addPost: (post: string)=> {
            dispatch(addPostActionCreator(post))
        }
    }
}

export const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)
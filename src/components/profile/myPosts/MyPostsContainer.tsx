import {
    addPostActionCreator,
    deletePostActionCreator,
    likeActionCreator, PostType
} from '../../../redux/profile-reducer';
import {AppStateType} from '../../../redux/redux-store';
import {connect} from 'react-redux';
import {MyPosts} from './MyPosts';
import {Dispatch} from 'redux';
import {AuthorApiType} from '../../../api/api';

type MapStatePropsType = {
    photo: string | undefined
    owner: boolean
    userName: string | undefined
    allIds: string[]
    postById: {[key: string]: PostType}
    authorById: {[key: string]: AuthorApiType}
}

type MapDispatchPropsType = {
    addPost: (post: string)=> void
    deletePost: (id: string)=> void
    likePost: (id: string)=> void
}

export type MyPostsPropsType = MapStatePropsType & MapDispatchPropsType

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        allIds: state.profilePage.allIds,
        postById: state.profilePage.byId,
        authorById: state.authors.byId,
        photo: state.profilePage.profile?.photos.small,
        owner: state.profilePage.profile?.userId === state.auth.data.id,
        userName: state.profilePage.profile?.fullName,
    }
}

const mapDispatchToProps = (dispatch: Dispatch): MapDispatchPropsType => {
    return {
        addPost: (post: string)=> {
            dispatch(addPostActionCreator(post, {id: "1", name: "MariyaN23"}))
        },
        deletePost: (id: string)=> {
            dispatch(deletePostActionCreator(id))
        },
        likePost: (id: string)=> {
            dispatch(likeActionCreator(id))
        }
    }
}

export const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)
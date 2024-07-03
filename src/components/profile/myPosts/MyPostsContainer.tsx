import {
    addPostActionCreator,
    deletePostActionCreator,
    likeActionCreator,
    PostType
} from '../../../redux/profile-reducer';
import {ActionType, AppStateType} from '../../../redux/redux-store';
import {connect} from 'react-redux';
import {MyPosts} from './MyPosts';
import {AuthorApiType} from '../../../api/api';
import {CommentType, deleteCommentThunkCreator, fetchCommentsThunkCreator} from '../../../redux/comments-reducer';
import {ThunkDispatch} from 'redux-thunk';

type MapStatePropsType = {
    photo: string | undefined
    owner: boolean
    userName: string | undefined
    allIds: string[]
    postById: { [key: string]: PostType }
    authorById: { [key: string]: AuthorApiType }
    commentsById: { [key: string]: CommentType }
}

type MapDispatchPropsType = {
    addPost: (post: string) => void
    deletePost: (id: string) => void
    likePost: (id: string) => void
    fetchCommentsThunkCreator: (postId: string) => void;
    deleteCommentThunkCreator: (postId: string, commentId: string) => void;
}

export type MyPostsPropsType = MapStatePropsType & MapDispatchAndThunk


type MapDispatchAndThunk = MapDispatchPropsType & {fetchCommentsThunkCreator: (postId: string) => void}

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        allIds: state.profilePage.allIds,
        postById: state.profilePage.byId,
        authorById: state.authors.byId,
        commentsById: state.comments.byId,
        photo: state.profilePage.profile?.photos.small,
        owner: state.profilePage.profile?.userId === state.auth.data.id,
        userName: state.profilePage.profile?.fullName,
    }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<AppStateType, unknown, ActionType>): MapDispatchPropsType => {
    return {
        addPost: (post: string) => {
            dispatch(addPostActionCreator(post, {id: '1', name: 'MariyaN23'}))
        },
        deletePost: (id: string) => {
            dispatch(deletePostActionCreator(id))
        },
        likePost: (id: string) => {
            dispatch(likeActionCreator(id))
        },
        fetchCommentsThunkCreator: (postId: string) => {
            dispatch(fetchCommentsThunkCreator(postId))
        },
        deleteCommentThunkCreator: (postId: string, commentId: string)=> {
            dispatch(deleteCommentThunkCreator(postId, commentId))
        }
    }
}

export const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)
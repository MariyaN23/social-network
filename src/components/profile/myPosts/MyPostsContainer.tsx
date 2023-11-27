import {addPostActionCreator, changeNewPostTextActionCreator, PostPropsType} from '../../../redux/profile-reducer';
import {ActionType, AppStateType} from '../../../redux/redux-store';
import {connect} from 'react-redux';
import {MyPosts} from './MyPosts';
import {Dispatch} from 'redux';

type MapStatePropsType = {
    posts: PostPropsType[]
    newPostText: string
}

type MapDispatchPropsType = {
    addPost: ()=> void
    updateNewPostText: (text: string)=> void
}

export type MyPostsPropsType = MapStatePropsType & MapDispatchPropsType

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText
    }
}

const mapDispatchToProps = (dispatch: Dispatch): MapDispatchPropsType => {
    return {
        addPost: ()=> {
            dispatch(addPostActionCreator())
        },
        updateNewPostText: (text: string)=> {
            const action: ActionType = changeNewPostTextActionCreator(text)
            dispatch(action)
        }
    }
}

export const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)
import {addPostActionCreator, changeNewPostTextActionCreator} from '../../../redux/profile-reducer';
import {ActionType, RootStatePropsType} from '../../../redux/redux-store';
import {connect} from 'react-redux';
import {MyPosts} from './MyPosts';

const mapStateToProps = (state: RootStatePropsType)=> {
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText
    }
}

const mapDispatchToProps = (dispatch: any)=> {
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
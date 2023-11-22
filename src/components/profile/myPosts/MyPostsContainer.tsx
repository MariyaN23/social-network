import React from 'react';
import {ActionType} from '../../../redux/store';
import {addPostActionCreator, changeNewPostTextActionCreator} from '../../../redux/profile-reducer';
import {MyPosts} from './MyPosts';
import {StoreType} from '../../../redux/redux-store';

type MyPostsPropsType = {
    store: StoreType
}

export const MyPostsContainer = (props: MyPostsPropsType) => {
    const state = props.store.getState().profilePage

    const addPost =()=> {
        props.store.dispatch(addPostActionCreator())
    }

    const changeNewPostTextHandler = (text: string)=> {
        const action: ActionType = changeNewPostTextActionCreator(text)
        props.store.dispatch(action)
    }

    return (
        <MyPosts addPost={addPost}
                 updateNewPostText={changeNewPostTextHandler}
                 posts={state.posts}
                 newPostText={state.newPostText}/>
    );
};
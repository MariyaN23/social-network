import React from 'react';
import {ActionType, PostPropsType} from '../../../redux/store';
import {addPostActionCreator, changeNewPostTextActionCreator} from '../../../redux/profile-reducer';
import {MyPosts} from './MyPosts';

type MyPostsPropsType = {
    posts: PostPropsType[]
    newPostText: string
    dispatch: (action: ActionType) => void
}

export const MyPostsContainer = (props: MyPostsPropsType) => {
    const addPost =()=> {
        props.dispatch(addPostActionCreator())
    }

    const changeNewPostTextHandler = (text: string)=> {
        const action: ActionType = changeNewPostTextActionCreator(text)
        props.dispatch(action)
    }

    return (
        <MyPosts addPost={addPost} updateNewPostText = {changeNewPostTextHandler} posts={props.posts} newPostText={props.newPostText}/>
    );
};
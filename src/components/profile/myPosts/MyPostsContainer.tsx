import React from 'react';
import {ActionType} from '../../../redux/store';
import {addPostActionCreator, changeNewPostTextActionCreator} from '../../../redux/profile-reducer';
import {MyPosts} from './MyPosts';
import {StoreContext} from '../../../StoreContext';



export const MyPostsContainer = () => {
    return (
        <StoreContext.Consumer>
            {(store) => {
                const state = store.getState().profilePage

                const addPost = () => {
                    store.dispatch(addPostActionCreator())
                }

                const changeNewPostTextHandler = (text: string) => {
                    const action: ActionType = changeNewPostTextActionCreator(text)
                    store.dispatch(action)
                }
                return <MyPosts addPost={addPost}
                                updateNewPostText={changeNewPostTextHandler}
                                posts={state.posts}
                                newPostText={state.newPostText}/>
            }
        }
        </StoreContext.Consumer>
    );
};
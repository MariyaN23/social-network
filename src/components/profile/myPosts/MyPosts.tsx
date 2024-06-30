import React from 'react';
import s from './MyPosts.module.css'
import {Post} from './post/Post';
import {MyPostsPropsType} from './MyPostsContainer';
import {PostForm} from './PostForm';

export const MyPosts = React.memo((props: MyPostsPropsType) => {
    const postsElements =
        props.allIds.map(p => <Post key={p}
                                   photo={props.photo}
                                   post={props.byId[p]}
                                   deletePost={props.deletePost}
                                   likePost={props.likePost}
        />)
    return (
        props.owner ?
            <div className={s.postsBlock}>
                <h3>My Posts</h3>
                <PostForm sendPost={props.addPost}/>
                <div>
                    {postsElements}
                </div>
            </div> :
            null
    );
})
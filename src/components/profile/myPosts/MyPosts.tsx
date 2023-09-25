import React from 'react';
import s from './MyPosts.module.css'
import {Post} from './post/Post';
import {PostPropsType} from '../../../App';

type MyPostsPropsType = {
    posts: PostPropsType[]
}

export const MyPosts = (props: MyPostsPropsType) => {
    const postsElements =
    props.posts.map(p=> <Post key={p.id} message={p.message} likeCounts={p.likeCounts}/>)

    return (
        <div className={s.postsBlock}>
            <h3>My Posts</h3>
            <div>
                <div className={s.textarea}><textarea placeholder={'Your news...'}></textarea></div>
                <div className={s.button}><button>Add post</button></div>
            </div>
            <div>
                {postsElements}
            </div>
        </div>
    );
};
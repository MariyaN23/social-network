import React from 'react';
import s from './MyPosts.module.css'
import {Post} from './post/Post';

export const MyPosts = () => {
    const posts = [
        {id: 1, message: 'Hi, how are you?', likeCounts: 15},
        {id: 2, message: 'It\'s my first post', likeCounts: 20},
    ]

    const postsElements =
    posts.map(p=> <Post message={p.message} likeCounts={p.likeCounts}/>)

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
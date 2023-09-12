import React from 'react';
import s from './MyPosts.module.css'
import {Post} from './post/Post';

export const MyPosts = () => {
    return (
        <div className={s.postsBlock}>
            <h3>My Posts</h3>
            <div>
                <div><textarea></textarea></div>
                <div><button>Add post</button></div>
            </div>
            <div>
                <Post likeCounts={15} message={'Hi, how are you?'}/>
                <Post likeCounts={20} message={'It\'s my first post'}/>
            </div>
        </div>
    );
};
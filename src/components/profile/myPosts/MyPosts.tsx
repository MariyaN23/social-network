import React from 'react';
import s from './MyPosts.module.css'
import {Post} from './post/Post';
import {PostPropsType} from '../../../redux/state';

type MyPostsPropsType = {
    posts: PostPropsType[]
    addPost: (postMessage: string) => void
}

export const MyPosts = (props: MyPostsPropsType) => {
    const postsElements =
    props.posts.map(p=> <Post key={p.id} message={p.message} likeCounts={p.likeCounts}/>)

    const newPostElement = React.createRef<HTMLTextAreaElement>()

    const addPost =()=> {
        if (newPostElement.current) {
            props.addPost(newPostElement.current.value)
        }
    }

    return (
        <div className={s.postsBlock}>
            <h3>My Posts</h3>
            <div>
                <div className={s.textarea}><textarea placeholder={'Your news...'} ref={newPostElement}></textarea></div>
                <div className={s.button}>
                    <button onClick={addPost}>Add post</button>
                </div>
            </div>
            <div>
                {postsElements}
            </div>
        </div>
    );
};
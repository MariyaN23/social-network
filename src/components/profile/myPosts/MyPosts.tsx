import React, {ChangeEvent} from 'react';
import s from './MyPosts.module.css'
import {Post} from './post/Post';
import {MyPostsPropsType} from './MyPostsContainer';

export const MyPosts = (props: MyPostsPropsType) => {
    const postsElements =
    props.posts.map(p=> <Post key={p.id} message={p.message} likeCounts={p.likeCounts}/>)

    const newPostElement = React.createRef<HTMLTextAreaElement>()

    const addPostHandler =()=> {
        props.addPost()
    }

    const changeNewPostTextHandler = (e: ChangeEvent<HTMLTextAreaElement>)=> {
        props.updateNewPostText(e.currentTarget.value)
    }

    return (
        <div className={s.postsBlock}>
            <h3>My Posts</h3>
            <div>
                <div className={s.textarea}>
                    <textarea value={props.newPostText}
                              onChange={changeNewPostTextHandler}
                              placeholder={'Your news...'} ref={newPostElement} />
                </div>
                <div className={s.buttonPost}>
                    <button onClick={addPostHandler}>Add post</button>
                </div>
            </div>
            <div>
                {postsElements}
            </div>
        </div>
    );
};
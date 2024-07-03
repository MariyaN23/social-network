import React from 'react';
import s from './Post.module.css';
import photo from '../../../../assets/images/noavatar.jpg'
import {Icon} from '../../../../assets/images/Icon';
import {PostType} from '../../../../redux/profile-reducer';
import {AuthorApiType} from '../../../../api/api';
import {Comment} from './Comment';
import {CommentType} from '../../../../redux/comments-reducer';

type PostPropsType = {
    photo: string | undefined
    post: PostType
    author: AuthorApiType
    deletePost: (id: string) => void
    likePost: (id: string) => void
    commentsById: { [key: string]: CommentType }
    authorById: { [key: string]: AuthorApiType }
    fetchComments: (postId: string) => void
    deleteComment: (postId: string, commentId: string) => void
}

export const Post = React.memo((props: PostPropsType) => {
    return (
        <div className={s.item}>
            <div className={s.optionsBtn}>
                <button onClick={() => props.deletePost(props.post.id)}><Icon iconId={'delete'} height={'50'}
                                                                              width={'50'}/></button>
            </div>
            <div>
                <img src={props.photo ? props.photo : photo} alt={'avatar'}/>
                <span><b>{props.author.name}</b></span>
            </div>
            <div className={s.postText}>{props.post.message}</div>
            <div className={s.btn}>
                <button onClick={() => props.likePost(props.post.id)}>❤️ {props.post.likeCounts} </button>
            </div>
            <div>
                <ul>
                    {props.post.commentIds.map(id => <Comment key={id}
                                                              commentAuthor={props.authorById[props.commentsById[id].authorId].name}
                                                              commentMessage={props.commentsById[id].message}
                                                              postId={props.post.id}
                                                              commentId={id}
                                                              deleteComment={props.deleteComment}
                    />)}
                </ul>
            </div>
            <button onClick={()=>props.fetchComments(props.post.id)}>All comments</button>
        </div>
    );
});
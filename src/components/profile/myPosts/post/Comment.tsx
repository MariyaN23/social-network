import React from 'react';
import s from './Post.module.css';

type CommentPropsType = {
    commentMessage: string
    commentAuthor: string
    postId: string
    commentId: string
    deleteComment: (postId: string, commentId: string) => void
}

export const Comment = (props: CommentPropsType) => {
    return (
        <div>
            <div>
                <b>
                    {props.commentAuthor}
                </b>
            </div>
            {props.commentMessage}
            <button className={s.deleteCommentBtn}
                    onClick={() => props.deleteComment(props.postId, props.commentId)}>
                ✖
            </button>
        </div>
    );
};
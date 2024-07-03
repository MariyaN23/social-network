import React from 'react';

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
            <div>{props.commentAuthor}</div>
            {props.commentMessage}
            <button onClick={()=>props.deleteComment(props.postId, props.commentId)}>Delete</button>
        </div>
    );
};
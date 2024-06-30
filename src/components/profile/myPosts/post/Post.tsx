import React from 'react';
import s from './Post.module.css';
import photo from '../../../../assets/images/noavatar.jpg'
import {Icon} from '../../../../assets/images/Icon';
import {PostType} from '../../../../redux/profile-reducer';
import {AuthorApiType} from '../../../../api/api';

type PostPropsType = {
    photo: string | undefined
    post: PostType
    author: AuthorApiType
    deletePost: (id: string)=>void
    likePost: (id: string)=>void
}

export const Post = React.memo((props: PostPropsType)=> {
    return (
        <div className={s.item}>
            <div className={s.optionsBtn}>
                <button onClick={()=>props.deletePost(props.post.id)}><Icon iconId={'delete'} height={'50'} width={'50'}/></button>
            </div>
            <div>
                <img src={props.photo ? props.photo : photo} alt={'avatar'}/>
                <span><b>{props.author.name}</b></span>
            </div>
            <div className={s.postText}>{props.post.message}</div>
            <div className={s.btn}>
                <button onClick={() => props.likePost(props.post.id)}>❤️ {props.post.likeCounts} </button>
            </div>
        </div>
    );
});
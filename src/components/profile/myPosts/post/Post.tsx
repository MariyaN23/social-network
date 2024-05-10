import React from 'react';
import s from './Post.module.css';
import avatar from '../../../../assets/images/noavatar.jpg'

type PostPropsType = {
    message: string
    likeCounts: number
}

export const Post = (props: PostPropsType) => {
    return (
        <div className={s.item}>
            <img src={avatar} alt={'avatar'}/>
            {props.message}
            <div className={s.btn}>
                <button>❤️ {props.likeCounts} </button>
            </div>
        </div>
    );
};
import React, {useState} from 'react';
import s from './Post.module.css';
import photo from '../../../../assets/images/noavatar.jpg'
import {Icon} from '../../../../assets/images/Icon';

type PostPropsType = {
    message: string
    photo: string | undefined
    owner: boolean
    userName: string | undefined
}

export const Post = (props: PostPropsType) => {
    const [likes, setLikes] = useState(0)
    return (
        <div className={s.item}>
            <div className={s.optionsBtn}>
                <button><Icon iconId={'options'} height={'50'} width={'50'}/></button>
            </div>
            <div>
                <img src={props.photo ? props.photo : photo} alt={'avatar'}/>
                <span><b>{props.userName}</b></span>
            </div>
            <div className={s.postText}>{props.message}</div>
            <div className={s.btn}>
                <button onClick={() => setLikes(likes + 1)}>❤️ {likes} </button>
            </div>
        </div>
    );
};
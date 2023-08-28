import React from 'react';
import s from './Post.module.css';

type PostPropsType = {
    message: string
    likeCounts: number
}

export const Post = (props: PostPropsType) => {
    return (
        <div className={s.item}>
            <img src={'https://store.playstation.com/store/api/chihiro/00_09_000/container/TR/en/19/EP3351-CUSA08250_00-AV00000000000148/image?w=320&h=320&bg_color=000000&opacity=100&_version=00_09_000'}/>
            {props.message}
            <div>
                <button>Like</button>{props.likeCounts}
            </div>
        </div>
    );
};
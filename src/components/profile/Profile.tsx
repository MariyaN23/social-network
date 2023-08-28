import React from 'react';
import s from './Profile.module.css';
import {MyPosts} from './myPosts/MyPosts';

export const Profile = () => {
    return (
        <div className={s.content}>
            <div>
                <img src={'https://media.cnn.com/api/v1/images/stellar/prod/200924183413-dubai-9-1.jpg?q=x_0,y_0,h_900,w_1599,c_fill/h_720,w_1280'}/>
            </div>
            <div>
                ava + description
            </div>
            <MyPosts/>
        </div>
    );
};
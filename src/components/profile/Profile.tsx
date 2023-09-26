import React from 'react';
import s from './Profile.module.css';
import {MyPosts} from './myPosts/MyPosts';
import {ProfileInfo} from './myPosts/profileInfo/ProfileInfo';
import {profilePagePropsType} from '../../redux/state';

export const Profile = (props: profilePagePropsType) => {
    return (
        <div className={s.content}>
            <ProfileInfo/>
            <MyPosts posts={props.posts}/>
        </div>
    );
};
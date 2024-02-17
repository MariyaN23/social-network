import React from 'react';
import s from './Profile.module.css';
import {ProfileInfo} from './myPosts/profileInfo/ProfileInfo';
import {MyPostsContainer} from './myPosts/MyPostsContainer';
import {ProfileAPIPropsType} from './ProfileContainer';

export const Profile = (props: ProfileAPIPropsType) => {
    return (
        <div className={s.content}>
            <ProfileInfo profile={props.profile}/>
            <MyPostsContainer />
        </div>
    );
};
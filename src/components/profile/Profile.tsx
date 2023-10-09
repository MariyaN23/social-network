import React from 'react';
import s from './Profile.module.css';
import {MyPosts} from './myPosts/MyPosts';
import {ProfileInfo} from './myPosts/profileInfo/ProfileInfo';
import {profilePagePropsType, StoreType} from '../../redux/state';

type ProfilePropsType = {
    profilePage: profilePagePropsType
    store: StoreType
}

export const Profile = (props: ProfilePropsType) => {
    return (
        <div className={s.content}>
            <ProfileInfo/>
            <MyPosts posts={props.profilePage.posts}
                     store={props.store}
                     newPostText={props.profilePage.newPostText}/>
        </div>
    );
};
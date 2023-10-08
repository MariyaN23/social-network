import React from 'react';
import s from './Profile.module.css';
import {MyPosts} from './myPosts/MyPosts';
import {ProfileInfo} from './myPosts/profileInfo/ProfileInfo';
import {profilePagePropsType} from '../../redux/state';

type ProfilePropsType = {
    profilePage: profilePagePropsType
    addPost: () => void
    changeNewPostText: (newPostText: string)=> void
}

export const Profile = (props: ProfilePropsType) => {
    return (
        <div className={s.content}>
            <ProfileInfo/>
            <MyPosts posts={props.profilePage.posts}
                     addPost={props.addPost}
                     changeNewPostText={props.changeNewPostText}
                     newPostText={props.profilePage.newPostText}/>
        </div>
    );
};
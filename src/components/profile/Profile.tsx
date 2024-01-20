import React from 'react';
import s from './Profile.module.css';
import {ProfileInfo} from './myPosts/profileInfo/ProfileInfo';
import {MyPostsContainer} from './myPosts/MyPostsContainer';
import {ProfileType} from '../../redux/profile-reducer';

type ProfilePropsType = {
    profile: ProfileType | null
    setUsersProfile: (profile: ProfileType)=> void
    addPost: ()=> void
    changeNewPostText: (text: string)=> void
}

export const Profile = (props: ProfilePropsType) => {
    return (
        <div className={s.content}>
            <ProfileInfo profile={props.profile}/>
            <MyPostsContainer />
        </div>
    );
};
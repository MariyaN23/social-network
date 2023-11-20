import React from 'react';
import s from './Profile.module.css';
import {ProfileInfo} from './myPosts/profileInfo/ProfileInfo';
import {ActionType, profilePagePropsType} from '../../redux/store';
import {MyPostsContainer} from './myPosts/MyPostsContainer';

type ProfilePropsType = {
    profilePage: profilePagePropsType
    dispatch: (action: ActionType) => void
}

export const Profile = (props: ProfilePropsType) => {
    return (
        <div className={s.content}>
            <ProfileInfo/>
            <MyPostsContainer posts={props.profilePage.posts}
                     newPostText={props.profilePage.newPostText}
                     dispatch={props.dispatch}
            />
        </div>
    );
};
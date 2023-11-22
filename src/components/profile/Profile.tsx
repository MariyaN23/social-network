import React from 'react';
import s from './Profile.module.css';
import {ProfileInfo} from './myPosts/profileInfo/ProfileInfo';
import {MyPostsContainer} from './myPosts/MyPostsContainer';
import {StoreType} from '../../redux/redux-store';

type ProfilePropsType = {
    store: StoreType
}

export const Profile = (props: ProfilePropsType) => {
    return (
        <div className={s.content}>
            <ProfileInfo/>
            <MyPostsContainer store={props.store}
            />
        </div>
    );
};
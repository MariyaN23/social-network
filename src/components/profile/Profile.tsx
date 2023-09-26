import React from 'react';
import s from './Profile.module.css';
import {MyPosts} from './myPosts/MyPosts';
import {ProfileInfo} from './myPosts/profileInfo/ProfileInfo';
import {PostPropsType} from '../../redux/state';

type ProfilePropsType = {
    posts: PostPropsType[]
    addPost: (postMessage: string) => void
}

export const Profile = (props: ProfilePropsType) => {
    return (
        <div className={s.content}>
            <ProfileInfo/>
            <MyPosts posts={props.posts} addPost={props.addPost}/>
        </div>
    );
};
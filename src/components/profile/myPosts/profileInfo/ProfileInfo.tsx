import React from 'react';
import s from './ProfileInfo.module.css'
import wallpaper from '../../../../assets/images/wallpaper.jpg'
import {ProfileType} from '../../../../redux/profile-reducer';
import {Preloader} from '../../../common/Preloader';

type ProfileInfoPropsType = {
    profile: ProfileType | null
}

export const ProfileInfo = (props: ProfileInfoPropsType) => {
    return (!props.profile) ? <Preloader/> :
        (<div className={s.info}>
            <div>
                <img src={wallpaper} alt={'Dubai'}/>
            </div>
            <div className={s.descriptionBlock}>
                <img src={props.profile?.photos.large} alt={'avatar'}/>
                <div>
                    <h2>{props.profile.fullName}</h2>
                    <p>{props.profile.aboutMe}</p>
                    <hr/>
                    <p>Looking for a job: {props.profile.lookingForAJob ? '✔' : '❌'}</p>
                    {props.profile.lookingForAJobDescription && <p>{props.profile.lookingForAJobDescription}</p>}
                    <h2>Contacts:</h2>
                    <h3>{props.profile.contacts.github}</h3>
                    <h3>{props.profile.contacts.vk}</h3>
                    <h3>{props.profile.contacts.facebook}</h3>
                    <h3>{props.profile.contacts.instagram}</h3>
                    <h3>{props.profile.contacts.twitter}</h3>
                    <h3>{props.profile.contacts.website}</h3>
                    <h3>{props.profile.contacts.youtube}</h3>
                    <h3>{props.profile.contacts.mainLink}</h3>
                </div>
            </div>
        </div>)
};
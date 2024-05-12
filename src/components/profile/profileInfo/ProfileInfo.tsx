import React, {ChangeEvent} from 'react';
import s from './ProfileInfo.module.css'
import {ProfileType} from '../../../redux/profile-reducer';
import {Preloader} from '../../common/Preloader';
import {ProfileStatusWithHooks} from '../profileStatus/ProfileStatusWithHooks';
import img from '../../../assets/images/noavatar.jpg'

type ProfileInfoPropsType = {
    profile: ProfileType | null
    status: string
    updateStatus: (status: string)=> void
    authId: string | null
    savePhoto: (image: any)=> void
}

export const ProfileInfo = (props: ProfileInfoPropsType) => {
    const onMainPhotoSelected =(e: ChangeEvent<HTMLInputElement>)=> {
        if (e.currentTarget.files?.length) {
            props.savePhoto(e.currentTarget.files[0])
        }
    }
    return (!props.profile) ? <Preloader/> :
        (<div className={s.info}>
            <div className={s.descriptionBlock}>
                <div className={s.changeAvatar}>
                    <img src={props.profile?.photos.large ? props.profile?.photos.large : img} alt={'avatar'}/>
                    {props.profile.userId === props.authId && <input type={'file'} onChange={onMainPhotoSelected}/>}
                </div>
                <div>
                    <h2>{props.profile.fullName}</h2>
                    <ProfileStatusWithHooks
                        status={props.status}
                        updateStatus={props.updateStatus}
                        profileId={props.profile.userId}
                        authId={props.authId}
                    />
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
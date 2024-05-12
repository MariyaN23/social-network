import React, {ChangeEvent, useState} from 'react';
import s from './ProfileInfo.module.css'
import {ProfileType} from '../../../redux/profile-reducer';
import {Preloader} from '../../common/Preloader';
import {ProfileStatusWithHooks} from '../profileStatus/ProfileStatusWithHooks';
import img from '../../../assets/images/noavatar.jpg'
import {ProfileData} from './profileData/ProfileData';
import {ProfileDataForm, ProfileFormType} from './profileData/ProfileDataForm';

type ProfileInfoPropsType = {
    profile: ProfileType | null
    status: string
    updateStatus: (status: string)=> void
    authId: string | null
    savePhoto: (image: any)=> void
    saveProfile: (profileData: ProfileFormType)=> void
}

export const ProfileInfo = (props: ProfileInfoPropsType) => {

    const [editMode, setEditMode] = useState(false)

    const onMainPhotoSelected =(e: ChangeEvent<HTMLInputElement>)=> {
        if (e.currentTarget.files?.length) {
            props.savePhoto(e.currentTarget.files[0])
        }
    }
    const goToEditMode =()=> {
        setEditMode(true)
    }
    const exitFromEditMode =(profileData: ProfileFormType)=> {
        props.saveProfile(profileData)
        setEditMode(false)
    }
    return (!props.profile) ? <Preloader/> :
        (<div className={s.info}>
            <div className={s.descriptionBlock}>
                <div className={s.changeAvatar}>
                    <img src={props.profile?.photos.large ? props.profile?.photos.large : img} alt={'avatar'}/>
                    {props.profile.userId === props.authId && <input type={'file'} accept=".jpg, .png" onChange={onMainPhotoSelected}/>}
                </div>
                <div>
                    <h2>{props.profile.fullName}</h2>
                    <ProfileStatusWithHooks
                        status={props.status}
                        updateStatus={props.updateStatus}
                        owner={props.profile.userId === props.authId}
                    />
                    <p>{props.profile.aboutMe}</p>
                    <hr/>
                    {editMode ? <ProfileDataForm
                            exitFromEditMode={exitFromEditMode}
                            profile={props.profile}
                        />
                        : <ProfileData
                        profile={props.profile}
                        owner={props.profile.userId === props.authId}
                        goToEditMode={goToEditMode}
                        />}
                </div>
            </div>
        </div>)
};
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
    updateStatus: (status: string) => void
    authId: string | null
    savePhoto: (image: any) => void
    saveProfile: (profileData: ProfileFormType) => void
}

export const ProfileInfo = (props: ProfileInfoPropsType) => {

    const [editMode, setEditMode] = useState(false)
    const [showingModal, setShowingModal] = useState(false)

    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget.files?.length) {
            props.savePhoto(e.currentTarget.files[0])
            setShowingModal(false)
        }
    }
    const goToEditMode = () => {
        setEditMode(true)
    }
    const exitFromEditMode = (profileData: ProfileFormType) => {
        props.saveProfile(profileData)
        setEditMode(false)
    }
    const showModal = () => {
        setShowingModal(true)
    }
    const hideModal = () => {
        setShowingModal(false)
    }
    return (!props.profile) ? <Preloader/> :
        (<div className={s.info}>
            <div className={s.descriptionBlock}>
                <div className={s.changeAvatar}>
                    <img src={props.profile?.photos.large ? props.profile?.photos.large : img} alt={'avatar'}/>
                    <button onClick={showModal}>Change photo</button>
                    {props.profile.userId === props.authId &&
                        <div>
                            {showingModal && <div className={s.modal}>
                                <div className={s.modalContent}>
                                    <button onClick={hideModal} className={s.closeModalBtn}>X</button>
                                    <p>You can load photo from your computer:</p>
                                    <input type={'file'} accept=".jpg, .png" onChange={onMainPhotoSelected}/>
                                </div>
                            </div>}
                        </div>}
                </div>
                <div>
                    <h2>{props.profile.fullName}</h2>
                    <ProfileStatusWithHooks
                        status={props.status}
                        updateStatus={props.updateStatus}
                        owner={props.profile.userId === props.authId}
                    />
                    <hr/>
                    <p><b>About me: </b>{props.profile.aboutMe}</p>
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
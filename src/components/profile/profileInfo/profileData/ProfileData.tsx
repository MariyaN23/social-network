import React from 'react';
import {Contacts} from '../contacts/Contacts';
import {ProfileType} from '../../../../redux/profile-reducer';
import s from './ProfileData.module.css'
import {Icon} from '../../../../assets/images/Icon';

type ProfileDataPropsType = {
    profile: ProfileType
    owner: boolean
    goToEditMode: ()=>void
}

export const ProfileData = (props: ProfileDataPropsType) => {
    return (
        <>
            {props.owner &&
                <div className={s.edit}>
                    <button onClick={props.goToEditMode}><Icon iconId={'edit'} width={'35'} height={'35'}/></button>
                </div>}
            <div className={s.profileData}>
                <h3>Info</h3>
                <p><b>About me: </b>{props.profile.aboutMe}</p>
                <p><b>Looking for a job: </b>{props.profile.lookingForAJob ? '✔️' : '❌'}</p>
                <p><b>My professional skills: </b>{props.profile.lookingForAJobDescription}</p>
                { Object.values(props.profile.contacts).filter(el => el !== '' && el !== null).length > 0 && <h3>Contacts:</h3>}
                { Object.keys(props.profile.contacts).map(key => {
                    return <Contacts
                        key={key}
                        contactTitle={key}
                        contactValue={props.profile?.contacts[key as keyof typeof props.profile.contacts]}/>
                })}
            </div>
        </>
    );
};
import React from 'react';
import {Contacts} from '../contacts/Contacts';
import {ProfileType} from '../../../../redux/profile-reducer';

type ProfileDataPropsType = {
    profile: ProfileType
    owner: boolean
    goToEditMode: ()=>void
}

export const ProfileData = (props: ProfileDataPropsType) => {
    return (
        <>
        {props.owner && <button onClick={props.goToEditMode}>Edit</button>}
            <p>Looking for a job: {props.profile.lookingForAJob ? '✔' : '❌'}</p>
            {props.profile.lookingForAJobDescription && <p>{props.profile.lookingForAJobDescription}</p>}
            <h2>Contacts:</h2>
            {
                Object.keys(props.profile.contacts).map(key => {
                    return <Contacts
                        key={key}
                        contactTitle={key}
                        contactValue={props.profile?.contacts[key as keyof typeof props.profile.contacts]}/>
                })}
        </>
    );
};
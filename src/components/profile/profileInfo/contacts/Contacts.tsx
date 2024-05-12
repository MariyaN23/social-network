import React from 'react';

export type ContactsPropsType = {
    contactTitle: string
    contactValue: string | undefined
}

export const Contacts = (props: ContactsPropsType) => {
    return (
        <div><b>{props.contactTitle}: </b>{props.contactValue ? props.contactValue : '-----'}</div>
    );
};
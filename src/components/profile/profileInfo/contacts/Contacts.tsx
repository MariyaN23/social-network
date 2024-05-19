import React from 'react';

export type ContactsPropsType = {
    contactTitle: string
    contactValue: string | undefined
}

export const Contacts = (props: ContactsPropsType) => {
    return (
        (props.contactValue ?
                <div>
                    <b>{props.contactTitle}: </b>
                    {props.contactValue}
                </div>
            : null)
    );
};
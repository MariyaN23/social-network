import React, {ChangeEvent, useState} from 'react';

type ProfileStatusPropsType = {
    status: string
    updateStatus: (status: string)=> void
    profileId: string
    authId: string | null
}

export const ProfileStatusWithHooks: React.FC<ProfileStatusPropsType> =(props)=> {
    const [editMode, setEditMode] = useState(false)
    const [status, setStatus] = useState(props.status)
    const onDoubleClick =()=> {
        if (props.profileId === props.authId) {
            setEditMode(true)
        }
    }
    const onBlur =()=> {
        setEditMode(false)
        props.updateStatus(status)
    }
    const onStatusChange =(e: ChangeEvent<HTMLInputElement>)=> {
        setStatus(e.currentTarget.value)
    }
        return <>
            <div>
                {!editMode && <span onDoubleClick={onDoubleClick}>{props.status || "-------"}</span>}
            </div>
            <div>
                {editMode && <input onChange={onStatusChange} autoFocus={true} onBlur={onBlur} value={status}/>}
            </div>
        </>
}
import React, {ChangeEvent, useEffect, useState} from 'react';
import s from '../profileInfo/ProfileInfo.module.css';


type ProfileStatusPropsType = {
    status: string
    updateStatus: (status: string)=> void
    owner: boolean
}

export const ProfileStatusWithHooks: React.FC<ProfileStatusPropsType> =(props)=> {
    const [editMode, setEditMode] = useState(false)
    const [status, setStatus] = useState(props.status)
    useEffect(()=> {
        setStatus(props.status)
    },[props.status])
    const onDoubleClick =()=> {
        if (props.owner) {
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
                {!editMode && <span className={props.status ? s.status : s.noStatus} onDoubleClick={onDoubleClick}>
                    {(props.status && props.owner) ? props.status : (!props.status && props.owner) ? "How you doing?" : ""}
                </span>}
            </div>
            <div>
                {editMode && <input className={s.status} onChange={onStatusChange} autoFocus={true} onBlur={onBlur} value={status}/>}
            </div>
        </>
}
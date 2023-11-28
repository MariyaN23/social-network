import React from 'react';
import s from './DialogItem.module.css';
import {NavLink} from 'react-router-dom';

type DialogItemPropsType = {
    name: string
    id: string
}

export const DialogItem:React.FC<DialogItemPropsType> = (props) => {

    const path = `${props.id}`

    return (
        <div className={s.item}>
            <NavLink to={path} className={s.active}>{props.name}</NavLink>
        </div>
    );
};
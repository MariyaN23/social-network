import React from 'react';
import s from './Dialogs.module.css'
import {NavLink} from 'react-router-dom';

export const Dialogs = () => {
    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                <div className={s.item}>
                    <NavLink to={'dialogs/1'}>Dimych</NavLink>
                </div>
                <div className={`${s.item} ${s.active}`}>
                    <NavLink to={'dialogs/2'}>Valera</NavLink>
                    </div>
                <div className={s.item}>
                    <NavLink to={'dialogs/3'}>Svetlana</NavLink>
                </div>
                <div className={s.item}>
                    <NavLink to={'dialogs/4'}>Oleg</NavLink>
                </div>
            </div>
            <div className={s.messages}>
                <div className={s.message}>Hi</div>
                <div className={s.message}>Yo</div>
                <div className={s.message}>Bye</div>
            </div>
        </div>
    );
};
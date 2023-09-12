import React from 'react';
import s from './Dialogs.module.css'
import {DialogItem} from './dialogItem/DialogItem';
import {Message} from './message/Message';

export const Dialogs = () => {
    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                <DialogItem name={'Dimych'} id={1}/>
                <DialogItem name={'Valera'} id={2}/>
                <DialogItem name={'Svetlana'} id={3}/>
                <DialogItem name={'Oleg'} id={4}/>
            </div>
            <div className={s.messages}>
                <Message message={'Hi'}/>
                <Message message={'Yo'}/>
                <Message message={'This is IT-kamasutra'}/>
                <Message message={'Bye'}/>
            </div>
        </div>
    );
};
import React from 'react';
import s from './Dialogs.module.css'
import {DialogItem} from './dialogItem/DialogItem';
import {Message} from './message/Message';
import {DialogsPropsType} from './DialogsContainer';
import {NavLink, Route, Routes} from 'react-router-dom';
import {DialogForm} from './DialogForm';

export const Dialogs = (props: DialogsPropsType) => {
    const dialogsElements = props.dialogsPage.dialogs.map(d => <DialogItem key={d.id} name={d.name} id={d.id}/>)
    const messagesElements = props.dialogsPage.messages.map(m => <Message key={m.id} message={m.message}/>)

   /* const newMessageBody = props.dialogsPage.newMessageBody
    const sendMessage =()=> {
        props.sendMessage()
    }

    const changeNewMessageHandler =(e: ChangeEvent<HTMLTextAreaElement>)=> {
        props.changeNewMessageHandler(e.currentTarget.value)
    }*/

    return (
        <div className={s.dialogs}>
            <Routes>
                <Route path={''} element={<div className={s.dialogsItems}>
                    {dialogsElements}
                </div>}/>
                <Route path={'/*'} element={<div className={s.messages}>
                    <button className={s.backBtn}>
                        <NavLink to={'/dialogs'}>Back</NavLink>
                    </button>
                    <div>{messagesElements}</div>
                    <DialogForm />
                </div>}/>
            </Routes>
        </div>
    )
};
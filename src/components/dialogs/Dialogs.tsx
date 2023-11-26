import React, {ChangeEvent} from 'react';
import s from './Dialogs.module.css'
import {DialogItem} from './dialogItem/DialogItem';
import {Message} from './message/Message';
import {dialogPropsType} from '../../redux/dialogs-reducer';

type DialogsPropsType = {
    dialogsPage: dialogPropsType
    sendMessage: ()=> void
    changeNewMessageHandler: (message: string)=> void
}

export const Dialogs = (props: DialogsPropsType) => {
    const dialogsElements = props.dialogsPage.dialogs.map(d => <DialogItem key={d.id} name={d.name} id={d.id}/>)
    const messagesElements = props.dialogsPage.messages.map(m => <Message key={m.id} message={m.message}/>)

    const newMessageBody = props.dialogsPage.newMessageBody
    const sendMessage =()=> {
        props.sendMessage()
    }

    const changeNewMessageHandler =(e: ChangeEvent<HTMLTextAreaElement>)=> {
        props.changeNewMessageHandler(e.currentTarget.value)
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                <div>{messagesElements}</div>
                <div>
                    <div><textarea value={newMessageBody} onChange={changeNewMessageHandler} placeholder={'Enter your message'}></textarea></div>
                    <div><button onClick={sendMessage}>Send</button></div>
                </div>
            </div>
        </div>
    );
};
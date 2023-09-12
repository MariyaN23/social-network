import React from 'react';
import s from './Message.module.css';

type MessagePropsType = {
    message: string
}

export const Message:React.FC<MessagePropsType> = (props) => {
    return (
        <div className={s.message}>{props.message}</div>
    );
};
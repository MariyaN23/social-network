import React from 'react';
import {
    ActionType
} from '../../redux/store';
import {sendMessageActionCreator, updateNewMessageBodyActionCreator} from '../../redux/dialogs-reducer';
import {StoreType} from '../../redux/redux-store';
import {Dialogs} from './Dialogs';

type DialogsPropsType = {
    store: StoreType
}

export const DialogsContainer = (props: DialogsPropsType) => {
    const state = props.store.getState().dialogsPage
    const sendMessage =()=> {
        props.store.dispatch(sendMessageActionCreator())
    }

    const changeNewMessageHandler =(message: string)=> {
        const action: ActionType = updateNewMessageBodyActionCreator(message)
        props.store.dispatch(action)
    }

    return <Dialogs state={state} changeNewMessageHandler={changeNewMessageHandler} sendMessage={sendMessage}/>
};
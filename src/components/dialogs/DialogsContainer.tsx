import React from 'react';
import {sendMessageActionCreator, updateNewMessageBodyActionCreator} from '../../redux/dialogs-reducer';

import {Dialogs} from './Dialogs';
import {StoreContext} from '../../StoreContext';
import {ActionType} from '../../redux/redux-store';



export const DialogsContainer = () => {

    return (
        <StoreContext.Consumer>
            {(store) => {
                const state = store.getState().dialogsPage
                const sendMessage =()=> {
                    store.dispatch(sendMessageActionCreator())
                }

                const changeNewMessageHandler =(message: string)=> {
                    const action: ActionType = updateNewMessageBodyActionCreator(message)
                    store.dispatch(action)
                }
                return <Dialogs state={state} changeNewMessageHandler={changeNewMessageHandler} sendMessage={sendMessage}/>
            }
        }
        </StoreContext.Consumer>
    );
};
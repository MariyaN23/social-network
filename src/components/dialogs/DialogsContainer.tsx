import {sendMessageActionCreator, updateNewMessageBodyActionCreator} from '../../redux/dialogs-reducer';
import {Dialogs} from './Dialogs';
import {ActionType, RootStatePropsType} from '../../redux/redux-store';
import {connect} from 'react-redux';


const mapStateToProps = (state: RootStatePropsType)=> {
    return {
        dialogsPage: state.dialogsPage
    }
}

const mapDispatchToProps = (dispatch: any)=> {
    return {
        changeNewMessageHandler: (message: string)=> {
            const action: ActionType = updateNewMessageBodyActionCreator(message)
            dispatch(action)
        },
        sendMessage: ()=> {
            dispatch(sendMessageActionCreator())
        }
    }
}

export const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs)
import {
    dialogPropsType,
    sendMessageActionCreator,
    updateNewMessageBodyActionCreator
} from '../../redux/dialogs-reducer';
import {Dialogs} from './Dialogs';
import {ActionType, AppStateType} from '../../redux/redux-store';
import {connect} from 'react-redux';
import {compose, Dispatch} from 'redux';
import {withAuthRedirectComponent} from '../../hoc/withAuthRedirectComponent';

type MapStatePropsType = {
    dialogsPage: dialogPropsType
}

type MapDispatchPropsType = {
    changeNewMessageHandler: (message: string)=> void
    sendMessage: ()=> void
}

export type DialogsPropsType = MapStatePropsType & MapDispatchPropsType

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        dialogsPage: state.dialogsPage
    }
}

const mapDispatchToProps = (dispatch: Dispatch): MapDispatchPropsType => {
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

export default compose<React.ComponentType>(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirectComponent
)(Dialogs)

//export const DialogsContainer = withAuthRedirectComponent(connect(mapStateToProps, mapDispatchToProps)(Dialogs))
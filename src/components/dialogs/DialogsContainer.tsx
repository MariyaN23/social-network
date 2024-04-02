import {
    dialogPropsType,
    sendMessageActionCreator
} from '../../redux/dialogs-reducer';
import {Dialogs} from './Dialogs';
import {AppStateType} from '../../redux/redux-store';
import {connect} from 'react-redux';
import {compose, Dispatch} from 'redux';
import {withAuthRedirectComponent} from '../../hoc/withAuthRedirectComponent';

type MapStatePropsType = {
    dialogsPage: dialogPropsType
}

type MapDispatchPropsType = {
    sendMessage: (message: string)=> void
}

export type DialogsPropsType = MapStatePropsType & MapDispatchPropsType

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        dialogsPage: state.dialogsPage
    }
}

const mapDispatchToProps = (dispatch: Dispatch): MapDispatchPropsType => {
    return {
        sendMessage: (message: string)=> {
            dispatch(sendMessageActionCreator(message))
        }
    }
}

export default compose<React.ComponentType>(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirectComponent
)(Dialogs)
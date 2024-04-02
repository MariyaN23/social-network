import React from 'react';
import {Header} from './Header';
import {connect} from 'react-redux';
import {authThunkCreator, DataType, setUserDataActionCreator as setUserData} from '../../redux/auth-reducer';
import {AppStateType} from '../../redux/redux-store';

type MapStatePropsType = {
    isAuth: boolean
    login: string | null
}

type MapDispatchPropsType = {
    setUserData: (data: DataType, isAuth: boolean)=> void
    authThunkCreator: ()=> void
}

export type HeaderAPIPropsType = MapStatePropsType & MapDispatchPropsType

class HeaderContainer extends React.Component<HeaderAPIPropsType> {
    componentDidMount() {
        this.props.authThunkCreator()
    }
    render() {
        return <Header {...this.props} />
    }
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        isAuth: state.auth.isAuth,
        login: state.auth.data.login,
    }
}

export default connect(mapStateToProps,  {
    setUserData,
    authThunkCreator
})(HeaderContainer)
import React from 'react';
import {Header} from './Header';
import axios from 'axios';
import {connect} from 'react-redux';
import {DataType, setUserDataActionCreator as setUserData} from '../../redux/auth-reducer';
import {AppStateType} from '../../redux/redux-store';

type MapStatePropsType = {
    isAuth: boolean
    login: string | null
}

type MapDispatchPropsType = {
    setUserData: (data: DataType)=> void
}

export type HeaderAPIPropsType = MapStatePropsType & MapDispatchPropsType

class HeaderContainer extends React.Component<HeaderAPIPropsType> {
    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`, {withCredentials: true})
            .then((response)=> {
                if (response.data.resultCode === 0) {
                    this.props.setUserData(response.data.data)
                }
            })
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
    setUserData
})(HeaderContainer)
import {Navigate} from 'react-router-dom';
import React, {ComponentType} from 'react';
import {connect} from 'react-redux';
import {AppStateType} from '../redux/redux-store';

type MapStatePropsForRedirectType = {
    isAuth: boolean
}

const mapStateToProps = (state: AppStateType): MapStatePropsForRedirectType => {
    return {
        isAuth: state.auth.isAuth
    }
}

export function withAuthRedirectComponent <T>(Component: ComponentType<T>) {
    const RedirectComponent = (props: MapStatePropsForRedirectType) => {
        let {isAuth, ...restProps} = props
        if (!isAuth) return <Navigate to={'/login'} replace={true}/>
        return <Component {...restProps as T}/>
    }
    return connect(mapStateToProps)(RedirectComponent)
}
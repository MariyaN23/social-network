import {Navigate} from 'react-router-dom';
import React from 'react';
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

export const withAuthRedirectComponent = (Component: any) => {
    const RedirectComponent = (props: any) => {
        if (!props.isAuth) return <Navigate to={'/login'} replace={true}/>
        return <Component {...props}/>
    }
    return connect(mapStateToProps)(RedirectComponent)
}
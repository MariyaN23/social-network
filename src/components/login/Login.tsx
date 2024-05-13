import React from 'react';
import s from './Login.module.css'
import {AuthFormType, LoginForm} from './LoginForm';
import {connect} from 'react-redux';
import {loginThunkCreator as login} from '../../redux/auth-reducer';
import {AppStateType} from '../../redux/redux-store';
import {Navigate} from 'react-router-dom';

type MapStatePropsType = {
    isAuth: boolean
    error: string
    captcha: string
}

type MapDispatchPropsType = {
    login: (loginData: AuthFormType)=> void
}

export type LoginPropsType = MapStatePropsType & MapDispatchPropsType

const Login = (props: LoginPropsType) => {
    const loginFormSubmit = (loginData: AuthFormType) => {
        props.login(loginData)
    }
    if (props.isAuth) {
        return <Navigate to={'/profile'}/>
    }
    return (
        <div className={s.loginPage}>
            <h1>Login</h1>
            {props.error && <div>{props.error}</div>}
            <LoginForm loginFormSubmit={loginFormSubmit} captcha={props.captcha}/>
        </div>
    );
};

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        isAuth: state.auth.isAuth,
        error: state.auth.error,
        captcha: state.auth.captcha
    }
}

export default connect(mapStateToProps,{
    login
})(Login)
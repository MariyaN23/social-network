import React from 'react';
import s from './Login.module.css'
import {AuthFormType, LoginForm} from './LoginForm';
import {connect} from 'react-redux';
import {loginThunkCreator as login} from '../../redux/auth-reducer';
import {AppStateType} from '../../redux/redux-store';

type MapStatePropsType = {}

type MapDispatchPropsType = {
    login: (loginData: AuthFormType)=> void
}

export type LoginPropsType = MapStatePropsType & MapDispatchPropsType

const Login = (props: LoginPropsType) => {
    const loginFormSubmit = (loginData: AuthFormType) => {
        props.login(loginData)
    }
    return (
        <div className={s.loginPage}>
            <h1>Login</h1>
            <LoginForm loginFormSubmit={loginFormSubmit}/>
        </div>
    );
};

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
    }
}

export default connect(mapStateToProps,{
    login
})(Login)
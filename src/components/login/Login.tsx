import React from 'react';
import s from './Login.module.css'
import {LoginForm} from './LoginForm';

export const Login = () => {
    return (
        <div className={s.loginPage}>
            <h1>Login</h1>
            <LoginForm/>
        </div>
    );
};
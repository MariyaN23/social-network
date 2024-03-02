import React from 'react';
import s from './Login.module.css';

export const LoginForm = () => {
    return (
        <form className={s.loginForm}>
            <input placeholder={'Login'}/>
            <input placeholder={'Password'}/>
            <div>
                <input type={'checkbox'}/><span>Remember me</span>
            </div>
            <button type={'submit'}>Login</button>
        </form>
    );
};
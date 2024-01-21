import React from 'react';
import s from './Header.module.css';
import {Icon} from '../../assets/images/Icon';
import {NavLink} from 'react-router-dom';

type HeaderPropsType = {
    isAuth: boolean
    login: string | null
}

export const Header = (props: HeaderPropsType) => {
    return (
            <header className={s.header}>
                <Icon className={s.svg} iconId={"logo"} width={'50'} height={'50'}/>
                <div className={s.login}>
                    {props.isAuth
                        ? props.login
                        : <NavLink to={"/login"}>Login</NavLink>}
                </div>
            </header>
    );};
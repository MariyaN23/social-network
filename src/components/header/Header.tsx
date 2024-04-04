import React from 'react';
import s from './Header.module.css';
import {Icon} from '../../assets/images/Icon';
import {NavLink} from 'react-router-dom';

type HeaderPropsType = {
    isAuth: boolean
    login: string | null
    logout: ()=> void
}

export const Header = (props: HeaderPropsType) => {
    return (
            <header className={s.header}>
                <Icon className={s.svg} iconId={"logo"} width={'50'} height={'50'}/>
                <div className={s.login}>
                    {props.isAuth
                        ? <div>
                            {props.login}
                            <button onClick={props.logout}>Logout</button>
                        </div>
                        : <NavLink to={"/login"}>Login</NavLink>}
                </div>
            </header>
    );};
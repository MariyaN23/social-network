import React, {ChangeEvent} from 'react';
import s from './Header.module.css';
import {Icon} from '../../assets/images/Icon';

type HeaderPropsType = {
    isAuth: boolean
    login: string | null
    logout: ()=> void
}

export const Header = (props: HeaderPropsType) => {
    const logoutHandler =(e: ChangeEvent<HTMLSelectElement>)=> {
        if (e.currentTarget.value === 'logout') {
            props.logout()
        }
    }
    return (
            <header className={s.header}>
                <Icon className={s.svg} iconId={"logo"} width={'50'} height={'50'}/>
                <div className={s.login}>
                    {props.isAuth
                        ? <div className={s.selectDiv}>
                            <select name={"options"} onChange={logoutHandler} className={s.logoutBar}>
                                <option value={'login'} disabled selected hidden>{props.login}</option>
                                <option value={'logout'}>
                                    ↪ Log Out
                                </option>
                            </select>
                        </div>
                        : ""}
                </div>
            </header>
    );};
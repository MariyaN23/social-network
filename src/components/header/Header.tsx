import React from 'react';
import s from './Header.module.css';
import {Icon} from '../images/Icon';

export const Header = () => {
    return (
            <header className={s.header}>
                <Icon className={s.svg} iconId={"logo"} width={'50'} height={'50'}/>
            </header>
    );};
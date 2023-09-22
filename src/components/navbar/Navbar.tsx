import React from 'react';
import s from './Navbar.module.css';
import {NavLink} from 'react-router-dom';
import {Icon} from '../../assets/images/Icon';

export const Navbar = () => {
    return (
        <nav className={s.nav}>
           <div className={s.item}><NavLink to={'/profile'} className={s.active}><Icon iconId={'profile'} className={'svg'} width={'30'} height={'30'}/>Profile</NavLink></div>
            <div className={s.item}><NavLink to={'/dialogs'}><Icon iconId={'messages'} className={'svg'} width={'30'} height={'30'}/>Messages</NavLink></div>
            <div className={s.item}><NavLink to={'/news'}><Icon iconId={'news'} className={'svg'} width={'30'} height={'30'}/>News</NavLink></div>
            <div className={s.item}><NavLink to={'/music'}><Icon iconId={'music'} className={'svg'} width={'30'} height={'30'}/>Music</NavLink></div>
            <div className={s.item}><NavLink to={'/settings'}><Icon iconId={'settings'} className={'svg'} width={'30'} height={'30'}/>Settings</NavLink></div>
        </nav>
    );
};
import React from 'react';
import s from './Preloader.module.css';
import preloaderImg from '../../assets/images/preloader.gif'

export const Preloader = () => {
    return <div className={s.preloader}>
            <img src={preloaderImg} alt={"preloader"}/>
        </div>
};
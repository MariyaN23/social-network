import React from 'react';
import s from './ProfileInfo.module.css'
import wallpaper from '../../../../assets/images/wallpaper.jpg'
import avatar from '../../../../assets/images/avatar.jpg'

export const ProfileInfo = () => {
    return (
        <div className={s.info}>
            <div>
                <img src={wallpaper} alt={'Dubai'}/>
            </div>
            <div className={s.descriptionBlock}>
                <img src={avatar} alt={'avatar'}/>
                <div>
                    <h2>Cat Dollar</h2>
                    <h3>Date of birth: 2 january</h3>
                    <h3>City: Dubai</h3>
                    <h3>Education: BSU '22</h3>
                    <h3>Web Site: samurai.by</h3>
                </div>
            </div>
        </div>
    );
};
import React from 'react';
import s from "./Music.module.css";

export const Music = () => {
    return (
        <>
            <div className={s.pageName}>Music</div>
            <div className={s.musicWrapper}>
                <iframe width="560" height="315" src="https://www.youtube.com/embed/hMG8zKpc-J4"
                        allow="autoplay; encrypted-media" allowFullScreen></iframe>
            </div>
        </>
    );
};
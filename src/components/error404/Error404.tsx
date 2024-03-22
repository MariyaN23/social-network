import React from 'react';
import error from '../../assets/images/404.jpg'

export const Error404 = () => {
    return (
        <div>
            <img src={error} alt={'Error 404'}/>
        </div>
    );
};
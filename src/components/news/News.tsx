import React from 'react';
import s from "./News.module.css";

export const News = () => {
    return (
        <>
            <div className={s.pageName}>News</div>
            <div className={s.newsWrapper}>
                <div className={s.news}>
                    <img src={'https://ichef.bbci.co.uk/images/ic/1024xn/p0frjhtn.jpg.webp'}
                         alt={'Best food in Barcelona'}/>
                    <h3>The best Catalan food in Barcelona</h3>
                    <p>From La Pubilla to Tramendu to Agut Avinyó, here are a local food journalist's recommendations of
                        the
                        best places to eat in the Catalan capital...
                        <a href="https://www.bbc.com/travel/article/20230601-the-five-best-places-to-eat-catalan-food-in-barcelona"
                           target="_blank" rel="noreferrer">See more</a></p>
                </div>
                <div className={s.news}>
                    <img src={'https://ichef.bbci.co.uk/images/ic/1024xn/p0jdgz0n.jpg.webp'}
                         alt={'Alternative lakes'}/>
                    <h3>An alternative to the Italian lakes</h3>
                    <p>Italy's northern lakes like Como, Garda and Maggiore may shine on social media, but the Alpine
                        lakes of France offer a refreshing – and less crowded – alternative.
                        <a href="https://www.bbc.com/travel/article/20240725-an-under-the-radar-alternative-to-the-italian-lakes-this-summer"
                           target="_blank" rel="noreferrer">See more</a></p>
                </div>
                <div className={s.news}>
                    <img src={'https://ichef.bbci.co.uk/images/ic/1024xn/p0j759k4.jpg.webp'}
                         alt={'Istanbul'}/>
                    <h3>A new way to see the world's most-visited city</h3>
                    <p>An extensive culture and heritage restoration campaign is revealing previously overlooked layers
                        of
                        Istanbul.
                        <a href="https://www.bbc.com/travel/article/20240701-istanbuls-plan-to-save-its-cultural-soul"
                           target="_blank" rel="noreferrer">See more</a></p>
                </div>
                <div className={s.news}>
                    <img src={'https://ichef.bbci.co.uk/images/ic/1024xn/p0hf7ktt.jpg.webp'}
                         alt={'Very old forest'}/>
                    <h3>The US state that's home to Earth's oldest forest</h3>
                    <p> The discovery of a 385-million-year-old forest in Cairo, NY, has stunned the world – but visitors to the region have been able to see rare fossil forests for more than a century.
                        <a href="https://www.bbc.com/travel/article/20240229-the-surprising-us-region-thats-home-to-the-worlds-oldest-forests"
                           target="_blank" rel="noreferrer">See more</a></p>
                </div>

            </div>
        </>

    );
};
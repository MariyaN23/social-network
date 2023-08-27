import React from 'react';
import './App.css';
import Accordion from "./modules/accordion/Accordion";
import {Rating, Rating as R} from './modules/Rating/Rating';
import {OnOff} from './modules/onOff/OnOff';

function App() {
    console.log('App rendering')
    return (
        <div>
            <Accordion titleValue={"Меню"} collapsed={true}/>
            <Accordion titleValue={"Друзья"} collapsed={false}/>
            <Rating value={0}/>
            <Rating value={1}/>
            <Rating value={2}/>
            <Rating value={3}/>
            <Rating value={4}/>
            <Rating value={5}/>
            <OnOff selected={true}/>
            <OnOff selected={false}/>
        </div>
    );
}

type PageTitlePropsType = {
    title: string
}

function PageTitle(props: PageTitlePropsType) {
    console.log('PageTitle rendering')
    return (
        <h1>{props.title}</h1>
    )
}

export default App;

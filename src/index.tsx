import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {store} from './redux/state';

const rerenderEntireTree =()=> {ReactDOM.render(
    <App state={store._state} store={store}/>,
    document.getElementById('root')
);}

rerenderEntireTree()

store.subscribe(rerenderEntireTree)


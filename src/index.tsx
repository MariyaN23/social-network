import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {RootStatePropsType} from './redux/store';
import {store} from './redux/redux-store';

const rerenderEntireTree =(state: RootStatePropsType)=> {ReactDOM.render(
    <App state={state} dispatch={store.dispatch.bind(store)}/>,
    document.getElementById('root')
);}

rerenderEntireTree(store.getState())

store.subscribe(()=> {
    rerenderEntireTree(store.getState())
})
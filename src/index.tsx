import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {RootStatePropsType, store} from './redux/state';

const rerenderEntireTree =(state: RootStatePropsType)=> {ReactDOM.render(
    <App state={state} addPost={store.addPost.bind(store)} changeNewPostText={store.changeNewPostText.bind(store)}/>,
    document.getElementById('root')
);}

rerenderEntireTree(store.getState())

store.subscribe(rerenderEntireTree)


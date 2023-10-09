import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {addPost, changeNewPostText, state, subscribe} from './redux/state';

const rerenderEntireTree =()=> {ReactDOM.render(
    <App state={state} addPost={addPost} changeNewPostText={changeNewPostText}/>,
    document.getElementById('root')
);}

rerenderEntireTree()

subscribe(rerenderEntireTree)


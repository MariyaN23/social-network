import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {addPost, changeNewPostText, RootStatePropsType} from './redux/state';

export const rerenderEntireTree =(state: RootStatePropsType)=> {ReactDOM.render(
    <App state={state} addPost={addPost} changeNewPostText={changeNewPostText}/>,
    document.getElementById('root')
);}


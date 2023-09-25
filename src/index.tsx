import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

const posts = [
    {id: 1, message: 'Hi, how are you?', likeCounts: 15},
    {id: 2, message: 'It\'s my first post', likeCounts: 20},
]

const dialogs = [
    {id: 1, name: 'Dimych'},
    {id: 2, name: 'Valera'},
    {id: 3, name: 'Svetlana'},
    {id: 4, name: 'Oleg'},
    {id: 5, name: 'Igor'},
    {id: 6, name: 'Tolik'}
]

const messages = [
    {id: 1, message: 'Hi'},
    {id: 2, message: 'Yo'},
    {id: 3, message: 'This is IT-kamasutra'},
    {id: 4, message: 'Bye'},
    {id: 5, message: 'Hi'},
    {id: 6, message: 'Hi'},
]

ReactDOM.render(
    <App posts={posts} dialogs={dialogs} messages={messages}/>,
  document.getElementById('root')
);
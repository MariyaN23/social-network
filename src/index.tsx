import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {RootStatePropsType} from './redux/store';
import {store} from './redux/redux-store';
import {Provider} from './StoreContext';

const rerenderEntireTree =(state: RootStatePropsType)=> {ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, document.getElementById('root')
);}

rerenderEntireTree(store.getState())

store.subscribe(()=> {
    rerenderEntireTree(store.getState())
})
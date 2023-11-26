import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {store} from './redux/redux-store';
import {Provider} from './StoreContext';
import {BrowserRouter} from 'react-router-dom';

const rerenderEntireTree =()=> {ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>, document.getElementById('root')
);}

rerenderEntireTree()

store.subscribe(()=> {
    rerenderEntireTree()
})
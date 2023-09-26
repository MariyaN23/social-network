import React from 'react';
import './App.css';
import {Header} from './components/header/Header';
import {Navbar} from './components/navbar/Navbar';
import {Profile} from './components/profile/Profile';
import {Dialogs} from './components/dialogs/Dialogs';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {News} from './components/news/News';
import {Music} from './components/music/Music';
import {Settings} from './components/settings/Settings';
import {RootStatePropsType} from './redux/state';

type AppPropsType = {
    state: RootStatePropsType
}

function App(props: AppPropsType) {
    return (
        <BrowserRouter>
            <div className={'app-wrapper'}>
                <Header/>
                <Navbar/>
                <div className={'app-wrapper-content'}>
                    <Routes>
                        <Route path={'/'} element={<Profile posts={props.state.profilePage.posts}/>}/>
                        <Route path={'/profile'} element={<Profile posts={props.state.profilePage.posts}/>}/>
                        <Route path={'/dialogs/*'} element={<Dialogs dialogs={props.state.dialogsPage.dialogs}
                                                                     messages={props.state.dialogsPage.messages}/>}/>
                        <Route path={'/news'} element={<News />}/>
                        <Route path={'/music'} element={<Music />}/>
                        <Route path={'/settings'} element={<Settings />}/>
                    </Routes >
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
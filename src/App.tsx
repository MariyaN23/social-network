import React from 'react';
import './App.css';
import {Header} from './components/header/Header';
import {Navbar} from './components/navbar/Navbar';
import {Profile} from './components/profile/Profile';
import {Route, Routes} from 'react-router-dom';
import {News} from './components/news/News';
import {Music} from './components/music/Music';
import {Settings} from './components/settings/Settings';
import {DialogsContainer} from './components/dialogs/DialogsContainer';
import UsersContainer from './components/users/UsersContainer';
import ProfileContainer from './components/profile/ProfileContainer';


function App() {
    return <div className={'app-wrapper'}>
                <Header/>
                <Navbar/>
                <div className={'app-wrapper-content'}>
                    <Routes>
                        <Route path={'/'} element={<Profile />}/>
                        <Route path={'/profile'} element={<ProfileContainer />}/>
                        <Route path={'/dialogs/*'} element={<DialogsContainer />}/>
                        <Route path={'/users'} element={<UsersContainer />}/>
                        <Route path={'/news'} element={<News/>}/>
                        <Route path={'/music'} element={<Music/>}/>
                        <Route path={'/settings'} element={<Settings/>}/>
                    </Routes>
                </div>
            </div>
}

export default App;
import React from 'react';
import './App.css';
import {Navbar} from './components/navbar/Navbar';
import {Navigate, Route, Routes} from 'react-router-dom';
import {News} from './components/news/News';
import {Music} from './components/music/Music';
import {Settings} from './components/settings/Settings';
import UsersContainer from './components/users/UsersContainer';
import ProfileContainer from './components/profile/ProfileContainer';
import HeaderContainer from './components/header/HeaderContainer';
import Login from './components/login/Login';
import Dialogs from './components/dialogs/DialogsContainer';
import {Error404} from './components/error404/Error404';
import {AppStateType} from './redux/redux-store';
import {connect} from 'react-redux';

type MapStatePropsType = {
    userID: string | null
}

type AppPropsType = MapStatePropsType

function App(props: AppPropsType) {
    return <div className={'app-wrapper'}>
                <HeaderContainer/>
                <Navbar />
                <div className={'app-wrapper-content'}>
                    <Routes>
                        <Route path={'/'} element={<ProfileContainer />}/>
                        <Route path={'/profile'} element={<Navigate to={`/profile/${props.userID}`} />}/>
                        <Route path={'/profile/:userId?'} element={<ProfileContainer />}/>
                        <Route path={'/dialogs/*'} element={<Dialogs />}/>
                        <Route path={'/users'} element={<UsersContainer />}/>
                        <Route path={'/news'} element={<News/>}/>
                        <Route path={'/music'} element={<Music/>}/>
                        <Route path={'/settings'} element={<Settings/>}/>
                        <Route path={'/login'} element={<Login/>}/>
                        <Route path={'/error404'} element={<Error404/>}/>
                        <Route path={'/*'} element={<Navigate to={'/error404'} />}/>
                    </Routes>
                </div>
            </div>
}

const MapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        userID: state.auth.data.id
    }
}

export default connect(MapStateToProps, {})(App)
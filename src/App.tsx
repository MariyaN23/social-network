import React from 'react';
import './App.css';
import {Navbar} from './components/navbar/Navbar';
import {HashRouter, Navigate, Route, Routes} from 'react-router-dom';
import {News} from './components/news/News';
import {Music} from './components/music/Music';
import {Settings} from './components/settings/Settings';
import UsersContainer from './components/users/UsersContainer';
import HeaderContainer from './components/header/HeaderContainer';
import Login from './components/login/Login';
import {Error404} from './components/error404/Error404';
import {AppStateType, store} from './redux/redux-store';
import {connect, Provider} from 'react-redux';
import {initializeAppThunkCreator, setGlobalErrorThunkCreator} from './redux/app-reducer';
import {Preloader} from './components/common/Preloader';

const Dialogs = React.lazy(()=> import('./components/dialogs/DialogsContainer'))
const ProfileContainer = React.lazy(()=> import('./components/profile/ProfileContainer'))

type MapStatePropsType = {
    userID: string | null
    initialized: boolean
    globalError: string
}

type MapDispatchPropsType = {
    initializeAppThunkCreator: ()=> void
    setGlobalErrorThunkCreator: (globalError: string)=> void
}

type AppPropsType = MapStatePropsType & MapDispatchPropsType

class App extends React.Component<AppPropsType> {
    catchAllUnheandledErrors =(promiseRejectionEvent: PromiseRejectionEvent)=> {
        this.props.setGlobalErrorThunkCreator(promiseRejectionEvent.reason.message)
    }
    closeError = () => {
        this.props.setGlobalErrorThunkCreator('')
    }
    componentDidMount() {
        this.props.initializeAppThunkCreator()
        window.addEventListener("unhandledrejection", this.catchAllUnheandledErrors)
    }
    componentWillUnmount() {
        window.removeEventListener("unhandledrejection", this.catchAllUnheandledErrors)
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }

        return <div className={'app-wrapper'}>
            <HeaderContainer/>
            <Navbar/>
            <div className={'app-wrapper-content'}>
                <React.Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route path={'/'} element={<Navigate to={`/profile/${this.props.userID}`}/>}/>
                    <Route path={'/profile'} element={<Navigate to={`/profile/${this.props.userID}`}/>}/>
                    <Route path={'/profile/:userId?'} element={<ProfileContainer/>}/>
                    <Route path={'/dialogs/*'} element={<Dialogs/>}/>
                    <Route path={'/users'} element={<UsersContainer/>}/>
                    <Route path={'/news'} element={<News/>}/>
                    <Route path={'/music'} element={<Music/>}/>
                    <Route path={'/settings'} element={<Settings/>}/>
                    <Route path={'/login'} element={<Login/>}/>
                    <Route path={'/error404'} element={<Error404/>}/>
                    <Route path={'/*'} element={<Navigate to={'/error404'}/>}/>
                </Routes>
                </React.Suspense>
            </div>
            {this.props.globalError && <div className={'globalError'}>{this.props.globalError}
            <button onClick={this.closeError}>X</button>
            </div>}
        </div>
    }
}

const MapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        userID: state.auth.data.id,
        initialized: state.app.initialized,
        globalError: state.app.globalError
    }
}

const AppContainer = connect(MapStateToProps, {
    initializeAppThunkCreator,
    setGlobalErrorThunkCreator
})(App)

const SamuraiJSApp =()=> {
    return <HashRouter basename={"/"}>
        <Provider store={store}>
            <AppContainer />
        </Provider>
    </HashRouter>
}

export default SamuraiJSApp
import React from 'react';
import './App.css';
import {AppBar, Button, Container, IconButton, LinearProgress, Toolbar, Typography} from "@material-ui/core";
import {Menu} from '@material-ui/icons';
import {TodolistsList} from "../features/TodolistsList/TodolistsList";
import {useSelector} from "react-redux";
import {AppRootStateType} from "./store";
import {RequestStatusType} from "./app-reducer";
import {ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar";
import {Login} from "../features/Login/Login";
import {NavLink, Redirect, Route, Switch} from 'react-router-dom';

type PropsType = {
    demo?: boolean
}

function App({demo = false}: PropsType) {
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">
                        <NavLink to={'/login'}>Login</NavLink>
                    </Button>
                </Toolbar>
            </AppBar>
            {status === 'loading' && <LinearProgress color="secondary"/>}
            <Container fixed>
                <Switch>
                    <Route exact path={'/'} render={() => <TodolistsList demo={demo}/>}/>
                    <Route path={'/login'} render={() => <Login/>}/>
                    <Route path={'/404'} render={() =>
                        <h1 style={{textAlign: 'center', fontSize: '80px'}}>404: PAGE NOT FOUND</h1>}/>
                    <Redirect from={'*'} to={'/404'} />
                </Switch>
            </Container>
            <ErrorSnackbar/>
        </div>
    );
}

export default App;


import React from 'react'
import {BrowserRouter as Router , Route ,Redirect } from "react-router-dom"
import Login from '../login/login'
import Index from '../Home/index'
import Regesiter from "../regesiter/regesiter";
import axios from '../http/myAxios'

export const AppRouter = (props) => {
    let token = window.localStorage.getItem("token");
    return(
        <Router>
            <Route path='/' exact component={Login}/>
            <Route path='/register' component={Regesiter}/>
            {/*<Route path='/index' component={Index}/>*/}
            <Route path='/index' render={props => (
                token ?
                    (<Index props={props}/>):(<Redirect to={{pathname:'/' , state:{form:props.location}}}></Redirect>)
            )}></Route>
            <Route path='/jotter' component={Index}/>
            <Route path='/library' component={Index}/>
            <Route path='/admin' component={Index}/>
        </Router>
    )
}

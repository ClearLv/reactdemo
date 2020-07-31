import React from 'react'
import {BrowserRouter as Router , Route} from "react-router-dom"
import Login from '../login/login'
import Index from '../Home/index'
import Regesiter from "../regesiter/regesiter";

export const AppRouter = () => {
    return(
        <Router>
            <Route path='/' exact component={Login}/>
            <Route path='/register' component={Regesiter}/>
            <Route path='/index' component={Index}/>
            <Route path='/jotter' component={Index}/>
            <Route path='/library' component={Index}/>
            <Route path='/admin' component={Index}/>
        </Router>
    )
}

import React from "react";
    import {
        BrowserRouter as Router,
        Switch,
        Route,
        Redirect,
    } from "react-router-dom";

import { LoginScreen } from '../components/login/LoginScreen';
import { DataTable } from "../components/screens/DataTable";
import { Gallery } from "../components/screens/Gallery";
import { TodoList } from "../components/screens/TodoList";


export const AppRouter = () => {

    return (
        <div>
        <Router>
        <div className="container mt-2">
                <Switch>
                    <Route exact path="/login" component={ LoginScreen } />
                    <Route exact path="/datatable" component={ DataTable } />
                    <Route exact path="/gallery" component={ Gallery } />
                    <Route exact path="/todo" component={ TodoList } />
                    <Redirect to="/DataTable" />
                </Switch>
            </div>
    </Router>
        </div>
        
    )
}

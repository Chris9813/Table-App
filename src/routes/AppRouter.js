import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { LoginScreen } from "../components/login/LoginScreen";
import { DeshboardRoutes } from "./DeshboardRoutes";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";
import { startCheking } from "../actions/auth";

export const AppRouter = () => {
  const dispatch = useDispatch();
  const [isLoggedIn, setisLoggedIn] = useState(false);

  console.log(localStorage.getItem("token"));

  const { uid } = useSelector((state) => state.auth);

  const auth = () => {
    localStorage.getItem("token") ? setisLoggedIn(true) : setisLoggedIn(false);
  };

  useEffect(() => {
    dispatch(startCheking("chris", "1234"));
  }, [dispatch]);

  return (
    <div>
      <Router>
        <div className="">
          <Switch>
            <PublicRoute
              exact
              path="/login"
              component={LoginScreen}
              isAuthenticated={!!uid}
            />
            <PrivateRoute
              path="/"
              component={DeshboardRoutes}
              isAuthenticated={!!uid}
            />
          </Switch>
        </div>
      </Router>
    </div>
  );
};

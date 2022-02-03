import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Navbar } from "../ui/NavBar";

import { Table } from "../components/screens/DataTable";
import { Gallery } from "../components/screens/Gallery";
import { TodoList } from "../components/screens/TodoList";

export const DeshboardRoutes = () => {
  return (
    <>
      <Navbar />
      <div className="container mt-3">
        <Switch>
          <Route exact path="/datatable" component={Table} />
          <Route exact path="/gallery" component={Gallery} />
          <Route exact path="/todo" component={TodoList} />
          <Redirect to="/DataTable" />
        </Switch>
      </div>
    </>
  );
};

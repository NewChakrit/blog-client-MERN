import { BrowserRouter, Switch, Route } from "react-router-dom";
import Form from "./components/Form";
import SinglePage from "./components/SinglePage";
import Edit from "./components/Edit";
import App from "./App";
import Login from "./components/Login";

import React from "react";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={App} />
        <Route path="/create" exact component={Form} />
        <Route path="/blog/:slug" exact component={SinglePage} />
        <Route path="/blog/edit/:slug" exact component={Edit} />
        <Route path="/login" exact component={Login} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;

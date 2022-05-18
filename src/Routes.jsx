import { BrowserRouter, Switch, Route } from "react-router-dom";
import Form from "./components/Form";
import App from "./App";

import React from "react";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={App} />
        <Route path="/create" exact component={Form} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;

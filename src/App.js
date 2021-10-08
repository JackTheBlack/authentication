import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { login, logout } from "./redux/actions/logActions.js";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import LogForm from "./components/LogForm";

function App() {
  // const log = useSelector((store) => store.logReducer.log);
  const dispatch = useDispatch();
  const user = useSelector((store) => store.logReducer.user);

  const handleLogButton = () => {
    dispatch(logout());
  };

  return (
    <Router>
      <div className="App">
        <Switch>
          {user.log ? (
            <Route path="/">
              {" "}
              <Link to="/">
                {" "}
                <button onClick={() => handleLogButton()}>logout</button>{" "}
              </Link>
              <br></br>
              bienvenido {user.user.userName}
              <br></br>
              email: {user.user.email}
            </Route>
          ) : (
            <Route path="/">
              {" "}
              <LogForm />
            </Route>
          )}
        </Switch>
      </div>
    </Router>
  );
}

export default App;

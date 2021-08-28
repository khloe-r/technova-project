import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

import Home from "./components/home";
import Login from "./components/login";
import Signup from "./components/signup";
import Articles from "./components/articlesearch";
import SelfAssess from "./components/selfassess";
import Dashboard from "./components/dashboard";
import AuthRoute from "./AuthRoute";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <Switch>
            <Route exact path="/" component={Home} />
            <AuthRoute exact path="/login" component={Login} />
            <AuthRoute exact path="/signup" component={Signup} />
            <AuthRoute exact path="/self-assessment" component={SelfAssess} />
            <AuthRoute exact path="/articles" component={Articles} />
            <AuthRoute exact path="/dashboard" component={Dashboard} />
          </Switch>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;

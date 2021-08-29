import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

import Navbar from "./components/Navbar";
import Home from "./components/home";
import Login from "./components/login";
import Signup from "./components/signup";
import Articles from "./components/articlesearch";
import SelfAssess from "./components/selfassess";
import Dashboard from "./components/dashboard";
import AuthRoute from "./AuthRoute";
import SymptomTracker from "./components/symptom";
import AssessmentChat from "./components/assessmentchat";
import FolderView from "./components/folderview";
import MyAccount from "./components/account";
import { AuthProvider } from "./contexts/AuthContext";
import { FiberPin } from "@material-ui/icons";

function App() {
  useEffect(() => {
    document.body.classList.add("background-body");
  }, []);
  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <AuthRoute exact path="/self-assessment" component={SelfAssess} />
            <AuthRoute exact path="/articles" component={Articles} />
            <AuthRoute exact path="/dashboard" component={Dashboard} />
            <AuthRoute exact path="/symptom-tracker" component={SymptomTracker} />
            <AuthRoute exact path="/my-assessment" component={AssessmentChat} />
            <AuthRoute exact path="/my-account" component={MyAccount} />
            <AuthRoute exact path="/my-folder/:id" component={FolderView} />
          </Switch>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;

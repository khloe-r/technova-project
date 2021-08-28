import React, { useState, useEffect, useRef } from "react";
import firebase from "../firebase";
import { useAuth } from "../contexts/AuthContext.js";
import { useHistory } from "react-router";
import { Button, Link, TextField } from "@material-ui/core";

export default function Login() {
  const { login } = useAuth();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("logging in");

    try {
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history.push("/dashboard");
    } catch {
      console.log("error");
    }
  }

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <TextField label="Email" variant="filled" inputRef={emailRef} />
        </div>
        <div>
          <TextField label="Password" type="password" variant="filled" inputRef={passwordRef} />
        </div>
        <Button variant="contained" type="submit">
          Login
        </Button>
        <div>
          Not a member? <Link href="/signup"> {"Sign Up"} </Link>
        </div>
      </form>
    </>
  );
}

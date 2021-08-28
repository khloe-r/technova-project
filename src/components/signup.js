import React, { useState, useEffect, useRef } from "react";
import firebase from "../firebase";
import { useAuth } from "../contexts/AuthContext.js";
import { useHistory } from "react-router";
import { TextField, Button } from "@material-ui/core";

export default function Signup() {
  const { signup } = useAuth();
  const emailRef = useRef();
  const passwordConfirmRef = useRef();
  const passwordRef = useRef();
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("signing up!");

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return console.log("error");
    }

    try {
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      history.push("/dashboard");
    } catch {
      console.log("error");
    }
  }

  return (
    <>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <TextField label="Email:" variant="filled" inputRef={emailRef} />
        </div>
        <div>
          <TextField label="Password" type="password" variant="filled" inputRef={passwordRef} />
        </div>
        <div>
          <TextField label="Comfirm password:" type="password" variant="filled" inputRef={passwordConfirmRef} />
        </div>
        <Button variant="contained" type="submit">
          Sign Up
        </Button>
      </form>
    </>
  );
}

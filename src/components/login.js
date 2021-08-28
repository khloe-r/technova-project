import React, { useState, useEffect } from "react";
import firebase from "../firebase";
import { useAuth } from "../contexts/AuthContext.js";
import { Button, TextField } from "@material-ui/core";

export default function Login() {
  const { login } = useAuth();

  function handleSubmit(e) {
    e.preventDefault();
    console.log("logging in");
  }
  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <TextField label="Username" variant="filled" />
        </div>
        <div>
          <TextField label="Password" variant="filled" />
        </div>
        <Button variant="contained" type="submit">
          Login
        </Button>
      </form>
    </>
  );
}

import React, { useState } from "react";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../firebase.js";
import { Button, Card } from "react-bootstrap";
import AuthDetails from "./authDetails";
// import axios from "axios";

const Login = () => {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState("");

  return (
    <Card
      bg="warning"
      text="white"
      className="mx-auto mt-5"
      style={{ maxWidth: "18rem" }}
    >
      <Card.Header>BadBank Login</Card.Header>
      <Card.Body>
        <div>{status}</div>
        {show ? (
          <LoginForm setShow={setShow} />
        ) : (
          <LoginMsg setShow={setShow} />
        )}
      </Card.Body>
    </Card>
  );
};

function LoginMsg(props) {
  return (
    <>
      <h5>Success</h5>
      <div>
        <AuthDetails />
      </div>
    </>
  );
}

function LoginForm(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handle(e) {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);

        // enter API call here
      })
      .catch((error) => {
        console.log(error);
      });

    props.setShow(false);
  }

  return (
    <>
      <h5>Please Log In</h5>
      Email
      <br />
      <input
        type="email"
        className="form-control"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.currentTarget.value)}
      />
      <br />
      Password
      <br />
      <input
        type="password"
        className="form-control"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.currentTarget.value)}
      />
      <br />
      <Button type="submit" className="btn btn-light" onClick={handle}>
        Login
      </Button>
    </>
  );
}

export default Login;

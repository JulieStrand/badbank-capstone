import React from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase.js";
import { Button, Card } from "react-bootstrap";
import axios from "axios";

function CreateAccount(e) {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState("");

  return (
    <Card
      bg="primary"
      text="white"
      className="mx-auto mt-5"
      style={{ maxWidth: "18rem" }}
    >
      <Card.Header>BadBank Create Account</Card.Header>
      <Card.Body>
        <Card.Title>Please create an account</Card.Title>
        <div>{status}</div>
        {show ? (
          <CreateForm setShow={setShow} />
        ) : (
          <CreateMsg setShow={setShow} />
        )}
      </Card.Body>
    </Card>
  );
}

function CreateMsg(props) {
  return (
    <>
      <h5>Success</h5>
      <Button
        type="submit"
        className="btn btn-light"
        onClick={() => props.setShow(true)}
      >
        Add another account
      </Button>
    </>
  );
}

function CreateForm(props) {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handle(e) {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        const url = `http://localhost:8000/account/create/${name}/${email}/${password}`;
        axios
          .get(url)
          .then((response) => {
            console.log("The results from our create operation are");
            console.log(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
    props.setShow(false);
  }

  return (
    <>
      Name
      <br />
      <input
        type="input"
        className="form-control"
        placeholder="Enter name"
        value={name}
        onChange={(e) => setName(e.currentTarget.value)}
      />
      <br />
      Email address
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
        Create Account
      </Button>
    </>
  );
}

export default CreateAccount;

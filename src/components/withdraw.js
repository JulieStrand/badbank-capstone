import React, { useState, useContext } from "react";
import { UserContext } from "./context";
import { Button, Card } from "react-bootstrap";
import axios from "axios";

function Withdraw() {
  const { user, balance, updateUserBalance } = useContext(UserContext);
  const [show, setShow] = useState(true);
  const [status, setStatus] = useState(true);

  return (
    <Card
      bg="danger"
      text="white"
      className="mx-auto mt-5"
      style={{ maxWidth: "18rem" }}
    >
      <Card.Header>Withdraw</Card.Header>
      <Card.Body>
        <div>{status}</div>
        {show ? (
          <WithdrawForm
            setShow={setShow}
            setStatus={setStatus}
            user={user}
            balance={balance}
            updateUserBalance={updateUserBalance}
          />
        ) : (
          <WithdrawMsg setShow={setShow} setStatus={setStatus} user={user} />
        )}
      </Card.Body>
    </Card>
  );
}

const WithdrawMsg = (props) => {
  const { balance } = useContext(UserContext);
  return (
    <>
      <h5>Success</h5>
      <br />
      <Button
        type="submit"
        className="btn btn-light"
        onClick={() => {
          props.setShow(true);
          props.setStatus("");
          props.setAmount("");
        }}
      >
        Withdraw again
      </Button>
      <br />
      <p>Current balance: ${balance}</p>
    </>
  );
};

const WithdrawForm = (props) => {
  const { user, balance, setBalance, updateUserBalance } =
    useContext(UserContext);
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState(true);
  const [show, setShow] = useState(true);

  function handle(e) {
    e.preventDefault();

    if (!amount || amount.length < 1 || amount <= 0)
      alert("Error: Please enter a valid amount");
    else if (isNaN(amount)) alert("Error: Please enter a valid number");
    else if (Number({ amount }) > Number({ balance }))
      alert("Error: insufficient funds");
    else {
      console.log(`withdrawing $${amount}`);
      const email = user.email;

      axios
        .get(`http://localhost:8000/account/update/${email}/-${amount}`)
        .then((response) => {
          console.log(response.data);
          setStatus(`Withdrawal of $${amount} was successful.`);
          updateUserBalance(response.data.balance);

          console.log(`New balance: $${response.data.balance}`);
        })
        .catch((err) => {
          setStatus("Withdrawal failed");
          console.log("err:", err);
        });
      props.setShow(false);
    }
  }

  return (
    <>
      <h5>Please make a withdrawal</h5>
      Amount
      <br />
      <input
        type="number"
        className="form-control"
        placeholder="Enter amount"
        value={amount}
        onChange={(e) => {
          setAmount(e.currentTarget.value);
          setStatus(false);
        }}
      />
      <br />
      <Button type="submit" className="btn btn-light" onClick={handle}>
        Withdraw
      </Button>
      <br /> <br />
      <p>Current balance: ${balance}</p>
    </>
  );
};

export default Withdraw;

// fetch(`/account/update/${email}/-${amount}`)
//   .then((response) => response.text())
//   .then((text) => {
//     try {
//       console.log(text);
//       const data = JSON.parse(text);
//       setBalance(data.value.balance);
//       setStatus(false);
//       // e.preventDefault();
//       setShow(false);
//       console.log(`New balance: $${data.value.balance}`);
//     } catch (err) {
//       setStatus("Withdrawal failed");
//       console.log("err:", text);
//     }
//

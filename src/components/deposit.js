import React, { useState, useContext } from "react";
import { UserContext } from "./context";
import { Button, Card } from "react-bootstrap";
import axios from "axios";

function Deposit() {
  const { user, balance, updateUserBalance } = useContext(UserContext);
  const [show, setShow] = useState(true);
  const [status, setStatus] = useState("");

  return (
    <Card
      bg="info"
      text="white"
      className="mx-auto mt-5"
      style={{ maxWidth: "18rem" }}
    >
      <Card.Header>Deposit</Card.Header>
      <Card.Body>
        <div>{status}</div>
        {show ? (
          <DepositForm
            setShow={setShow}
            setStatus={setStatus}
            user={user}
            balance={balance}
            updateUserBalance={updateUserBalance}
          />
        ) : (
          <DepositMsg setShow={setShow} setStatus={setStatus} user={user} />
        )}
      </Card.Body>
    </Card>
  );
}

const DepositMsg = (props) => {
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
        }}
      >
        Make another deposit
      </Button>
      <br />
      <p>Current balance: ${balance}</p>
    </>
  );
};

const DepositForm = (props) => {
  const { user, balance, updateUserBalance } = useContext(UserContext);
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("");
  const [show, setShow] = useState(true);

  function handle(e) {
    e.preventDefault();

    if (!amount || amount.length < 1 || amount <= 0) {
      alert("Error: Please enter a valid amount");
    } else if (isNaN(amount)) {
      alert("Error: Please enter a valid number");
    } else {
      console.log(`depositing $${amount}`);
      const email = user.email;

      axios
        .get(`http://localhost:8000/account/update/${email}/${amount}`)
        .then((response) => {
          console.log("making deposit...");
          console.log(response.data);
          console.log(`Deposit ${amount} to ${email}`);
          setStatus(`Deposit of $${amount} was successful.`);
          updateUserBalance(response.data.balance);
        })
        .catch((error) => {
          setStatus("Deposit failed. Please try again later.");
          console.log("err:", error);
        });
      props.setShow(false);
    }
  }

  return (
    <>
      <h5>Please make a deposit</h5>
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
        Deposit
      </Button>
      <br /> <br />
      <p>Current balance: ${balance}</p>
    </>
  );
};

export default Deposit;

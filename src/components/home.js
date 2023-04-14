import React from "react";
import { Button, Card } from "react-bootstrap";

function Home() {
  return (
    <Card
      bg="success"
      text="white"
      className="mx-auto mt-5"
      style={{ maxWidth: "30rem" }}
    >
      <Card.Header>BadBank Home</Card.Header>
      <Card.Body>
        <Card.Title>Welcome to BadBank</Card.Title>
        <Card.Text>You probably shouldn't use this bank</Card.Text>
        <Card.Img src="/bank.png" className="img-fluid" alt="Responsive" />
      </Card.Body>
    </Card>
  );
}

export default Home;

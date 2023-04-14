import React, { useState } from "react";

function AllData() {
  const [data, setData] = useState("");

  // useEffect hook, used only once
  React.useEffect(() => {
    // fetch all accounts from API
    fetch("http://localhost:8000/account/all")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setData(data);
      });
  }, []);

  // push selected data to array and format for table
  let content = [];
  for (let i = 0; i < data.length; i++) {
    content.push(
      <tr key={i}>
        <td key={"name" + i}>{data[i].name}</td>
        <td key={"email" + i}>{data[i].email}</td>
        <td key={"password" + i}>{data[i].password}</td>
        <td key={"balance" + i}>{data[i].balance}</td>
      </tr>
    );
  }

  return (
    <>
      <h2 style={{ margin: "1em" }}>All Data</h2>
      <div className="card" style={{ width: "35rem", margin: "2em" }}>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Password</th>
              <th scope="col">Balance</th>
            </tr>
          </thead>
          <tbody>{content}</tbody>
        </table>
      </div>
    </>
  );
}

export default AllData;

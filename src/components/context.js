import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/account/findOne/${user.email}`
        );
        setBalance(res.data.balance);
      } catch (error) {
        console.log(error);
      }
    };

    if (user) {
      fetchBalance();
    }
  }, [user]);

  const updateUserBalance = (newBalance) => {
    setBalance(newBalance);
  };

  return (
    <UserContext.Provider value={{ user, setUser, balance, updateUserBalance }}>
      {children}
    </UserContext.Provider>
  );
};

// Define the Card component outside of the state
// const Card = (props) => {
//   const classes = () => {
//     const bg = props.bgcolor ? " bg-" + props.bgcolor : " ";
//     const txt = props.txtcolor ? " text-" + props.txtcolor : " text-white";
//     return "card mb-3 " + bg + txt;
//   };

//   return (
//     <div className={classes()} style={{ maxWidth: "18rem" }}>
//       <div className="card-header">{props.header}</div>
//       <div className="card-body">
//         {props.title && <h5 className="card-title">{props.title}</h5>}
//         {props.text && <p className="card-text">{props.text}</p>}
//         {props.body}
//         {props.status && <div id="createStatus">{props.status}</div>}
//       </div>
//     </div>
//   );
// };

// class UserContext extends Component {

// Define methods to update the state as needed
// For example, a method to log in a user and update the loggedInUser property:
// login = (user) => {
//   this.setState({ loggedInUser: user });
// };

// A method to update the balance when a deposit is made:
// deposit = (amount) => {
//   this.setState({ balance: this.state.balance + amount });
// };

// A method to update the balance when a withdrawal is made:
// withdraw = (amount) => {
//   this.setState({ balance: this.state.balance - amount });
// };

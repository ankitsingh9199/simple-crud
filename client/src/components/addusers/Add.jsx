import React, { useState } from "react";
import "./Add.css";

import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Add = () => {
  const [user, setUser] = useState({
    fname: "",
    lname: "",
    email: "",
    // password: "",
  });

  const navigate = useNavigate();

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const submitForm = (e) => {
    e.preventDefault();
    axios.post("http://localhost:8000/api/create", user)
      .then((response) => {
        toast.success(response.data.msg, { position: "top-right" });
        navigate("/");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="adduser">
      <Link to={"/"} className="Backtohome">
        <i className="fa-solid fa-arrow-left"></i> Back
      </Link>
      <h3>Add New User</h3>
      <form className="addusergroup" onSubmit={submitForm}>
        <div className="inputgroup">
          <label htmlFor="fname">First Name</label>
          <input type="text" id="fname" name="fname" placeholder="Enter first name" onChange={inputHandler} required />
        </div>
        <div className="inputgroup">
          <label htmlFor="lname">Last Name</label>
          <input type="text" id="lname" name="lname" placeholder="Enter last name" onChange={inputHandler} required />
        </div>
        <div className="inputgroup">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" placeholder="Enter email" onChange={inputHandler} required />
        </div>
        {/* <div className="inputgroup">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" placeholder="Enter password" onChange={inputHandler} required />
        </div> */}
        <div className="inputgroup">
          <button type="submit">Add User</button>
        </div>
      </form>
    </div>
  );
};

export default Add;

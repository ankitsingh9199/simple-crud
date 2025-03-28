import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from "react-hot-toast";

const Edit = () => {
  const defaultUser = {
    fname: "",
    lname: "",
    email: "",
  };

  const { id } = useParams(); // URL se user ID milega
  const navigate = useNavigate(); // Update ke baad home page bhejne ke liye
  const [user, setUser] = useState(defaultUser); // User data store karne ke liye

  // Input field change handler
  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  // Component load hote hi user data fetch karega
  useEffect(() => {
    axios.get(`http://localhost:8000/api/getOne/${id}`)
      .then((response) => {
        console.log("Fetched user data:", response.data);  // Debug ke liye
        setUser(response.data); // Agar response.data me directly user data ho
        // Agar response.data.user ho toh setUser(response.data.user);
      })
      .catch((error) => {
        console.log("Error fetching user data:", error);
      });
  }, [id]);

  // Submit handler for updating user
  const handleSubmit = (e) => {
    e.preventDefault(); // Page reload se rokna

    axios.put(`http://localhost:8000/api/update/${id}`, user)
      .then((response) => {
        toast.success(response.data.msg, {position:"top-right"})
        navigate('/'); // Home page redirect
      })
      .catch((error) => {
        console.log("Update failed:", error);
      });
  };

  return (
    <div className='adduser'>
      <Link to={"/"} className='Backtohome'>
        <i className="fa-solid fa-person-walking-arrow-loop-left"></i>
      </Link>
      <h3 className='text-center text-dark'>Update User Details</h3>

      <form className='addusergroup' onSubmit={handleSubmit}>
        <div className='inputgroup'>
          <label htmlFor="fname">First Name:</label>
          <input
            type="text"
            id='fname'
            name="fname"
            value={user.fname}
            onChange={inputChangeHandler}
            className='fname'
            autoComplete='off'
            placeholder='First Name'
            required
          />
        </div>

        <div className='inputgroup'>
          <label htmlFor="lname">Last Name:</label>
          <input
            type="text"
            id='lname'
            name="lname"
            value={user.lname}
            onChange={inputChangeHandler}
            className='lname'
            autoComplete='off'
            placeholder='Last Name'
            required
          />
        </div>

        <div className='inputgroup'>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id='email'
            name="email"
            value={user.email}
            onChange={inputChangeHandler}
            className='email'
            autoComplete='off'
            placeholder='Email'
            required
          />
        </div>

        <div className='inputgroup'>
          <button type="submit">Update User</button>
        </div>
      </form>
    </div>
  );
};

export default Edit;

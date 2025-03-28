import React, { useEffect, useState } from "react";
import axios from "axios";
import "./User.css";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const User = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5; // Show 5 users per page

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/getall");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchData();
  }, []);

  // Calculate total pages
  const totalPages = Math.ceil(users.length / usersPerPage);
  
  // Get users for the current page
  const startIndex = (currentPage - 1) * usersPerPage;
  const endIndex = startIndex + usersPerPage;
  const currentUsers = users.slice(startIndex, endIndex);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!confirmDelete) return;

    try {
      const response = await axios.delete(
        `http://localhost:8000/api/delete/${id}`
      );

      setUsers(users.filter((user) => user._id !== id));
      toast.success(response.data.msg, { position: "top-right" });
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Failed to delete user.", { position: "top-right" });
    }
  };

  return (
    <div className="userTable">
      <Link to={"/add"} className="addbutton">
        <i className="fa-solid fa-plus"></i> Add User
      </Link>
      <table border="0" cellPadding="5" cellSpacing="0">
        <thead>
          <tr>
            <th>S.no.</th>
            <th>UserName</th>
            <th>Email</th>
            {/* <th>Password</th> */}
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user, index) => (
            <tr key={index}>
              <td>{startIndex + index + 1}</td>
              <td>{user.fname} {user.lname}</td>
              <td>{user.email}</td>
              {/* <td>{user.password}</td> */}
              <td>
                <div className="actionButton">
                  <Link to={`/edit/${user._id}`} className="editbutton">
                    <i className="fa-solid fa-pen-to-square"></i>
                  </Link>
                  <button onClick={() => handleDelete(user._id)} className="deletebutton">
                    <i className="fa-solid fa-trash-can"></i>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="pagination">
        <button 
          disabled={currentPage === 1} 
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Previous
        </button>
        <span> Page {currentPage} of {totalPages} </span>
        <button 
          disabled={currentPage === totalPages} 
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default User;

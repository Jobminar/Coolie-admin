import React, { useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { Search } from "react-bootstrap-icons";
import "./usercorner.css";

const UserManager = () => {
  const [selectedTab, setSelectedTab] = useState("Booked Users");

  const data = {
    "Booked Users": [
      {
        id: 401,
        name: "Varma",
        email: "example@gmail.com",
        phone: "123456789",
        joinDate: "Jan 29, 2021",
        level: "Bronze",
        points: 0,
        status: "active",
      },
    ],
    "New Users": [
      {
        id: 402,
        name: "Ravi",
        email: "example2@gmail.com",
        phone: "987654321",
        joinDate: "Feb 10, 2021",
        level: "Silver",
        points: 0,
        status: "active",
      },
    ],
    Bronze: [
      {
        id: 403,
        name: "Sita",
        email: "example3@gmail.com",
        phone: "1122334455",
        joinDate: "Mar 5, 2021",
        level: "Bronze",
        points: 0,
        status: "inactive",
      },
    ],
    Silver: [
      {
        id: 404,
        name: "Geeta",
        email: "example4@gmail.com",
        phone: "4455667788",
        joinDate: "Apr 2, 2021",
        level: "Silver",
        points: 0,
        status: "active",
      },
    ],
    Gold: [
      {
        id: 405,
        name: "Ram",
        email: "example5@gmail.com",
        phone: "9988776655",
        joinDate: "May 1, 2021",
        level: "Gold",
        points: 0,
        status: "inactive",
      },
    ],
  };

  return (
    <div className="user-manager-container">
      <div className="header">
        <h1>Add User</h1>
        <button>Add User</button>
        <div className="user-search-bar">
          <InputGroup>
            <Form.Control placeholder="Search" className="search-input" />
            <Search variant="outline-secondary" className="searching" />
          </InputGroup>
        </div>
      </div>
      <div className="tabs-container">
        {Object.keys(data).map((tab) => (
          <button
            key={tab}
            className={`tab-button ${selectedTab === tab ? "active" : ""}`}
            onClick={() => setSelectedTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="user-table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Customer Name</th>
              <th>Email Address</th>
              <th>Phone</th>
              <th>Join Date</th>
              <th>Loyalty Level</th>
              <th>Loyalty Points</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {data[selectedTab].map((user, index) => (
              <tr key={index}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.joinDate}</td>
                <td>{user.level}</td>
                <td>{user.points}</td>
                <td>
                  <span
                    className={`status-dot ${
                      user.status === "active" ? "active" : "inactive"
                    }`}
                  ></span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManager;

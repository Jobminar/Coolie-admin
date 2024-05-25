import React, { useState } from "react";
import "./usermanager.css"; // Add necessary CSS here

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
      // Add more booked users data here
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
      // Add more new users data here
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
      // Add more bronze users data here
    ],
  };

  return (
    <div className="usercornercontainer">
      <div className="tabs">
        {Object.keys(data).map((tab) => (
          <button
            key={tab}
            className={`tab ${selectedTab === tab ? "active" : ""}`}
            onClick={() => setSelectedTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="usertablecontainer">
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

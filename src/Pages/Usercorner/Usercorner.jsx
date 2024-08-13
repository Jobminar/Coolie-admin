import React, { useState, useEffect } from "react";
import { Search } from "react-bootstrap-icons";
import "./usercorner.css";
import { fetchOrderedUsers, fetchUsers } from "./api/api";

const UserManager = () => {
  const [selectedTab, setSelectedTab] = useState("All Users");
  const [allUsersData, setAllUsersData] = useState([]);
  const [bookedUsersData, setBookedUsersData] = useState([]);
  const [userOrdersCount, setUserOrdersCount] = useState({});
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [allUsersSearchQuery, setAllUsersSearchQuery] = useState("");
  const [bookedUsersSearchQuery, setBookedUsersSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data function
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log("Fetching data...");

      const [orders, users] = await Promise.all([
        fetchOrderedUsers(),
        fetchUsers(),
      ]);

      console.log("Orders:", orders);
      console.log("Users:", users);

      setAllUsersData(users);

      const orderCount = orders.reduce((acc, order) => {
        const userId = order.userId?._id;
        if (userId) {
          acc[userId] = (acc[userId] || 0) + 1;
        }
        return acc;
      }, {});

      setUserOrdersCount(orderCount);

      // Filter and set booked users data
      if (selectedTab === "Booked Users") {
        const bookedUserIds = orders
          .filter((order) => order.userId && order.userId._id)
          .map((order) => order.userId._id);

        const filteredUsers = users.filter((user) =>
          bookedUserIds.includes(user._id),
        );

        setBookedUsersData(
          filteredUsers.length
            ? filteredUsers
            : [{ message: "No users booked till now" }],
        );
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
      setError("An error occurred while fetching data.");
    } finally {
      setLoading(false);
    }
  };

  // Initial data fetch and polling setup
  useEffect(() => {
    fetchData();

    const interval = setInterval(() => {
      console.log("Polling for updates...");
      fetchData();
    }, 10000); // Adjust interval as needed

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [selectedTab]);

  // Filter users based on search query
  useEffect(() => {
    if (loading || error) return; // Skip filtering if loading or error

    const filteredData =
      selectedTab === "All Users" ? allUsersData : bookedUsersData;

    const searchQuery =
      selectedTab === "All Users"
        ? allUsersSearchQuery
        : bookedUsersSearchQuery;

    const searchLower = searchQuery.toLowerCase();

    const results = filteredData.filter((user) => {
      const phoneString = user.phone ? user.phone.toString() : "";
      return phoneString.toLowerCase().includes(searchLower);
    });

    console.log("Filtered Results:", results); // Debugging statement
    setFilteredUsers(results);
  }, [
    allUsersData,
    bookedUsersData,
    selectedTab,
    allUsersSearchQuery,
    bookedUsersSearchQuery,
    loading,
    error,
  ]);

  const handleSearchChange = (event) => {
    if (selectedTab === "All Users") {
      setAllUsersSearchQuery(event.target.value);
    } else if (selectedTab === "Booked Users") {
      setBookedUsersSearchQuery(event.target.value);
    }
  };

  const data = selectedTab === "All Users" ? filteredUsers : filteredUsers;

  return (
    <div className="user-manager-container">
      <div className="header">
        <h1>User Management</h1>
        <div className="user-search-bar">
          <input
            type="text"
            className="users-search-input"
            placeholder="Search by phone number..."
            value={
              selectedTab === "All Users"
                ? allUsersSearchQuery
                : bookedUsersSearchQuery
            }
            onChange={handleSearchChange}
          />
          <Search className="searching" />
        </div>
      </div>

      <div className="tabs-container">
        {[
          "All Users",
          "Booked Users",
          "New Users",
          "Bronze",
          "Silver",
          "Gold",
        ].map((tab) => (
          <button
            key={tab}
            className={`tab-button ${selectedTab === tab ? "active" : ""}`}
            onClick={() => setSelectedTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="loading">Loading...</div>
      ) : error ? (
        <div className="error">{error}</div>
      ) : (
        <div className="user-table-container">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email Address</th>
                <th>Phone</th>
                <th>Join Date</th>
                <th>Loyalty Level / Google ID</th>
                <th>Loyalty Points</th>
                <th>Orders Count</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {data.length === 1 && data[0].message ? (
                <tr>
                  <td colSpan="9" className="no-users-message">
                    {data[0].message}
                  </td>
                </tr>
              ) : (
                data.map((user, index) => (
                  <tr key={index}>
                    <td>{user._id || user.id}</td>
                    <td>{user.name || user.displayName || "N/A"}</td>
                    <td>{user.email || "N/A"}</td>
                    <td>{user.phone || "N/A"}</td>
                    <td>
                      {user.joinDate || new Date().toLocaleDateString("en-US")}
                    </td>
                    <td>{user.level || user.providerId || "N/A"}</td>
                    <td>{user.points !== undefined ? user.points : "N/A"}</td>
                    <td>{userOrdersCount[user._id] || 0}</td>
                    <td>
                      <span
                        className={`status-dot ${
                          user.status === "active" || user.phoneVerified
                            ? "active"
                            : "inactive"
                        }`}
                      ></span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserManager;

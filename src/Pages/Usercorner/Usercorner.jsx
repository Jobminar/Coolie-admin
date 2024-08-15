import React, { useState, useEffect, useMemo } from "react";
import "./usercorner.css";
import { fetchOrderedUsers, fetchUsers } from "./api/api";
import Header from "./Header";
import Tabs from "./Tabs";
import UserTable from "./UserTable";
import OrdersPopup from "./OrdersPopup"; // Import the new popup component

const UserManager = () => {
  const [selectedTab, setSelectedTab] = useState("All Users");
  const [allUsersData, setAllUsersData] = useState([]);
  const [bookedUsersData, setBookedUsersData] = useState([]);
  const [userOrdersCount, setUserOrdersCount] = useState({});
  const [allUsersSearchQuery, setAllUsersSearchQuery] = useState("");
  const [bookedUsersSearchQuery, setBookedUsersSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPopup, setShowPopup] = useState(false); // Track if popup is shown
  const [selectedUserOrders, setSelectedUserOrders] = useState([]); // Track selected user's orders

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [orders, users] = await Promise.all([
        fetchOrderedUsers(),
        fetchUsers(),
      ]);

      setAllUsersData(users);

      const orderCount = orders.reduce((acc, order) => {
        const userId = order.userId?._id;
        if (userId) {
          acc[userId] = (acc[userId] || 0) + 1;
        }
        return acc;
      }, {});

      setUserOrdersCount(orderCount);

      const bookedUserIds = new Set(
        orders
          .filter((order) => order.userId && order.userId._id)
          .map((order) => order.userId._id),
      );

      const filteredBookedUsers = users.filter((user) =>
        bookedUserIds.has(user._id),
      );

      setBookedUsersData(filteredBookedUsers);
    } catch (error) {
      setError("An error occurred while fetching data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRowClick = async (userId) => {
    try {
      const orders = await fetchOrderedUsers();
      const userOrders = orders.filter((order) => order.userId._id === userId);
      setSelectedUserOrders(userOrders);
      setShowPopup(true);
    } catch (error) {
      console.error("Failed to fetch user's orders:", error);
    }
  };

  const filteredUsers = useMemo(() => {
    if (loading || error) return [];

    let filteredData = [];
    if (selectedTab === "All Users") {
      filteredData = allUsersData;
    } else if (selectedTab === "Booked Users") {
      filteredData = bookedUsersData;
    } else if (selectedTab === "New Users") {
      filteredData = allUsersData.filter((user) => !userOrdersCount[user._id]);
    }

    const searchQuery =
      selectedTab === "All Users"
        ? allUsersSearchQuery
        : bookedUsersSearchQuery;

    return filteredData.filter((user) => {
      const phoneString = user.phone ? user.phone.toString() : "";
      return phoneString.toLowerCase().includes(searchQuery.toLowerCase());
    });
  }, [
    allUsersData,
    bookedUsersData,
    selectedTab,
    allUsersSearchQuery,
    bookedUsersSearchQuery,
    userOrdersCount,
    loading,
    error,
  ]);

  const handleSearchChange = (event) => {
    const value = event.target.value;
    if (selectedTab === "All Users") {
      setAllUsersSearchQuery(value);
    } else if (selectedTab === "Booked Users" || selectedTab === "New Users") {
      setBookedUsersSearchQuery(value);
    }
  };

  return (
    <div className="user-manager-container">
      <Header
        searchQuery={
          selectedTab === "All Users"
            ? allUsersSearchQuery
            : bookedUsersSearchQuery
        }
        onSearchChange={handleSearchChange}
      />
      <Tabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      <UserTable
        data={filteredUsers}
        loading={loading}
        error={error}
        userOrdersCount={userOrdersCount}
        onRowClick={handleRowClick} // Pass the row click handler
      />
      {showPopup && (
        <OrdersPopup
          orders={selectedUserOrders}
          onClose={() => setShowPopup(false)}
        />
      )}
    </div>
  );
};

export default UserManager;

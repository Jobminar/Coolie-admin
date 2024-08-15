import React, { useState } from "react";
import OrdersPopup from "./OrdersPopup"; // Ensure this path is correct

const UserTable = ({ data, loading, error, userOrdersCount }) => {
  const [selectedUserOrders, setSelectedUserOrders] = useState(null);
  const [showOrdersPopup, setShowOrdersPopup] = useState(false);

  const handleRowClick = async (userId) => {
    try {
      const response = await fetch(
        `https://api.coolieno1.in/v1.0/users/order/${userId}`,
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch orders for user ${userId}`);
      }
      const orders = await response.json();
      setSelectedUserOrders(orders);
      setShowOrdersPopup(true);
    } catch (error) {
      console.error("Error fetching user orders:", error);
      setSelectedUserOrders([]); // Handle errors by setting to an empty array
      setShowOrdersPopup(true);
    }
  };

  const closePopup = () => {
    setShowOrdersPopup(false);
    setSelectedUserOrders(null);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US");
  };

  return (
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
          {data.length === 0 ? (
            <tr>
              <td colSpan="9" className="no-users-message">
                No users found
              </td>
            </tr>
          ) : (
            data.map((user, index) => {
              const joinDate = user.createdAt
                ? formatDate(user.createdAt)
                : new Date().toLocaleDateString("en-US");

              return (
                <tr key={index} onClick={() => handleRowClick(user._id)}>
                  <td>{user._id || user.id}</td>
                  <td>{user.name || user.displayName || "N/A"}</td>
                  <td>{user.email || "N/A"}</td>
                  <td>{user.phone || "N/A"}</td>
                  <td>{joinDate}</td>
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
              );
            })
          )}
        </tbody>
      </table>

      {showOrdersPopup && selectedUserOrders && (
        <OrdersPopup orders={selectedUserOrders} onClose={closePopup} />
      )}
    </div>
  );
};

export default UserTable;

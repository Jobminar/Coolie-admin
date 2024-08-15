import React from "react";
import "./orderspopup.css";

const OrdersPopup = ({ orders, onClose }) => {
  if (!orders || !Array.isArray(orders)) {
    return null; // Early return if orders are not valid
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US");
  };

  return (
    <div className="orders-popup-overlay">
      <div className="orders-popup">
        <button className="orders-close-button" onClick={onClose}>
          &times;
        </button>
        <h2>User Orders</h2>
        {orders.length === 0 ? (
          <div>No orders found for this user.</div>
        ) : (
          <div className="scroll-container">
            <table>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>User ID</th>
                  <th>Payment ID</th>
                  <th>Category IDs</th>
                  <th>Sub-Category IDs</th>
                  <th>Items</th>
                  <th>Created At</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.userId?._id || "N/A"}</td>
                    <td>{order.paymentId || "N/A"}</td>
                    <td>
                      {order.categoryIds && order.categoryIds.length > 0
                        ? order.categoryIds.join(", ")
                        : "N/A"}
                    </td>
                    <td>
                      {order.subCategoryIds && order.subCategoryIds.length > 0
                        ? order.subCategoryIds.join(", ")
                        : "N/A"}
                    </td>
                    <td>
                      {order.items && order.items.length > 0 ? (
                        <table>
                          <thead>
                            <tr>
                              <th>Item ID</th>
                              <th>Category Name</th>
                              <th>Sub-Category Name</th>
                              <th>Quantity</th>
                              <th>Selected Date</th>
                              <th>Selected Time</th>
                              <th>Selected Month</th>
                            </tr>
                          </thead>
                          <tbody>
                            {order.items.map((item) => (
                              <tr key={item._id}>
                                <td>{item._id}</td>
                                <td>{item.categoryId?.name || "N/A"}</td>
                                <td>{item.subCategoryId?.name || "N/A"}</td>
                                <td>{item.quantity || "N/A"}</td>
                                <td>{item.selectedDate || "N/A"}</td>
                                <td>{item.selectedTime || "N/A"}</td>
                                <td>{item.selectedMonth || "N/A"}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      ) : (
                        "N/A"
                      )}
                    </td>
                    <td>{formatDate(order.createdAt) || "N/A"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPopup;

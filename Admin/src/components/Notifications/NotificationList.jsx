import React, { useEffect, useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./NotificationList.css";

const NotificationList = () => {
  const [notifications, setNotifications] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [activeTab, setActiveTab] = useState("users");

  useEffect(() => {
    const fetchNotifications = async () => {
      const response = await axios.get("http://localhost:5000/notifications");
      setNotifications(response.data);
    };

    fetchNotifications();
  }, [selectedDate, activeTab]);

  const filteredNotifications = notifications.filter((notification) =>
    activeTab === "users"
      ? notification.userType === "user"
      : notification.userType === "provider",
  );

  return (
    <div className="notification-list">
      <h2>Notifications</h2>
      <div className="notification-tabs">
        <div className="tabs-container">
          <button
            className={`notification-tab ${
              activeTab === "users" ? "active" : ""
            }`}
            onClick={() => setActiveTab("users")}
          >
            Users
          </button>
          <button
            className={`notification-tab ${
              activeTab === "providers" ? "active" : ""
            }`}
            onClick={() => setActiveTab("providers")}
          >
            Providers
          </button>
        </div>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          className="notification-date-picker"
        />
      </div>
      <div className="notification-items">
        {filteredNotifications.map((notification, index) => (
          <div key={index} className="notification-item">
            <div>{notification.date}</div>
            <div>{notification.time}</div>
            <div>{notification.userName}</div>
            <div>{notification.address}</div>
            <div>Service: {notification.service}</div>
            <div>₹ {notification.price}</div>
            <div>
              Status: {notification.status} by {notification.provider}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationList;

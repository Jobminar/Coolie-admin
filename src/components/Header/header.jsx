import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import SearchInput from "./search";
import logoimg from "../Images/brand-logo.png";
import "./header.css";

const Header = () => {
  const [isNotificationActive, setIsNotificationActive] = useState(false);
  const location = useLocation();

  // Check if the current path is '/notifications' and set the state accordingly
  React.useEffect(() => {
    if (location.pathname === "/notifications") {
      setIsNotificationActive(true);
    } else {
      setIsNotificationActive(false);
    }
  }, [location.pathname]);

  return (
    <div className="main-header">
      <div className="logo-section">
        <img src={logoimg} alt="logo" />
      </div>
      <div className="logic-section">
        <SearchInput />
      </div>
      <div className="notification-section">
        <Person2OutlinedIcon
          style={{
            fontSize: 30,
            border: "1px solid white",
            borderRadius: "50%",
            padding: "5px",
          }}
        />
        <Link
          to="/notifications"
          className={
            isNotificationActive ? "active-notification" : "notification-link"
          }
        >
          <NotificationsNoneOutlinedIcon
            style={{
              fontSize: 30,
              border: isNotificationActive
                ? "1px solid green"
                : "1px solid white",
              borderRadius: "50%",
              padding: "5px",
              color: isNotificationActive ? "green" : "white",
            }}
          />
        </Link>
      </div>
    </div>
  );
};

export default Header;

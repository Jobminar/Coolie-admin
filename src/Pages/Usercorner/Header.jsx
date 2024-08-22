import React from "react";
import { Search } from "react-bootstrap-icons";

const Header = ({ searchQuery, onSearchChange }) => {
  return (
    <div className="header">
      <h3>User Management</h3>
      <div className="user-search-bar">
        <input
          type="text"
          className="users-search-input"
          placeholder="Search by phone number..."
          value={searchQuery}
          onChange={onSearchChange}
        />
        <Search className="searching" />
      </div>
    </div>
  );
};

export default Header;

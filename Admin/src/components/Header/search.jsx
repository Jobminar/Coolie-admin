import React from 'react';
import { FaSearch } from 'react-icons/fa';
import './search.css';

const SearchInput = () => {
  return (
    <div className="search-container">
      <input type="text" className="search-input" placeholder="Search" />
      <FaSearch className="search-icon" />
    </div>
  );
};

export default SearchInput;

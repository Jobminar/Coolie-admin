import React, { createContext, useState } from "react";
import PropTypes from "prop-types";

export const FilterBarContext = createContext();

export const FilterBarProvider = ({ children }) => {
  const [filterBarProps, setFilterBarProps] = useState({
    activeComponent: "",
    activeComponentState: "",
    setActiveComponentState: () => {},
    showProviderButtons: true,
  });

  return (
    <FilterBarContext.Provider value={{ filterBarProps, setFilterBarProps }}>
      {children}
    </FilterBarContext.Provider>
  );
};

FilterBarProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

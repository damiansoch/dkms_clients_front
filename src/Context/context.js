import React, { createContext, useState } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [searchBy, setSearchBy] = useState('a');
  const [searchVisible, setSearchVisible] = useState(true);
  const [initialSearchArray, setInitialSearchArray] = useState([]);
  const [resultSearchArray, setResultSearchArray] =
    useState(initialSearchArray);
  // Add more variables as needed

  const updateSearchBy = (newValue) => {
    setSearchBy(newValue);
  };

  const updateSearchVisibility = (newValue) => {
    setSearchVisible(newValue);
  };

  const updateInitialSearchArray = (newValue) => {
    setInitialSearchArray(newValue);
  };

  const updateResultSearchArray = (newValue) => {
    setResultSearchArray(newValue);
  };

  // More update functions as needed

  return (
    <AppContext.Provider
      value={{
        searchBy,
        searchVisible,
        initialSearchArray,
        resultSearchArray,
        updateSearchBy,
        updateSearchVisibility,
        updateInitialSearchArray,
        updateResultSearchArray,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;

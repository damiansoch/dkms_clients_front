import React, { createContext, useState } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [searchBy, setSearchBy] = useState('');
  const [searchVisible, setSearchVisible] = useState(false);
  const [initialSearchArray, setInitialSearchArray] = useState([]);
  const [resultSearchArray, setResultSearchArray] = useState([]);

  //   console.log('searching by: ' + searchBy);
  //   console.log('search visible: ' + searchVisible);
  //   console.log('initial array: ');
  //   console.log(initialSearchArray);
  //   console.log('result array: ');
  //   console.log(resultSearchArray);

  // Add more variables as needed

  const updateSearchBy = (newValue) => {
    setSearchBy(newValue);
  };

  const updateSearchVisibility = (newValue) => {
    setSearchVisible(newValue);
  };

  const updateInitialSearchArray = (newValue) => {
    setInitialSearchArray(newValue);
    updateResultSearchArray(newValue);
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

import React, {createContext, useContext, useState} from "react";

const NavbarContext = createContext();

export const NavbarProvider = ({children}) => {
  const [showNavbar, setShowNavbar] = useState(true);

  const toggleNavbar = () => {
    setShowNavbar((prev) => !prev);
  };

  return (
    <NavbarContext.Provider value={{showNavbar, toggleNavbar}}>
      {children}
    </NavbarContext.Provider>
  );
};

export const useNavbar = () => {
  return useContext(NavbarContext);
};

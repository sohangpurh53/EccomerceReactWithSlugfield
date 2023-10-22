import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [accessToken] = useState(localStorage.getItem('access_token') || '');

 // Check if there is an accessToken

  return (
    <AuthContext.Provider value={{ accessToken}}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  return useContext(AuthContext);
};

export { AuthProvider, useAuth };

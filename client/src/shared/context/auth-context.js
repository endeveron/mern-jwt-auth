import React, { createContext, useContext } from 'react';

import { useAuth } from '../hooks/useAuth';

const AuthContext = createContext({
  isLoggedIn: false,
  token: null,
  userId: null,
  login: () => { },
  logout: () => { }
});

export const useAuthContext = () => {
  return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {

  const { userId, token, login, logout } = useAuth();

  return (
    <AuthContext.Provider value={ {
      isLoggedIn: !!token,
      token,
      userId,
      login,
      logout
    } }>
      {children }
    </AuthContext.Provider>
  )
}
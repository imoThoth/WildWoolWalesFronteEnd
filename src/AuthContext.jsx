import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { api, setAccessToken as setApiAccessToken } from './api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [accessToken, setAccessTokenState] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [user, setUser] = useState(null);

  const register = useCallback(async (payload) => {
    // Does NOT log the user in — email still needs verifying.
    return api.register(payload);
  }, []);

  const login = useCallback(async (identifier, password) => {
    const data = await api.login({ identifier, password });
    setAccessTokenState(data.accessToken);
    setApiAccessToken(data.accessToken);
    setRefreshToken(data.refreshToken);
    setUser(data.user);
    return data.user;
  }, []);

  const logout = useCallback(async () => {
    if (refreshToken) {
      api.logout(refreshToken).catch(() => {});
    }
    setAccessTokenState(null);
    setApiAccessToken(null);
    setRefreshToken(null);
    setUser(null);
  }, [refreshToken]);

  const value = {
    accessToken,
    user,
    isAuthenticated: !!accessToken,
    register,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}
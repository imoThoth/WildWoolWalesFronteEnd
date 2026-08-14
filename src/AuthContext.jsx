import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { api, setAccessToken as setApiAccessToken } from './api'

const AuthContext = createContext(null)

const STORAGE_KEY = 'wwwSession'

function loadStoredSession() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function persistSession(accessToken, refreshToken, user) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ accessToken, refreshToken, user }))
}

function clearStoredSession() {
  localStorage.removeItem(STORAGE_KEY)
}

export function AuthProvider({ children }) {
  const stored = loadStoredSession()

  const [accessToken, setAccessTokenState] = useState(stored?.accessToken ?? null)
  const [refreshToken, setRefreshToken] = useState(stored?.refreshToken ?? null)
  const [user, setUser] = useState(stored?.user ?? null)
  const [ready, setReady] = useState(false)

  // On mount: if we have a stored token, confirm it's still valid by
  // calling /auth/me. If it's expired, try a refresh. If both fail, log out.
  useEffect(() => {
    async function restore() {
      if (stored?.accessToken) {
        setApiAccessToken(stored.accessToken)
        try {
          const freshUser = await api.me()
          setUser(freshUser)
        } catch {
          // Access token expired — try the refresh token
          if (stored.refreshToken) {
            try {
              const data = await api.refresh(stored.refreshToken)
              setAccessTokenState(data.accessToken)
              setApiAccessToken(data.accessToken)
              setRefreshToken(data.refreshToken)
              setUser(data.user)
              persistSession(data.accessToken, data.refreshToken, data.user)
            } catch {
              clearStoredSession()
              setAccessTokenState(null)
              setApiAccessToken(null)
              setRefreshToken(null)
              setUser(null)
            }
          } else {
            clearStoredSession()
            setAccessTokenState(null)
            setApiAccessToken(null)
            setUser(null)
          }
        }
      }
      setReady(true)
    }
    restore()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const register = useCallback(async (payload) => {
    return api.register(payload)
  }, [])

  const login = useCallback(async (identifier, password) => {
    const data = await api.login({ identifier, password })
    setAccessTokenState(data.accessToken)
    setApiAccessToken(data.accessToken)
    setRefreshToken(data.refreshToken)
    setUser(data.user)
    persistSession(data.accessToken, data.refreshToken, data.user)
    return data.user
  }, [])

  const logout = useCallback(async () => {
    if (refreshToken) {
      api.logout(refreshToken).catch(() => {})
    }
    setAccessTokenState(null)
    setApiAccessToken(null)
    setRefreshToken(null)
    setUser(null)
    clearStoredSession()
  }, [refreshToken])

  const value = {
    accessToken,
    user,
    isAuthenticated: !!accessToken,
    ready,
    register,
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>')
  return ctx
}
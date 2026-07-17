import { useState } from 'react'
import { X } from 'lucide-react'
import { useAuth } from './AuthContext'
import { ApiError } from './api'

export default function LoginModal({ onClose, onLogin, onSwitchToRegister  }) {
  const { login } = useAuth()
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    if (!identifier.trim() || !password.trim()) {
      setError('Please enter your username/email and password.')
      return
    }
    setError('')
    setLoading(true)
    try {
      const loggedInUser = await login(identifier.trim(), password)
      onLogin(loggedInUser)
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Sign in failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const backdropStyle = { background: 'rgba(28, 25, 21, 0.55)', backdropFilter: 'blur(6px)' }
  const modalStyle = { background: '#FAF6ED', border: '1px solid #1C1915' }
  const labelStyle = { color: '#7A6F5C', fontFamily: '"Newsreader", serif' }
  const inputStyle = {
    borderBottom: '1px solid #1C1915',
    fontFamily: '"Newsreader", serif',
    fontSize: '1.05rem',
    color: '#1C1915',
  }
  const errorStyle = { color: '#9C3F2D', fontFamily: '"Newsreader", serif' }
  const buttonStyle = {
    background: loading ? '#7A6F5C' : '#1C1915',
    color: '#FAF6ED',
    fontFamily: '"Newsreader", serif',
    cursor: loading ? 'not-allowed' : 'pointer',
  }
  const titleStyle = { fontFamily: '"Fraunces", serif', fontWeight: 400, color: '#1C1915' }
  const subtitleStyle = { color: '#5A5142', fontFamily: '"Newsreader", serif' }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={backdropStyle}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md p-10"
        style={modalStyle}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1"
          aria-label="Close"
        >
          <X size={18} style={{ color: '#1C1915' }} />
        </button>

        <p className="text-xs uppercase tracking-[0.3em] mb-2" style={labelStyle}>
          Welcome back
        </p>
        <h2 className="text-4xl mb-6 leading-none" style={titleStyle}>
          Sign in
        </h2>
        <p className="text-sm mb-8 leading-relaxed" style={subtitleStyle}>
          Sign in to keep track of orders and the makers you've followed.
        </p>

        <div className="space-y-5">
          <div>
            <label className="block text-xs uppercase tracking-widest mb-2" style={labelStyle}>
              Username or email
            </label>
            <input
              type="text"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              disabled={loading}
              className="w-full px-0 py-2 bg-transparent outline-none"
              style={inputStyle}
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest mb-2" style={labelStyle}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              disabled={loading}
              className="w-full px-0 py-2 bg-transparent outline-none"
              style={inputStyle}
            />
          </div>
          {error && <p className="text-sm" style={errorStyle}>{error}</p>}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full py-3 mt-4 text-sm uppercase tracking-[0.25em]"
            style={buttonStyle}
          >
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
            <p className="text-sm text-center pt-2" style={subtitleStyle}>
                New here?{' '}
                <span
                  onClick={onSwitchToRegister}
                  style={{ color: '#1C1915', fontFamily: '"Newsreader", serif', textDecoration: 'underline', cursor: 'pointer' }}
                >
                  Create an account
                </span>
            </p>
        </div>
      </div>
    </div>
  )
}
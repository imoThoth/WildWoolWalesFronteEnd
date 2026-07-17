import { useState } from 'react'
import { api, ApiError } from './api'

export default function CheckEmailScreen({ email, onClose }) {
  const [resent, setResent] = useState(false)
  const [error, setError] = useState('')

  const handleResend = async () => {
    setError('')
    try {
      await api.resendVerification(email)
      setResent(true)
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Something went wrong.')
    }
  }

  const backdropStyle = { background: 'rgba(28, 25, 21, 0.55)', backdropFilter: 'blur(6px)' }
  const modalStyle = { background: '#FAF6ED', border: '1px solid #1C1915' }
  const labelStyle = { color: '#7A6F5C', fontFamily: '"Newsreader", serif' }
  const titleStyle = { fontFamily: '"Fraunces", serif', fontWeight: 400, color: '#1C1915' }
  const bodyStyle = { color: '#3A352B', fontFamily: '"Newsreader", serif' }
  const errorStyle = { color: '#9C3F2D', fontFamily: '"Newsreader", serif' }
  const buttonStyle = { background: '#1C1915', color: '#FAF6ED', fontFamily: '"Newsreader", serif' }
  const linkStyle = { color: '#1C1915', fontFamily: '"Newsreader", serif', textDecoration: 'underline', cursor: 'pointer' }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={backdropStyle}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md p-10 text-center"
        style={modalStyle}
        onClick={(e) => e.stopPropagation()}
      >
        <p className="text-xs uppercase tracking-[0.3em] mb-2" style={labelStyle}>
          Almost there
        </p>
        <h2 className="text-3xl mb-6 leading-tight" style={titleStyle}>
          Check your email
        </h2>
        <p className="text-sm mb-8 leading-relaxed" style={bodyStyle}>
          We sent a verification link to <strong>{email}</strong>. Click it to activate your account, then sign in.
        </p>

        {resent && <p className="text-sm mb-4" style={bodyStyle}>Verification email resent.</p>}
        {error && <p className="text-sm mb-4" style={errorStyle}>{error}</p>}

        <button
          onClick={handleResend}
          className="w-full py-3 text-sm uppercase tracking-[0.25em]"
          style={buttonStyle}
        >
          Resend email
        </button>

        <p className="text-sm mt-6" style={bodyStyle}>
          <span onClick={onClose} style={linkStyle}>Close</span>
        </p>
      </div>
    </div>
  )
}
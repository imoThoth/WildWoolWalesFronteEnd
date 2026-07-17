import { useState } from 'react'
import { X } from 'lucide-react'
import { useAuth } from './AuthContext'
import { ApiError } from './api'

export default function RegisterModal({ onClose, onRegistered, onSwitchToLogin }) {
  const { register } = useAuth()
  const [form, setForm] = useState({
    name: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    phoneNumber: '',
    streetAddress: '',
    city: '',
    county: '',
    postcode: '',
  })
  const [fieldErrors, setFieldErrors] = useState({})
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setFieldErrors({})
    setLoading(true)

    try {
      await register(form)
      onRegistered(form.email)
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message)
        setFieldErrors(err.fieldErrors ?? {})
      } else {
        setError('Something went wrong. Please try again.')
      }
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
  const fieldErrorStyle = { color: '#9C3F2D', fontFamily: '"Newsreader", serif', fontSize: '0.75rem' }
  const buttonStyle = {
    background: loading ? '#7A6F5C' : '#1C1915',
    color: '#FAF6ED',
    fontFamily: '"Newsreader", serif',
    cursor: loading ? 'not-allowed' : 'pointer',
  }
  const titleStyle = { fontFamily: '"Fraunces", serif', fontWeight: 400, color: '#1C1915' }
  const subtitleStyle = { color: '#5A5142', fontFamily: '"Newsreader", serif' }
  const linkStyle = { color: '#1C1915', fontFamily: '"Newsreader", serif', textDecoration: 'underline', cursor: 'pointer' }

  const field = (name, placeholder, type = 'text', required = true) => (
    <div>
      <label className="block text-xs uppercase tracking-widest mb-2" style={labelStyle}>
        {placeholder}
      </label>
      <input
        type={type}
        name={name}
        value={form[name]}
        onChange={handleChange}
        disabled={loading}
        required={required}
        className="w-full px-0 py-2 bg-transparent outline-none"
        style={inputStyle}
      />
      {fieldErrors[name] && <p className="mt-1" style={fieldErrorStyle}>{fieldErrors[name]}</p>}
    </div>
  )

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={backdropStyle}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md p-10 max-h-[90vh] overflow-y-auto"
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
          Join us
        </p>
        <h2 className="text-4xl mb-6 leading-none" style={titleStyle}>
          Create an account
        </h2>
        <p className="text-sm mb-8 leading-relaxed" style={subtitleStyle}>
          Register to track orders and follow the makers you love.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && <p className="text-sm" style={errorStyle}>{error}</p>}

          {field('name', 'First name')}
          {field('lastName', 'Last name')}
          {field('username', 'Username')}
          {field('email', 'Email', 'email')}
          {field('password', 'Password (12+ characters)', 'password')}
          {field('phoneNumber', 'Phone (+447700900123)')}
          {field('streetAddress', 'Street address')}
          {field('city', 'City')}
          {field('county', 'County (optional)', 'text', false)}
          {field('postcode', 'Postcode')}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 mt-4 text-sm uppercase tracking-[0.25em]"
            style={buttonStyle}
          >
            {loading ? 'Creating account…' : 'Register'}
          </button>

          <p className="text-sm text-center pt-2" style={subtitleStyle}>
            Already have an account?{' '}
            <span onClick={onSwitchToLogin} style={linkStyle}>
              Sign in
            </span>
          </p>
        </form>
      </div>
    </div>
  )
}
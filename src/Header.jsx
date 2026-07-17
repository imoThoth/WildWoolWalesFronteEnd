import { useState, useRef, useEffect } from 'react'
import { ShoppingBag, User, ChevronDown } from 'lucide-react'

function UserMenu({ user, onLogout }) {
  const [open, setOpen] = useState(false)
  const menuRef = useRef(null)

  // Close the dropdown when clicking anywhere outside it
  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5"
        aria-haspopup="true"
        aria-expanded={open}
      >
        <span
          className="text-sm hidden sm:inline"
          style={{ color: '#1C1915', fontFamily: '"Newsreader", serif', fontStyle: 'italic' }}
        >
          Hello, {user.username}
        </span>
        <ChevronDown
          size={14}
          style={{
            color: '#1C1915',
            transition: 'transform 0.15s ease',
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
        />
      </button>

      {open && (
        <div
          className="absolute right-0 mt-3 min-w-[160px] py-2 z-40"
          style={{ background: '#FAF6ED', border: '1px solid #1C1915' }}
        >
          <button
            onClick={() => {
              setOpen(false)
              onLogout()
            }}
            className="w-full text-left px-4 py-2 text-xs uppercase tracking-widest transition-colors"
            style={{ color: '#1C1915', fontFamily: '"Newsreader", serif' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#1C1915'
              e.currentTarget.style.color = '#FAF6ED'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.color = '#1C1915'
            }}
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  )
}

export default function Header({ user, onLogin, onLogout, cartCount, onOpenCart, onHome }) {
  return (
    <header
      className="sticky top-0 z-30 px-8 py-5 flex items-center justify-between"
      style={{
        background: 'rgba(250, 246, 237, 0.92)',
        backdropFilter: 'blur(8px)',
        borderBottom: '1px solid #D5CBB6',
      }}
    >
      <button onClick={onHome} className="flex flex-col items-start">
        <span
          className="text-2xl leading-none"
          style={{
            fontFamily: '"Fraunces", serif',
            fontWeight: 400,
            fontVariationSettings: '"opsz" 144, "SOFT" 100',
            color: '#1C1915',
            letterSpacing: '-0.02em',
          }}
        >
          Wild Wool Wales
        </span>
        <span
          className="text-[10px] uppercase tracking-[0.3em] mt-1"
          style={{ color: '#7A6F5C', fontFamily: '"Newsreader", serif' }}
        >
          Hand-knit, slowly
        </span>
      </button>

      <nav className="flex items-center gap-6">
        {user ? (
          <UserMenu user={user} onLogout={onLogout} />
        ) : (
          <button
            onClick={onLogin}
            className="flex items-center gap-2 text-xs uppercase tracking-widest"
            style={{ color: '#1C1915', fontFamily: '"Newsreader", serif' }}
          >
            <User size={14} />
            Sign in
          </button>
        )}

        <button onClick={onOpenCart} className="relative flex items-center gap-2" aria-label="Open cart">
          <ShoppingBag size={18} style={{ color: '#1C1915' }} />
          {cartCount > 0 && (
            <span
              className="absolute -top-2 -right-3 text-[10px] w-4 h-4 flex items-center justify-center"
              style={{
                background: '#9C3F2D',
                color: '#FAF6ED',
                borderRadius: '50%',
                fontFamily: '"Newsreader", serif',
              }}
            >
              {cartCount}
            </span>
          )}
        </button>
      </nav>
    </header>
  )
}
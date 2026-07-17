import { useState, useEffect } from "react"
import Header from "./Header"
import Hero from "./Hero"
import Footer from "./Footer"
import CartDrawer from "./CartDrawer"
import LoginModal from "./LoginModal"
import RegisterModal from "./RegisterModal"
import CheckEmailScreen from "./CheckEmailScreen"
import VerifyEmailView from "./VerifyEmailView"
import CheckoutResultView from "./CheckoutResultsView"
import ProductGrid from "./products/ProductGrid"
import ProductDetail from "./products/ProductDetail"
import { AuthProvider, useAuth } from "./AuthContext"
import { api, ApiError } from "./api"

// The outer shell — only job is to provide auth context
export default function App() {
  return (
    <AuthProvider>
      <ShopApp />
    </AuthProvider>
  )
}

function ShopApp() {
  const { user, logout } = useAuth()

  // Auth-flow UI state (modals/screens, not auth data itself — that's in context)
  const [authView, setAuthView] = useState(null) // null | 'login' | 'register' | 'checkEmail'
  const [pendingEmail, setPendingEmail] = useState('')
  const [pendingBuy, setPendingBuy] = useState(null)

  // View / navigation
  const [view, setView] = useState('shop')
  const [selectedProduct, setSelectedProduct] = useState(null)

  // Email verification landing state
  const [verifyStatus, setVerifyStatus] = useState(null) // null | 'verifying' | 'success' | 'error'
  const [verifyError, setVerifyError] = useState('')

  // Cart
  const [cart, setCart] = useState([])
  const [cartOpen, setCartOpen] = useState(false)

  // Checkout
  const [checkoutLoading, setCheckoutLoading] = useState(false)
  const [checkoutError, setCheckoutError] = useState('')

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  // ── URL-driven entry points (email links, Stripe redirects) ─
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const path = window.location.pathname

    if (path === '/verify-email') {
      const token = params.get('token')
      if (token) {
        setView('verify')
        setVerifyStatus('verifying')
        api.verifyEmail(token)
          .then(() => setVerifyStatus('success'))
          .catch((err) => {
            setVerifyStatus('error')
            setVerifyError(err instanceof ApiError ? err.message : 'Verification failed')
          })
      }
      return
    }

    if (path === '/checkout/success') {
      setView('checkoutSuccess')
      return
    }

    if (path === '/checkout/cancel') {
      setView('checkoutCancel')
      return
    }
  }, [])

  // ── Navigation ─────────────────────────────────────────────
  const handleSelectProduct = (product) => {
    setSelectedProduct(product)
    setView('product')
    window.scrollTo(0, 0)
  }

  const handleBack = () => {
    setView('shop')
    setSelectedProduct(null)
  }

  // ── Cart ───────────────────────────────────────────────────
  const handleAddToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id)
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prev, { ...product, quantity: 1 }]
    })
    setCartOpen(true)
  }

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      setCart((prev) => prev.filter((item) => item.id !== id))
    } else {
      setCart((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      )
    }
  }

  // ── Auth ───────────────────────────────────────────────────
  const handleLogin = (loggedInUser) => {
    setAuthView(null)
    if (pendingBuy) {
      const product = pendingBuy
      setPendingBuy(null)
      finalizeCheckout([{ ...product, quantity: 1 }])
    }
  }

  const handleRegistered = (email) => {
    setPendingEmail(email)
    setAuthView('checkEmail')
  }

  const handleLogout = async () => {
    await logout()
    setCart([])
  }

  // ── Checkout ───────────────────────────────────────────────
  const handleBuyNow = (product) => {
    if (!user) {
      setPendingBuy(product)
      setAuthView('login')
      return
    }
    finalizeCheckout([{ ...product, quantity: 1 }])
  }

  const handleCheckout = () => {
    if (!user) {
      setAuthView('login')
      return
    }
    finalizeCheckout(cart)
  }

  const finalizeCheckout = async (items) => {
    setCheckoutError('')
    setCheckoutLoading(true)

    try {
      const checkoutItems = items.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
      }))

      const response = await api.checkout(checkoutItems)

      // Full browser navigation — Stripe's hosted page is not part of this app.
      window.location.href = response.checkoutUrl
    } catch (err) {
      setCheckoutError(err instanceof ApiError ? err.message : 'Checkout failed. Please try again.')
      setCheckoutLoading(false)
    }
  }

  const handleContinueBrowsing = () => {
    setView('shop')
    setSelectedProduct(null)
    window.history.replaceState({}, '', '/')
  }

  return (
    <div style={{ background: '#FAF6ED', minHeight: '100vh' }}>
      <Header
        user={user}
        onLogin={() => setAuthView('login')}
        onLogout={handleLogout}
        cartCount={cartCount}
        onOpenCart={() => setCartOpen(true)}
      />

      {view === 'shop' && (
        <>
          <Hero />
          <ProductGrid
            onSelectProduct={handleSelectProduct}
            onAddToCart={handleAddToCart}
          />
        </>
      )}

      {view === 'product' && selectedProduct && (
        <ProductDetail
          product={selectedProduct}
          onBack={handleBack}
          onAddToCart={handleAddToCart}
          onBuyNow={handleBuyNow}
          loading={checkoutLoading}
        />
      )}

      {view === 'verify' && (
        <VerifyEmailView
          status={verifyStatus}
          error={verifyError}
          onGoToShop={handleContinueBrowsing}
        />
      )}

      {view === 'checkoutSuccess' && (
        <CheckoutResultView
          status="success"
          onGoToShop={handleContinueBrowsing}
        />
      )}

      {view === 'checkoutCancel' && (
        <CheckoutResultView
          status="cancel"
          onGoToShop={handleContinueBrowsing}
        />
      )}

      <Footer />

      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        updateQuantity={updateQuantity}
        onCheckout={handleCheckout}
        loading={checkoutLoading}
        error={checkoutError}
      />

      {authView === 'login' && (
        <LoginModal
          onClose={() => {
            setAuthView(null)
            setPendingBuy(null)
          }}
          onLogin={handleLogin}
          onSwitchToRegister={() => setAuthView('register')}
        />
      )}

      {authView === 'register' && (
        <RegisterModal
          onClose={() => {
            setAuthView(null)
            setPendingBuy(null)
          }}
          onRegistered={handleRegistered}
          onSwitchToLogin={() => setAuthView('login')}
        />
      )}

      {authView === 'checkEmail' && (
        <CheckEmailScreen
          email={pendingEmail}
          onClose={() => setAuthView(null)}
        />
      )}
    </div>
  )
}
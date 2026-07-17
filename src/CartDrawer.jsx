import { X, Plus, Minus, ArrowRight } from 'lucide-react'

export default function CartDrawer({ open, onClose, cart, updateQuantity, onCheckout }) {
  const subtotalPence = cart.reduce((sum, item) => sum + item.unitAmountPence * item.quantity, 0)

  const overlayStyle = {
    background: 'rgba(28, 25, 21, 0.4)',
    opacity: open ? 1 : 0,
    pointerEvents: open ? 'auto' : 'none',
  }

  const drawerStyle = {
    background: '#FAF6ED',
    borderLeft: '1px solid #1C1915',
    transform: open ? 'translateX(0)' : 'translateX(100%)',
  }

  const headerStyle = { borderBottom: '1px solid #D5CBB6' }
  const footerStyle = { borderTop: '1px solid #D5CBB6' }
  const titleStyle = { fontFamily: '"Fraunces", serif', fontWeight: 400, color: '#1C1915' }
  const itemNameStyle = { fontFamily: '"Fraunces", serif', color: '#1C1915' }
  const quantityBtnStyle = { border: '1px solid #1C1915' }
  const quantityNumStyle = { fontFamily: '"Newsreader", serif', color: '#1C1915' }
  const priceStyle = { fontFamily: '"Fraunces", serif', color: '#1C1915' }
  const subtotalLabelStyle = { color: '#7A6F5C', fontFamily: '"Newsreader", serif' }
  const subtotalStyle = { fontFamily: '"Fraunces", serif', color: '#1C1915' }
  const checkoutBtnStyle = {
    background: '#1C1915',
    color: '#FAF6ED',
    fontFamily: '"Newsreader", serif',
  }
  const emptyMsgStyle = {
    color: '#7A6F5C',
    fontFamily: '"Newsreader", serif',
    fontStyle: 'italic',
  }

  return (
    <>
      <div
        className="fixed inset-0 z-40 transition-opacity duration-300"
        style={overlayStyle}
        onClick={onClose}
      />

      <aside
        className="fixed top-0 right-0 z-50 h-full w-full max-w-md overflow-y-auto transition-transform duration-300"
        style={drawerStyle}
      >
        <div className="p-8 flex items-center justify-between" style={headerStyle}>
          <h2 className="text-2xl" style={titleStyle}>Your bag</h2>
          <button onClick={onClose} aria-label="Close cart">
            <X size={20} style={{ color: '#1C1915' }} />
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-sm mt-12" style={emptyMsgStyle}>
              Your bag is empty. The makers are waiting.
            </p>
          </div>
        ) : (
          <>
            <div className="p-8 space-y-6">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-20 h-24 object-cover flex-shrink-0"
                    style={{ background: '#EFE9DC' }}
                  />
                  <div className="flex-1 flex flex-col">
                    <h3 className="text-base leading-tight" style={itemNameStyle}>
                      {item.name}
                    </h3>
                    <div className="flex items-center justify-between mt-auto pt-2">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-6 h-6 flex items-center justify-center"
                          style={quantityBtnStyle}
                          aria-label="Decrease quantity"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="text-sm w-6 text-center" style={quantityNumStyle}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-6 h-6 flex items-center justify-center"
                          style={quantityBtnStyle}
                          aria-label="Increase quantity"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <p className="text-sm" style={priceStyle}>
                        £{((item.unitAmountPence * item.quantity) / 100).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-8 mt-4" style={footerStyle}>
              <div className="flex items-baseline justify-between mb-6">
                <span className="text-sm uppercase tracking-widest" style={subtotalLabelStyle}>
                  Subtotal
                </span>
                <span className="text-2xl" style={subtotalStyle}>
                  £{(subtotalPence / 100).toFixed(2)}
                </span>
              </div>
              <button
                onClick={onCheckout}
                className="w-full py-3 text-sm uppercase tracking-[0.25em] flex items-center justify-center gap-2"
                style={checkoutBtnStyle}
              >
                Checkout
                <ArrowRight size={14} />
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  )
}
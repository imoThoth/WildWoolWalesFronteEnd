import { Check } from 'lucide-react'

export default function CheckoutSuccess({ onContinue, total, user }) {
  const pounds = (total / 100).toFixed(2)

  const greenStyle = { background: '#3A4A3D' }
  const labelStyle = { color: '#7A6F5C', fontFamily: '"Newsreader", serif' }
  const titleStyle = {
    fontFamily: '"Fraunces", serif',
    fontWeight: 300,
    color: '#1C1915',
    letterSpacing: '-0.02em',
  }
  const bodyStyle = { color: '#3A352B', fontFamily: '"Newsreader", serif' }
  const buttonStyle = {
    background: '#1C1915',
    color: '#FAF6ED',
    fontFamily: '"Newsreader", serif',
  }

  return (
    <section className="px-8 py-24 max-w-2xl mx-auto text-center">
      <div
        className="w-16 h-16 rounded-full mx-auto mb-8 flex items-center justify-center"
        style={greenStyle}
      >
        <Check size={28} style={{ color: '#FAF6ED' }} />
      </div>

      <p className="text-xs uppercase tracking-[0.4em] mb-6" style={labelStyle}>
        Thank you, {user.username}
      </p>
      <h1 className="text-5xl mb-6 leading-tight" style={titleStyle}>
        Your order is <em style={{ fontStyle: 'italic' }}>on its way to the makers.</em>
      </h1>
      <p className="text-lg leading-relaxed mb-12" style={bodyStyle}>
        £{pounds} charged. You'll receive an email shortly with your order confirmation.
      </p>

      <button
        onClick={onContinue}
        className="px-10 py-3 text-sm uppercase tracking-[0.25em]"
        style={buttonStyle}
      >
        Continue browsing
      </button>
    </section>
  )
}
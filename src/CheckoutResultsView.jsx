export default function CheckoutResultView({ status, onGoToShop }) {
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
      {status === 'success' ? (
        <>
          <h1 className="text-4xl mb-6 leading-tight" style={titleStyle}>
            Thank you — your order is on its way to the makers.
          </h1>
          <p className="text-base leading-relaxed mb-12" style={bodyStyle}>
            You'll receive an email confirmation shortly.
          </p>
        </>
      ) : (
        <>
          <h1 className="text-4xl mb-6 leading-tight" style={titleStyle}>
            Checkout cancelled
          </h1>
          <p className="text-base leading-relaxed mb-12" style={bodyStyle}>
            No payment was taken. Your bag is still waiting whenever you're ready.
          </p>
        </>
      )}

      <button
        onClick={onGoToShop}
        className="px-10 py-3 text-sm uppercase tracking-[0.25em]"
        style={buttonStyle}
      >
        Continue browsing
      </button>
    </section>
  )
}
export default function VerifyEmailView({ status, error, onGoToShop }) {
  const wrapStyle = { minHeight: '60vh' }
  const titleStyle = { fontFamily: '"Fraunces", serif', fontWeight: 400, color: '#1C1915' }
  const bodyStyle = { color: '#3A352B', fontFamily: '"Newsreader", serif' }
  const errorStyle = { color: '#9C3F2D', fontFamily: '"Newsreader", serif' }
  const buttonStyle = { background: '#1C1915', color: '#FAF6ED', fontFamily: '"Newsreader", serif' }

  return (
    <section className="px-8 py-24 max-w-xl mx-auto text-center" style={wrapStyle}>
      {status === 'verifying' && (
        <p className="text-lg" style={bodyStyle}>Verifying your email…</p>
      )}

      {status === 'success' && (
        <>
          <h1 className="text-3xl mb-6" style={titleStyle}>Email verified</h1>
          <p className="text-sm mb-8 leading-relaxed" style={bodyStyle}>
            You can now sign in to your account.
          </p>
          <button onClick={onGoToShop} className="px-10 py-3 text-sm uppercase tracking-[0.25em]" style={buttonStyle}>
            Continue to shop
          </button>
        </>
      )}

      {status === 'error' && (
        <>
          <h1 className="text-3xl mb-6" style={titleStyle}>Verification failed</h1>
          <p className="text-sm mb-8" style={errorStyle}>{error}</p>
          <button onClick={onGoToShop} className="px-10 py-3 text-sm uppercase tracking-[0.25em]" style={buttonStyle}>
            Back to shop
          </button>
        </>
      )}
    </section>
  )
}
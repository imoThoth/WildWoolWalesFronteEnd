import { ArrowLeft, ArrowRight } from 'lucide-react'

export default function ProductDetail({ product, onBack, onAddToCart, onBuyNow }) {
  const pounds = (product.unitAmountPence / 100).toFixed(2)

  return (
    <section className="px-8 py-12 max-w-6xl mx-auto">
      <button
        onClick={onBack}
        className="mb-12 flex items-center gap-2 text-xs uppercase tracking-widest"
        style={{ color: '#1C1915', fontFamily: '"Newsreader", serif' }}
      >
        <ArrowLeft size={14} />
        Back to the shop
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
        <div className="aspect-[4/5] overflow-hidden" style={{ background: '#EFE9DC' }}>
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          {!product.inStock && (
            <div
              className="relative -mt-12 mx-4 px-3 py-1 text-[10px] uppercase tracking-widest inline-block"
              style={{ background: '#1C1915', color: '#FAF6ED', fontFamily: '"Newsreader", serif' }}
            >
              Sold out
            </div>
          )}
        </div>
        <div className="flex flex-col">
          <h1
            className="text-5xl mb-4 leading-none"
            style={{
              fontFamily: '"Fraunces", serif',
              fontWeight: 400,
              fontVariationSettings: '"opsz" 144, "SOFT" 100',
              color: '#1C1915',
              letterSpacing: '-0.02em',
            }}
          >
            {product.name}
          </h1>
          <p
            className="text-3xl mb-8"
            style={{ fontFamily: '"Fraunces", serif', color: '#1C1915' }}
          >
            £{pounds}
          </p>
          <p
            className="text-base leading-relaxed mb-10"
            style={{ color: '#3A352B', fontFamily: '"Newsreader", serif' }}
          >
            {product.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 mt-auto">
            <button
              onClick={() => onAddToCart(product)}
              disabled={!product.inStock}
              className="flex-1 py-4 text-sm uppercase tracking-[0.25em] transition-colors"
              style={{
                background: 'transparent',
                color: product.inStock ? '#1C1915' : '#B5A88C',
                border: '1px solid #1C1915',
                fontFamily: '"Newsreader", serif',
                cursor: product.inStock ? 'pointer' : 'not-allowed',
              }}
              onMouseEnter={(e) => {
                if (!product.inStock) return
                e.currentTarget.style.background = '#1C1915'
                e.currentTarget.style.color = '#FAF6ED'
              }}
              onMouseLeave={(e) => {
                if (!product.inStock) return
                e.currentTarget.style.background = 'transparent'
                e.currentTarget.style.color = '#1C1915'
              }}
            >
              {product.inStock ? 'Add to bag' : 'Sold out'}
            </button>
            <button
              onClick={() => onBuyNow(product)}
              disabled={!product.inStock}
              className="flex-1 py-4 text-sm uppercase tracking-[0.25em] flex items-center justify-center gap-2 transition-colors"
              style={{
                background: product.inStock ? '#9C3F2D' : '#D5CBB6',
                color: '#FAF6ED',
                fontFamily: '"Newsreader", serif',
                cursor: product.inStock ? 'pointer' : 'not-allowed',
              }}
              onMouseEnter={(e) => {
                if (product.inStock) e.currentTarget.style.background = '#7A2E2E'
              }}
              onMouseLeave={(e) => {
                if (product.inStock) e.currentTarget.style.background = '#9C3F2D'
              }}
            >
              Buy now
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
export default function ProductCard({ product, onSelect, onAddToCart }) {
  const pounds = (product.unitAmountPence / 100).toFixed(2)

  return (
    <article
      className="flex flex-col group cursor-pointer"
      onClick={onSelect}
    >
      <div
        className="relative overflow-hidden aspect-[4/5] mb-4"
        style={{ background: '#EFE9DC' }}
      >
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        {!product.inStock && (
          <div
            className="absolute top-3 left-3 px-3 py-1 text-[10px] uppercase tracking-widest"
            style={{ background: '#1C1915', color: '#FAF6ED', fontFamily: '"Newsreader", serif' }}
          >
            Sold out
          </div>
        )}
      </div>

      <div className="flex flex-col flex-1">
        <h3
          className="text-lg leading-tight"
          style={{ fontFamily: '"Fraunces", serif', fontWeight: 400, color: '#1C1915' }}
        >
          {product.name}
        </h3>
        <div className="flex items-center justify-between mt-3">
          <span
            className="text-lg"
            style={{ fontFamily: '"Fraunces", serif', color: '#1C1915' }}
          >
            £{pounds}
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation()
              if (product.inStock) onAddToCart(product)
            }}
            disabled={!product.inStock}
            className="text-xs uppercase tracking-[0.2em] py-2 px-4 transition-colors"
            style={{
              border: '1px solid #1C1915',
              color: product.inStock ? '#1C1915' : '#B5A88C',
              background: 'transparent',
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
        </div>
      </div>
    </article>
  )
}
import { useState, useEffect } from 'react'
import ProductCard from './ProductCard'
import { api, ApiError } from '../api'

const PAGE_SIZE = 12

export default function ProductGrid({ onSelectProduct, onAddToCart }) {
  const [products, setProducts] = useState([])
  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [totalElements, setTotalElements] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError('')

    api.getProducts(page, PAGE_SIZE)
      .then((data) => {
        if (cancelled) return
        setProducts(data.products)
        setTotalPages(data.totalPages)
        setTotalElements(data.totalElements)
      })
      .catch((err) => {
        if (cancelled) return
        setError(err instanceof ApiError ? err.message : 'Could not load products.')
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => { cancelled = true }
  }, [page])

  const labelStyle = { color: '#7A6F5C', fontFamily: '"Newsreader", serif' }
  const titleStyle = {
    fontFamily: '"Fraunces", serif',
    fontWeight: 400,
    color: '#1C1915',
    letterSpacing: '-0.01em',
  }

  return (
    <section className="px-8 pb-24 max-w-6xl mx-auto">
      <div
        className="flex items-baseline justify-between mb-10 pb-4"
        style={{ borderBottom: '1px solid #D5CBB6' }}
      >
        <h2 className="text-3xl" style={titleStyle}>
          The Shop
        </h2>
        <p className="text-xs uppercase tracking-[0.25em]" style={labelStyle}>
          {totalElements} {totalElements === 1 ? 'piece' : 'pieces'}
        </p>
      </div>

      {loading && (
        <p className="text-sm" style={{ ...labelStyle, fontStyle: 'italic' }}>
          Loading the shop…
        </p>
      )}

      {error && (
        <p className="text-sm" style={{ color: '#9C3F2D', fontFamily: '"Newsreader", serif' }}>
          {error}
        </p>
      )}

      {!loading && !error && products.length === 0 && (
        <p className="text-sm" style={{ ...labelStyle, fontStyle: 'italic' }}>
          No products yet — check back soon.
        </p>
      )}

      {!loading && !error && products.length > 0 && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelect={() => onSelectProduct(product)}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-6 mt-16">
              <button
                onClick={() => setPage((p) => Math.max(p - 1, 0))}
                disabled={page === 0}
                className="text-xs uppercase tracking-widest"
                style={{
                  color: page === 0 ? '#D5CBB6' : '#1C1915',
                  fontFamily: '"Newsreader", serif',
                  cursor: page === 0 ? 'not-allowed' : 'pointer',
                }}
              >
                ← Previous
              </button>
              <span className="text-xs" style={labelStyle}>
                Page {page + 1} of {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(p + 1, totalPages - 1))}
                disabled={page >= totalPages - 1}
                className="text-xs uppercase tracking-widest"
                style={{
                  color: page >= totalPages - 1 ? '#D5CBB6' : '#1C1915',
                  fontFamily: '"Newsreader", serif',
                  cursor: page >= totalPages - 1 ? 'not-allowed' : 'pointer',
                }}
              >
                Next →
              </button>
            </div>
          )}
        </>
      )}
    </section>
  )
}
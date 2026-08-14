import { useState } from 'react'
import { useAuth } from './AuthContext'
import { api, ApiError } from './api'

export default function AdminProductForm() {
  const { user } = useAuth()
  const [name, setName] = useState('')
  const [slug, setSlug] = useState('')
  const [description, setDescription] = useState('')
  const [priceGbp, setPriceGbp] = useState('')
  const [stockQuantity, setStockQuantity] = useState('')
  const [imageFile, setImageFile] = useState(null)
  const [error, setError] = useState('')
  const [fieldErrors, setFieldErrors] = useState({})
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  if (user?.role !== 'ADMIN') {
    return <p style={{ padding: '2rem' }}>Admin access required.</p>
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setFieldErrors({})
    setSuccess('')

    if (!imageFile) {
      setError('Please select an image.')
      return
    }

    const unitAmountPence = Math.round(parseFloat(priceGbp) * 100)
    if (isNaN(unitAmountPence) || unitAmountPence <= 0) {
      setError('Enter a valid price.')
      return
    }
    const stock = parseInt(stockQuantity, 10)
    if (isNaN(stock) || stock < 0) {
      setError('Enter a valid stock quantity.')
      return
    }

    // Matches CreateProductRequest on the backend — sent as a JSON blob
    // under the "product" part, separate from the "image" file part.
    const productPayload = {
      name,
      slug,
      description,
      unitAmountPence,
      stockQuantity: stock,
    }

    const formData = new FormData()
    formData.append(
      'product',
      new Blob([JSON.stringify(productPayload)], { type: 'application/json' })
    )
    formData.append('image', imageFile)

    setLoading(true)
    try {
      const product = await api.createProduct(formData)
      setSuccess(`Created "${product.name}" successfully.`)
      setName('')
      setSlug('')
      setDescription('')
      setPriceGbp('')
      setStockQuantity('')
      setImageFile(null)
      e.target.reset()
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message)
        setFieldErrors(err.fieldErrors ?? {})
      } else {
        setError('Failed to create product.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ maxWidth: 480, margin: '3rem auto', padding: '2rem', fontFamily: '"Newsreader", serif' }}>
      <h2 style={{ fontFamily: '"Fraunces", serif', marginBottom: '1.5rem' }}>Add a product</h2>

      <form onSubmit={handleSubmit}>
        {error && <p style={{ color: '#9C3F2D', marginBottom: '1rem' }}>{error}</p>}
        {success && <p style={{ color: '#3A4A3D', marginBottom: '1rem' }}>{success}</p>}

        <label style={{ display: 'block', marginBottom: '1rem' }}>
          Name
          <input value={name} onChange={(e) => setName(e.target.value)} required style={inputStyle} />
          {fieldErrors.name && <span style={fieldErrorStyle}>{fieldErrors.name}</span>}
        </label>

        <label style={{ display: 'block', marginBottom: '1rem' }}>
          Slug (url-friendly, e.g. aran-jumper)
          <input value={slug} onChange={(e) => setSlug(e.target.value)} required style={inputStyle} />
          {fieldErrors.slug && <span style={fieldErrorStyle}>{fieldErrors.slug}</span>}
        </label>

        <label style={{ display: 'block', marginBottom: '1rem' }}>
          Description
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} style={inputStyle} />
        </label>

        <label style={{ display: 'block', marginBottom: '1rem' }}>
          Price (£)
          <input type="number" step="0.01" min="0" value={priceGbp} onChange={(e) => setPriceGbp(e.target.value)} required style={inputStyle} />
        </label>

        <label style={{ display: 'block', marginBottom: '1rem' }}>
          Stock quantity
          <input type="number" min="0" value={stockQuantity} onChange={(e) => setStockQuantity(e.target.value)} required style={inputStyle} />
        </label>

        <label style={{ display: 'block', marginBottom: '1.5rem' }}>
          Image
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={(e) => setImageFile(e.target.files[0])}
            required
            style={{ display: 'block', marginTop: '0.5rem' }}
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            padding: '0.85rem',
            background: '#1C1915',
            color: '#FAF6ED',
            border: 'none',
            textTransform: 'uppercase',
            letterSpacing: '0.2em',
            fontSize: '0.85rem',
            cursor: loading ? 'not-allowed' : 'pointer',
          }}
        >
          {loading ? 'Uploading…' : 'Create product'}
        </button>
      </form>
    </div>
  )
}

const inputStyle = {
  display: 'block',
  width: '100%',
  padding: '0.6rem 0',
  marginTop: '0.4rem',
  border: 'none',
  borderBottom: '1px solid #1C1915',
  background: 'transparent',
  fontFamily: '"Newsreader", serif',
}

const fieldErrorStyle = {
  display: 'block',
  color: '#9C3F2D',
  fontSize: '0.75rem',
  marginTop: '0.25rem',
}
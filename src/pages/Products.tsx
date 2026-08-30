import React, { useEffect, useState } from 'react'
import { api, ApiError, Product, ProductPayload } from '../lib/api'

type FormState = {
  name: string
  category: Product['category']
  price: string
  unit: string
  image: string
  description: string
  stock: string
  badge: string
  bulkUnit: string
  bulkPrice: string
  bulkMinQty: string
}

const emptyForm: FormState = {
  name: '',
  category: 'frais',
  price: '',
  unit: '',
  image: '',
  description: '',
  stock: '',
  badge: '',
  bulkUnit: '',
  bulkPrice: '',
  bulkMinQty: '',
}

const productToForm = (p: Product): FormState => ({
  name: p.name,
  category: p.category,
  price: String(p.price),
  unit: p.unit,
  image: p.image,
  description: p.description,
  stock: String(p.stock),
  badge: p.badge ?? '',
  bulkUnit: p.bulk?.unit ?? '',
  bulkPrice: p.bulk ? String(p.bulk.price) : '',
  bulkMinQty: p.bulk ? String(p.bulk.minQty) : '',
})

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [showModal, setShowModal] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [form, setForm] = useState<FormState>(emptyForm)
  const [formError, setFormError] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  const loadProducts = () => {
    setLoading(true)
    setError(null)
    api
      .listProducts()
      .then(setProducts)
      .catch((err) => setError(err instanceof ApiError ? err.message : 'Impossible de charger les produits'))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    loadProducts()
  }, [])

  const handleAddProduct = () => {
    setEditingProduct(null)
    setForm(emptyForm)
    setFormError(null)
    setShowModal(true)
  }

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product)
    setForm(productToForm(product))
    setFormError(null)
    setShowModal(true)
  }

  const handleDeleteProduct = async (product: Product) => {
    if (!window.confirm(`Supprimer "${product.name}" ? Cette action le retire de la boutique.`)) return
    try {
      await api.deleteProduct(product.id)
      setProducts((prev) => prev.filter((p) => p.id !== product.id))
    } catch (err) {
      alert(err instanceof ApiError ? err.message : 'Échec de la suppression')
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormError(null)

    const hasBulkUnit = form.bulkUnit.trim() !== ''
    const hasBulkPrice = form.bulkPrice.trim() !== ''
    if (hasBulkUnit !== hasBulkPrice) {
      setFormError('Le prix de gros et le conditionnement doivent être renseignés ensemble.')
      return
    }

    const payload: ProductPayload = {
      name: form.name.trim(),
      category: form.category,
      price: Number(form.price),
      unit: form.unit.trim(),
      image: form.image.trim(),
      description: form.description.trim(),
      stock: Number(form.stock),
      badge: form.badge.trim() || undefined,
      bulkUnit: hasBulkUnit ? form.bulkUnit.trim() : null,
      bulkPrice: hasBulkPrice ? Number(form.bulkPrice) : null,
      bulkMinQty: hasBulkUnit ? Number(form.bulkMinQty) || 1 : null,
    }

    setSaving(true)
    try {
      if (editingProduct) {
        const updated = await api.updateProduct(editingProduct.id, payload)
        setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)))
      } else {
        const created = await api.createProduct(payload)
        setProducts((prev) => [...prev, created])
      }
      setShowModal(false)
    } catch (err) {
      setFormError(err instanceof ApiError ? err.message : 'Échec de l\'enregistrement')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-serif font-semibold">Gestion des produits</h3>
        <button
          onClick={handleAddProduct}
          className="btn-primary text-white px-5 py-2 rounded-xl text-sm"
        >
          <i className="far fa-plus"></i> Ajouter produit
        </button>
      </div>

      {error && (
        <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3 mb-4 flex items-center justify-between">
          <span>{error}</span>
          <button onClick={loadProducts} className="font-medium underline">Réessayer</button>
        </div>
      )}

      <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-h-border">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-h-light">
            <thead className="bg-h-cream">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold">ID</th>
                <th className="px-4 py-3 text-left text-xs font-semibold">Nom</th>
                <th className="px-4 py-3 text-left text-xs font-semibold">Catégorie</th>
                <th className="px-4 py-3 text-left text-xs font-semibold">Prix détail (HTG)</th>
                <th className="px-4 py-3 text-left text-xs font-semibold">Prix gros (HTG)</th>
                <th className="px-4 py-3 text-left text-xs font-semibold">Stock</th>
                <th className="px-4 py-3 text-left text-xs font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-h-border">
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-4 py-10 text-center text-h-muted">
                    <i className="fas fa-spinner fa-spin mr-2"></i> Chargement...
                  </td>
                </tr>
              ) : products.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-10 text-center text-h-muted">
                    Aucun produit pour le moment.
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr key={product.id}>
                    <td className="px-4 py-3 text-sm">{product.id}</td>
                    <td className="px-4 py-3 text-sm font-medium">{product.name}</td>
                    <td className="px-4 py-3 text-sm">
                      <span className="status-badge bg-h-light text-h-primary">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      {product.price.toLocaleString()} <span className="text-h-muted">/ {product.unit}</span>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      {product.bulk
                        ? <>{product.bulk.price.toLocaleString()} <span className="text-h-muted">/ {product.bulk.unit}</span></>
                        : <span className="text-h-muted">—</span>}
                    </td>
                    <td className="px-4 py-3 text-sm">{product.stock}</td>
                    <td className="px-4 py-3 text-sm">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditProduct(product)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <i className="fas fa-edit"></i>
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Product Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 modal-transition p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-serif mb-4">
              {editingProduct ? 'Modifier produit' : 'Ajouter produit'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              {formError && (
                <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                  {formError}
                </div>
              )}
              <div>
                <label className="form-label">Nom</label>
                <input
                  name="name"
                  type="text"
                  required
                  className="form-input"
                  value={form.name}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="form-label">Catégorie</label>
                <select name="category" className="form-select" value={form.category} onChange={handleChange}>
                  <option value="frais">Frais</option>
                  <option value="alimentaires">Alimentaires</option>
                  <option value="quotidiens">Quotidiens</option>
                </select>
              </div>
              <div>
                <label className="form-label">Description</label>
                <textarea
                  name="description"
                  required
                  rows={2}
                  className="form-textarea"
                  value={form.description}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="form-label">Image (URL)</label>
                <input
                  name="image"
                  type="text"
                  required
                  placeholder="/images/produit.webp"
                  className="form-input"
                  value={form.image}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="form-label">Badge (optionnel)</label>
                <input
                  name="badge"
                  type="text"
                  placeholder="Nouveau, Bio, Promo…"
                  className="form-input"
                  value={form.badge}
                  onChange={handleChange}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="form-label">Prix détail (HTG)</label>
                  <input
                    name="price"
                    type="number"
                    required
                    min={0}
                    className="form-input"
                    value={form.price}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="form-label">Unité détail</label>
                  <input
                    name="unit"
                    type="text"
                    required
                    className="form-input"
                    placeholder="kg, marmite, pièce…"
                    value={form.unit}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="form-label">Prix gros (HTG)</label>
                  <input
                    name="bulkPrice"
                    type="number"
                    min={0}
                    className="form-input"
                    placeholder="optionnel"
                    value={form.bulkPrice}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="form-label">Conditionnement gros</label>
                  <input
                    name="bulkUnit"
                    type="text"
                    className="form-input"
                    placeholder="sac 25 kg, caisse x24…"
                    value={form.bulkUnit}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div>
                <label className="form-label">Qté minimum en gros</label>
                <input
                  name="bulkMinQty"
                  type="number"
                  min={1}
                  className="form-input"
                  placeholder="1"
                  value={form.bulkMinQty}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="form-label">Stock</label>
                <input
                  name="stock"
                  type="number"
                  required
                  min={0}
                  className="form-input"
                  value={form.stock}
                  onChange={handleChange}
                />
              </div>
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border rounded-lg"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="btn-primary text-white px-5 py-2 rounded-lg disabled:opacity-60"
                >
                  {saving ? 'Enregistrement...' : 'Enregistrer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Products

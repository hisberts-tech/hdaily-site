import React, { useState } from 'react'

interface Product {
  id: number
  name: string
  category: string
  price: number
  stock: number
}

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([
    { id: 1, name: "Panier Bio Complet", category: "Frais", price: 2500, stock: 12 },
    { id: 2, name: "Fruits Premium", category: "Frais", price: 3000, stock: 8 },
    { id: 3, name: "Riz premium 5kg", category: "Alimentaires", price: 850, stock: 30 },
    { id: 4, name: "Huile d'olive", category: "Alimentaires", price: 1200, stock: 15 },
    { id: 5, name: "Savon liquide", category: "Quotidiens", price: 450, stock: 40 },
  ])

  const [showModal, setShowModal] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)

  const handleAddProduct = () => {
    setEditingProduct(null)
    setShowModal(true)
  }

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product)
    setShowModal(true)
  }

  const handleDeleteProduct = (id: number) => {
    setProducts(products.filter(p => p.id !== id))
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

      <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-h-border">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-h-light">
            <thead className="bg-h-cream">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold">ID</th>
                <th className="px-4 py-3 text-left text-xs font-semibold">Nom</th>
                <th className="px-4 py-3 text-left text-xs font-semibold">Catégorie</th>
                <th className="px-4 py-3 text-left text-xs font-semibold">Prix (HTG)</th>
                <th className="px-4 py-3 text-left text-xs font-semibold">Stock</th>
                <th className="px-4 py-3 text-left text-xs font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-h-border">
              {products.map((product) => (
                <tr key={product.id}>
                  <td className="px-4 py-3 text-sm">{product.id}</td>
                  <td className="px-4 py-3 text-sm font-medium">{product.name}</td>
                  <td className="px-4 py-3 text-sm">
                    <span className="status-badge bg-h-light text-h-primary">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">{product.price.toLocaleString()}</td>
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
                        onClick={() => handleDeleteProduct(product.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Product Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 modal-transition">
          <div className="bg-white rounded-2xl w-full max-w-md p-6">
            <h3 className="text-xl font-serif mb-4">
              {editingProduct ? 'Modifier produit' : 'Ajouter produit'}
            </h3>
            <form className="space-y-4">
              <div>
                <label className="form-label">Nom</label>
                <input 
                  type="text" 
                  className="form-input"
                  defaultValue={editingProduct?.name}
                />
              </div>
              <div>
                <label className="form-label">Catégorie</label>
                <select className="form-select" defaultValue={editingProduct?.category}>
                  <option value="Frais">Frais</option>
                  <option value="Alimentaires">Alimentaires</option>
                  <option value="Quotidiens">Quotidiens</option>
                </select>
              </div>
              <div>
                <label className="form-label">Prix (HTG)</label>
                <input 
                  type="number" 
                  className="form-input"
                  defaultValue={editingProduct?.price}
                />
              </div>
              <div>
                <label className="form-label">Stock</label>
                <input 
                  type="number" 
                  className="form-input"
                  defaultValue={editingProduct?.stock}
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
                  className="btn-primary text-white px-5 py-2 rounded-lg"
                >
                  Enregistrer
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

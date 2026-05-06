import React, { useState } from 'react'

interface Panier {
  id: string
  name: string
  price: number
  description: string
  popular: boolean
}

const Paniers: React.FC = () => {
  const [paniers, setPaniers] = useState<Panier[]>([
    { id: "basic", name: "Panier Basic", price: 600, description: "Riz, pâtes, huile, tomates", popular: false },
    { id: "family", name: "Panier Family", price: 1200, description: "Idéal famille (riz premium, légumes, fruits, œufs)", popular: true },
    { id: "premium", name: "Panier Premium", price: 2200, description: "Sélection bio, produits importés, livraison prioritaire", popular: false },
  ])

  const [showModal, setShowModal] = useState(false)
  const [editingPanier, setEditingPanier] = useState<Panier | null>(null)

  const handleAddPanier = () => {
    setEditingPanier(null)
    setShowModal(true)
  }

  const handleEditPanier = (panier: Panier) => {
    setEditingPanier(panier)
    setShowModal(true)
  }

  const handleDeletePanier = (id: string) => {
    setPaniers(paniers.filter(p => p.id !== id))
  }

  return (
    <div>
      <h3 className="text-xl font-serif font-semibold mb-4">
        Paniers Pré-faits (édit prix & description)
      </h3>
      
      <div className="grid md:grid-cols-3 gap-6 mb-6">
        {paniers.map((panier) => (
          <div key={panier.id} className="bg-white p-5 rounded-2xl admin-card">
            <div className="flex justify-between items-start mb-3">
              <h4 className="font-bold text-lg">{panier.name}</h4>
              {panier.popular && (
                <span className="bg-h-primary text-white text-xs px-2 py-1 rounded-full">
                  Populaire
                </span>
              )}
            </div>
            <p className="text-sm text-gray-600 mb-3">{panier.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold text-h-primary">
                {panier.price.toLocaleString()} HTG
              </span>
              <div className="flex gap-2">
                <button 
                  onClick={() => handleEditPanier(panier)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <i className="fas fa-edit"></i>
                </button>
                <button 
                  onClick={() => handleDeletePanier(panier.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <i className="fas fa-trash"></i>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button 
        onClick={handleAddPanier}
        className="btn-primary text-white px-5 py-2 rounded-xl"
      >
        <i className="far fa-plus"></i> Ajouter un panier personnalisé
      </button>

      {/* Panier Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 modal-transition">
          <div className="bg-white rounded-2xl w-full max-w-md p-6">
            <h3 className="text-xl font-serif mb-4">
              {editingPanier ? 'Modifier panier' : 'Ajouter un panier'}
            </h3>
            <form className="space-y-4">
              <div>
                <label className="form-label">Nom</label>
                <input 
                  type="text" 
                  className="form-input"
                  defaultValue={editingPanier?.name}
                />
              </div>
              <div>
                <label className="form-label">Description</label>
                <textarea 
                  className="form-textarea"
                  rows={3}
                  defaultValue={editingPanier?.description}
                />
              </div>
              <div>
                <label className="form-label">Prix (HTG)</label>
                <input 
                  type="number" 
                  className="form-input"
                  defaultValue={editingPanier?.price}
                />
              </div>
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  id="popular"
                  className="mr-2"
                  defaultChecked={editingPanier?.popular}
                />
                <label htmlFor="popular" className="text-sm">
                  Marquer comme populaire
                </label>
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

export default Paniers

import React, { useState } from 'react'

const Settings: React.FC = () => {
  const [shippingCost, setShippingCost] = useState(200)

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault()
    alert('Paramètres enregistrés avec succès!')
  }

  const handleResetDemoData = () => {
    if (confirm('Êtes-vous sûr de vouloir réinitialiser toutes les données? Cette action est irréversible.')) {
      alert('Données réinitialisées avec succès!')
    }
  }

  return (
    <div className="bg-white p-6 rounded-2xl max-w-2xl">
      <h4 className="font-bold text-lg mb-6">Paramètres généraux</h4>
      
      <form onSubmit={handleSaveSettings} className="space-y-6">
        <div>
          <label className="form-label">Frais de livraison (HTG)</label>
          <input 
            type="number" 
            value={shippingCost}
            onChange={(e) => setShippingCost(Number(e.target.value))}
            className="form-input w-40"
            min="0"
          />
        </div>
        
        <button 
          type="submit"
          className="btn-primary text-white px-5 py-2 rounded-xl"
        >
          Enregistrer
        </button>
      </form>

      <hr className="my-8 border-h-border" />
      
      <div className="space-y-4">
        <h4 className="font-bold text-lg">Réinitialiser données de démo</h4>
        <p className="text-gray-600 text-sm">
          Cette action supprimera toutes les données actuelles et restaurera les données par défaut.
        </p>
        <button 
          onClick={handleResetDemoData}
          className="text-red-600 border border-red-300 px-4 py-2 rounded-full text-sm hover:bg-red-50 transition-colors"
        >
          <i className="fas fa-redo mr-2"></i>
          Restaurer les données par défaut
        </button>
      </div>
    </div>
  )
}

export default Settings

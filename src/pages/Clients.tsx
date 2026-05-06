import React, { useState } from 'react'

interface Client {
  id: number
  name: string
  phone: string
  nif: string
  creditLimit: number
  debt: number
}

const Clients: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([
    { id: 1, name: "Jean Pierre", phone: "+509 3913-4651", nif: "001-123456", creditLimit: 5000, debt: 0 },
    { id: 2, name: "Marie Dupont", phone: "+509 5539-2542", nif: "002-789012", creditLimit: 3000, debt: 1200 },
  ])

  const [showModal, setShowModal] = useState(false)
  const [editingClient, setEditingClient] = useState<Client | null>(null)

  const handleAddClient = () => {
    setEditingClient(null)
    setShowModal(true)
  }

  const handleEditClient = (client: Client) => {
    setEditingClient(client)
    setShowModal(true)
  }

  const handleDeleteClient = (id: number) => {
    setClients(clients.filter(c => c.id !== id))
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-serif font-semibold">Gestion des clients</h3>
        <button 
          onClick={handleAddClient}
          className="btn-primary text-white px-5 py-2 rounded-xl text-sm"
        >
          <i className="far fa-plus"></i> Ajouter client
        </button>
      </div>

      <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-h-border">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-h-light">
            <thead className="bg-h-cream">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold">Nom</th>
                <th className="px-4 py-3 text-left text-xs font-semibold">Téléphone</th>
                <th className="px-4 py-3 text-left text-xs font-semibold">NIF</th>
                <th className="px-4 py-3 text-left text-xs font-semibold">Limite de crédit</th>
                <th className="px-4 py-3 text-left text-xs font-semibold">Dette actuelle</th>
                <th className="px-4 py-3 text-left text-xs font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-h-border">
              {clients.map((client) => (
                <tr key={client.id}>
                  <td className="px-4 py-3 text-sm font-medium">{client.name}</td>
                  <td className="px-4 py-3 text-sm">{client.phone}</td>
                  <td className="px-4 py-3 text-sm">{client.nif}</td>
                  <td className="px-4 py-3 text-sm">{client.creditLimit.toLocaleString()} HTG</td>
                  <td className="px-4 py-3 text-sm">
                    <span className={`status-badge ${client.debt > 0 ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                      {client.debt.toLocaleString()} HTG
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleEditClient(client)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                      <button 
                        onClick={() => handleDeleteClient(client.id)}
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

      {/* Client Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 modal-transition">
          <div className="bg-white rounded-2xl w-full max-w-md p-6">
            <h3 className="text-xl font-serif mb-4">
              {editingClient ? 'Modifier client' : 'Ajouter client'}
            </h3>
            <form className="space-y-4">
              <div>
                <label className="form-label">Nom</label>
                <input 
                  type="text" 
                  className="form-input"
                  defaultValue={editingClient?.name}
                />
              </div>
              <div>
                <label className="form-label">Téléphone</label>
                <input 
                  type="tel" 
                  className="form-input"
                  defaultValue={editingClient?.phone}
                />
              </div>
              <div>
                <label className="form-label">NIF</label>
                <input 
                  type="text" 
                  className="form-input"
                  defaultValue={editingClient?.nif}
                />
              </div>
              <div>
                <label className="form-label">Limite de crédit (HTG)</label>
                <input 
                  type="number" 
                  className="form-input"
                  defaultValue={editingClient?.creditLimit}
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

export default Clients

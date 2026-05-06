import React, { useState } from 'react'

interface DebtClient {
  id: number
  name: string
  phone: string
  debt: number
  limit: number
  status: string
}

const Credit: React.FC = () => {
  const [debtClients] = useState<DebtClient[]>([
    { id: 1, name: "Marie Dupont", phone: "+509 5539-2542", debt: 1200, limit: 3000, status: "active" },
    { id: 2, name: "Jean Pierre", phone: "+509 3913-4651", debt: 2000, limit: 5000, status: "active" },
  ])

  const totalDebt = debtClients.reduce((sum, client) => sum + client.debt, 0)
  const averageDebt = totalDebt / debtClients.length
  const availableCredit = debtClients.reduce((sum, client) => sum + (client.limit - client.debt), 0)

  const handleSendReminders = () => {
    // Simulate sending reminders
    alert('Rappels de paiement envoyés avec succès!')
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-serif font-semibold">Service Crédit</h3>
        <div className="flex gap-2">
          <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-semibold">
            <i className="fas fa-exclamation-triangle mr-1"></i>
            {debtClients.length} clients en dette
          </span>
          <button 
            onClick={handleSendReminders}
            className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-semibold"
          >
            <i className="fas fa-bell mr-1"></i>
            Envoyer rappels
          </button>
        </div>
      </div>
      
      {/* Debt Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-red-500">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xs text-gray-500">Dette totale</p>
              <h3 className="text-xl font-bold text-red-600">{totalDebt.toLocaleString()} HTG</h3>
            </div>
            <i className="fas fa-coins text-red-500 text-xl"></i>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-orange-500">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xs text-gray-500">Moyenne par client</p>
              <h3 className="text-xl font-bold text-orange-600">{Math.round(averageDebt).toLocaleString()} HTG</h3>
            </div>
            <i className="fas fa-chart-line text-orange-500 text-xl"></i>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-green-500">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xs text-gray-500">Crédit disponible</p>
              <h3 className="text-xl font-bold text-green-600">{availableCredit.toLocaleString()} HTG</h3>
            </div>
            <i className="fas fa-wallet text-green-500 text-xl"></i>
          </div>
        </div>
      </div>

      {/* Clients with Debt Table */}
      <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-h-border">
        <div className="px-4 py-3 bg-gray-50 border-b border-h-border">
          <h4 className="font-semibold text-gray-700">Clients avec dette</h4>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-h-light">
            <thead className="bg-h-cream">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold">Client</th>
                <th className="px-4 py-3 text-left text-xs font-semibold">Téléphone</th>
                <th className="px-4 py-3 text-left text-xs font-semibold">Dette</th>
                <th className="px-4 py-3 text-left text-xs font-semibold">Limite</th>
                <th className="px-4 py-3 text-left text-xs font-semibold">Statut</th>
                <th className="px-4 py-3 text-left text-xs font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-h-border">
              {debtClients.map((client) => (
                <tr key={client.id}>
                  <td className="px-4 py-3 text-sm font-medium">{client.name}</td>
                  <td className="px-4 py-3 text-sm">{client.phone}</td>
                  <td className="px-4 py-3 text-sm">
                    <span className="status-badge bg-red-100 text-red-700">
                      {client.debt.toLocaleString()} HTG
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">{client.limit.toLocaleString()} HTG</td>
                  <td className="px-4 py-3 text-sm">
                    <span className="status-badge bg-green-100 text-green-700">
                      Actif
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <div className="flex gap-2">
                      <button className="text-blue-600 hover:text-blue-800">
                        <i className="fas fa-phone"></i>
                      </button>
                      <button className="text-green-600 hover:text-green-800">
                        <i className="fas fa-envelope"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Credit

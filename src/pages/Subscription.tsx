import React, { useState } from 'react'

interface Subscriber {
  id: number
  name: string
  phone: string
  type: 'Basic' | 'Family' | 'Premium'
  startDate: string
  nextPayment: string
  monthlyFee: number
  status: 'active' | 'expired' | 'suspended'
}

const Subscription: React.FC = () => {
  const [subscribers] = useState<Subscriber[]>([
    {
      id: 1,
      name: "Jean Pierre",
      phone: "+509 3913-4651",
      type: "Basic",
      startDate: "2026-04-01",
      nextPayment: "2026-06-01",
      monthlyFee: 1500,
      status: "active"
    },
    {
      id: 2,
      name: "Marie Claire",
      phone: "+509 5539-2542",
      type: "Family",
      startDate: "2026-03-15",
      nextPayment: "2026-06-15",
      monthlyFee: 2200,
      status: "active"
    },
    {
      id: 3,
      name: "Luckson",
      phone: "+509 4812-3456",
      type: "Premium",
      startDate: "2026-02-01",
      nextPayment: "2026-06-01",
      monthlyFee: 3500,
      status: "active"
    },
    {
      id: 4,
      name: "Sylvie Michel",
      phone: "+509 3712-8901",
      type: "Basic",
      startDate: "2026-01-15",
      nextPayment: "2026-06-15",
      monthlyFee: 1500,
      status: "expired"
    },
    {
      id: 5,
      name: "Philippe Baptiste",
      phone: "+509 4213-6789",
      type: "Family",
      startDate: "2026-04-10",
      nextPayment: "2026-06-10",
      monthlyFee: 2200,
      status: "active"
    },
    {
      id: 6,
      name: "Josué Pierre",
      phone: "+509 3914-1234",
      type: "Premium",
      startDate: "2026-03-20",
      nextPayment: "2026-06-20",
      monthlyFee: 3500,
      status: "active"
    },
    {
      id: 7,
      name: "Marie Joséph",
      phone: "+509 5512-7890",
      type: "Basic",
      startDate: "2026-02-10",
      nextPayment: "2026-06-10",
      monthlyFee: 1500,
      status: "suspended"
    },
    {
      id: 8,
      name: "Lucien Jean",
      phone: "+509 3614-5678",
      type: "Family",
      startDate: "2026-01-25",
      nextPayment: "2026-06-25",
      monthlyFee: 2200,
      status: "active"
    }
  ])

  const basicCount = subscribers.filter(s => s.type === 'Basic').length
  const familyCount = subscribers.filter(s => s.type === 'Family').length
  const premiumCount = subscribers.filter(s => s.type === 'Premium').length
  const activeCount = subscribers.filter(s => s.status === 'active').length
  const monthlyRevenue = subscribers
    .filter(s => s.status === 'active')
    .reduce((sum, s) => sum + s.monthlyFee, 0)

  const handleSendReminders = () => {
    alert('Rappels mensuels envoyés avec succès!')
  }

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { bg: 'bg-green-100', text: 'text-green-700', label: 'Actif' },
      expired: { bg: 'bg-red-100', text: 'text-red-700', label: 'Expiré' },
      suspended: { bg: 'bg-yellow-100', text: 'text-yellow-700', label: 'Suspendu' }
    }
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.active
    return (
      <span className={`status-badge ${config.bg} ${config.text}`}>
        {config.label}
      </span>
    )
  }

  const getTypeIcon = (type: string) => {
    const icons = {
      Basic: 'fa-leaf',
      Family: 'fa-home',
      Premium: 'fa-crown'
    }
    return icons[type as keyof typeof icons] || 'fa-box'
  }

  const getTypeColor = (type: string) => {
    const colors = {
      Basic: 'text-green-600',
      Family: 'text-blue-600',
      Premium: 'text-purple-600'
    }
    return colors[type as keyof typeof colors] || 'text-gray-600'
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-serif font-semibold">Gestion des Abonnements</h3>
        <div className="flex gap-2">
          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
            <i className="fas fa-users mr-1"></i>
            {activeCount} abonnés actifs
          </span>
          <button 
            onClick={handleSendReminders}
            className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold"
          >
            <i className="fas fa-bell mr-1"></i>
            Rappels mensuels
          </button>
        </div>
      </div>
      
      {/* Subscription Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-green-500">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xs text-gray-500">Abonnements Basic</p>
              <h3 className="text-xl font-bold text-green-600">{basicCount}</h3>
            </div>
            <i className="fas fa-leaf text-green-500 text-xl"></i>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-blue-500">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xs text-gray-500">Abonnements Family</p>
              <h3 className="text-xl font-bold text-blue-600">{familyCount}</h3>
            </div>
            <i className="fas fa-home text-blue-500 text-xl"></i>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-purple-500">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xs text-gray-500">Abonnements Premium</p>
              <h3 className="text-xl font-bold text-purple-600">{premiumCount}</h3>
            </div>
            <i className="fas fa-crown text-purple-500 text-xl"></i>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-orange-500">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xs text-gray-500">Revenus mensuels</p>
              <h3 className="text-xl font-bold text-orange-600">{monthlyRevenue.toLocaleString()} HTG</h3>
            </div>
            <i className="fas fa-chart-line text-orange-500 text-xl"></i>
          </div>
        </div>
      </div>

      {/* Subscribers Table */}
      <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-h-border">
        <div className="px-4 py-3 bg-gray-50 border-b border-h-border">
          <h4 className="font-semibold text-gray-700">Liste des abonnés</h4>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-h-light">
            <thead className="bg-h-cream">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold">Client</th>
                <th className="px-4 py-3 text-left text-xs font-semibold">Téléphone</th>
                <th className="px-4 py-3 text-left text-xs font-semibold">Type</th>
                <th className="px-4 py-3 text-left text-xs font-semibold">Début</th>
                <th className="px-4 py-3 text-left text-xs font-semibold">Prochain paiement</th>
                <th className="px-4 py-3 text-left text-xs font-semibold">Statut</th>
                <th className="px-4 py-3 text-left text-xs font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-h-border">
              {subscribers.map((subscriber) => (
                <tr key={subscriber.id}>
                  <td className="px-4 py-3 text-sm font-medium">{subscriber.name}</td>
                  <td className="px-4 py-3 text-sm">{subscriber.phone}</td>
                  <td className="px-4 py-3 text-sm">
                    <div className="flex items-center gap-2">
                      <i className={`fas ${getTypeIcon(subscriber.type)} ${getTypeColor(subscriber.type)}`}></i>
                      <span>{subscriber.type}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm">{subscriber.startDate}</td>
                  <td className="px-4 py-3 text-sm">{subscriber.nextPayment}</td>
                  <td className="px-4 py-3 text-sm">{getStatusBadge(subscriber.status)}</td>
                  <td className="px-4 py-3 text-sm">
                    <div className="flex gap-2">
                      <button className="text-blue-600 hover:text-blue-800">
                        <i className="fas fa-edit"></i>
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

export default Subscription

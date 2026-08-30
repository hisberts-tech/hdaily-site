import React, { useState } from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const Dashboard: React.FC = () => {
  const [stats] = useState({
    revenue: 142500,
    orders: 18,
    products: 0,
    clients: 5
  })

  const [chartData] = useState({
    labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai'],
    datasets: [
      {
        label: 'Revenus (HTG)',
        data: [120000, 135000, 125000, 140000, 142500],
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.4
      }
    ]
  })

  const [recentOrders] = useState([
    { id: 'CMD001', client: 'Jean Pierre', amount: 2600, status: 'pending' },
    { id: 'CMD002', client: 'Marie Claire', amount: 3200, status: 'paid' },
    { id: 'CMD003', client: 'Luckson', amount: 1800, status: 'shipped' }
  ])

  const [completedOrders] = useState([
    { id: 'CMD004', client: 'Josué Pierre', amount: 4500, date: '2026-05-03' },
    { id: 'CMD005', client: 'Marie Joséph', amount: 2800, date: '2026-05-02' },
    { id: 'CMD006', client: 'Lucien Jean', amount: 3200, date: '2026-05-01' }
  ])

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: false
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value: any) {
            return value.toLocaleString() + ' HTG'
          }
        }
      }
    }
  }

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { bg: 'bg-h-light', text: 'text-h-primary', label: 'En attente' },
      paid: { bg: 'bg-green-100', text: 'text-green-700', label: 'Payée' },
      shipped: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Expédiée' }
    }
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending
    return (
      <span className={`status-badge ${config.bg} ${config.text}`}>
        {config.label}
      </span>
    )
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm admin-card">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-h-muted text-xs sm:text-sm">Chiffre d'affaires (mois)</p>
              <h3 className="text-xl sm:text-2xl font-bold">
                {stats.revenue.toLocaleString()} <span className="text-xs sm:text-sm">HTG</span>
              </h3>
            </div>
            <div className="bg-h-primary w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center">
              <i className="fas fa-chart-simple text-white text-sm"></i>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm admin-card">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-h-muted text-xs sm:text-sm">Commandes</p>
              <h3 className="text-xl sm:text-2xl font-bold">{stats.orders}</h3>
            </div>
            <i className="far fa-receipt text-xl sm:text-2xl text-h-primary"></i>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm admin-card">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-h-muted text-xs sm:text-sm">Produits actifs</p>
              <h3 className="text-xl sm:text-2xl font-bold">{stats.products}</h3>
            </div>
            <i className="far fa-boxes text-xl sm:text-2xl text-h-primary"></i>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm admin-card">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-h-muted text-xs sm:text-sm">Clients enregistrés</p>
              <h3 className="text-xl sm:text-2xl font-bold">{stats.clients}</h3>
            </div>
            <i className="far fa-user-group text-xl sm:text-2xl text-h-primary"></i>
          </div>
        </div>
      </div>

      {/* Charts and Recent Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-white p-4 lg:p-5 rounded-xl shadow-sm">
          <h4 className="font-semibold mb-3">Revenus du mois</h4>
          <div className="h-64">
            <Line data={chartData} options={chartOptions} />
          </div>
        </div>
        
        {/* Recent Orders */}
        <div className="bg-white p-4 lg:p-5 rounded-xl shadow-sm">
          <h4 className="font-semibold mb-2">Commandes récentes</h4>
          <div className="space-y-2 text-sm">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex justify-between items-center p-2 bg-h-light rounded-lg">
                <div>
                  <p className="font-medium">{order.id}</p>
                  <p className="text-h-muted text-xs">{order.client}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{order.amount.toLocaleString()} HTG</p>
                  {getStatusBadge(order.status)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Completed Orders */}
      <div className="bg-white p-4 lg:p-5 rounded-xl shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-3">
          <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
            <i className="fas fa-check text-white text-xs"></i>
          </div>
          <h4 className="font-semibold">Commandes Terminées</h4>
          <span className="text-xs text-gray-500">Derniers 5 jours</span>
        </div>
        <div className="space-y-2">
          {completedOrders.map((order) => (
            <div key={order.id} className="flex justify-between items-center p-3 bg-h-light rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <i className="fas fa-check text-green-600 text-xs"></i>
                </div>
                <div>
                  <p className="font-medium">{order.id}</p>
                  <p className="text-h-muted text-sm">{order.client}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold">{order.amount.toLocaleString()} HTG</p>
                <p className="text-h-muted text-xs">{order.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard

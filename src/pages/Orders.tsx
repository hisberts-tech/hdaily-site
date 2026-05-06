import React, { useState } from 'react'

interface Order {
  id: string
  client: string
  amount: number
  status: 'pending' | 'paid' | 'shipped'
  date: string
  deliveryFee: number
  address: string
  products: Array<{ name: string; quantity: number; price: number }>
}

const Orders: React.FC = () => {
  const [orders] = useState<Order[]>([
    { 
      id: "CMD001", 
      client: "Jean Pierre", 
      amount: 2600, 
      status: "pending",
      date: "2026-05-06",
      deliveryFee: 200,
      address: "Delmas 32, Port-au-Prince",
      products: [
        { name: "Panier Family", quantity: 1, price: 1200 },
        { name: "Tomates Fraîches", quantity: 2, price: 300 },
        { name: "Riz Premium", quantity: 1, price: 900 }
      ]
    },
    { 
      id: "CMD002", 
      client: "Marie Claire", 
      amount: 3200, 
      status: "paid",
      date: "2026-05-05",
      deliveryFee: 200,
      address: "Pétion-Ville, Route de Bourdon",
      products: [
        { name: "Panier Premium", quantity: 1, price: 2200 },
        { name: "Laitues Romaines", quantity: 3, price: 240 },
        { name: "Bananes Locales", quantity: 2, price: 560 }
      ]
    },
    { 
      id: "CMD003", 
      client: "Luckson", 
      amount: 1800, 
      status: "shipped",
      date: "2026-05-04",
      deliveryFee: 200,
      address: "Carrefour, Avenue Martin Luther King",
      products: [
        { name: "Panier Basic", quantity: 1, price: 600 },
        { name: "Carottes Bio", quantity: 2, price: 240 },
        { name: "Savon Liquide", quantity: 1, price: 760 }
      ]
    },
  ])

  const [filter, setFilter] = useState<string>('all')
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  const filteredOrders = filter === 'all' 
    ? orders 
    : orders.filter(order => order.status === filter)

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
    <div>
      <div className="flex justify-between">
        <h3 className="text-xl font-serif font-semibold">Commandes clients</h3>
        <select 
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border rounded-xl px-3 py-1 text-sm"
        >
          <option value="all">Toutes</option>
          <option value="pending">En attente</option>
          <option value="paid">Payée</option>
          <option value="shipped">Expédiée</option>
        </select>
      </div>

      <div className="mt-6 bg-white rounded-2xl overflow-hidden shadow-sm">
        <table className="min-w-full">
          <thead className="bg-h-cream">
            <tr>
              <th className="p-3 text-left">ID</th>
              <th>Client</th>
              <th>Montant</th>
              <th>Statut</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order.id} className="border-b border-h-light">
                <td className="p-3">{order.id}</td>
                <td>{order.client}</td>
                <td>{order.amount.toLocaleString()} HTG</td>
                <td>{getStatusBadge(order.status)}</td>
                <td>
                  <button 
                    onClick={() => setSelectedOrder(order)}
                    className="text-h-primary hover:text-h-primary-dark"
                  >
                    <i className="fas fa-eye"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 modal-transition">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-serif">Détails de la commande</h3>
              <button 
                onClick={() => setSelectedOrder(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <i className="fas fa-times text-xl"></i>
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-h-muted">Commande</p>
                  <p className="font-semibold">{selectedOrder.id}</p>
                </div>
                <div>
                  <p className="text-sm text-h-muted">Date</p>
                  <p className="font-semibold">{selectedOrder.date}</p>
                </div>
                <div>
                  <p className="text-sm text-h-muted">Client</p>
                  <p className="font-semibold">{selectedOrder.client}</p>
                </div>
                <div>
                  <p className="text-sm text-h-muted">Statut</p>
                  <div>{getStatusBadge(selectedOrder.status)}</div>
                </div>
              </div>

              <div>
                <p className="text-sm text-h-muted mb-2">Adresse de livraison</p>
                <p className="font-medium">{selectedOrder.address}</p>
              </div>

              <div>
                <p className="text-sm text-h-muted mb-2">Produits</p>
                <div className="space-y-2">
                  {selectedOrder.products.map((product, index) => (
                    <div key={index} className="flex justify-between p-2 bg-h-light rounded">
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-h-muted">Quantité: {product.quantity}</p>
                      </div>
                      <p className="font-semibold">{(product.price * product.quantity).toLocaleString()} HTG</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between">
                  <span>Sous-total:</span>
                  <span>{(selectedOrder.amount - selectedOrder.deliveryFee).toLocaleString()} HTG</span>
                </div>
                <div className="flex justify-between">
                  <span>Frais de livraison:</span>
                  <span>{selectedOrder.deliveryFee.toLocaleString()} HTG</span>
                </div>
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total:</span>
                  <span>{selectedOrder.amount.toLocaleString()} HTG</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Orders

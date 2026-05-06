import React from 'react'
import { useNavigate } from 'react-router-dom'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
  activeTab: string
  onTabChange: (tab: string) => void
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, activeTab, onTabChange }) => {
  const navigate = useNavigate()

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'fa-chart-line', path: '/' },
    { id: 'products', label: 'Produits', icon: 'fa-box', path: '/products' },
    { id: 'orders', label: 'Commandes', icon: 'fa-shopping-cart', path: '/orders' },
    { id: 'clients', label: 'Clients', icon: 'fa-users', path: '/clients' },
    { id: 'credit', label: 'Service Crédit', icon: 'fa-credit-card', path: '/credit' },
    { id: 'paniers', label: 'Paniers', icon: 'fa-shopping-basket', path: '/paniers' },
    { id: 'subscription', label: 'Abonnement', icon: 'fa-calendar-check', path: '/subscription' },
    { id: 'settings', label: 'Paramètres', icon: 'fa-cog', path: '/settings' },
  ]

  const handleTabClick = (item: typeof menuItems[0]) => {
    onTabChange(item.id)
    navigate(item.path)
    onClose()
  }

  return (
    <aside className={`
      w-64 h-full bg-h-cream border-r border-h-border flex flex-col 
      fixed lg:relative lg:translate-x-0 -translate-x-full 
      transition-transform duration-300 z-40
      ${isOpen ? 'translate-x-0' : ''}
    `}>
      <div className="p-4 lg:p-6">
        <div className="flex items-center gap-3 mb-6 lg:mb-8">
          <div className="h-10 w-10 lg:h-12 lg:w-12 bg-h-primary rounded-xl flex items-center justify-center text-white font-bold">
            <i className="fas fa-home text-lg lg:text-xl"></i>
          </div>
          <div>
            <h2 className="text-lg lg:text-xl font-serif font-bold">Admin</h2>
            <p className="text-xs text-h-muted">H-Daily</p>
          </div>
        </div>
        
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <div
              key={item.id}
              className={`sidebar-item ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => handleTabClick(item)}
            >
              <i className={`fas ${item.icon}`}></i>
              <span className="hidden lg:inline">{item.label}</span>
            </div>
          ))}
        </nav>
      </div>
      
      <div className="absolute bottom-6 left-6 right-6">
        <div className="bg-h-cream p-4 rounded-xl border border-h-border">
          <div className="flex items-center gap-2">
            <i className="fas fa-home text-h-primary"></i>
            <span className="text-sm font-semibold">H-Daily</span>
          </div>
          <p className="text-xs text-h-muted mt-1">
            Contrôle total des produits, commandes et abonnements.
          </p>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar

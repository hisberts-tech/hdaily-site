import React from 'react'

interface HeaderProps {
  activeTab: string
}

const Header: React.FC<HeaderProps> = ({ activeTab }) => {
  const getTabTitle = (tab: string) => {
    const titles: Record<string, string> = {
      dashboard: 'Tableau de bord',
      products: 'Gestion des produits',
      orders: 'Commandes clients',
      clients: 'Gestion des clients',
      credit: 'Service Crédit',
      paniers: 'Paniers Pré-faits',
      subscription: 'Gestion des Abonnements',
      settings: 'Paramètres généraux'
    }
    return titles[tab] || 'Tableau de bord'
  }

  return (
    <header className="bg-white border-b border-h-border px-6 py-4 flex justify-between items-center lg:pl-20">
      <h1 className="text-xl font-serif font-semibold">
        {getTabTitle(activeTab)}
      </h1>
      <div className="flex items-center gap-4">
        <i className="far fa-bell text-xl text-h-muted"></i>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-h-primary flex items-center justify-center text-white">
            <i className="fas fa-home text-sm"></i>
          </div>
          <span className="text-sm font-medium hidden sm:inline">
            Admin H-Daily
          </span>
        </div>
      </div>
    </header>
  )
}

export default Header

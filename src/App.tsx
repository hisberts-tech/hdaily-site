import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import Products from './pages/Products'
import Orders from './pages/Orders'
import Clients from './pages/Clients'
import Credit from './pages/Credit'
import Paniers from './pages/Paniers'
import Subscription from './pages/Subscription'
import Settings from './pages/Settings'

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('dashboard')

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

  return (
    <div className="flex h-screen overflow-hidden bg-h-cream">
      {/* Sidebar */}
      <Sidebar 
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-h-cream">
        {/* Mobile Menu Toggle */}
        <button 
          className="lg:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded-lg shadow-md"
          onClick={toggleSidebar}
        >
          <i className="fas fa-bars text-h-primary"></i>
        </button>
        
        <Header activeTab={activeTab} />
        
        <div className="p-6 md:p-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/products" element={<Products />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/credit" element={<Credit />} />
            <Route path="/paniers" element={<Paniers />} />
            <Route path="/subscription" element={<Subscription />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </main>
    </div>
  )
}

export default App

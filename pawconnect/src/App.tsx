import React, { useState } from 'react';
import { Home, Dog, Utensils, ShoppingBag, Stethoscope, MapPin, Heart, Menu, X, ShoppingCart } from 'lucide-react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import HomePage from './pages/HomePage';
import BreedsPage from './pages/BreedsPage';
import FoodPage from './pages/FoodPage';
import AccessoriesPage from './pages/AccessoriesPage';
import VetPage from './pages/VetPage';
import MarketsPage from './pages/MarketsPage';
import AdoptionPage from './pages/AdoptionPage';

const App: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [cart, setCart] = useState<{ name: string; price: number }[]>([]);
  const location = useLocation();

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  const addToCart = (item: { name: string; price: number }) => {
    setCart([...cart, item]);
  };

  const removeFromCart = (index: number) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Breeds', path: '/breeds', icon: Dog },
    { name: 'Pet Food', path: '/food', icon: Utensils },
    { name: 'Accessories', path: '/accessories', icon: ShoppingBag },
    { name: 'Vet Consultation', path: '/vet', icon: Stethoscope },
    { name: 'Pet Markets', path: '/markets', icon: MapPin },
    { name: 'Adoption', path: '/adoption', icon: Heart },
  ];

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: isSidebarOpen ? 280 : 80 }}
        className="bg-white border-r border-slate-200 flex flex-col shadow-2xl z-20"
      >
        <div className="p-8 flex items-center justify-between">
          {isSidebarOpen && (
            <motion.h1 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-2xl font-bold text-primary flex items-center gap-3"
            >
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                <Heart className="fill-primary text-primary" size={24} />
              </div>
              PawConnect
            </motion.h1>
          )}
          {!isSidebarOpen && (
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center mx-auto">
              <Heart className="fill-primary text-primary" size={20} />
            </div>
          )}
        </div>

        <nav className="flex-1 px-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`nav-link ${location.pathname === item.path ? 'active' : ''} ${!isSidebarOpen ? 'justify-center px-0' : ''}`}
            >
              <item.icon size={20} />
              {isSidebarOpen && <span>{item.name}</span>}
            </Link>
          ))}
        </nav>

        <div className="p-6">
          <div className={`bg-slate-50 p-4 rounded-2xl border border-slate-100 transition-all ${!isSidebarOpen ? 'flex justify-center' : ''}`}>
            <div className={`flex items-center gap-3 text-primary font-bold ${!isSidebarOpen ? 'flex-col' : 'justify-between'}`}>
              <div className="relative">
                <ShoppingCart size={20} />
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center border-2 border-white">
                    {cart.length}
                  </span>
                )}
              </div>
              {isSidebarOpen && <span>Cart ({cart.length})</span>}
            </div>
          </div>
        </div>
        
        <button 
          onClick={toggleSidebar}
          className="p-4 border-t border-slate-100 text-slate-400 hover:text-primary transition-colors flex items-center justify-center"
        >
          {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="p-8 max-w-6xl mx-auto"
          >
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/breeds" element={<BreedsPage />} />
              <Route path="/food" element={<FoodPage />} />
              <Route path="/accessories" element={<AccessoriesPage addToCart={addToCart} cart={cart} removeFromCart={removeFromCart} />} />
              <Route path="/vet" element={<VetPage />} />
              <Route path="/markets" element={<MarketsPage />} />
              <Route path="/adoption" element={<AdoptionPage />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};

export default App;

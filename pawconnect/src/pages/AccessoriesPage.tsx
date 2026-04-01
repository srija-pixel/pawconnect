import React, { useState } from 'react';
import { ShoppingCart, Trash2, Search, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}

interface Props {
  addToCart: (item: { name: string; price: number }) => void;
  cart: { name: string; price: number }[];
  removeFromCart: (index: number) => void;
}

const AccessoriesPage: React.FC<Props> = ({ addToCart, cart, removeFromCart }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [orderPlaced, setOrderPlaced] = useState(false);

  const products: Product[] = [
    { id: 1, name: 'Premium Leather Collar', price: 25, image: 'https://images.unsplash.com/photo-1591768793355-74d7c836038c?auto=format&fit=crop&q=80&w=400', category: 'Collar' },
    { id: 2, name: 'Orthopedic Pet Bed', price: 85, image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&q=80&w=400', category: 'Bed' },
    { id: 3, name: 'Ceramic Food Bowl', price: 15, image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=400', category: 'Bowl' },
    { id: 4, name: 'Interactive Squeaky Toy', price: 12, image: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&q=80&w=400', category: 'Toy' },
    { id: 5, name: 'Heavy Duty Leash', price: 20, image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&q=80&w=400', category: 'Leash' },
    { id: 6, name: 'Grooming Brush Set', price: 30, image: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&q=80&w=400', category: 'Grooming' },
  ];

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  const handlePlaceOrder = () => {
    if (cart.length === 0) return;
    setOrderPlaced(true);
    setTimeout(() => {
      setOrderPlaced(false);
      // Clear cart logic would go here if passed down
    }, 3000);
  };

  return (
    <div className="space-y-10">
      <header className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="space-y-1">
          <h2 className="text-4xl font-bold text-gray-800">Pet Shop</h2>
          <p className="text-gray-500">Quality accessories for your furry friends</p>
        </div>
        <div className="relative w-full md:w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input 
            type="text" 
            placeholder="Search accessories..." 
            className="input-field pl-12"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </header>

      <div className="grid lg:grid-cols-3 gap-10">
        {/* Products Grid */}
        <div className="lg:col-span-2 grid md:grid-cols-2 gap-6">
          {filteredProducts.map((product) => (
            <motion.div 
              key={product.id}
              whileHover={{ y: -5 }}
              className="glass-card overflow-hidden group"
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-6 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-xs font-bold text-primary uppercase tracking-wider">{product.category}</span>
                    <h4 className="text-lg font-bold text-gray-800">{product.name}</h4>
                  </div>
                  <span className="text-xl font-bold text-primary">₹{product.price}</span>
                </div>
                <button 
                  onClick={() => addToCart({ name: product.name, price: product.price })}
                  className="w-full btn-primary flex items-center justify-center gap-2"
                >
                  <ShoppingCart size={18} /> Add to Cart
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Cart Sidebar */}
        <div className="space-y-6">
          <div className="glass-card p-6 sticky top-8">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <ShoppingCart className="text-primary" /> Your Cart
            </h3>
            
            <div className="space-y-4 max-h-[400px] overflow-y-auto mb-6 pr-2">
              {cart.length === 0 ? (
                <p className="text-gray-400 text-center py-8">Your cart is empty</p>
              ) : (
                cart.map((item, index) => (
                  <div key={index} className="flex justify-between items-center bg-gray-50 p-3 rounded-xl">
                    <div>
                      <p className="font-medium text-sm">{item.name}</p>
                      <p className="text-primary font-bold text-xs">₹{item.price}</p>
                    </div>
                    <button 
                      onClick={() => removeFromCart(index)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))
              )}
            </div>

            <div className="border-t border-gray-100 pt-4 space-y-4">
              <div className="flex justify-between items-center text-lg font-bold">
                <span>Total</span>
                <span className="text-primary">₹{totalPrice}</span>
              </div>
              <button 
                onClick={handlePlaceOrder}
                disabled={cart.length === 0}
                className="w-full btn-primary py-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Success Message */}
      <AnimatePresence>
        {orderPlaced && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed bottom-8 right-8 bg-primary text-white p-6 rounded-2xl shadow-2xl flex items-center gap-4 z-50"
          >
            <div className="bg-white/20 p-2 rounded-full">
              <CheckCircle size={32} />
            </div>
            <div>
              <p className="font-bold text-lg">Order Placed Successfully!</p>
              <p className="text-white/80">Thank you for shopping with PawConnect.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AccessoriesPage;

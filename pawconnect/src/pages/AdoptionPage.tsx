import React, { useState } from 'react';
import { Heart, Info, CheckCircle, ShieldCheck, X, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const AdoptionPage: React.FC = () => {
  const [selectedPet, setSelectedPet] = useState<any>(null);
  const [showPolicy, setShowPolicy] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [status, setStatus] = useState<'idle' | 'review' | 'approved'>('idle');
  const [formData, setFormData] = useState({
    userName: '',
    address: '',
    email: ''
  });

  const pets = [
    { id: 1, name: 'Buddy', age: '2 Years', health: 'Vaccinated', fee: 150, image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=400' },
    { id: 2, name: 'Luna', age: '6 Months', health: 'Healthy', fee: 200, image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=400' },
    { id: 3, name: 'Max', age: '4 Years', health: 'Neutered', fee: 100, image: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&q=80&w=400' },
    { id: 4, name: 'Bella', age: '1 Year', health: 'Vaccinated', fee: 180, image: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&q=80&w=400' },
  ];

  const handleAdoptClick = (pet: any) => {
    setSelectedPet(pet);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) return;

    setStatus('review');
    
    try {
      const response = await fetch('/api/adopt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          petName: selectedPet.name,
          fee: selectedPet.fee
        }),
      });

      if (response.ok) {
        setTimeout(() => {
          setStatus('approved');
          setTimeout(() => {
            setStatus('idle');
            setSelectedPet(null);
            setFormData({ userName: '', address: '', email: '' });
            setAgreed(false);
          }, 3000);
        }, 3000);
      }
    } catch (error) {
      console.error("Adoption error:", error);
      setStatus('idle');
    }
  };

  return (
    <div className="space-y-10">
      <header className="text-center space-y-2">
        <h2 className="text-4xl font-bold text-gray-800">Ethical Adoption</h2>
        <p className="text-gray-500">Give a forever home to a companion in need</p>
      </header>

      <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {pets.map((pet) => (
          <motion.div 
            key={pet.id}
            whileHover={{ y: -5 }}
            className="glass-card overflow-hidden group"
          >
            <div className="h-48 overflow-hidden">
              <img src={pet.image} alt={pet.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            </div>
            <div className="p-6 space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="text-xl font-bold text-gray-800">{pet.name}</h4>
                <span className="bg-green-100 text-primary text-xs font-bold px-2 py-1 rounded-full">{pet.age}</span>
              </div>
              <div className="space-y-1 text-sm text-gray-500">
                <p className="flex items-center gap-2"><CheckCircle size={14} className="text-primary" /> {pet.health}</p>
                <p className="flex items-center gap-2"><Heart size={14} className="text-primary" /> Adoption Fee: ₹{pet.fee}</p>
              </div>
              <button 
                onClick={() => handleAdoptClick(pet)}
                className="w-full btn-primary"
              >
                Adopt Now
              </button>
            </div>
          </motion.div>
        ))}
      </section>

      {/* Adoption Modal */}
      <AnimatePresence>
        {selectedPet && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass-card max-w-2xl w-full overflow-hidden relative flex flex-col md:flex-row"
            >
              <button 
                onClick={() => setSelectedPet(null)}
                className="absolute top-4 right-4 p-2 bg-white/80 rounded-full shadow-md hover:bg-white z-10"
              >
                <X size={20} />
              </button>

              <div className="md:w-1/2 bg-green-50 p-8 space-y-6">
                <img src={selectedPet.image} alt={selectedPet.name} className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-white shadow-lg" />
                <div className="text-center space-y-2">
                  <h4 className="text-2xl font-bold text-primary">Adopting {selectedPet.name}</h4>
                  <p className="text-gray-600">You're about to change a life forever!</p>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Adoption Fee</span>
                    <span className="font-bold text-primary">₹{selectedPet.fee}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Processing Time</span>
                    <span className="font-bold text-primary">3-5 Business Days</span>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-2xl text-xs text-gray-500 flex gap-3">
                  <Info className="text-primary shrink-0" size={16} />
                  <p>All fees go directly towards supporting the shelter and providing medical care for other animals.</p>
                </div>
              </div>

              <div className="md:w-1/2 p-8 space-y-6">
                <h5 className="text-xl font-bold text-gray-800">Application Details</h5>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-400 uppercase">Your Name</label>
                    <input 
                      required
                      type="text" 
                      className="input-field"
                      value={formData.userName}
                      onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-400 uppercase">Email Address</label>
                    <input 
                      required
                      type="email" 
                      className="input-field"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-400 uppercase">Home Address</label>
                    <textarea 
                      required
                      rows={2}
                      className="input-field resize-none"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    ></textarea>
                  </div>

                  <div className="flex items-start gap-2 pt-2">
                    <input 
                      type="checkbox" 
                      id="policy" 
                      className="mt-1 accent-primary"
                      checked={agreed}
                      onChange={(e) => setAgreed(e.target.checked)}
                    />
                    <label htmlFor="policy" className="text-xs text-gray-500">
                      I agree to the <button type="button" onClick={() => setShowPolicy(true)} className="text-primary font-bold hover:underline">Adoption Policy</button> and confirm I can provide a safe environment.
                    </label>
                  </div>

                  <button 
                    type="submit" 
                    disabled={!agreed || status !== 'idle'}
                    className="w-full btn-primary py-3 relative overflow-hidden"
                  >
                    {status === 'idle' && 'Submit Application'}
                    {status === 'review' && (
                      <motion.span 
                        initial={{ y: 20 }} 
                        animate={{ y: 0 }} 
                        className="flex items-center justify-center gap-2"
                      >
                        <Activity className="animate-spin" size={18} /> Under Review...
                      </motion.span>
                    )}
                    {status === 'approved' && (
                      <motion.span 
                        initial={{ y: 20 }} 
                        animate={{ y: 0 }} 
                        className="flex items-center justify-center gap-2"
                      >
                        <ShieldCheck size={18} /> Approved!
                      </motion.span>
                    )}
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Policy Modal */}
      <AnimatePresence>
        {showPolicy && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
            <motion.div 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              className="glass-card max-w-lg w-full p-8 space-y-6"
            >
              <h4 className="text-2xl font-bold text-primary">Adoption Policy</h4>
              <div className="max-h-[300px] overflow-y-auto pr-4 text-sm text-gray-600 space-y-4 leading-relaxed">
                <p className="font-bold text-gray-800">1. Commitment to Care</p>
                <p>Adopters must provide adequate food, water, shelter, and medical care for the pet. This includes regular vaccinations and emergency vet visits.</p>
                
                <p className="font-bold text-gray-800">2. Safe Environment</p>
                <p>The pet must live indoors as a family member. Outdoor-only living is not permitted for our animals.</p>
                
                <p className="font-bold text-gray-800">3. Return Policy</p>
                <p>If for any reason you can no longer care for the pet, you must return them to PawConnect. Re-homing to third parties without our consent is prohibited.</p>
                
                <p className="font-bold text-gray-800">4. Home Checks</p>
                <p>PawConnect reserves the right to perform home visits before and after adoption to ensure the well-being of the animal.</p>
              </div>
              <button onClick={() => setShowPolicy(false)} className="w-full btn-primary">
                I Understand
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdoptionPage;

import React, { useState } from 'react';
import { MapPin, Navigation, Search, ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';

const MarketsPage: React.FC = () => {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [loading, setLoading] = useState(false);

  const markets = [
    { name: 'Green Valley Pet Hub', address: '123 Bark St, Petville', breeds: 'Golden Retrievers, Pugs, Beagles' },
    { name: 'The Cat Corner', address: '456 Meow Ln, Whisker City', breeds: 'Persians, Siamese, Ragdolls' },
    { name: 'Exotic Friends Market', address: '789 Jungle Rd, Wildwood', breeds: 'Parrots, Hamsters, Rabbits' },
    { name: 'City Pet Bazaar', address: '101 Downtown Ave, Metro', breeds: 'All common breeds' },
  ];

  const findMarkets = () => {
    setLoading(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
        setLoading(false);
      }, (error) => {
        console.error("Error getting location:", error);
        setLoading(false);
        // Fallback location
        setLocation({ lat: 40.7128, lng: -74.0060 });
      });
    } else {
      alert("Geolocation is not supported by your browser");
      setLoading(false);
    }
  };

  return (
    <div className="space-y-10">
      <header className="text-center space-y-2">
        <h2 className="text-4xl font-bold text-gray-800">Pet Markets</h2>
        <p className="text-gray-500">Locate the best pet stores and markets near you</p>
      </header>

      <section className="glass-card p-10 text-center space-y-8">
        <div className="max-w-md mx-auto space-y-4">
          <div className="w-20 h-20 bg-green-100 text-primary rounded-full flex items-center justify-center mx-auto">
            <MapPin size={40} />
          </div>
          <h3 className="text-2xl font-bold">Find Local Markets</h3>
          <p className="text-gray-600">Click the button below to find pet markets based on your current geographical location.</p>
          <button 
            onClick={findMarkets}
            disabled={loading}
            className="w-full btn-primary py-4 flex items-center justify-center gap-2"
          >
            {loading ? 'Locating...' : <><Navigation size={20} /> Find markets near me</>}
          </button>
        </div>

        {location && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="grid md:grid-cols-2 gap-4 max-w-md mx-auto">
              <div className="bg-gray-100 p-4 rounded-2xl">
                <p className="text-xs font-bold text-gray-400 uppercase">Latitude</p>
                <p className="text-xl font-mono font-bold text-primary">{location.lat.toFixed(4)}</p>
              </div>
              <div className="bg-gray-100 p-4 rounded-2xl">
                <p className="text-xs font-bold text-gray-400 uppercase">Longitude</p>
                <p className="text-xl font-mono font-bold text-primary">{location.lng.toFixed(4)}</p>
              </div>
            </div>

            <div className="rounded-3xl overflow-hidden shadow-lg border-4 border-white h-[400px]">
              <iframe
                title="Google Maps"
                width="100%"
                height="100%"
                frameBorder="0"
                style={{ border: 0 }}
                src={`https://maps.google.com/maps?q=pet+stores+near+me&ll=${location.lat},${location.lng}&z=13&output=embed`}
                allowFullScreen
              ></iframe>
            </div>
          </motion.div>
        )}
      </section>

      <section className="grid md:grid-cols-2 gap-6">
        {markets.map((market) => (
          <div key={market.name} className="glass-card p-6 flex flex-col justify-between hover:border-primary/50 transition-all">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <h4 className="text-xl font-bold text-gray-800">{market.name}</h4>
                <ExternalLink size={18} className="text-gray-400" />
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-500 flex items-center gap-2">
                  <MapPin size={14} className="text-primary" /> {market.address}
                </p>
                <div className="bg-green-50 p-3 rounded-xl">
                  <p className="text-xs font-bold text-primary uppercase mb-1">Available Breeds</p>
                  <p className="text-sm text-gray-700">{market.breeds}</p>
                </div>
              </div>
            </div>
            <button className="mt-6 text-primary font-bold text-sm hover:underline text-left">
              View details & directions
            </button>
          </div>
        ))}
      </section>
    </div>
  );
};

export default MarketsPage;

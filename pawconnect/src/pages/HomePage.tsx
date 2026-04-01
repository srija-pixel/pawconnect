import React from 'react';
import DogCanvas from '../components/DogCanvas';
import { Shield, Heart, Activity, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative h-[400px] rounded-3xl overflow-hidden shadow-2xl group">
        <img 
          src="https://images.unsplash.com/photo-1450778869180-41d0601e046e?auto=format&fit=crop&q=80&w=2000" 
          alt="Happy Pets" 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex flex-col justify-center p-12 text-white">
          <h2 className="text-5xl font-bold mb-4 leading-tight">Your Pet's Best Life <br/> Starts Here</h2>
          <p className="text-xl mb-8 max-w-md text-gray-200">Connect with ethical breeders, find the best nutrition, and book expert vet consultations all in one place.</p>
          <div className="flex gap-4">
            <Link to="/adoption" className="btn-primary flex items-center gap-2">
              Adopt Now <ArrowRight size={18} />
            </Link>
            <Link to="/breeds" className="bg-white/20 backdrop-blur-md hover:bg-white/30 text-white font-semibold py-2 px-6 rounded-xl transition-all">
              Explore Breeds
            </Link>
          </div>
        </div>
      </section>

      {/* Interactive Feature */}
      <section className="space-y-4">
        <h3 className="text-2xl font-bold text-gray-800">Playful Moments</h3>
        <DogCanvas />
      </section>

      {/* Feature Cards */}
      <section className="grid md:grid-cols-3 gap-8">
        <div className="glass-card p-8 hover:-translate-y-2 transition-transform duration-300">
          <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center text-primary mb-6">
            <Heart size={32} />
          </div>
          <h4 className="text-xl font-bold mb-3">Ethical Adoption</h4>
          <p className="text-gray-600 leading-relaxed">We partner with verified shelters to ensure every pet finds a loving, permanent home through a transparent process.</p>
        </div>

        <div className="glass-card p-8 hover:-translate-y-2 transition-transform duration-300">
          <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mb-6">
            <Activity size={32} />
          </div>
          <h4 className="text-xl font-bold mb-3">Pet Care Services</h4>
          <p className="text-gray-600 leading-relaxed">From nutrition guides to expert vet consultations, we provide everything you need to keep your companion healthy.</p>
        </div>

        <div className="glass-card p-8 hover:-translate-y-2 transition-transform duration-300">
          <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600 mb-6">
            <Shield size={32} />
          </div>
          <h4 className="text-xl font-bold mb-3">Community & Safety</h4>
          <p className="text-gray-600 leading-relaxed">Join a community of pet lovers. Our platform ensures safety and support for both pets and their owners.</p>
        </div>
      </section>
    </div>
  );
};

export default HomePage;

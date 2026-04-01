import React, { useState } from 'react';
import { Search, Volume2, Play, X, Dog, Utensils } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const BreedsPage: React.FC = () => {
  const [species, setSpecies] = useState<'dog' | 'cat'>('dog');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBreed, setSelectedBreed] = useState<any>(null);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  const dogBreeds = [
    { name: 'Golden Retriever', temperament: 'Friendly, Intelligent', care: 'High', audio: 'https://assets.mixkit.co/active_storage/sfx/2558/2558-preview.mp3', video: 'https://www.youtube.com/embed/17_YpS_pY8k' },
    { name: 'German Shepherd', temperament: 'Confident, Brave', care: 'Medium', audio: 'https://assets.mixkit.co/active_storage/sfx/2558/2558-preview.mp3', video: 'https://www.youtube.com/embed/17_YpS_pY8k' },
    { name: 'Beagle', temperament: 'Merry, Curious', care: 'Low', audio: 'https://assets.mixkit.co/active_storage/sfx/2558/2558-preview.mp3', video: 'https://www.youtube.com/embed/17_YpS_pY8k' },
  ];

  const catBreeds = [
    { name: 'Persian', temperament: 'Sweet, Quiet', care: 'High', audio: 'https://assets.mixkit.co/active_storage/sfx/2557/2557-preview.mp3', video: 'https://www.youtube.com/embed/hY7m5jjJ9mM' },
    { name: 'Maine Coon', temperament: 'Gentle, Friendly', care: 'Medium', audio: 'https://assets.mixkit.co/active_storage/sfx/2557/2557-preview.mp3', video: 'https://www.youtube.com/embed/hY7m5jjJ9mM' },
    { name: 'Siamese', temperament: 'Social, Vocal', care: 'Medium', audio: 'https://assets.mixkit.co/active_storage/sfx/2557/2557-preview.mp3', video: 'https://www.youtube.com/embed/hY7m5jjJ9mM' },
  ];

  const playAudio = (url: string) => {
    const audio = new Audio();
    audio.src = url;
    audio.play().catch(err => {
      console.error("Audio playback failed:", err);
      // Fallback to a different source if first one fails
      const fallback = url.includes('2558') 
        ? 'https://www.soundjay.com/misc/sounds/dog-bark-1.mp3'
        : 'https://www.soundjay.com/misc/sounds/cat-meow-1.mp3';
      
      const fallbackAudio = new Audio(fallback);
      fallbackAudio.play().catch(e => {
        console.error("Fallback audio failed:", e);
        // If both fail, it might be a browser restriction (e.g. autoplay/interaction)
        // or a network issue in the iframe.
      });
    });
  };

  const handleSearch = async () => {
    if (!searchQuery) return;
    
    const breedInfo = {
      name: searchQuery,
      description: `The ${searchQuery} is a remarkable breed known for its unique characteristics and loyal nature.`,
      nature: species === 'dog' ? 'Playful and Protective' : 'Independent and Affectionate',
      image: `https://loremflickr.com/500/300/${species},${searchQuery.replace(/\s+/g, '')}`,
      audio: species === 'dog' ? 'https://assets.mixkit.co/active_storage/sfx/2558/2558-preview.mp3' : 'https://assets.mixkit.co/active_storage/sfx/2557/2557-preview.mp3',
      video: species === 'dog' ? 'https://www.youtube.com/embed/17_YpS_pY8k' : 'https://www.youtube.com/embed/hY7m5jjJ9mM'
    };
    setSelectedBreed(breedInfo);
  };

  return (
    <div className="space-y-10">
      <header className="text-center space-y-2">
        <h2 className="text-4xl font-bold text-gray-800">Breed Encyclopedia</h2>
        <p className="text-gray-500">Discover the perfect companion for your lifestyle</p>
      </header>

      {/* Search Section */}
      <section className="glass-card p-8 max-w-2xl mx-auto space-y-6">
        <div className="flex gap-4 p-1 bg-gray-100 rounded-2xl">
          <button 
            onClick={() => setSpecies('dog')}
            className={`flex-1 py-2 rounded-xl font-bold transition-all ${species === 'dog' ? 'bg-primary text-white shadow-md' : 'text-gray-500'}`}
          >
            Dogs
          </button>
          <button 
            onClick={() => setSpecies('cat')}
            className={`flex-1 py-2 rounded-xl font-bold transition-all ${species === 'cat' ? 'bg-primary text-white shadow-md' : 'text-gray-500'}`}
          >
            Cats
          </button>
        </div>
        <div className="flex gap-2">
          <input 
            type="text" 
            placeholder={`Enter ${species} breed name...`}
            className="input-field"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button onClick={handleSearch} className="btn-primary flex items-center gap-2">
            <Search size={18} /> Search
          </button>
        </div>
      </section>

      {/* Tables Section */}
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="glass-card overflow-hidden">
          <div className="bg-primary p-4 text-white font-bold flex items-center gap-2">
            <Dog size={20} /> Popular Dog Breeds
          </div>
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-xs uppercase text-gray-500">
              <tr>
                <th className="px-6 py-3">Breed</th>
                <th className="px-6 py-3">Temperament</th>
                <th className="px-6 py-3">Care</th>
                <th className="px-6 py-3">Media</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {dogBreeds.map((b) => (
                <tr key={b.name} className="hover:bg-green-50 transition-colors">
                  <td className="px-6 py-4 font-medium">{b.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{b.temperament}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${b.care === 'High' ? 'bg-red-100 text-red-600' : b.care === 'Medium' ? 'bg-orange-100 text-orange-600' : 'bg-green-100 text-green-600'}`}>
                      {b.care}
                    </span>
                  </td>
                  <td className="px-6 py-4 flex gap-2">
                    <button onClick={() => playAudio(b.audio)} className="p-1.5 hover:bg-gray-200 rounded-lg text-primary" title="Play Bark"><Volume2 size={16} /></button>
                    <button onClick={() => setActiveVideo(b.video)} className="p-1.5 hover:bg-gray-200 rounded-lg text-primary" title="Watch Video"><Play size={16} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="glass-card overflow-hidden">
          <div className="bg-primary p-4 text-white font-bold flex items-center gap-2">
            <Utensils size={20} /> Popular Cat Breeds
          </div>
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-xs uppercase text-gray-500">
              <tr>
                <th className="px-6 py-3">Breed</th>
                <th className="px-6 py-3">Temperament</th>
                <th className="px-6 py-3">Care</th>
                <th className="px-6 py-3">Media</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {catBreeds.map((b) => (
                <tr key={b.name} className="hover:bg-green-50 transition-colors">
                  <td className="px-6 py-4 font-medium">{b.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{b.temperament}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${b.care === 'High' ? 'bg-red-100 text-red-600' : b.care === 'Medium' ? 'bg-orange-100 text-orange-600' : 'bg-green-100 text-green-600'}`}>
                      {b.care}
                    </span>
                  </td>
                  <td className="px-6 py-4 flex gap-2">
                    <button onClick={() => playAudio(b.audio)} className="p-1.5 hover:bg-gray-200 rounded-lg text-primary" title="Play Meow"><Volume2 size={16} /></button>
                    <button onClick={() => setActiveVideo(b.video)} className="p-1.5 hover:bg-gray-200 rounded-lg text-primary" title="Watch Video"><Play size={16} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Popup Result */}
      <AnimatePresence>
        {selectedBreed && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass-card max-w-md w-full overflow-hidden relative"
            >
              <button 
                onClick={() => setSelectedBreed(null)}
                className="absolute top-4 right-4 p-2 bg-white/80 rounded-full shadow-md hover:bg-white z-10"
              >
                <X size={20} />
              </button>
              <img src={selectedBreed.image} alt={selectedBreed.name} className="w-full h-48 object-cover" referrerPolicy="no-referrer" />
              <div className="p-8 space-y-4">
                <h4 className="text-2xl font-bold text-primary">{selectedBreed.name}</h4>
                <p className="text-gray-600">{selectedBreed.description}</p>
                <div className="bg-green-50 p-4 rounded-xl">
                  <p className="text-sm font-bold text-primary uppercase tracking-wider">Nature</p>
                  <p className="text-gray-700">{selectedBreed.nature}</p>
                </div>
                <div className="flex gap-4">
                  <button onClick={() => playAudio(selectedBreed.audio)} className="flex-1 btn-primary flex items-center justify-center gap-2">
                    <Volume2 size={18} /> Play Audio
                  </button>
                  <button onClick={() => setActiveVideo(selectedBreed.video)} className="flex-1 border-2 border-primary text-primary font-bold py-2 rounded-xl hover:bg-green-50 transition-all flex items-center justify-center gap-2">
                    <Play size={18} /> Watch Video
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Video Player Modal */}
      <AnimatePresence>
        {activeVideo && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-4xl aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl"
            >
              <button 
                onClick={() => setActiveVideo(null)}
                className="absolute top-4 right-4 p-2 bg-white/20 text-white rounded-full hover:bg-white/40 z-10"
              >
                <X size={24} />
              </button>
              <iframe
                width="100%"
                height="100%"
                src={activeVideo}
                title="Pet Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                <a 
                  href={activeVideo.replace('embed/', 'watch?v=')} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-white/20 hover:bg-white/40 text-white text-xs px-4 py-2 rounded-full backdrop-blur-md transition-all"
                >
                  Video not loading? Watch on YouTube
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BreedsPage;

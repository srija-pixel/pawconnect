import React, { useState } from 'react';
import { Utensils, Zap, Info } from 'lucide-react';

const FoodPage: React.FC = () => {
  const [species, setSpecies] = useState<'dog' | 'cat'>('dog');
  const [breed, setBreed] = useState('');
  const [size, setSize] = useState('medium');
  const [activity, setActivity] = useState('active');
  const [recommendation, setRecommendation] = useState<string | null>(null);

  const dogFoodHabits = [
    { age: 'Puppy', frequency: '3-4 times/day', type: 'High protein, calcium' },
    { age: 'Adult', frequency: '2 times/day', type: 'Balanced protein & fats' },
    { age: 'Senior', frequency: '2 times/day', type: 'Low calorie, high fiber' },
  ];

  const catFoodHabits = [
    { age: 'Kitten', frequency: '4-5 times/day', type: 'Growth formula' },
    { age: 'Adult', frequency: '2-3 times/day', type: 'Meat-based, taurine rich' },
    { age: 'Senior', frequency: '2 times/day', type: 'Easy to digest, joint support' },
  ];

  const getNutrition = () => {
    if (!breed) return;

    let advice = '';
    if (size === 'small') advice += 'Small portions with high energy density. ';
    else if (size === 'large') advice += 'Controlled portions to prevent joint stress. ';
    else advice += 'Standard balanced portions. ';

    if (activity === 'active') advice += 'Increase protein and complex carbs for stamina.';
    else advice += 'Focus on fiber and lean proteins to maintain weight.';

    setRecommendation(`For your ${breed}: ${advice}`);
  };

  return (
    <div className="space-y-10">
      <header className="text-center space-y-2">
        <h2 className="text-4xl font-bold text-gray-800">Pet Nutrition Guide</h2>
        <p className="text-gray-500">Fuel your pet's health with the right diet</p>
      </header>

      {/* Tables */}
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="glass-card overflow-hidden">
          <div className="bg-primary p-4 text-white font-bold flex items-center gap-2">
            <Utensils size={20} /> Dog Food Habits
          </div>
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-xs uppercase text-gray-500">
              <tr>
                <th className="px-6 py-3">Life Stage</th>
                <th className="px-6 py-3">Frequency</th>
                <th className="px-6 py-3">Nutrition Focus</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {dogFoodHabits.map((h) => (
                <tr key={h.age} className="hover:bg-green-50 transition-colors">
                  <td className="px-6 py-4 font-medium">{h.age}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{h.frequency}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{h.type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="glass-card overflow-hidden">
          <div className="bg-primary p-4 text-white font-bold flex items-center gap-2">
            <Utensils size={20} /> Cat Food Habits
          </div>
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-xs uppercase text-gray-500">
              <tr>
                <th className="px-6 py-3">Life Stage</th>
                <th className="px-6 py-3">Frequency</th>
                <th className="px-6 py-3">Nutrition Focus</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {catFoodHabits.map((h) => (
                <tr key={h.age} className="hover:bg-green-50 transition-colors">
                  <td className="px-6 py-4 font-medium">{h.age}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{h.frequency}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{h.type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Dynamic Feature */}
      <section className="glass-card p-8 max-w-3xl mx-auto space-y-8">
        <div className="flex items-center gap-3 text-2xl font-bold text-primary">
          <Zap /> Nutrition Calculator
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <label className="block text-sm font-bold text-gray-700">Species</label>
            <div className="flex gap-4 p-1 bg-gray-100 rounded-2xl">
              <button 
                onClick={() => setSpecies('dog')}
                className={`flex-1 py-2 rounded-xl font-bold transition-all ${species === 'dog' ? 'bg-primary text-white shadow-md' : 'text-gray-500'}`}
              >
                Dog
              </button>
              <button 
                onClick={() => setSpecies('cat')}
                className={`flex-1 py-2 rounded-xl font-bold transition-all ${species === 'cat' ? 'bg-primary text-white shadow-md' : 'text-gray-500'}`}
              >
                Cat
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-bold text-gray-700">Breed Name</label>
            <input 
              type="text" 
              placeholder="e.g. Labrador"
              className="input-field"
              value={breed}
              onChange={(e) => setBreed(e.target.value)}
            />
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-bold text-gray-700">Pet Size</label>
            <select 
              className="input-field"
              value={size}
              onChange={(e) => setSize(e.target.value)}
            >
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-bold text-gray-700">Activity Level</label>
            <select 
              className="input-field"
              value={activity}
              onChange={(e) => setActivity(e.target.value)}
            >
              <option value="lazy">Lazy / Indoor</option>
              <option value="active">Active / Outdoor</option>
              <option value="very-active">Very Active / Working</option>
            </select>
          </div>
        </div>

        <button onClick={getNutrition} className="w-full btn-primary py-4 text-lg">
          Calculate Nutrition Plan
        </button>

        {recommendation && (
          <div className="bg-primary/10 border-l-4 border-primary p-6 rounded-r-2xl flex gap-4">
            <Info className="text-primary shrink-0" />
            <div>
              <p className="font-bold text-primary mb-1">Recommendation</p>
              <p className="text-gray-700 leading-relaxed">{recommendation}</p>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default FoodPage;

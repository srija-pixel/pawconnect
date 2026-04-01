import React, { useState } from 'react';
import { Stethoscope, Calendar, User, Mail, MessageSquare, CheckCircle, Star, Award, Clock, ShieldCheck, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const VetPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    petType: 'Dog',
    issue: '',
    doctor: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const doctors = [
    { 
      name: 'Dr. Sarah Wilson', 
      spec: 'General Surgeon', 
      exp: '12 Years', 
      image: 'https://images.unsplash.com/photo-1559839734-2b71430327f1?auto=format&fit=crop&q=80&w=400',
      rating: 4.9,
      reviews: 128,
      availability: 'Mon - Fri'
    },
    { 
      name: 'Dr. James Miller', 
      spec: 'Pet Nutritionist', 
      exp: '8 Years', 
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400',
      rating: 4.8,
      reviews: 95,
      availability: 'Tue - Sat'
    },
    { 
      name: 'Dr. Emily Chen', 
      spec: 'Behavioral Specialist', 
      exp: '10 Years', 
      image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=400',
      rating: 5.0,
      reviews: 156,
      availability: 'Wed - Sun'
    },
  ];

  const features = [
    { icon: Award, title: 'Certified Experts', desc: 'All our vets are board-certified with years of clinical experience.' },
    { icon: Clock, title: 'Quick Response', desc: 'Get a consultation within 24 hours for non-emergency cases.' },
    { icon: ShieldCheck, title: 'Secure Care', desc: 'Your pet\'s health data is protected with medical-grade security.' },
  ];

  const handleDoctorSelect = (docName: string) => {
    setFormData({ ...formData, doctor: docName });
    document.getElementById('consult-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/consult', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 5000);
        setFormData({ name: '', email: '', petType: 'Dog', issue: '', doctor: '' });
      }
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <header className="text-center space-y-6 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-bold tracking-wide uppercase">
          <Stethoscope size={16} /> World-Class Veterinary Care
        </div>
        <h2 className="text-5xl md:text-6xl font-bold text-slate-900 leading-tight">
          Expert Medical Care for Your <span className="text-primary">Beloved Companions</span>
        </h2>
        <p className="text-xl text-slate-500 leading-relaxed">
          Connect with top-rated veterinarians for professional consultations, surgeries, and behavioral guidance from the comfort of your home.
        </p>
      </header>

      {/* Features Section */}
      <section className="grid md:grid-cols-3 gap-8">
        {features.map((f, i) => (
          <div key={i} className="glass-card p-8 space-y-4 border-none bg-white shadow-sm hover:shadow-md transition-all">
            <div className="w-14 h-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center">
              <f.icon size={28} />
            </div>
            <h3 className="text-xl font-bold text-slate-800">{f.title}</h3>
            <p className="text-slate-500 leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </section>

      {/* Doctor Cards Section */}
      <section className="space-y-10">
        <div className="flex items-end justify-between">
          <div className="space-y-2">
            <h3 className="text-3xl font-bold">Our Specialist Doctors</h3>
            <p className="text-slate-500">Choose from our panel of experienced veterinary professionals</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {doctors.map((doc) => (
            <motion.div 
              key={doc.name}
              whileHover={{ y: -12 }}
              className="glass-card overflow-hidden flex flex-col h-full group"
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={doc.image} 
                  alt={doc.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl shadow-sm flex items-center gap-1.5">
                  <Star className="text-amber-400 fill-amber-400" size={16} />
                  <span className="font-bold text-slate-800">{doc.rating}</span>
                </div>
              </div>
              
              <div className="p-8 flex-1 flex flex-col space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-2xl font-bold text-slate-800">{doc.name}</h4>
                    <span className="badge badge-primary">{doc.exp} Exp</span>
                  </div>
                  <p className="text-primary font-semibold text-lg">{doc.spec}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 py-4 border-y border-slate-100">
                  <div className="space-y-1">
                    <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Availability</p>
                    <p className="text-sm font-medium text-slate-700">{doc.availability}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Reviews</p>
                    <p className="text-sm font-medium text-slate-700">{doc.reviews} Verified</p>
                  </div>
                </div>

                <button 
                  onClick={() => handleDoctorSelect(doc.name)}
                  className="w-full btn-primary group/btn"
                >
                  Book Consultation <ChevronRight size={18} className="transition-transform group-hover/btn:translate-x-1" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Form Section */}
      <section id="consult-form" className="relative">
        <div className="absolute inset-0 bg-primary/5 rounded-[40px] -rotate-1 scale-105 pointer-events-none"></div>
        <div className="glass-card p-12 relative overflow-hidden">
          <div className="grid lg:grid-cols-5 gap-16">
            <div className="lg:col-span-2 space-y-8">
              <div className="space-y-4">
                <h3 className="text-4xl font-bold">Schedule an <span className="text-primary">Appointment</span></h3>
                <p className="text-slate-500 text-lg leading-relaxed">
                  Fill out the form to request a consultation. Our team will review your pet's case and confirm the time slot via email.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center text-primary shrink-0">
                    <CheckCircle size={20} />
                  </div>
                  <div>
                    <p className="font-bold text-slate-800">Instant Confirmation</p>
                    <p className="text-sm text-slate-500">Get an immediate acknowledgment of your request.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center text-primary shrink-0">
                    <CheckCircle size={20} />
                  </div>
                  <div>
                    <p className="font-bold text-slate-800">Video Consultation</p>
                    <p className="text-sm text-slate-500">Option for virtual sessions via secure video link.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-3">
              <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                      required
                      type="text" 
                      placeholder="John Doe"
                      className="input-field pl-12"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                      required
                      type="email" 
                      placeholder="john@example.com"
                      className="input-field pl-12"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">Pet Type</label>
                  <select 
                    className="input-field"
                    value={formData.petType}
                    onChange={(e) => setFormData({ ...formData, petType: e.target.value })}
                  >
                    <option>Dog</option>
                    <option>Cat</option>
                    <option>Bird</option>
                    <option>Rabbit</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">Selected Doctor</label>
                  <input 
                    readOnly
                    type="text" 
                    className="input-field bg-slate-50 font-semibold text-primary"
                    value={formData.doctor}
                    placeholder="Select a doctor above"
                  />
                </div>

                <div className="md:col-span-2 space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">Issue Description</label>
                  <div className="relative">
                    <MessageSquare className="absolute left-4 top-4 text-slate-400" size={18} />
                    <textarea 
                      required
                      rows={4}
                      placeholder="Please describe your pet's symptoms or the reason for consultation..."
                      className="input-field pl-12 resize-none"
                      value={formData.issue}
                      onChange={(e) => setFormData({ ...formData, issue: e.target.value })}
                    ></textarea>
                  </div>
                </div>

                <div className="md:col-span-2 pt-4">
                  <button type="submit" className="w-full btn-primary py-5 text-xl shadow-2xl shadow-primary/40">
                    Confirm Appointment
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Success Modal */}
      <AnimatePresence>
        {submitted && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="glass-card p-12 max-w-md w-full text-center space-y-8"
            >
              <div className="w-24 h-24 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto ring-8 ring-primary/5">
                <CheckCircle size={56} />
              </div>
              <div className="space-y-3">
                <h4 className="text-3xl font-bold text-slate-900">Booking Confirmed!</h4>
                <p className="text-slate-500 text-lg">
                  A confirmation email has been sent to <span className="font-bold text-slate-800">{formData.email}</span>. 
                  Dr. {formData.doctor.split(' ').pop()} will review your request shortly.
                </p>
              </div>
              <button onClick={() => setSubmitted(false)} className="w-full btn-primary py-4">
                Return to Dashboard
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VetPage;

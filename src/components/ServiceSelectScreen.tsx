/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  ArrowLeft,
  ShieldAlert, 
  Car, 
  Home, 
  Building, 
  Wrench, 
  Key, 
  Flame, 
  Truck,
  Sparkles
} from 'lucide-react';
import { Service } from '../types';

interface ServiceSelectScreenProps {
  services: Service[];
  onSelectService: (serviceId: string) => void;
  onBack: () => void;
}

export default function ServiceSelectScreen({
  services,
  onSelectService,
  onBack
}: ServiceSelectScreenProps) {
  const [activeCategory, setActiveCategory] = useState<'all' | 'roadside' | 'locksmith'>('all');

  // Filter services dynamically
  const filteredServices = services.filter((service) => {
    if (activeCategory === 'all') return true;
    return service.category === activeCategory;
  });

  return (
    <div className="flex-grow flex flex-col bg-slate-50 overflow-hidden">
      
      {/* Search Header Bar with Back button */}
      <div className="px-4 pt-3 pb-3 bg-white border-b border-slate-100 flex items-center gap-3">
        <button
          onClick={onBack}
          className="p-2 rounded-xl hover:bg-slate-100 text-slate-700 transition-colors cursor-pointer"
          title="Back to Dashboard"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h2 className="text-base font-extrabold text-slate-900 tracking-tight font-display">Request a service</h2>
          <p className="text-[10px] text-slate-400 font-medium">Select a category below to dispatch a specialist</p>
        </div>
      </div>

      {/* Category Horizontal Filter Pill Tabs */}
      <div className="bg-white px-4 py-2.5 flex gap-2 border-b border-slate-100 scrollbar-none overflow-x-auto shrink-0">
        <button
          onClick={() => setActiveCategory('all')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1 cursor-pointer whitespace-nowrap ${
            activeCategory === 'all'
              ? 'bg-slate-900 text-white shadow-md shadow-slate-900/10'
              : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-100'
          }`}
        >
          <Flame className="w-3.5 h-3.5" />
          <span>All Services</span>
        </button>
        
        <button
          onClick={() => setActiveCategory('roadside')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1 cursor-pointer whitespace-nowrap ${
            activeCategory === 'roadside'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-500/10'
              : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-100'
          }`}
        >
          <Truck className="w-3.5 h-3.5" />
          <span>Towing & Roadside</span>
        </button>

        <button
          onClick={() => setActiveCategory('locksmith')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1 cursor-pointer whitespace-nowrap ${
            activeCategory === 'locksmith'
              ? 'bg-amber-500 text-white shadow-md shadow-amber-500/10'
              : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-100'
          }`}
        >
          <Key className="w-3.5 h-3.5" />
          <span>Bilaad Locksmith</span>
        </button>
      </div>

      {/* Grid listing services in 2-column grid (2x4) matching Screenshot 1 Right Phone */}
      <div className="flex-grow overflow-y-auto p-4 pb-24">
        {filteredServices.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-sm font-semibold text-slate-400">No services match this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3.5">
            {filteredServices.map((service, idx) => {
              const getIcon = (iconName: string) => {
                switch (iconName) {
                  case 'ShieldAlert': return <ShieldAlert className="w-3.5 h-3.5 text-white" />;
                  case 'Car': return <Car className="w-3.5 h-3.5 text-white" />;
                  case 'Home': return <Home className="w-3.5 h-3.5 text-white" />;
                  case 'Building': return <Building className="w-3.5 h-3.5 text-white" />;
                  case 'Wrench': return <Wrench className="w-3.5 h-3.5 text-white" />;
                  case 'Key': return <Key className="w-3.5 h-3.5 text-white" />;
                  default: return <Wrench className="w-3.5 h-3.5 text-white" />;
                }
              };

              // Beautiful real locksmith images fallback mapping
              const servicePicsCombined = [
                "/src/assets/images/auto_lockout_1781651390973.jpg",
                "/src/assets/images/key_programming_1781651402199.jpg",
                "https://images.unsplash.com/photo-1517524206127-48bbd363f3d7?auto=format&fit=crop&q=80&w=350",
                "https://images.unsplash.com/photo-1506015391300-4802dc74de2e?auto=format&fit=crop&q=80&w=350",
                "/src/assets/images/residential_entry_1781651410988.jpg",
                "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=350",
                "https://images.unsplash.com/photo-1582139329536-e7284fece509?auto=format&fit=crop&q=80&w=350",
                "/src/assets/images/key_cutting_1781651423076.jpg"
              ];
              const cardImage = service.imageUrl || servicePicsCombined[idx] || servicePicsCombined[0];

              return (
                <button
                  key={service.id}
                  onClick={() => onSelectService(service.id)}
                  className="w-full text-left aspect-square bg-slate-900 rounded-[28px] relative overflow-hidden group hover:shadow-lg transition-all duration-200 cursor-pointer border border-slate-100"
                  title={`Select ${service.title}`}
                >
                  {/* High quality cover photo */}
                  <img 
                    src={cardImage} 
                    alt={service.title} 
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Glassmorphic darker gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/25 to-slate-950/10"></div>
                  
                  {/* Estimated Price Tag pill in top right corner */}
                  <span className="absolute top-3 right-3 text-[9px] font-black text-slate-900 bg-white shadow-md border border-white/40 px-2 py-1 rounded-full font-sans tracking-wide">
                    {service.estFee}
                  </span>

                  {/* Icon label badge bottom-left */}
                  <div className="absolute top-3 left-3 bg-white/15 backdrop-blur-md p-1.5 rounded-xl border border-white/20">
                    {getIcon(service.iconName)}
                  </div>

                  {/* Card Title near the bottom */}
                  <div className="absolute inset-x-3 bottom-3 text-left">
                    <h3 className="font-extrabold text-[12px] leading-tight text-white font-display tracking-tight drop-shadow-md">
                      {service.title}
                    </h3>
                    <p className="text-[#93c5fd] text-[8px] font-bold uppercase tracking-wider font-mono mt-0.5 max-w-[90%] truncate">
                      {service.category === 'locksmith' ? 'LOCKSMITH' : 'ROADSIDE'}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  ShieldAlert, 
  Car, 
  Home, 
  Building, 
  Wrench, 
  Key, 
  Phone, 
  MapPin, 
  Navigation, 
  Clock, 
  ChevronRight,
  Bell,
  Wallet
} from 'lucide-react';
import { Service } from '../types';

interface DashboardScreenProps {
  userName: string;
  onChangeName: (name: string) => void;
  address: string;
  onChangeAddress: (address: string) => void;
  services: Service[];
  onSelectService: (serviceId: string) => void;
  onCallPhone: () => void;
  onViewAllServices: () => void;
}

export default function DashboardScreen({
  userName,
  onChangeName,
  address,
  onChangeAddress,
  services,
  onSelectService,
  onCallPhone,
  onViewAllServices
}: DashboardScreenProps) {
  // Extract specific locksmith-orientated services for horizontal bar
  const horizontalServices = services.slice(0, 4);

  return (
    <div className="flex-grow flex flex-col bg-slate-50 overflow-hidden select-none">
      
      {/* 1. Header Area matching left phone on Image 1 */}
      <div className="px-5 pt-3 pb-3 flex justify-between items-center bg-white border-b border-slate-100">
        <div className="flex-1 min-w-0 pr-2">
          <div className="flex items-center gap-2">
            <div className="w-8.5 h-8.5 rounded-xl bg-gradient-to-tr from-blue-650 to-indigo-600 flex items-center justify-center text-white font-extrabold shadow-md shadow-blue-500/10 shrink-0">
              <svg className="w-4.5 h-4.5 text-white" fill="none" strokeWidth="2.75" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-base font-black tracking-tight leading-none uppercase italic font-display">
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent pr-0.5">Bilaad</span>
                <span className="text-slate-900 not-italic">Locksmith</span>
              </span>
              <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest font-mono leading-none mt-0.75">
                24/7 Mobile Dispatch
              </span>
            </div>
          </div>
        </div>
        
        {/* Rounded interactive utility badges */}
        <div className="flex items-center gap-2 shrink-0">
          <button 
            onClick={() => alert("Notification Center: Bilaad locksmith units are active in your area.")}
            className="w-10 h-10 rounded-full bg-slate-50 hover:bg-slate-100 flex items-center justify-center border border-slate-100 transition-colors cursor-pointer relative"
            title="Notifications"
          >
            <Bell className="w-4 h-4 text-slate-600" />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white"></span>
          </button>
          <button 
            onClick={() => alert("Simulating card/wallet linkages: Pay seamlessly using cash or card on-scene.")}
            className="w-10 h-10 rounded-full bg-slate-50 hover:bg-slate-100 flex items-center justify-center border border-slate-100 transition-colors cursor-pointer"
            title="Wallet"
          >
            <Wallet className="w-4 h-4 text-slate-600" />
          </button>
        </div>
      </div>

      {/* 2. Scrollable Body Content */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-5 pb-24">
        
        {/* Hero Locksmith Banner */}
        <div 
          onClick={onCallPhone}
          className="relative h-44 rounded-[32px] overflow-hidden shadow-lg shadow-slate-250 cursor-pointer group active:scale-[0.99] transition-transform"
        >
          {/* Beautiful real locksmith van image we generated */}
          <img 
            src="/assets/locksmith_hero_1781651378248.jpg" 
            alt="BILAAD 24/7 Mobile Locksmith Rescue"
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            referrerPolicy="no-referrer"
          />
          
          {/* Gradient background overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/35 to-slate-900/10"></div>
          
          <div className="absolute inset-x-5 bottom-4 flex flex-col items-start gap-1">
            <h3 className="text-xl font-black text-white leading-none tracking-tight font-display drop-shadow-md">
              24/7 MOBILE<br />LOCKSMITH
            </h3>
            
            {/* Custom Interactive Floating Call Button on photo overlay */}
            <div className="mt-2.5 bg-white text-slate-900 text-[10px] font-black px-3.5 py-2 rounded-full flex items-center gap-1 shadow-md hover:bg-slate-50 transition-colors uppercase tracking-wider">
              <span>Call for Assistance</span>
              <ChevronRight className="w-3.5 h-3.5 stroke-[3]" />
            </div>
          </div>
        </div>

        {/* 3. Nearby Assistance Map Block */}
        <div className="space-y-2.5">
          <h3 className="font-extrabold text-[#111827] text-[14px] px-1 font-display tracking-tight">Nearby Assistance</h3>
          
          <div className="bg-white rounded-[28px] border border-slate-100 p-4 shadow-sm relative overflow-hidden">
            {/* Vector Roadmap Blueprint */}
            <div className="h-36 bg-[#f8fafc] rounded-2xl relative overflow-hidden border border-slate-100">
              
              {/* Simulated Map Streets Pattern */}
              <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#64748b_1.5px,transparent_1.5px),linear-gradient(to_bottom,#64748b_1.5px,transparent_1.5px)] bg-[size:24px_24px]"></div>
              
              <svg viewBox="0 0 340 144" className="absolute inset-0 w-full h-full stroke-slate-200/60 stroke-[4] fill-none">
                <path d="M-10,35 Q 120,55 210,35 T 350,60" />
                <path d="M 140,-10 L 140,160" />
                <path d="M 240,-10 L 240,160" stroke="#f1f5f9" strokeWidth="6" />
                <path d="M-10,95 Q 130,80 230,110 T 350,90" />
              </svg>

              {/* Blue Radar Ripple Circle at Center of Baker Street location */}
              <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                <div className="absolute w-24 h-24 rounded-full border border-blue-500/20 bg-blue-500/[0.04] animate-ping duration-1000"></div>
                <div className="absolute w-14 h-14 rounded-full border border-blue-500/30 bg-blue-500/[0.08] animate-pulse"></div>
                <span className="w-3.5 h-3.5 bg-blue-600 rounded-full border-2 border-white relative z-10 shadow-lg shadow-blue-500/40"></span>
              </div>

              {/* Scattered High-Fidelity Active Locksmith Vans/Trucks with Tooltips */}
              <div className="absolute top-[20%] left-[25%] flex flex-col items-center select-none transform hover:scale-[1.05] transition-transform">
                <div className="w-6 h-6 bg-white rounded-lg shadow-xl shadow-slate-350 border border-slate-100 flex items-center justify-center animate-bounce duration-1000">
                  <Car className="w-3.5 h-3.5 text-blue-500" />
                </div>
              </div>

              <div className="absolute top-[25%] right-[22%] flex flex-col items-center">
                <div className="w-6 h-6 bg-white rounded-lg shadow-xl shadow-slate-350 border border-slate-100 flex items-center justify-center">
                  <Wrench className="w-3.5 h-3.5 text-blue-500" />
                </div>
              </div>

              <div className="absolute bottom-[20%] left-[18%] flex flex-col items-center">
                <div className="w-6 h-6 bg-white rounded-lg shadow-xl shadow-slate-350 border border-slate-100 flex items-center justify-center">
                  <Key className="w-3.5 h-3.5 text-blue-600 animate-pulse" />
                </div>
              </div>

              <div className="absolute bottom-[25%] right-[26%] flex flex-col items-center">
                <div className="w-6 h-6 bg-white rounded-lg shadow-xl shadow-slate-350 border border-slate-100 flex items-center justify-center">
                  <Car className="w-3.5 h-3.5 text-blue-500" />
                </div>
              </div>

              {/* Simulated active banner overlay of left phone map screenshot */}
              <div className="absolute top-3 left-1/2 -translate-x-1/2">
                <div className="bg-[#1e3a8a] text-white text-[10px] font-black px-4 py-1.5 rounded-full flex items-center gap-1.5 shadow-md shadow-slate-900/10 uppercase tracking-wider font-sans whitespace-nowrap">
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>5 Assistance are available</span>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* 4. Book A Service Horizon Scroll Area */}
        <div className="space-y-3">
          <div className="flex justify-between items-center px-1">
            <h3 className="font-extrabold text-[#111827] text-[14px] font-display tracking-tight">Book A Service</h3>
            <button 
              onClick={onViewAllServices}
              className="text-xs text-blue-600 font-extrabold hover:underline cursor-pointer flex items-center gap-0.5"
            >
              See more
            </button>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-none snap-x snap-mandatory">
            {horizontalServices.map((service, idx) => {
              // Exact corresponding images
              const servicePics = [
                "/assets/auto_lockout_1781651390973.jpg",
                "/assets/key_programming_1781651402199.jpg",
                "/assets/residential_entry_1781651410988.jpg",
                "https://images.unsplash.com/photo-1542282088-fe8426682b8f?auto=format&fit=crop&q=80&w=350" // Truck/Pickup lockout generic
              ];
              const displayImg = service.imageUrl || servicePics[idx] || servicePics[0];

              return (
                <div
                  key={service.id}
                  onClick={() => onSelectService(service.id)}
                  className="snap-start shrink-0 w-[140px] h-[155px] rounded-[24px] overflow-hidden border border-slate-100 shadow-xs relative cursor-pointer group hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                >
                  <img 
                    src={displayImg} 
                    alt={service.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  {/* Subtle dark gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent"></div>
                  
                  {/* Bottom Text Caption */}
                  <div className="absolute inset-x-3 bottom-3 z-10">
                    <h4 className="text-white font-extrabold text-[11px] leading-tight font-display tracking-tight">
                      {service.title.split(' ')[0]} {service.title.split(' ')[1] || ""}
                    </h4>
                    <p className="text-[#93c5fd] text-[9px] font-bold font-mono mt-0.5">{service.estFee}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}

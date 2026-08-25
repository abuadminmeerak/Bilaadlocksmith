/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Wifi, Battery, ShieldAlert, Smartphone, Home, LayoutGrid, ClipboardList, Map } from 'lucide-react';
import WelcomeScreen from './WelcomeScreen';
import DashboardScreen from './DashboardScreen';
import ServiceSelectScreen from './ServiceSelectScreen';
import BookServiceScreen from './BookServiceScreen';
import TrackingScreen from './TrackingScreen';
import { Service, Vehicle } from '../types';

interface TwinAppSimulatorProps {
  onOrderAssigned?: (driverName: string) => void;
  onOpenChat?: () => void;
  mobileOnly?: boolean;
}

export default function TwinAppSimulator({
  onOrderAssigned,
  onOpenChat,
  mobileOnly = false
}: TwinAppSimulatorProps) {
  const [activeScreen, setActiveScreen] = useState<'welcome' | 'dashboard' | 'service-select' | 'book' | 'tracking'>('welcome');
  const [userName, setUserName] = useState('Chorles Grissom');
  const [userAddress, setUserAddress] = useState('221B Baker Street, London');
  
  // Specific service selection ID
  const [selectedServiceId, setSelectedServiceId] = useState<string>('auto-lockout');

  // Active user vehicle structure
  const [vehicle, setVehicle] = useState<Vehicle>({
    type: 'car',
    company: 'Ford',
    model: 'F-150',
    fuel: 'Regular Gas',
    transmission: 'Automatic',
    tire: 'Tubeless',
    engine: '3500 cc'
  });

  // Saved dispatch routes
  const [pickupAddress, setPickupAddress] = useState(userAddress);
  const [dropAddress, setDropAddress] = useState('Bilaad Austin Hub, TX');

  // Static services list matching the categories and structure used by layout
  const simulatorServices: Service[] = [
    {
      id: 'auto-lockout',
      title: 'Auto Lockout',
      desc: 'Fast vehicle entry for cars with keys locked inside the cabin or trunk.',
      iconName: 'Car',
      bg: 'from-blue-600 to-indigo-650',
      estFee: '$45',
      category: 'locksmith',
      imageUrl: '/src/assets/images/auto_lockout_1781651390973.jpg'
    },
    {
      id: 'suv-key-fob',
      title: 'SUV Key Fob',
      desc: 'High security automotive smart key transponder & FOB transceiver coding.',
      iconName: 'Key',
      bg: 'from-blue-600 to-cyan-600',
      estFee: '$65',
      category: 'locksmith',
      imageUrl: '/src/assets/images/key_programming_1781651402199.jpg'
    },
    {
      id: 'residential-entry',
      title: 'Residential Entry',
      desc: 'Home lockout lockpicking bypass on standard door handles and deadbolts.',
      iconName: 'Home',
      bg: 'from-emerald-500 to-teal-500',
      estFee: '$40',
      category: 'locksmith',
      imageUrl: '/src/assets/images/residential_entry_1781651410988.jpg'
    },
    {
      id: 'key-duplicate',
      title: 'Key Cutting',
      desc: 'High precision laser key copying and hardware replication machines.',
      iconName: 'Wrench',
      bg: 'from-teal-500 to-emerald-600',
      estFee: '$25',
      category: 'locksmith',
      imageUrl: '/src/assets/images/key_cutting_1781651423076.jpg'
    },
    {
      id: 'fleet-locksmith',
      title: 'Fleet Locksmith',
      desc: 'Commercial fleet vehicle master lock repairs and key system overhauls.',
      iconName: 'Building',
      bg: 'from-purple-500 to-indigo-600',
      estFee: '$120',
      category: 'locksmith',
      imageUrl: 'https://images.unsplash.com/photo-1506015391300-4802dc74de2e?auto=format&fit=crop&q=80&w=350'
    },
    {
      id: 'smart-key-coding',
      title: 'Smart Locks',
      desc: 'Digital smart lock handle repairs, electric strike plate, and keycard setups.',
      iconName: 'Key',
      bg: 'from-violet-500 to-fuchsia-500',
      estFee: '$75',
      category: 'locksmith',
      imageUrl: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=350'
    },
    {
      id: 'mailbox-locks',
      title: 'Mailbox Locks',
      desc: 'Cabinet locks, filing drawer key extraction, and master padlock override services.',
      iconName: 'Wrench',
      bg: 'from-rose-500 to-pink-500',
      estFee: '$35',
      category: 'locksmith',
      imageUrl: 'https://images.unsplash.com/photo-1582139329536-e7284fece509?auto=format&fit=crop&q=80&w=350'
    }
  ];

  // Active selected service helper
  const selectedService = simulatorServices.find(s => s.id === selectedServiceId) || simulatorServices[0];

  const handleSelectService = (id: string) => {
    setSelectedServiceId(id);
    setActiveScreen('book');
  };

  const handleConfirmOrder = (pickup: string, drop: string) => {
    setPickupAddress(pickup);
    setDropAddress(drop);
    setActiveScreen('tracking');
    
    // Notify main app layout that a dispatch order was created
    const isLocksmithService = selectedService.category === 'locksmith';
    const driver = isLocksmithService ? "Abdur Rahman" : "Michael Rodriguez";
    if (onOrderAssigned) {
      onOrderAssigned(driver);
    }
  };

  return (
    <div id="smartphone-mimic-wrapper" className="flex flex-col items-center">
      {/* Immersive Smartphone Bezel Block */}
      <div 
        id="phone-device-container" 
        className={mobileOnly ? "w-full max-w-[360px] h-[100dvh] bg-white relative flex flex-col overflow-hidden" : "w-full max-w-[360px] h-[680px] bg-slate-950 rounded-[48px] border-[10px] border-slate-900 shadow-2xl relative flex flex-col overflow-hidden ring-1 ring-white/10"}
      >
        
        {!mobileOnly && (<>
        {/* Dynamic Notch / Camera Cutout */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-6 w-36 bg-slate-900 rounded-b-2xl z-50 flex items-center justify-around px-4">
          <span className="w-2.5 h-2.5 rounded-full bg-slate-950 border border-slate-800"></span>
          <span className="w-10 h-1 bg-slate-950 rounded-full"></span>
        </div>

        {/* Status Bar inside Screen */}
        <div className="h-7 bg-white dark:bg-zinc-950 px-6 pt-1 shrink-0 flex justify-between items-center text-[10px] font-bold text-slate-400 select-none z-40 border-b border-slate-100/10 font-mono">
          <span>9:41</span>
          <div className="flex items-center gap-1.5 pt-0.5">
            <span className="text-[9px] tracking-widest text-emerald-500 font-sans font-extrabold animate-pulse">5G</span>
            <Wifi className="w-3 h-3 text-slate-400" />
            <Battery className="w-3.5 h-3.5 text-slate-400 fill-slate-400/20" />
          </div>
        </div>
        </>)}

        {/* Dynamic Inner Simulated Interactive Screen */}
        <div className="flex-1 flex flex-col overflow-hidden relative bg-white">
          {activeScreen === 'welcome' && (
            <WelcomeScreen onStart={() => setActiveScreen('dashboard')} />
          )}

          {activeScreen === 'dashboard' && (
            <DashboardScreen 
              userName={userName}
              onChangeName={(name) => {
                setUserName(name);
                setPickupAddress(name);
              }}
              address={userAddress}
              onChangeAddress={(addr) => {
                setUserAddress(addr);
              }}
              services={simulatorServices}
              onSelectService={handleSelectService}
              onCallPhone={() => alert("Simulating support call to 945-946-0885")}
              onViewAllServices={() => setActiveScreen('service-select')}
            />
          )}

          {activeScreen === 'service-select' && (
            <ServiceSelectScreen 
              services={simulatorServices}
              onSelectService={handleSelectService}
              onBack={() => setActiveScreen('dashboard')}
            />
          )}

          {activeScreen === 'book' && (
            <BookServiceScreen 
              selectedService={selectedService}
              vehicle={vehicle}
              onChangeVehicle={setVehicle}
              onBack={() => setActiveScreen('dashboard')}
              onConfirmOrder={handleConfirmOrder}
              defaultPickup={userAddress}
            />
          )}

          {activeScreen === 'tracking' && (
            <TrackingScreen 
              selectedService={selectedService}
              vehicle={vehicle}
              pickupAddress={pickupAddress}
              dropAddress={dropAddress}
              onCancel={() => setActiveScreen('dashboard')}
              onOpenChat={onOpenChat || (() => {})}
            />
          )}
        </div>

        {/* Persistent bottom tab navigation bar matching left phone layout screenshot */}
        {activeScreen !== 'welcome' && (
          <div className="bg-white border-t border-slate-100 py-2 px-3 flex justify-around items-center shrink-0 z-40 select-none">
            <button 
              onClick={() => setActiveScreen('dashboard')}
              className={`flex flex-col items-center gap-0.5 cursor-pointer transition-colors flex-1 ${
                activeScreen === 'dashboard' ? 'text-blue-600 font-extrabold' : 'text-slate-400 hover:text-slate-600 font-medium'
              }`}
            >
              <Home className={`w-4.5 h-4.5 ${activeScreen === 'dashboard' ? 'stroke-[2.5]' : 'stroke-2'}`} />
              <span className="text-[8px] tracking-tight uppercase font-sans">Home</span>
            </button>
            <button 
              onClick={() => setActiveScreen('service-select')}
              className={`flex flex-col items-center gap-0.5 cursor-pointer transition-colors flex-1 ${
                activeScreen === 'service-select' ? 'text-blue-600 font-extrabold' : 'text-slate-400 hover:text-slate-600 font-medium'
              }`}
            >
              <LayoutGrid className={`w-4.5 h-4.5 ${activeScreen === 'service-select' ? 'stroke-[2.5]' : 'stroke-2'}`} />
              <span className="text-[8px] tracking-tight uppercase font-sans">Services</span>
            </button>
            <button 
              onClick={() => setActiveScreen('book')}
              className={`flex flex-col items-center gap-0.5 cursor-pointer transition-colors flex-1 ${
                activeScreen === 'book' ? 'text-blue-600 font-extrabold' : 'text-slate-400 hover:text-slate-600 font-medium'
              }`}
            >
              <ClipboardList className={`w-4.5 h-4.5 ${activeScreen === 'book' ? 'stroke-[2.5]' : 'stroke-2'}`} />
              <span className="text-[8px] tracking-tight uppercase font-sans">Book</span>
            </button>
            <button 
              onClick={() => setActiveScreen('tracking')}
              className={`flex flex-col items-center gap-0.5 cursor-pointer transition-colors flex-1 ${
                activeScreen === 'tracking' ? 'text-blue-600 font-extrabold' : 'text-slate-400 hover:text-slate-600 font-medium'
              }`}
            >
              <Map className={`w-4.5 h-4.5 ${activeScreen === 'tracking' ? 'stroke-[2.5]' : 'stroke-2'}`} />
              <span className="text-[8px] tracking-tight uppercase font-sans">Track</span>
            </button>
          </div>
        )}

        {!mobileOnly && (
        <>
        {/* Bottom Screen OS Gesture indicator bar */}
        <div className="h-4 bg-white dark:bg-zinc-950 flex items-center justify-center shrink-0 z-40">
          <span className="w-24 h-1 bg-slate-300 dark:bg-slate-700 rounded-full"></span>
        </div>
        </>
        )}

      </div>
    </div>
  );
}

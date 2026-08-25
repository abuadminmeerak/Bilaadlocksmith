import React, { useEffect, useState } from 'react';
import { Home, LayoutGrid, ClipboardList, Map } from 'lucide-react';
import WelcomeScreen from './WelcomeScreen';
import DashboardScreen from './DashboardScreen';
import ServiceSelectScreen from './ServiceSelectScreen';
import BookServiceScreen from './BookServiceScreen';
import TrackingScreen from './TrackingScreen';
import { Service, Vehicle } from '../types';

export default function TwinAppSimulator() {
  const [activeScreen, setActiveScreen] = useState<'welcome' | 'dashboard' | 'service-select' | 'book' | 'tracking'>(() =>
    localStorage.getItem('bilaad-onboarded') ? 'dashboard' : 'welcome'
  );
  const [userAddress, setUserAddress] = useState('Austin, TX');
  const [selectedServiceId, setSelectedServiceId] = useState('auto-lockout');
  const [hasActiveOrder, setHasActiveOrder] = useState(false);
  const [vehicle, setVehicle] = useState<Vehicle>({
    type: 'car', company: 'Ford', model: 'F-150', fuel: '', transmission: '', tire: '', engine: ''
  });
  const [pickupAddress, setPickupAddress] = useState(userAddress);
  const [dropAddress, setDropAddress] = useState('On-site service location');

  const services: Service[] = [
    { id:'auto-lockout', title:'Auto Lockout', desc:'Fast, damage-conscious vehicle entry when keys are locked inside.', iconName:'Car', bg:'', estFee:'$45', category:'locksmith', imageUrl:'/src/assets/images/auto_lockout_1781651390973.jpg' },
    { id:'suv-key-fob', title:'Car Key / Fob', desc:'Replacement, programming and smart-key help for cars and SUVs.', iconName:'Key', bg:'', estFee:'$65', category:'locksmith', imageUrl:'/src/assets/images/key_programming_1781651402199.jpg' },
    { id:'residential-entry', title:'Home Lockout', desc:'Residential entry assistance for doors, deadbolts and common locks.', iconName:'Home', bg:'', estFee:'$40', category:'locksmith', imageUrl:'/src/assets/images/residential_entry_1781651410988.jpg' },
    { id:'key-duplicate', title:'Key Cutting', desc:'On-site key duplication and replacement.', iconName:'Wrench', bg:'', estFee:'$25', category:'locksmith', imageUrl:'/src/assets/images/key_cutting_1781651423076.jpg' },
    { id:'fleet-locksmith', title:'Fleet Locksmith', desc:'Lock and key support for commercial vehicle fleets.', iconName:'Building', bg:'', estFee:'$120', category:'locksmith', imageUrl:'https://images.unsplash.com/photo-1506015391300-4802dc74de2e?auto=format&fit=crop&q=80&w=350' },
    { id:'smart-key-coding', title:'Smart Locks', desc:'Smart-lock setup, repair and access support.', iconName:'Key', bg:'', estFee:'$75', category:'locksmith', imageUrl:'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=350' },
    { id:'mailbox-locks', title:'Mailbox Locks', desc:'Mailbox, cabinet and small-lock replacement or entry.', iconName:'Wrench', bg:'', estFee:'$35', category:'locksmith', imageUrl:'https://images.unsplash.com/photo-1582139329536-e7284fece509?auto=format&fit=crop&q=80&w=350' }
  ];
  const selectedService = services.find(s => s.id === selectedServiceId) || services[0];

  useEffect(() => { setPickupAddress(userAddress); }, [userAddress]);

  const start = () => {
    localStorage.setItem('bilaad-onboarded', '1');
    setActiveScreen('dashboard');
  };
  const selectService = (id:string) => { setSelectedServiceId(id); setActiveScreen('book'); };
  const confirmOrder = (pickup:string, drop:string) => {
    setPickupAddress(pickup); setDropAddress(drop); setHasActiveOrder(true); setActiveScreen('tracking');
  };
  const goTrack = () => setActiveScreen(hasActiveOrder ? 'tracking' : 'dashboard');

  return (
    <main className="min-h-[100dvh] bg-slate-100 flex justify-center">
      <div className="w-full max-w-[480px] min-h-[100dvh] bg-white flex flex-col overflow-hidden shadow-xl relative">
        <div className="flex-1 flex flex-col overflow-hidden">
          {activeScreen === 'welcome' && <WelcomeScreen onStart={start} />}
          {activeScreen === 'dashboard' && (
            <DashboardScreen userName="" onChangeName={() => {}} address={userAddress} onChangeAddress={setUserAddress}
              services={services} onSelectService={selectService} onCallPhone={() => window.location.href='tel:9459460885'} onViewAllServices={() => setActiveScreen('service-select')} />
          )}
          {activeScreen === 'service-select' && <ServiceSelectScreen services={services} onSelectService={selectService} onBack={() => setActiveScreen('dashboard')} />}
          {activeScreen === 'book' && <BookServiceScreen selectedService={selectedService} vehicle={vehicle} onChangeVehicle={setVehicle} onBack={() => setActiveScreen('service-select')} onConfirmOrder={confirmOrder} defaultPickup={userAddress} />}
          {activeScreen === 'tracking' && <TrackingScreen selectedService={selectedService} vehicle={vehicle} pickupAddress={pickupAddress} dropAddress={dropAddress} onCancel={() => setActiveScreen('dashboard')} onOpenChat={() => alert('Dispatch chat can be connected here.')} />}
        </div>

        {activeScreen !== 'welcome' && (
          <nav className="bg-white border-t border-slate-100 px-2 py-2 pb-[max(.5rem,env(safe-area-inset-bottom))] grid grid-cols-4 shrink-0 z-50">
            {[
              ['dashboard','Home',Home,() => setActiveScreen('dashboard')],
              ['service-select','Services',LayoutGrid,() => setActiveScreen('service-select')],
              ['book','Book',ClipboardList,() => setActiveScreen('book')],
              ['tracking','Track',Map,goTrack]
            ].map(([screen,label,Icon,action]:any) => (
              <button key={label} onClick={action} className={`py-1.5 flex flex-col items-center gap-1 text-[9px] font-bold uppercase ${activeScreen===screen?'text-blue-600':'text-slate-400'}`}>
                <Icon className="w-5 h-5" /><span>{label}</span>
              </button>
            ))}
          </nav>
        )}
      </div>
    </main>
  );
}

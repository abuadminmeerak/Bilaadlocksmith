/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft,
  Car,
  CheckCircle,
  Truck
} from 'lucide-react';
import { Service, Vehicle } from '../types';

interface BookServiceScreenProps {
  selectedService: Service;
  vehicle: Vehicle;
  onChangeVehicle: (v: Vehicle) => void;
  onBack: () => void;
  onConfirmOrder: (pickup: string, drop: string) => void;
  defaultPickup: string;
}

export default function BookServiceScreen({
  selectedService,
  vehicle,
  onChangeVehicle,
  onBack,
  onConfirmOrder,
  defaultPickup
}: BookServiceScreenProps) {
  
  // Addresses configuration
  const [pickupInput, setPickupInput] = useState(defaultPickup || '221B Baker Street, London');
  const [dropInput, setDropInput] = useState('Hyde Park, London');

  // Determine initial category state depending on selected service
  const initialCategory = 
    selectedService.id === 'auto-lockout' || selectedService.id === 'suv-key-fob'
      ? 'Car/Truck'
      : selectedService.id === 'fleet-locksmith'
      ? 'Office/Commercial'
      : 'Residential';

  const [categoryMode, setCategoryMode] = useState<'Residential' | 'Office/Commercial' | 'Car/Truck'>(initialCategory);

  // Sync category mode state when selectedService changes
  useEffect(() => {
    const updatedCategory = 
      selectedService.id === 'auto-lockout' || selectedService.id === 'suv-key-fob'
        ? 'Car/Truck'
        : selectedService.id === 'fleet-locksmith'
        ? 'Office/Commercial'
        : 'Residential';
    setCategoryMode(updatedCategory);

    // Apply logical preset values reflecting the category selection
    if (updatedCategory === 'Residential') {
      onChangeVehicle({
        type: 'car',
        company: 'House',
        model: 'Lockout Bypass',
        fuel: 'Yale Lock',
        transmission: 'Smart Lock & Keypad',
        tire: 'Standard Physical Key',
        engine: 'Front Entry Door'
      });
    } else if (updatedCategory === 'Office/Commercial') {
      onChangeVehicle({
        type: 'car',
        company: 'Office Suite',
        model: 'Access Cylinder',
        fuel: 'Schlage Lock',
        transmission: 'Commercial Mortise Lock',
        tire: 'Smart Card & RFID',
        engine: 'Office Glass Partition Door'
      });
    } else {
      onChangeVehicle({
        type: 'car',
        company: 'Ford',
        model: 'F-150',
        fuel: 'Premium Gas',
        transmission: 'Automatic',
        tire: 'Tubeless',
        engine: '3500 cc'
      });
    }
  }, [selectedService.id]);

  // Input helper change handlers
  const updateVehicleType = (type: 'car' | 'motorcycle' | 'truck') => {
    onChangeVehicle({ ...vehicle, type });
  };

  const updateField = (field: keyof Vehicle, value: string) => {
    onChangeVehicle({ ...vehicle, [field]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pickupInput.trim()) {
      alert("Please specify a pickup location for dispatch.");
      return;
    }
    onConfirmOrder(pickupInput, dropInput);
  };

  return (
    <div className="flex-grow flex flex-col bg-slate-50 overflow-hidden">
      
      {/* Header bar */}
      <div className="px-5 pt-4 pb-3.5 bg-white border-b border-slate-100 flex items-center gap-3 shrink-0">
        <button
          onClick={onBack}
          className="p-2 rounded-xl hover:bg-slate-100 text-slate-700 transition-colors cursor-pointer"
          title="Back"
        >
          <ArrowLeft className="w-5 h-4.5 stroke-[3]" />
        </button>
        <div>
          <h2 className="text-base font-black text-slate-900 tracking-tight font-display">Book Locksmith</h2>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider font-mono">
            Direct Dispatch • {selectedService.estFee} • 15 mins ETA
          </p>
        </div>
      </div>

      {/* Main scrolling content area mimicking third screenshot */}
      <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-4 space-y-4 pb-28">
        
        {/* Dynamic Service Header Preview Card (Custom Lock vs Vehicle Image) */}
        {categoryMode === 'Car/Truck' ? (
          <div className="bg-white rounded-3xl p-4 border border-blue-100/50 shadow-xs relative overflow-hidden">
            <div className="absolute right-4 top-4 opacity-15">
              {vehicle.type === 'truck' ? (
                <Truck className="w-16 h-16 text-blue-600" />
              ) : vehicle.type === 'motorcycle' ? (
                <svg className="w-16 h-16 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 18a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm14 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/><path d="M10 18h4M7.5 14h9L13 9H9.5L7.5 14Z"/></svg>
              ) : (
                <Car className="w-16 h-16 text-blue-600" />
              )}
            </div>
            <div>
              <p className="text-[9px] uppercase font-black tracking-widest text-blue-600 font-mono">VEHICLE DETAILS FOR SECURITY BYPASS</p>
              <h3 className="font-extrabold text-slate-800 text-sm mt-0.5 font-display flex items-center gap-1.5">
                {vehicle.company || "Toyota"} {vehicle.model || "Prius"} 
                <span className="text-[10px] bg-slate-100 text-slate-600 font-bold px-1.5 py-0.5 rounded uppercase">
                  {vehicle.type}
                </span>
              </h3>
              <p className="text-[10px] text-slate-400 font-mono mt-1">
                {vehicle.fuel} • {vehicle.transmission} • {vehicle.tire} • {vehicle.engine || "3500 cc"}
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-4 border border-orange-100/50 shadow-xs relative overflow-hidden flex gap-4">
            <div className="w-16 h-16 rounded-2xl overflow-hidden shrink-0 border border-slate-100">
              <img 
                src={
                  selectedService.id === 'key-duplicate'
                    ? "/src/assets/images/key_cutting_1781651423076.jpg"
                    : selectedService.id === 'smart-key-coding'
                    ? "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=350"
                    : "/src/assets/images/residential_entry_1781651410988.jpg"
                } 
                alt="Lock hardware preview"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[9px] uppercase font-black tracking-widest text-[#ea580c] font-mono">
                {categoryMode === 'Residential' ? 'RESIDENTIAL LOCK DISPATCH' : 'COMMERCIAL SECURE LOCK'}
              </p>
              <h3 className="font-extrabold text-slate-800 text-xs mt-0.5 font-display truncate">
                {vehicle.company || (categoryMode === 'Residential' ? 'House' : 'Office Suite')} • {vehicle.model || 'Lockout Bypass'} • {vehicle.transmission || 'Smart Lock'}
              </h3>
              <p className="text-[9px] text-slate-400 font-mono mt-0.5 whitespace-nowrap overflow-hidden text-ellipsis">
                Target: {vehicle.engine || 'Front Entry Door'} • Brand: {vehicle.fuel || 'Yale'} • Key: {vehicle.tire || 'Standard Key'}
              </p>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-[8px] text-slate-400 font-bold font-mono uppercase">Authorized lockpicking tools active</span>
              </div>
            </div>
          </div>
        )}

        {/* Categories Tab selectors matching Screenshot 3 */}
        <div className="grid grid-cols-3 gap-2">
          {/* Residential Tab */}
          <button
            type="button"
            onClick={() => {
              setCategoryMode('Residential');
              onChangeVehicle({
                type: 'car',
                company: 'House',
                model: 'Lockout Bypass',
                fuel: 'Yale Lock',
                transmission: 'Smart Lock & Keypad',
                tire: 'Standard Physical Key',
                engine: 'Front Entry Door'
              });
            }}
            className={`py-3.5 px-3 rounded-[20px] border text-center flex flex-col items-center justify-center transition-all cursor-pointer ${
              categoryMode === 'Residential'
                ? 'border-blue-600 bg-blue-50/50 text-blue-600 shadow-xs'
                : 'border-slate-100 bg-white hover:border-slate-200 text-slate-400'
            }`}
          >
            <svg className="w-4 h-4 mb-1 stroke-current" fill="none" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span className="text-[10px] font-black tracking-tight">Residential</span>
          </button>

          {/* Office/Commercial Tab */}
          <button
            type="button"
            onClick={() => {
              setCategoryMode('Office/Commercial');
              onChangeVehicle({
                type: 'car',
                company: 'Office Suite',
                model: 'Access Cylinder',
                fuel: 'Schlage Lock',
                transmission: 'Commercial Mortise Lock',
                tire: 'Smart Card & RFID',
                engine: 'Office Glass Partition Door'
              });
            }}
            className={`py-3.5 px-3 rounded-[20px] border text-center flex flex-col items-center justify-center transition-all cursor-pointer ${
              categoryMode === 'Office/Commercial'
                ? 'border-blue-600 bg-blue-50/50 text-blue-600 shadow-xs'
                : 'border-slate-100 bg-white hover:border-slate-200 text-slate-400'
            }`}
          >
            <svg className="w-4 h-4 mb-1 stroke-current" fill="none" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <span className="text-[10px] font-black tracking-tight">Commercial</span>
          </button>

          {/* Car/Truck Tab */}
          <button
            type="button"
            onClick={() => {
              setCategoryMode('Car/Truck');
              onChangeVehicle({
                type: 'car',
                company: 'Ford',
                model: 'F-150',
                fuel: 'Premium Gas',
                transmission: 'Automatic',
                tire: 'Tubeless',
                engine: '3500 cc'
              });
            }}
            className={`py-3.5 px-3 rounded-[20px] border text-center flex flex-col items-center justify-center transition-all cursor-pointer ${
              categoryMode === 'Car/Truck'
                ? 'border-blue-600 bg-blue-50/50 text-blue-600 shadow-xs'
                : 'border-slate-100 bg-white hover:border-slate-200 text-slate-400'
            }`}
          >
            <Car className="w-4 h-4 mb-1" />
            <span className="text-[10px] font-black tracking-tight">Car/Truck</span>
          </button>
        </div>

        {/* Adaptive Form fields */}
        {categoryMode === 'Car/Truck' ? (
          <div className="space-y-4">
            <div className="border-b border-slate-200/50 pb-1">
              <h4 className="font-extrabold text-slate-700 text-xs">Configure Vehicle</h4>
            </div>

            {/* Choose vehicle type sub-toggles */}
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => updateVehicleType('motorcycle')}
                className={`py-3.5 px-3 rounded-2xl border text-center flex flex-col items-center justify-center transition-all cursor-pointer ${
                  vehicle.type === 'motorcycle'
                    ? 'border-blue-600 bg-blue-50/50 text-blue-600'
                    : 'border-slate-100 bg-white hover:border-slate-200 text-slate-400'
                }`}
              >
                <svg className="w-5 h-5 mb-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 18a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm14 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/><path d="M10 18h4M7.5 14h9L13 9H9.5L7.5 14Z"/></svg>
                <span className="text-[10px] font-bold">Motorcycle</span>
              </button>

              <button
                type="button"
                onClick={() => updateVehicleType('car')}
                className={`py-3.5 px-3 rounded-2xl border text-center flex flex-col items-center justify-center transition-all cursor-pointer ${
                  vehicle.type === 'car'
                    ? 'border-blue-600 bg-blue-50/50 text-blue-600'
                    : 'border-slate-100 bg-white hover:border-slate-200 text-slate-400'
                }`}
              >
                <Car className="w-5 h-5 mb-1" />
                <span className="text-[10px] font-bold">Car</span>
              </button>

              <button
                type="button"
                onClick={() => updateVehicleType('truck')}
                className={`py-3.5 px-3 rounded-2xl border text-center flex flex-col items-center justify-center transition-all cursor-pointer ${
                  vehicle.type === 'truck'
                    ? 'border-blue-600 bg-blue-50/50 text-blue-600'
                    : 'border-slate-100 bg-white hover:border-slate-200 text-slate-400'
                }`}
              >
                <Truck className="w-5 h-5 mb-1" />
                <span className="text-[10px] font-bold">Truck</span>
              </button>
            </div>

            {/* Inputs */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 mb-1">Vehicle Company</label>
                <input
                  type="text"
                  value={vehicle.company}
                  onChange={(e) => updateField('company', e.target.value)}
                  className="w-full bg-white border border-slate-100 rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-blue-500 font-semibold text-slate-700 outline-none"
                  placeholder="e.g. BMW"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 mb-1">Vehicle Model</label>
                <input
                  type="text"
                  value={vehicle.model}
                  onChange={(e) => updateField('model', e.target.value)}
                  className="w-full bg-white border border-slate-100 rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-blue-500 font-semibold text-slate-700 outline-none"
                  placeholder="e.g. 6 Series GT"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 mb-1">Fuel Type</label>
                <select
                  value={vehicle.fuel}
                  onChange={(e) => updateField('fuel', e.target.value)}
                  className="w-full bg-white border border-slate-100 rounded-xl px-2.5 py-2 text-xs focus:ring-1 focus:ring-blue-500 font-semibold text-slate-700 outline-none cursor-pointer"
                >
                  <option value="Regular Gas">Regular Gas</option>
                  <option value="Premium Gas">Premium Gas</option>
                  <option value="Diesel">Diesel</option>
                  <option value="Electric">Electric / Hybrid</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 mb-1">Transmission</label>
                <select
                  value={vehicle.transmission}
                  onChange={(e) => updateField('transmission', e.target.value)}
                  className="w-full bg-white border border-slate-100 rounded-xl px-2.5 py-2 text-xs focus:ring-1 focus:ring-blue-500 font-semibold text-slate-700 outline-none cursor-pointer"
                >
                  <option value="Automatic">Automatic</option>
                  <option value="Manual">Manual</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 mb-1">Tires Type</label>
                <select
                  value={vehicle.tire}
                  onChange={(e) => updateField('tire', e.target.value)}
                  className="w-full bg-white border border-slate-100 rounded-xl px-2.5 py-2 text-xs focus:ring-1 focus:ring-blue-500 font-semibold text-slate-700 outline-none cursor-pointer"
                >
                  <option value="Tubeless">Tubeless</option>
                  <option value="Run-flat">Run-Flat</option>
                  <option value="Winter Tyres">Winter Tyres</option>
                  <option value="Standard Offroad">Standard Offroad</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 mb-1">Engine Size</label>
                <input
                  type="text"
                  value={vehicle.engine}
                  onChange={(e) => updateField('engine', e.target.value)}
                  className="w-full bg-white border border-slate-100 rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-blue-500 font-semibold text-slate-700 outline-none"
                  placeholder="e.g. 1995 cc"
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="border-b border-slate-200/50 pb-1">
              <h4 className="font-extrabold text-slate-700 text-xs">Configure Lock & Building</h4>
            </div>

            {/* Building/Lock selection */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 mb-1">Building/Property Type</label>
                <select
                  value={vehicle.company}
                  onChange={(e) => updateField('company', e.target.value)}
                  className="w-full bg-white border border-slate-100 rounded-xl px-2.5 py-2 text-xs focus:ring-1 focus:ring-blue-500 font-semibold text-slate-700 outline-none cursor-pointer"
                >
                  <option value="House">House / Residential</option>
                  <option value="Apartment">Apartment Complex</option>
                  <option value="Office Suite">Office Suite</option>
                  <option value="Retail Store">Retail Store / Shop</option>
                  <option value="Warehouse">Warehouse / Industrial</option>
                  <option value="Storage Unit">Storage Locker</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 mb-1">Service Needed</label>
                <select
                  value={vehicle.model}
                  onChange={(e) => updateField('model', e.target.value)}
                  className="w-full bg-white border border-slate-100 rounded-xl px-2.5 py-2 text-xs focus:ring-1 focus:ring-blue-500 font-semibold text-slate-700 outline-none cursor-pointer"
                >
                  <option value="Lockout Bypass">Emergency Lockout Bypass</option>
                  <option value="Key Duplication">Key Cutting & copying</option>
                  <option value="Lock Rekeying">Cylinder Rekeying</option>
                  <option value="Lock Installation">New Lock installation</option>
                  <option value="Hardware Repair">Repairs / Adjustments</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 mb-1">Lock Brand</label>
                <select
                  value={vehicle.fuel}
                  onChange={(e) => updateField('fuel', e.target.value)}
                  className="w-full bg-white border border-slate-100 rounded-xl px-2.5 py-2 text-xs focus:ring-1 focus:ring-blue-500 font-semibold text-slate-700 outline-none cursor-pointer"
                >
                  <option value="Yale Lock">Yale Lock</option>
                  <option value="Schlage Lock">Schlage Lock</option>
                  <option value="Kwikset Lock">Kwikset Lock</option>
                  <option value="Master Lock">Master Lock</option>
                  <option value="Baldwin Brass">Baldwin Brass</option>
                  <option value="Custom Lock">Other / Custom Profile</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 mb-1">Lock Style/Type</label>
                <select
                  value={vehicle.transmission}
                  onChange={(e) => updateField('transmission', e.target.value)}
                  className="w-full bg-white border border-slate-100 rounded-xl px-2.5 py-2 text-xs focus:ring-1 focus:ring-blue-500 font-semibold text-slate-700 outline-none cursor-pointer"
                >
                  <option value="Smart Lock & Keypad">Smart Lock / Touchpad</option>
                  <option value="Double Cylinder Deadbolt">Traditional Deadbolt</option>
                  <option value="Door Entry Knob Handle">Entry Knob Handle</option>
                  <option value="Commercial Mortise Lock">Commercial Mortise Lock</option>
                  <option value="Security Padlock">Cabinet / Padlock</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 mb-1">Key Override Type</label>
                <select
                  value={vehicle.tire}
                  onChange={(e) => updateField('tire', e.target.value)}
                  className="w-full bg-white border border-slate-100 rounded-xl px-2.5 py-2 text-xs focus:ring-1 focus:ring-blue-500 font-semibold text-slate-700 outline-none cursor-pointer"
                >
                  <option value="Standard Physical Key">Standard Physical Brass Key</option>
                  <option value="High-Security Restricted">High-Security Restricted Keyway</option>
                  <option value="RFID Electronic Smart Card">RFID Electronic Keycard</option>
                  <option value="Digital Fob Transponder">Digital Fob Remote</option>
                  <option value="Bluetooth / NFC Keyless">Bluetooth / NFC Phone Bypass</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 mb-1">Specific Target Door</label>
                <input
                  type="text"
                  value={vehicle.engine}
                  onChange={(e) => updateField('engine', e.target.value)}
                  className="w-full bg-white border border-slate-100 rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-blue-500 font-semibold text-slate-700 outline-none"
                  placeholder="e.g. Front Entry Door, Office Partition"
                />
              </div>
            </div>
          </div>
        )}

        {/* Address selection layout (Location inputs matching visual flow from screenshots) */}
        <div className="border-b border-slate-200/50 pb-1 pt-2">
          <h4 className="font-extrabold text-slate-700 text-xs">Dispatch Location Routes</h4>
        </div>

        <div className="space-y-3">
          <div>
            <label className="block text-[10px] font-bold text-slate-400 mb-1">Pickup Address (Current location)</label>
            <input
              type="text"
              value={pickupInput}
              onChange={(e) => setPickupInput(e.target.value)}
              className="w-full bg-white border border-slate-100 rounded-xl px-3 py-2.5 text-xs focus:border-blue-500 outline-none font-semibold text-slate-700"
              required
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-slate-400 mb-1">Drop-off Destination Address (For towing only)</label>
            <input
              type="text"
              value={dropInput}
              onChange={(e) => setDropInput(e.target.value)}
              className="w-full bg-white border border-slate-100 rounded-xl px-3 py-2.5 text-xs focus:border-blue-500 outline-none font-semibold text-slate-700"
              placeholder="e.g. Hyde Park, London"
            />
          </div>
        </div>

        {/* Big Blue Submit action bar at bottom of scroll viewport */}
        <div className="pt-4 shrink-0">
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-2xl flex items-center justify-center gap-2 hover:-translate-y-0.5 active:translate-y-0 transition-all shadow-xl shadow-blue-500/10 cursor-pointer text-sm"
          >
            <CheckCircle className="w-5 h-5" />
            <span>Confirm & Dispatch Unit</span>
          </button>
        </div>

      </form>
    </div>
  );
}

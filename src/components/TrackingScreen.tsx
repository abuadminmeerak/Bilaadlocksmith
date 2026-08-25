/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft,
  Navigation,
  MapPin,
  Phone,
  MessageSquare,
  Star,
  RefreshCw,
  CheckCircle,
  Truck,
  Wrench,
  Key
} from 'lucide-react';
import { Service, Vehicle, ActiveOrder } from '../types';

interface TrackingScreenProps {
  selectedService: Service;
  vehicle: Vehicle;
  pickupAddress: string;
  dropAddress: string;
  onCancel: () => void;
  onOpenChat: () => void;
}

export default function TrackingScreen({
  selectedService,
  vehicle,
  pickupAddress,
  dropAddress,
  onCancel,
  onOpenChat
}: TrackingScreenProps) {
  
  // Create simulated tracking order
  const [progressStep, setProgressStep] = useState(0); // 0 = searching, 1 = tech assigned, 2 = en route, 3 = arrived
  const [secondsRemaining, setSecondsRemaining] = useState(12 * 60); // 12 minutes in seconds
  const [distanceKm, setDistanceKm] = useState(4.2);
  const [isSimulationPaused, setIsSimulationPaused] = useState(false);

  // Determine dispatcher profile
  const isLocksmith = selectedService.category === 'locksmith';
  const driverName = isLocksmith ? "Abdur Rahman (Field Lead)" : "Michael Rodriguez";
  const driverVehicle = isLocksmith ? "Bilaad Rapid Locksmith Van" : "Flatbed Recovery Tow Truck";
  const baseFee = isLocksmith ? 45 : 25;
  const kmRate = isLocksmith ? 1.5 : 2.0;
  const totalPrice = baseFee + Math.round(distanceKm * kmRate);

  // Automatically count down ETA and update progress
  useEffect(() => {
    if (isSimulationPaused) return;

    const timer = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 10) {
          setProgressStep(3); // Arrived
          return 0;
        }
        
        // Progress steps over time
        if (prev < 3 * 60) {
          setProgressStep(2); // Almost arrived
        } else if (prev < 8 * 60) {
          setProgressStep(1); // En Route
        }
        
        // Count down distance gradually
        setDistanceKm((d) => Math.max(0.1, +(d - 0.015).toFixed(3)));
        
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isSimulationPaused]);

  // Format seconds to text
  const formatTime = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const secs = sec % 60;
    if (mins === 0 && secs === 0) return "Arrived";
    return `${mins}m ${secs.toString().padStart(2, '0')}s`;
  };

  // Skip simulation forward helpers
  const handleFastForward = () => {
    if (progressStep === 0) {
      setProgressStep(1);
      setSecondsRemaining(8 * 60);
      setDistanceKm(2.8);
    } else if (progressStep === 1) {
      setProgressStep(2);
      setSecondsRemaining(2 * 60);
      setDistanceKm(0.9);
    } else if (progressStep === 2) {
      setProgressStep(3);
      setSecondsRemaining(0);
      setDistanceKm(0.0);
    } else {
      // Restart simulation
      setProgressStep(0);
      setSecondsRemaining(12 * 60);
      setDistanceKm(4.2);
    }
  };

  return (
    <div className="flex-grow flex flex-col bg-slate-50 overflow-hidden">
      
      {/* Header */}
      <div className="px-4 pt-3 pb-3 bg-white border-b border-slate-100 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={onCancel}
            className="p-2 rounded-xl hover:bg-slate-100 text-slate-700 transition-colors cursor-pointer"
            title="Back to Dashboard"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-base font-extrabold text-slate-900 tracking-tight font-display">Near You</h2>
            <p className="text-[10px] text-slate-400 font-medium font-mono">ID: BL-{Math.floor(100000 + Math.random() * 900000)}</p>
          </div>
        </div>
        
        {/* Rapid manual simulator button */}
        <button
          onClick={handleFastForward}
          className="bg-blue-50 text-blue-600 px-3 py-1.5 rounded-xl hover:bg-blue-150 transition-all font-bold text-[10px] flex items-center gap-1 cursor-pointer"
          title="Simulate dispatch stage timeline"
        >
          <RefreshCw className="w-3 h-3 animate-spin-slow" />
          <span>Stage Next</span>
        </button>
      </div>

      {/* Main viewport */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-28 relative">
        
        {/* Dynamic Route Tracker matching Fourth Screenshot */}
        <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-xs">
          
          {/* Pickup and drop list */}
          <div className="relative pl-6 pb-2 border-b border-slate-100/60 mb-3 ml-2">
            {/* Visual connected line */}
            <div className="absolute left-[3px] top-[14px] bottom-[14px] w-[2px] bg-gradient-to-b from-rose-500 to-emerald-500 border-dashed"></div>
            
            {/* Pickup Node */}
            <div className="relative mb-4">
              <span className="absolute -left-6 top-0.5 w-[8px] h-[8px] rounded-full bg-rose-500 ring-4 ring-rose-500/20"></span>
              <p className="text-[9px] uppercase font-bold tracking-wider text-slate-400">Pickup Location</p>
              <h4 className="text-xs font-bold text-slate-700 truncate">{pickupAddress}</h4>
            </div>

            {/* Drop Node */}
            <div className="relative">
              <span className="absolute -left-6 top-0.5 w-[8px] h-[8px] rounded-full bg-emerald-500 ring-4 ring-emerald-500/20"></span>
              <p className="text-[9px] uppercase font-bold tracking-wider text-slate-400">Destination (Droppoint)</p>
              <h4 className="text-xs font-bold text-slate-700 truncate">
                {isLocksmith ? "On-Site lockout release area" : dropAddress}
              </h4>
            </div>
          </div>

          {/* Interactive Live Driving Vector Map */}
          <div className="h-44 bg-slate-100 rounded-2xl overflow-hidden relative border border-slate-200/50">
            {/* Subtle grid base */}
            <div className="absolute inset-0 opacity-15 bg-[linear-gradient(to_right,#475569_1px,transparent_1px),linear-gradient(to_bottom,#475569_1px,transparent_1px)] bg-[size:16px_16px]"></div>
            
            {/* Realtime vector road simulation line */}
            <svg viewBox="0 0 340 176" className="absolute inset-0 w-full h-full fill-none">
              {/* Complex road network */}
              <path d="M 10,88 Q 130,50 170,110 T 330,80" stroke="#cbd5e1" strokeWidth="12" strokeLinecap="round" />
              <path d="M 10,88 Q 130,50 170,110 T 330,80" stroke="#f8fafc" strokeWidth="8" strokeLinecap="round" />
              
              <line x1="120" y1="10" x2="120" y2="166" stroke="#f1f5f9" strokeWidth="8" />
              <line x1="240" y1="10" x2="240" y2="166" stroke="#f1f5f9" strokeWidth="8" />

              {/* Real route highlight (blue navigation trail) */}
              <path 
                d="M 60,78 Q 130,50 170,110" 
                stroke="#3267e3" 
                strokeWidth="5" 
                strokeLinecap="round" 
                strokeDasharray="2 2"
                className="animate-pulse"
              />

              {/* Start Pin */}
              <circle cx="60" cy="78" r="4" fill="#ef4444" />
              {/* Destination Pin */}
              <circle cx="170" cy="110" r="4" fill="#10b981" />
            </svg>

            {/* Simulated truck moving icon */}
            <div 
              className="absolute transition-all duration-1000 ease-out"
              style={{
                top: `${110 - (progressStep === 3 ? 0 : progressStep === 2 ? 15 : progressStep === 1 ? 35 : 45)}px`,
                left: `${170 - (progressStep === 3 ? 0 : progressStep === 2 ? 30 : progressStep === 1 ? 70 : 90)}px`,
              }}
            >
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg border border-white ring-4 ring-blue-500/20 active:scale-95 transition-all">
                {isLocksmith ? (
                  <Key className="w-4 h-4 text-white animate-pulse" />
                ) : (
                  <Truck className="w-4 h-4 text-white animate-bounce" />
                )}
              </div>
            </div>

            {/* Custom overlays for status updates */}
            <div className="absolute top-3 left-3 bg-slate-900/90 text-white px-2.5 py-1.5 rounded-lg text-[9px] font-mono tracking-wider flex items-center gap-1.5 backdrop-blur-xs">
              <span className={`w-2 h-2 rounded-full ${progressStep === 3 ? 'bg-emerald-400' : 'bg-blue-400 animate-ping'}`}></span>
              <span>
                {progressStep === 0 && "COORDINATING DISPATCH"}
                {progressStep === 1 && "UNIT ROUTED & ACTIVE"}
                {progressStep === 2 && "APPROACHING SCENE"}
                {progressStep === 3 && "UNIT ARRIVED"}
              </span>
            </div>
          </div>
        </div>

        {/* Live Timeline Step Flow */}
        <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-xs">
          <h4 className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 mb-3">Service timeline progress</h4>
          <div className="space-y-4">
            
            {/* Step 1 */}
            <div className="flex items-start gap-3">
              <div className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                progressStep >= 0 ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-400'
              }`}>
                ✓
              </div>
              <div>
                <h5 className="text-xs font-bold text-slate-800">Booking Confirmed</h5>
                <p className="text-[10px] text-slate-400">Request processed by Bilaad dispatcher.</p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex items-start gap-3">
              <div className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                progressStep >= 1 ? 'bg-emerald-500 text-white animate-pulse' : 'bg-slate-100 text-slate-400'
              }`}>
                {progressStep >= 1 ? '✓' : '2'}
              </div>
              <div>
                <h5 className={`text-xs font-bold ${progressStep >= 1 ? 'text-slate-800' : 'text-slate-400'}`}>Technician Assigned</h5>
                <p className="text-[10px] text-slate-400">Specialist {driverName} responded to booking.</p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex items-start gap-3">
              <div className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                progressStep >= 2 ? 'bg-blue-500 text-white animate-bounce' : 'bg-slate-100 text-slate-400'
              }`}>
                {progressStep >= 3 ? '✓' : '3'}
              </div>
              <div>
                <h5 className={`text-xs font-bold ${progressStep >= 2 ? 'text-slate-800' : 'text-slate-400'}`}>En Route to Pickup</h5>
                <p className="text-[10px] text-slate-400">Unit navigating with live GPS. {formatTime(secondsRemaining)} remaining.</p>
              </div>
            </div>

          </div>
        </div>

        {/* Assigned Driver/Tech detailed card mirroring screen 4 */}
        <div className="bg-white rounded-3xl p-4 border border-blue-50/60 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-white text-base font-black font-display shrink-0 relative">
                {isLocksmith ? "AR" : "MR"}
                <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white"></span>
              </div>
              <div>
                <h4 className="font-extrabold text-sm text-slate-900 font-display flex items-center gap-1.5 leading-none">
                  {driverName}
                  <span className="flex items-center gap-0.5 text-[10px] text-amber-500 font-extrabold">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    4.8
                  </span>
                </h4>
                <p className="text-[10px] text-slate-400 font-mono mt-1">{driverVehicle}</p>
                <p className="text-[9px] font-extrabold text-blue-600 font-mono bg-blue-50 px-1.5 py-0.5 rounded mt-1 inline-block">
                  {isLocksmith && (vehicle.company === 'House' || vehicle.company === 'Office Suite' || vehicle.company === 'Apartment') ? 'Property:' : 'Vehicle:'} {vehicle.company} - {vehicle.model}
                </p>
              </div>
            </div>
            
            <div className="text-right">
              <p className="text-[9px] uppercase font-bold tracking-wider text-slate-400">Est. Total</p>
              <h3 className="text-lg font-black text-slate-800 font-mono">${totalPrice}</h3>
              <p className="text-[9px] text-slate-400 font-semibold">Taxes included</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-1">
            <button
              onClick={() => alert(`Simulating direct dial/phone call to ${driverName} at 945-946-0885...`)}
              className="bg-slate-50 border border-slate-100 hover:bg-slate-100 text-slate-800 font-bold py-2.5 rounded-xl flex items-center justify-center gap-1.5 text-xs transition-colors cursor-pointer"
            >
              <Phone className="w-4 h-4 text-blue-500" />
              <span>Call Tech</span>
            </button>
            <button
              onClick={onOpenChat}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-xl flex items-center justify-center gap-1.5 text-xs transition-colors cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 text-white" />
              <span>Chat Dispatch</span>
            </button>
          </div>
        </div>

        {/* Safety tips box */}
        <div className="bg-slate-100/80 rounded-2xl p-4 text-[11px] text-slate-500 space-y-1 pb-6">
          <p className="font-extrabold text-slate-700 text-xs mb-1">🔒 Safety & Security</p>
          <p>• Turn on your vehicle emergency hazards while waiting.</p>
          <p>• Stay in a safe, visible pathway if your car is disabled near active lanes.</p>
          <p>• Bilaad field units will match the license/ID profile displayed above.</p>
        </div>

      </div>
    </div>
  );
}

import React, { useEffect, useState } from 'react';
import { ArrowLeft, Car, Truck, Bike, MapPin, Navigation, CheckCircle } from 'lucide-react';
import { Service, Vehicle } from '../types';

export default function BookServiceScreen({selectedService,vehicle,onChangeVehicle,onBack,onConfirmOrder,defaultPickup}:{selectedService:Service;vehicle:Vehicle;onChangeVehicle:(v:Vehicle)=>void;onBack:()=>void;onConfirmOrder:(pickup:string,drop:string)=>void;defaultPickup:string}) {
  const automotive = ['auto-lockout','suv-key-fob','fleet-locksmith'].includes(selectedService.id);
  const [pickup,setPickup] = useState(defaultPickup || 'Austin, TX');
  const [notes,setNotes] = useState('');
  const [locating,setLocating] = useState(false);
  useEffect(() => setPickup(defaultPickup || 'Austin, TX'), [defaultPickup]);
  const update = (field:keyof Vehicle,value:string) => onChangeVehicle({...vehicle,[field]:value});
  const useLocation = () => {
    if (!navigator.geolocation) return alert('Location sharing is not available on this device.');
    setLocating(true);
    navigator.geolocation.getCurrentPosition(p => { setPickup(`${p.coords.latitude.toFixed(5)}, ${p.coords.longitude.toFixed(5)}`); setLocating(false); }, () => {setLocating(false); alert('Location permission was not granted.');});
  };
  const submit=(e:React.FormEvent)=>{e.preventDefault(); if(!pickup.trim()) return; onConfirmOrder(pickup,'On-site service location');};
  return <div className="flex-1 flex flex-col bg-slate-50 overflow-hidden">
    <header className="px-4 py-4 bg-white border-b border-slate-100 flex items-center gap-3 shrink-0"><button onClick={onBack} className="p-2 rounded-xl hover:bg-slate-100"><ArrowLeft className="w-5 h-5"/></button><div><h2 className="font-black text-slate-900 font-display">Book {selectedService.title}</h2><p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">From {selectedService.estFee} • Mobile dispatch</p></div></header>
    <form onSubmit={submit} className="flex-1 overflow-y-auto p-4 pb-28 space-y-5">
      <div className="bg-white rounded-3xl border border-slate-100 p-4 flex gap-3 items-center shadow-sm"><img src={selectedService.imageUrl} className="w-16 h-16 rounded-2xl object-cover"/><div><p className="text-[10px] text-blue-600 font-black uppercase tracking-wider">Selected Service</p><h3 className="text-base font-black text-slate-900">{selectedService.title}</h3><p className="text-[10px] text-slate-500 leading-snug mt-1">{selectedService.desc}</p></div></div>
      {automotive && <section className="space-y-3"><h4 className="text-xs font-black text-slate-700">Vehicle details</h4><div className="grid grid-cols-3 gap-2">
        {([['motorcycle','Motorcycle',Bike],['car','Car',Car],['truck','Truck',Truck]] as any).map(([v,l,I]:any)=><button type="button" key={v} onClick={()=>onChangeVehicle({...vehicle,type:v})} className={`rounded-2xl border py-3 flex flex-col items-center gap-1 text-[10px] font-bold ${vehicle.type===v?'border-blue-600 bg-blue-50 text-blue-600':'border-slate-100 bg-white text-slate-400'}`}><I className="w-5 h-5"/>{l}</button>)}
      </div><div className="grid grid-cols-2 gap-3"><label className="text-[10px] font-bold text-slate-400">Make<input value={vehicle.company} onChange={e=>update('company',e.target.value)} placeholder="Ford" className="mt-1 w-full bg-white border border-slate-200 rounded-xl px-3 py-3 text-xs text-slate-800 outline-none focus:border-blue-500"/></label><label className="text-[10px] font-bold text-slate-400">Model<input value={vehicle.model} onChange={e=>update('model',e.target.value)} placeholder="F-150" className="mt-1 w-full bg-white border border-slate-200 rounded-xl px-3 py-3 text-xs text-slate-800 outline-none focus:border-blue-500"/></label></div></section>}
      <section className="space-y-3"><h4 className="text-xs font-black text-slate-700">Where do you need help?</h4><button type="button" onClick={useLocation} className="w-full bg-blue-50 border border-blue-100 text-blue-700 rounded-xl py-3 font-bold text-xs flex justify-center items-center gap-2"><Navigation className="w-4 h-4"/>{locating?'Getting location…':'Use My Current Location'}</button><label className="text-[10px] font-bold text-slate-400">Service address<div className="relative mt-1"><MapPin className="absolute left-3 top-3 w-4 h-4 text-slate-400"/><input required value={pickup} onChange={e=>setPickup(e.target.value)} className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-3 py-3 text-xs text-slate-800 outline-none focus:border-blue-500" placeholder="Enter your address"/></div></label></section>
      <label className="block text-[10px] font-bold text-slate-400">Anything we should know?<textarea value={notes} onChange={e=>setNotes(e.target.value)} rows={3} className="mt-1 w-full resize-none bg-white border border-slate-200 rounded-xl px-3 py-3 text-xs text-slate-800 outline-none focus:border-blue-500" placeholder="Keys in trunk, key broke, gate code, etc."/></label>
      <button type="submit" className="w-full bg-blue-600 text-white rounded-2xl py-4 font-black text-sm shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2"><CheckCircle className="w-5 h-5"/>Confirm & Dispatch</button>
      <p className="text-center text-[9px] text-slate-400">Final price is confirmed before work begins.</p>
    </form>
  </div>;
}

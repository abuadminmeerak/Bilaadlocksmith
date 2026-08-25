import React from 'react';
import { ArrowLeft, ShieldAlert, Car, Home, Building, Wrench, Key } from 'lucide-react';
import { Service } from '../types';

export default function ServiceSelectScreen({services,onSelectService,onBack}:{services:Service[];onSelectService:(id:string)=>void;onBack:()=>void}) {
  const icon = (name:string) => {
    const C:any = ({ShieldAlert,Car,Home,Building,Wrench,Key} as any)[name] || Wrench;
    return <C className="w-4 h-4 text-white"/>;
  };
  return <div className="flex-1 flex flex-col bg-slate-50 overflow-hidden">
    <header className="px-4 py-4 bg-white border-b border-slate-100 flex items-center gap-3 shrink-0">
      <button onClick={onBack} className="p-2 rounded-xl hover:bg-slate-100 text-slate-700"><ArrowLeft className="w-5 h-5"/></button>
      <div><h2 className="text-lg font-extrabold text-slate-900 font-display">Request a service</h2><p className="text-[11px] text-slate-400">Choose the locksmith help you need.</p></div>
    </header>
    <div className="px-4 pt-4"><div className="rounded-2xl bg-blue-600 text-white px-4 py-3 flex items-center gap-3"><Key className="w-5 h-5"/><div><p className="text-xs font-black uppercase tracking-wider">Bilaad Locksmith</p><p className="text-[10px] text-blue-100">Mobile locksmith dispatch</p></div></div></div>
    <div className="flex-1 overflow-y-auto p-4 pb-24"><div className="grid grid-cols-2 gap-3.5">
      {services.map(s => <button key={s.id} onClick={() => onSelectService(s.id)} className="aspect-square rounded-[26px] relative overflow-hidden text-left shadow-sm border border-slate-100 group">
        <img src={s.imageUrl} alt={s.title} className="absolute inset-0 w-full h-full object-cover group-active:scale-105 transition" referrerPolicy="no-referrer"/>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/20 to-transparent"/>
        <span className="absolute top-3 right-3 bg-white text-slate-900 text-[10px] font-black px-2 py-1 rounded-full">From {s.estFee}</span>
        <span className="absolute top-3 left-3 bg-white/15 backdrop-blur-md p-2 rounded-xl border border-white/20">{icon(s.iconName)}</span>
        <div className="absolute left-3 right-3 bottom-3"><h3 className="text-white text-[13px] font-black font-display">{s.title}</h3><p className="text-blue-200 text-[9px] font-bold mt-0.5">MOBILE LOCKSMITH</p></div>
      </button>)}
    </div></div>
  </div>;
}

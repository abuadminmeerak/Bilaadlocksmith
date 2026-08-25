/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowRight } from 'lucide-react';

interface WelcomeScreenProps {
  onStart: () => void;
}

export default function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  return (
    <div
      id="welcome-screen"
      className="flex-1 flex flex-col bg-[#111827] text-white relative min-h-[600px] overflow-hidden select-none"
    >
      {/* 1. Top Graphic Area: Locksmith Van */}
      <div className="relative h-[40%] min-h-[220px] w-full shrink-0 overflow-hidden border-b border-zinc-800">
        <img
          src="/assets/locksmith_hero_1781651378248.jpg"
          alt="Bilaad Mobile Locksmith Unit"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        {/* Subtle shadow gradient overlay at the base */}
        <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-black/40 to-transparent"></div>
      </div>

      {/* 2. Bottom Graphic Area with Text Overlay: Picker hands */}
      <div className="relative flex-grow flex flex-col justify-end p-6">
        {/* Underlay background: Lishi bypass locksmith hands */}
        <div className="absolute inset-0 z-0">
          <img
            src="/assets/auto_lockout_1781651390973.jpg"
            alt="Locksmith Bypass Close Up"
            className="w-full h-full object-cover opacity-60"
            referrerPolicy="no-referrer"
          />
          {/* Real dark gradient so the white text reads clearly */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-zinc-900/30"></div>
        </div>

        {/* Text and interaction layouts stacked on top of picker image */}
        <div className="relative z-10 space-y-3 pb-4">
          <h1 className="text-2xl font-black font-sans tracking-tight text-white leading-tight drop-shadow-md">
            Fast Automotive &<br />
            Fleet Locksmith
          </h1>

          <p className="text-zinc-300 text-[11px] leading-relaxed max-w-[290px] drop-shadow-xs font-medium">
            Quickly request service for cars, SUVs, pickup trucks, or commercial fleets. We handle lockouts, key duplication, ignition repair, and security upgrades for your residential and commercial
          </p>

          <div className="pt-2">
            <button
              onClick={onStart}
              className="inline-flex items-center gap-3 bg-[#1e293b]/90 hover:bg-[#334155]/95 text-white py-1.5 pr-4 pl-1.5 rounded-full border border-white/10 active:scale-95 transition-all text-xs font-black tracking-wide cursor-pointer group shadow-lg shadow-black/40"
            >
              <span className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-slate-950 transition-transform group-hover:translate-x-0.5">
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </span>
              <span>Get Started</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

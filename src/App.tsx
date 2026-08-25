import React from 'react';
import TwinAppSimulator from './components/TwinAppSimulator';

export default function App() {
  return (
    <main className="min-h-[100dvh] bg-white flex justify-center">
      <TwinAppSimulator mobileOnly />
    </main>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Service {
  id: string;
  title: string;
  desc: string;
  iconName: string; // Used to dynamic-render Lucide icons
  bg: string; // Gradient Tailwind class
  estFee: string;
  category: 'locksmith' | 'roadside' | 'general';
  imageUrl?: string;
}

export interface Vehicle {
  type: 'car' | 'motorcycle' | 'truck';
  company: string;
  model: string;
  fuel: string;
  transmission: string;
  tire: string;
  engine: string;
}

export interface Message {
  id: string;
  sender: 'tech' | 'user' | 'system';
  text: string;
  timestamp: string;
}

export interface ActiveOrder {
  serviceId: string;
  vehicle: Vehicle | null;
  pickupAddress: string;
  dropAddress: string;
  progress: number; // 0 to 100
  etaMin: number;
  driverName: string;
  driverRating: number;
  driverPhone: string;
  price: number;
  dateStr: string;
}

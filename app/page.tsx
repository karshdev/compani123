'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import CompanyOnboarding from '@/components/CompanyOnboarding';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <CompanyOnboarding />
    </div>
  );
}

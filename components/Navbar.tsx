import React from 'react';
import Image from 'next/image';
import logo from '@/assets/logocompani.svg';

export default function Navbar() {
  return (
    <nav className="border-b border-[#E5E5E5] bg-white/95 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
      <div className="container  px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Image 
              src={logo}
              alt="Company Logo"
              width={80}
              height={40}
              className="h-8  w-auto"
              priority
            />
          </div>
        </div>
      </div>
    </nav>
  );
}


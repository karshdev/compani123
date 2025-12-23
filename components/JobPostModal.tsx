'use client';

import React from 'react';
import Button from './ui/Button';

interface JobPostModalProps {
  isOpen: boolean;
  onYes: () => void;
  onNo: () => void;
  companyName: string;
}

export default function JobPostModal({ isOpen, onYes, onNo, companyName }: JobPostModalProps) {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center animate-in fade-in p-4"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.75)' }}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onNo();
        }
      }}
    >
      <div 
        className="rounded-2xl shadow-2xl max-w-md w-full transform animate-in zoom-in-95 overflow-hidden"
        style={{ backgroundColor: '#ffffff' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 sm:p-8" style={{ backgroundColor: '#ffffff' }}>
          <div className="flex items-center justify-center w-16 h-16 mx-auto mb-5 rounded-2xl bg-[#121212]">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} style={{ color: '#ffffff' }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-3" style={{ color: '#121212' }}>
            Add a Job Post?
          </h2>
          <p className="text-sm sm:text-base text-center mb-8" style={{ color: '#6B7280' }}>
            Would you like to create a job post for <span className="font-semibold" style={{ color: '#121212' }}>{companyName}</span>?
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              variant="outline"
              onClick={onNo}
              className="flex-1 text-sm sm:text-base py-3"
            >
              Skip for now
            </Button>
            <Button
              variant="primary"
              onClick={onYes}
              className="flex-1 text-sm sm:text-base py-3 font-semibold"
              style={{ backgroundColor: '#121212', color: '#ffffff' }}
            >
              Yes, add job post
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}


'use client';

import React from 'react';
import Button from './ui/Button';

interface JobPostSuccessModalProps {
  isOpen: boolean;
  onViewJobPost: () => void;
  onGoToDashboard: () => void;
  onShareLinkedIn: () => void;
}

export default function JobPostSuccessModal({
  isOpen,
  onViewJobPost,
  onGoToDashboard,
  onShareLinkedIn,
}: JobPostSuccessModalProps) {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center animate-in fade-in p-4 overflow-y-auto"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.75)' }}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          // Don't close on background click for success modal
        }
      }}
    >
      <div 
        className="rounded-2xl shadow-2xl max-w-lg w-full my-auto transform animate-in zoom-in-95 overflow-hidden"
        style={{ backgroundColor: '#ffffff' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 sm:p-8 lg:p-10" style={{ backgroundColor: '#ffffff' }}>
          {/* Success Icon */}
          <div className="flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-6 rounded-full bg-[#121212]">
            <svg className="w-10 h-10 sm:w-12 sm:h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} style={{ color: '#ffffff' }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          {/* Title */}
          <h2 className="text-2xl sm:text-3xl font-bold text-[#121212] mb-3 text-center" style={{ color: '#121212' }}>
            Job Successfully Posted!
          </h2>
          
          {/* Description */}
          <p className="text-sm sm:text-base mb-8 text-center" style={{ color: '#6B7280' }}>
            Your opening is now live and starting to attract the best candidates
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <Button
              variant="outline"
              onClick={onViewJobPost}
              className="flex-1 text-sm sm:text-base py-3"
            >
              View Job Posting
            </Button>
            <Button
              variant="primary"
              onClick={onGoToDashboard}
              className="flex-1 text-sm sm:text-base py-3 font-semibold"
              style={{ backgroundColor: '#121212', color: '#ffffff' }}
            >
              Go to Dashboard
            </Button>
          </div>

          {/* Divider */}
          <div className="border-t mb-6" style={{ borderColor: '#E5E5E5' }} />

          {/* Share Section */}
          <p className="text-sm sm:text-base mb-4 text-center" style={{ color: '#6B7280' }}>Reach more candidates instantly.</p>
          
          <Button
            variant="outline"
            onClick={onShareLinkedIn}
            className="w-full text-sm sm:text-base py-3"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            Share on LinkedIn
          </Button>
        </div>
      </div>
    </div>
  );
}


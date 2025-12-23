'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import companyIcon from '@/assets/company.svg';

interface LogoUploadProps {
  onFileSelect?: (file: File) => void;
}

export default function LogoUpload({ onFileSelect }: LogoUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }
      
      if (!file.type.match(/^image\/(jpeg|jpg|png)$/)) {
        alert('Please upload a JPG or PNG file');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      
      onFileSelect?.(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-semibold text-[#121212] mb-1.5 tracking-wide">
        Company Logo
        <span className="text-red-500 ml-1">*</span>
      </label>
      
      <div 
        className="flex items-center gap-3 p-3 border-2 border-dashed border-[#E5E5E5] rounded-lg bg-gray-50/50 hover:border-[#121212] hover:bg-gray-50 transition-all duration-200 cursor-pointer group"
        onClick={handleUploadClick}
      >
        <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-white border-2 border-[#E5E5E5] flex items-center justify-center flex-shrink-0 shadow-sm">
          {preview ? (
            <Image
              src={preview}
              alt="Company Logo"
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-white">
              <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008V15.75m3.75-.75h.008v.008h-.008V12.75m-3.75-.75h.008v.008h-.008V9.75m-3.75 3.75h.008v.008h-.008V15.75m-3.75-.75h.008v.008h-.008V12.75m-3.75-.75h.008v.008h-.008V9.75" />
              </svg>
            </div>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-[#121212]">Add Logo</p>
          <p className="text-xs text-gray-500">JPG or PNG, max 5MB</p>
          {preview && (
            <p className="text-xs text-green-600 mt-0.5 flex items-center gap-1">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Logo uploaded
            </p>
          )}
        </div>
        
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/jpeg,image/jpg,image/png"
          className="hidden"
        />
        
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleUploadClick();
          }}
          className="px-4 py-2 bg-[#121212] rounded-lg text-xs font-semibold hover:bg-[#2a2a2a] transition-all duration-200 whitespace-nowrap"
          style={{ backgroundColor: '#121212', color: '#ffffff' }}
        >
          {preview ? 'Change' : 'Upload'}
        </button>
      </div>
    </div>
  );
}


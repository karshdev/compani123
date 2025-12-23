import React, { useState } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  required?: boolean;
}

export default function Input({ label, error, required, className = '', ...props }: InputProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="w-full group">
      <label className="block text-sm font-semibold text-[#121212] mb-2 tracking-wide">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="relative">
        <input
          onFocus={() => !props.readOnly && setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`
            w-full px-4 py-2.5 border border-[#E5E5E5] rounded-lg text-sm
            transition-all duration-200
            placeholder:text-gray-400 placeholder:font-normal
            ${props.readOnly ? 'bg-gray-50 cursor-not-allowed' : 'bg-white'}
            ${isFocused && !props.readOnly ? 'ring-2 ring-[#121212] border-[#121212] shadow-sm' : 'focus:outline-none focus:ring-2 focus:ring-[#121212] focus:border-[#121212]'}
            ${error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}
            ${className}
          `}
          {...props}
        />
        {props.readOnly && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
        )}
      </div>
      {error && (
        <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1.5 animate-in fade-in slide-in-from-top-1">
          <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}


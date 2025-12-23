import React, { useState } from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  required?: boolean;
  showCharCount?: boolean;
  maxLength?: number;
}

export default function Textarea({ label, error, required, className = '', showCharCount, maxLength, ...props }: TextareaProps) {
  const value = (props.value as string) || '';
  const charCount = value.length;
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="w-full group">
      <div className="flex items-center justify-between mb-2">
        <label className="block text-sm font-semibold text-[#121212] tracking-wide">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
        {showCharCount && maxLength && (
          <span className={`text-xs font-medium ${charCount >= maxLength ? 'text-red-500' : 'text-gray-500'}`}>
            {charCount}/{maxLength}
          </span>
        )}
      </div>
      <div className="relative">
        <textarea
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`
            w-full px-4 py-2.5 border border-[#E5E5E5] rounded-lg text-sm
            transition-all duration-200
            placeholder:text-gray-400 placeholder:font-normal
            bg-white resize-none
            ${isFocused ? 'ring-2 ring-[#121212] border-[#121212] shadow-sm' : 'focus:outline-none focus:ring-2 focus:ring-[#121212] focus:border-[#121212]'}
            ${error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}
            ${className}
          `}
          maxLength={maxLength}
          {...props}
        />
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


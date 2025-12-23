'use client';

import React, { useState } from 'react';
import Input from './ui/Input';
import Textarea from './ui/Textarea';
import Button from './ui/Button';
import LogoUpload from './ui/LogoUpload';

interface CompanyFormData {
  companyName: string;
  website: string;
  location: string;
  logo: File | null;
  about: string;
}

interface CompanyFormProps {
  onSubmit: (data: CompanyFormData) => void;
}

export default function CompanyForm({ onSubmit }: CompanyFormProps) {
  const [formData, setFormData] = useState<CompanyFormData>({
    companyName: '',
    website: '',
    location: '',
    logo: null,
    about: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof CompanyFormData, string>>>({});

  const handleChange = (field: keyof CompanyFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleLogoSelect = (file: File) => {
    setFormData(prev => ({ ...prev, logo: file }));
    if (errors.logo) {
      setErrors(prev => ({ ...prev, logo: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof CompanyFormData, string>> = {};

    if (!formData.companyName.trim()) {
      newErrors.companyName = 'Company name is required';
    }

    if (!formData.website.trim()) {
      newErrors.website = 'Website is required';
    } else if (!/^https?:\/\/.+\..+/.test(formData.website)) {
      newErrors.website = 'Please enter a valid website URL';
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }

    if (!formData.logo) {
      newErrors.logo = 'Company logo is required';
    }

    if (!formData.about.trim()) {
      newErrors.about = 'About your company is required';
    } else if (formData.about.trim().length < 50) {
      newErrors.about = 'Please provide at least 50 characters';
    } else if (formData.about.trim().length > 500) {
      newErrors.about = 'Description must be less than 500 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <div className="max-w-3xl mx-auto w-full">
      <div className="bg-white rounded-3xl shadow-xl border border-[#E5E5E5] overflow-hidden">
        {/* Header Section with Gradient Accent */}
        <div className="bg-gradient-to-br from-[#121212] via-[#1a1a1a] to-[#121212] px-8 sm:px-10 pt-12 pb-10 relative overflow-hidden">
          {/* Decorative Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          </div>
          
          <div className="relative flex items-start gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center flex-shrink-0 border border-white/20 shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <div className="flex-1">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3 tracking-tight">Company information</h1>
              <p className="text-base text-white/90">Fill out your company information below to get started</p>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="p-8 sm:p-10 lg:p-12">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid gap-8">
              <Input
                label="Company name"
                type="text"
                placeholder="Enter Company name"
                required
                value={formData.companyName}
                onChange={(e) => handleChange('companyName', e.target.value)}
                error={errors.companyName}
              />

              <Input
                label="Company Website"
                type="url"
                placeholder="https://example.com"
                required
                value={formData.website}
                onChange={(e) => handleChange('website', e.target.value)}
                error={errors.website}
              />

              <div className="relative group">
                <label className="block text-sm font-semibold text-[#121212] mb-3 tracking-wide">
                  Location
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Enter Location"
                    required
                    value={formData.location}
                    onChange={(e) => handleChange('location', e.target.value)}
                    className={`
                      w-full px-5 py-4 pr-12 border border-[#E5E5E5] rounded-xl
                      focus:outline-none focus:ring-2 focus:ring-[#121212] focus:border-[#121212]
                      transition-all duration-300 ease-out
                      placeholder:text-gray-400 placeholder:font-normal
                      bg-white
                      group-hover:border-gray-300
                      ${errors.location ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}
                    `}
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                {errors.location && (
                  <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.location}
                  </p>
                )}
              </div>

              <LogoUpload onFileSelect={handleLogoSelect} />
              {errors.logo && (
                <p className="text-sm text-red-500 flex items-center gap-1 -mt-6">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.logo}
                </p>
              )}

              <Textarea
                label="About your Company"
                placeholder="Tell us about your company, its mission, values, and what makes it unique..."
                required
                rows={6}
                value={formData.about}
                onChange={(e) => handleChange('about', e.target.value)}
                error={errors.about}
                showCharCount
                maxLength={500}
              />
            </div>

            <div className="pt-8 border-t border-[#E5E5E5] flex items-center justify-end">
              <Button 
                type="submit" 
                variant="primary" 
                className="w-full sm:w-auto min-w-[180px] shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-100 transition-all duration-200 group"
              >
                Continue
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}


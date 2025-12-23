'use client';

import React, { useState, useEffect } from 'react';
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

interface CompanyFormMultiStepProps {
  onSubmit: (data: CompanyFormData) => void;
  onStepChange?: (step: number) => void;
}

const TOTAL_STEPS = 2;

export default function CompanyFormMultiStep({ onSubmit, onStepChange }: CompanyFormMultiStepProps) {
  const [currentStep, setCurrentStep] = useState(1);
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

  const validateStep = (step: number): boolean => {
    const newErrors: Partial<Record<keyof CompanyFormData, string>> = {};

    if (step === 1) {
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
    } else if (step === 2) {
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
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    onStepChange?.(currentStep);
  }, [currentStep, onStepChange]);

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < TOTAL_STEPS) {
        setCurrentStep(prev => prev + 1);
      } else {
        onSubmit(formData);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  return (
    <div className="max-w-3xl mx-auto w-full px-4 sm:px-6">
      <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-[#E5E5E5] overflow-hidden">
        {/* Compact Header */}
        <div className="bg-[#121212] px-4 sm:px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 border border-white/20">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} style={{ color: '#ffffff' }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-base sm:text-lg font-bold text-white mb-0.5 truncate" style={{ color: '#ffffff' }}>Company details</h1>
              <p className="text-xs text-white/90 truncate" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>Step {currentStep} of {TOTAL_STEPS}: {currentStep === 1 ? 'Basic information' : 'Logo & description'}</p>
            </div>
          </div>
        </div>

        {/* Form Section - Compact */}
        <div className="p-4 sm:p-5 lg:p-6">
          <form onSubmit={(e) => { e.preventDefault(); handleNext(); }}>
            <div className="space-y-4">
              {currentStep === 1 && (
                <>
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
                    <label className="block text-sm font-semibold text-[#121212] mb-2 tracking-wide">
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
                          w-full px-4 py-2.5 pr-10 border border-[#E5E5E5] rounded-lg
                          focus:outline-none focus:ring-2 focus:ring-[#121212] focus:border-[#121212]
                          transition-all duration-200
                          placeholder:text-gray-400 text-sm
                          bg-white
                          ${errors.location ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}
                        `}
                      />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                    {errors.location && (
                      <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {errors.location}
                      </p>
                    )}
                  </div>
                </>
              )}

              {currentStep === 2 && (
                <>
                  <LogoUpload onFileSelect={handleLogoSelect} />
                  {errors.logo && (
                    <p className="text-xs text-red-500 flex items-center gap-1 -mt-2">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {errors.logo}
                    </p>
                  )}

                  <Textarea
                    label="About your Company"
                    placeholder="Tell us about your company..."
                    required
                    rows={5}
                    value={formData.about}
                    onChange={(e) => handleChange('about', e.target.value)}
                    error={errors.about}
                    showCharCount
                    maxLength={500}
                  />
                </>
              )}
            </div>

            {/* Navigation - Compact */}
            <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-4 mt-4 border-t border-[#E5E5E5]">
              <Button
                type="button"
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 1}
                className={`text-xs sm:text-sm py-2 px-3 w-full sm:w-auto ${currentStep === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back
              </Button>

              <Button
                type="submit"
                variant="primary"
                className="text-xs sm:text-sm py-2 px-5 w-full sm:w-auto sm:min-w-[90px] font-semibold"
                style={{ backgroundColor: '#121212', color: '#ffffff' }}
              >
                {currentStep === TOTAL_STEPS ? 'Complete' : 'Next'}
                {currentStep < TOTAL_STEPS && (
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}


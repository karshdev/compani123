'use client';

import React, { useState, useEffect } from 'react';
import Button from './ui/Button';
import Input from './ui/Input';
import Textarea from './ui/Textarea';
import Select from './ui/Select';
import RichTextEditor from './ui/RichTextEditor';
import JobPostSuccessModal from './JobPostSuccessModal';

interface JobPostWizardProps {
  companyName: string;
  onComplete: () => void;
  onStepChange?: (step: number) => void;
}

const TOTAL_STEPS = 4;

const STEP_NAMES = [
  'Basic Information',
  'Job Details',
  'Ideal Qualifications',
  'Review & Publish'
];

const JOB_TYPES = [
  { value: 'fulltime', label: 'Full-time' },
  { value: 'parttime', label: 'Part-time' },
  { value: 'contract', label: 'Contract' },
  { value: 'internship', label: 'Internship' },
];

const WORKPLACE_TYPES = [
  { value: 'remote', label: 'Remote' },
  { value: 'onsite', label: 'On-Site' },
  { value: 'hybrid', label: 'Hybrid' },
];

const COUNTRIES = [
  { value: 'us', label: 'United States' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'ca', label: 'Canada' },
  { value: 'au', label: 'Australia' },
  { value: 'in', label: 'India' },
];

const CURRENCIES = [
  { value: 'usd', label: 'USD ($)' },
  { value: 'eur', label: 'EUR (€)' },
  { value: 'gbp', label: 'GBP (£)' },
  { value: 'inr', label: 'INR (₹)' },
];

const EXPERIENCE_LEVELS = [
  { value: 'entry', label: 'Entry Level' },
  { value: 'mid', label: 'Mid Level' },
  { value: 'senior', label: 'Senior Level' },
  { value: 'executive', label: 'Executive' },
];

const JOB_STATUSES = [
  { value: 'draft', label: 'Draft' },
  { value: 'published', label: 'Published' },
];

export default function JobPostWizard({ companyName, onComplete, onStepChange }: JobPostWizardProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [formData, setFormData] = useState<Record<string, any>>({
    company: companyName,
    jobType: 'fulltime',
    workplaceType: 'onsite',
    country: 'us',
    currency: 'usd',
    experienceLevel: 'mid',
    jobStatus: 'published',
  });

  useEffect(() => {
    onStepChange?.(currentStep);
  }, [currentStep, onStepChange]);

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Show success modal
      setShowSuccessModal(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    onComplete();
  };

  const progress = (currentStep / TOTAL_STEPS) * 100;

  return (
    <>
      <div className="max-w-4xl mx-auto w-full px-4 sm:px-6">
        {/* Form Card */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-[#E5E5E5] overflow-hidden">
          {/* Step Header */}
          <div className="bg-[#121212] px-4 sm:px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 border border-white/20">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} style={{ color: '#ffffff' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-base sm:text-lg font-bold text-white mb-0.5 truncate" style={{ color: '#ffffff' }}>
                  {STEP_NAMES[currentStep - 1]}
                </h2>
                <p className="text-xs text-white/90 truncate" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                  Step {currentStep} of {TOTAL_STEPS} • <span className="hidden sm:inline">{companyName}</span>
                </p>
              </div>
            </div>
          </div>

          {/* Form Content */}
          <div className="p-4 sm:p-6 lg:p-8">
            {currentStep === 1 && (
              <div className="space-y-4 sm:space-y-5">
                <Input
                  label="Company"
                  value={formData.company || companyName}
                  onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                  readOnly
                />
                <Input
                  label="Job Title"
                  placeholder="Enter Job Title name"
                  required
                  value={formData.jobTitle || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, jobTitle: e.target.value }))}
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Select
                    label="Job Type"
                    options={JOB_TYPES}
                    value={formData.jobType || 'fulltime'}
                    onChange={(e) => setFormData(prev => ({ ...prev, jobType: e.target.value }))}
                  />
                  <Input
                    label="Workplace Type"
                    placeholder="e.g., San Francisco"
                    value={formData.workplaceType || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, workplaceType: e.target.value }))}
                  />
                </div>
                <Input
                  label="City"
                  placeholder="e.g., San Francisco"
                  value={formData.city || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                />
                <Select
                  label="Country"
                  options={COUNTRIES}
                  required
                  value={formData.country || 'us'}
                  onChange={(e) => setFormData(prev => ({ ...prev, country: e.target.value }))}
                />
                <Select
                  label="Experience Level"
                  options={EXPERIENCE_LEVELS}
                  value={formData.experienceLevel || 'mid'}
                  onChange={(e) => setFormData(prev => ({ ...prev, experienceLevel: e.target.value }))}
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Input
                    label="Min Salary"
                    type="number"
                    placeholder="$10"
                    value={formData.minSalary || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, minSalary: e.target.value }))}
                  />
                  <Input
                    label="Max Salary"
                    type="number"
                    placeholder="$100000"
                    value={formData.maxSalary || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, maxSalary: e.target.value }))}
                  />
                  <Select
                    label="Currency"
                    options={CURRENCIES}
                    value={formData.currency || 'usd'}
                    onChange={(e) => setFormData(prev => ({ ...prev, currency: e.target.value }))}
                    className="sm:col-span-2 lg:col-span-1"
                  />
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-5 sm:space-y-7">
                <RichTextEditor
                  label="Job Description"
                  value={formData.jobDescription || ''}
                  onChange={(value) => setFormData(prev => ({ ...prev, jobDescription: value }))}
                  placeholder="Enter a description..."
                  required
                  rows={8}
                />
                <RichTextEditor
                  label="Responsibilities"
                  value={formData.responsibilities || ''}
                  onChange={(value) => setFormData(prev => ({ ...prev, responsibilities: value }))}
                  placeholder="Enter a Responsibilities..."
                  rows={6}
                />
                <RichTextEditor
                  label="Requirements"
                  value={formData.requirements || ''}
                  onChange={(value) => setFormData(prev => ({ ...prev, requirements: value }))}
                  placeholder="Enter a Requirements..."
                  rows={6}
                />
                <RichTextEditor
                  label="Benefits"
                  value={formData.benefits || ''}
                  onChange={(value) => setFormData(prev => ({ ...prev, benefits: value }))}
                  placeholder="Enter Benefits..."
                  rows={6}
                />
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-5 sm:space-y-7">
                <div className="bg-gray-50/50 border border-[#E5E5E5] rounded-xl p-4 sm:p-5">
                  <h3 className="text-sm sm:text-base font-bold text-[#121212] mb-2">Must-have qualifications</h3>
                  <p className="text-xs sm:text-sm text-gray-600 mb-4">Your applicants must have these qualifications to be considered for the role.</p>
                  <Textarea
                    label=""
                    placeholder="Enter must-have qualifications (one per line or bullet points)..."
                    rows={6}
                    value={formData.mustHaveQualifications || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, mustHaveQualifications: e.target.value }))}
                  />
                </div>
                <div className="bg-gray-50/50 border border-[#E5E5E5] rounded-xl p-4 sm:p-5">
                  <h3 className="text-sm sm:text-base font-bold text-[#121212] mb-2">Desired qualifications</h3>
                  <p className="text-xs sm:text-sm text-gray-600 mb-4">Your applicants don't need to have these qualifications, but you prefer to hire someone with them.</p>
                  <Textarea
                    label=""
                    placeholder="Enter desired qualifications (one per line or bullet points)..."
                    rows={6}
                    value={formData.desiredQualifications || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, desiredQualifications: e.target.value }))}
                  />
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-5 sm:space-y-6">
                <Select
                  label="Job Status"
                  options={JOB_STATUSES}
                  value={formData.jobStatus || 'published'}
                  onChange={(e) => setFormData(prev => ({ ...prev, jobStatus: e.target.value }))}
                />
                
                {/* Job Summary */}
                <div className="border-2 border-[#E5E5E5] rounded-xl p-4 sm:p-6 bg-gradient-to-br from-gray-50 to-white">
                  <h3 className="text-sm sm:text-base font-bold text-[#121212] mb-4 sm:mb-5 flex items-center gap-2">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Job Summary
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 text-xs sm:text-sm">
                    <div className="space-y-2.5 sm:space-y-3">
                      <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-2">
                        <span className="font-semibold text-[#121212] sm:min-w-[100px]">Company:</span>
                        <span className="text-gray-700 break-words">{formData.company || companyName}</span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-2">
                        <span className="font-semibold text-[#121212] sm:min-w-[100px]">Job Type:</span>
                        <span className="text-gray-700">{JOB_TYPES.find(t => t.value === formData.jobType)?.label || 'Full-time'}</span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-2">
                        <span className="font-semibold text-[#121212] sm:min-w-[100px]">Location:</span>
                        <span className="text-gray-700 break-words">{formData.city ? `${formData.city}, ${COUNTRIES.find(c => c.value === formData.country)?.label || 'US'}` : COUNTRIES.find(c => c.value === formData.country)?.label || 'US'}</span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-2">
                        <span className="font-semibold text-[#121212] sm:min-w-[100px]">Salary:</span>
                        <span className="text-gray-700">{formData.currency ? CURRENCIES.find(c => c.value === formData.currency)?.label.split(' ')[0] : 'USD'} {formData.minSalary || '0'} - {formData.maxSalary || '0'}</span>
                      </div>
                    </div>
                    <div className="space-y-2.5 sm:space-y-3">
                      <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-2">
                        <span className="font-semibold text-[#121212] sm:min-w-[100px]">Title:</span>
                        <span className="text-gray-700 break-words">{formData.jobTitle || 'Not specified'}</span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-2">
                        <span className="font-semibold text-[#121212] sm:min-w-[100px]">Workplace:</span>
                        <span className="text-gray-700">{WORKPLACE_TYPES.find(w => w.value === formData.workplaceType)?.label || 'On-Site'}</span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-2">
                        <span className="font-semibold text-[#121212] sm:min-w-[100px]">Experience:</span>
                        <span className="text-gray-700">{EXPERIENCE_LEVELS.find(e => e.value === formData.experienceLevel)?.label || 'Mid Level'}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Qualifications Review */}
                {formData.mustHaveQualifications && (
                  <div className="border border-[#E5E5E5] rounded-xl p-4 sm:p-5 bg-white">
                    <h3 className="text-sm sm:text-base font-bold text-[#121212] mb-3 flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Must-have qualifications
                    </h3>
                    <div className="text-xs sm:text-sm text-gray-700 whitespace-pre-line leading-relaxed pl-4 sm:pl-6 border-l-2 border-[#121212]">
                      {formData.mustHaveQualifications}
                    </div>
                  </div>
                )}

                {formData.desiredQualifications && (
                  <div className="border border-[#E5E5E5] rounded-xl p-4 sm:p-5 bg-white">
                    <h3 className="text-sm sm:text-base font-bold text-[#121212] mb-3 flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      Preferred qualifications
                    </h3>
                    <div className="text-xs sm:text-sm text-gray-700 whitespace-pre-line leading-relaxed pl-4 sm:pl-6 border-l-2 border-[#121212]">
                      {formData.desiredQualifications}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Navigation */}
            <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-6 sm:pt-8 mt-6 sm:mt-8 border-t border-[#E5E5E5]">
              <Button
                type="button"
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 1}
                className={`text-sm py-2.5 px-4 sm:px-5 w-full sm:w-auto ${currentStep === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'}`}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                {currentStep === 1 ? 'Cancel' : 'Back'}
              </Button>

              <Button
                type="button"
                variant="primary"
                onClick={handleNext}
                className="text-sm py-2.5 px-6 sm:px-8 w-full sm:w-auto sm:min-w-[140px] font-semibold shadow-md hover:shadow-lg transition-all duration-200"
                style={{ backgroundColor: '#121212', color: '#ffffff' }}
              >
                {currentStep === TOTAL_STEPS ? 'Create' : 'Continue'}
                {currentStep < TOTAL_STEPS && (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      <JobPostSuccessModal
        isOpen={showSuccessModal}
        onViewJobPost={() => {
          console.log('View job post');
          handleSuccessModalClose();
        }}
        onGoToDashboard={() => {
          console.log('Go to dashboard');
          handleSuccessModalClose();
        }}
        onShareLinkedIn={() => {
          console.log('Share on LinkedIn');
        }}
      />
    </>
  );
}

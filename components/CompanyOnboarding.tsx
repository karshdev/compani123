'use client';

import React, { useState } from 'react';
import OnboardingSidebar from './OnboardingSidebar';
import CompanyFormMultiStep from './CompanyFormMultiStep';
import JobPostWizard from './JobPostWizard';
import JobPostModal from './JobPostModal';

interface CompanyFormData {
  companyName: string;
  website: string;
  location: string;
  logo: File | null;
  about: string;
}

export default function CompanyOnboarding() {
  const [companyData, setCompanyData] = useState<CompanyFormData | null>(null);
  const [showJobPostModal, setShowJobPostModal] = useState(false);
  const [showJobPost, setShowJobPost] = useState(false);
  const [companyFormStep, setCompanyFormStep] = useState(1);
  const [jobPostStep, setJobPostStep] = useState(1);

  // Build steps dynamically based on current state
  const getSteps = () => {
    const steps = [
      {
        id: 1,
        title: 'Company details',
        description: 'Step 1: Basic information',
        icon: (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        ),
      },
      {
        id: 2,
        title: 'Company details',
        description: 'Step 2: Logo & description',
        icon: (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        ),
      },
    ];

    if (showJobPost) {
      steps.push(
        {
          id: 3,
          title: 'Create job post',
          description: 'Step 1: Basic Information',
          icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          ),
        },
        {
          id: 4,
          title: 'Create job post',
          description: 'Step 2: Job Details',
          icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          ),
        },
        {
          id: 5,
          title: 'Create job post',
          description: 'Step 3: Ideal Qualifications',
          icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          ),
        },
        {
          id: 6,
          title: 'Create job post',
          description: 'Step 4: Review & Publish',
          icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          ),
        }
      );
    }

    return steps;
  };

  const steps = getSteps();
  // Calculate current step for sidebar: 1-2 for company, 3-6 for job post
  const currentStep = showJobPost ? (2 + jobPostStep) : companyFormStep;

  const handleCompanySubmit = (data: CompanyFormData) => {
    setCompanyData(data);
    setShowJobPostModal(true);
  };

  const handleJobPostYes = () => {
    setShowJobPostModal(false);
    setShowJobPost(true);
  };

  const handleJobPostNo = () => {
    setShowJobPostModal(false);
    // Handle skip - could show completion screen or redirect
    alert('Company profile created successfully!');
  };

  const handleJobPostComplete = () => {
    alert('Job post created successfully!');
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Sidebar - Desktop Only */}
      <OnboardingSidebar steps={steps} currentStep={currentStep} />

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Mobile Progress Bar */}
        <div className="lg:hidden bg-white border-b border-[#E5E5E5] px-4 py-3">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-[#121212]">
                Step {currentStep} of {steps.length}
              </span>
              <span className="text-xs text-gray-500">{Math.round((currentStep / steps.length) * 100)}%</span>
            </div>
            <div className="w-full h-1.5 bg-[#E5E5E5] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#121212] transition-all duration-500 ease-out"
                style={{ width: `${(currentStep / steps.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Content Area - Scrollable */}
        <div className="flex-1">
          <div className="py-6 px-4 sm:px-6 lg:px-8 xl:px-12">
            {!showJobPost ? (
              <CompanyFormMultiStep 
                onSubmit={handleCompanySubmit}
                onStepChange={setCompanyFormStep}
              />
            ) : (
              <JobPostWizard 
                companyName={companyData?.companyName || 'Your Company'} 
                onComplete={handleJobPostComplete}
                onStepChange={setJobPostStep}
              />
            )}
          </div>
        </div>
      </main>

      {/* Job Post Modal */}
      <JobPostModal
        isOpen={showJobPostModal}
        onYes={handleJobPostYes}
        onNo={handleJobPostNo}
        companyName={companyData?.companyName || 'Your Company'}
      />
    </div>
  );
}


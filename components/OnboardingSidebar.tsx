'use client';

import React from 'react';

interface Step {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface OnboardingSidebarProps {
  steps: Step[];
  currentStep: number;
}

export default function OnboardingSidebar({ steps, currentStep }: OnboardingSidebarProps) {
  // Calculate progress line height - stop at the last step icon, not beyond
  const lastStepIndex = steps.length - 1;
  const progressHeight = lastStepIndex > 0 
    ? ((currentStep - 1) / lastStepIndex) * 100 
    : 0;
  
  // Cap at 100% to prevent overflow
  const cappedProgressHeight = Math.min(progressHeight, 100);

  return (
    <aside className="hidden lg:flex flex-col w-72 bg-white border-r border-[#E5E5E5] p-6">
      {/* Steps List */}
      <div className="flex-1 relative">
        {/* Progress Line */}
        <div className="absolute left-5 top-0 w-0.5 bg-[#E5E5E5]" style={{ height: `${(steps.length - 1) * 80 + 40}px` }}>
          <div 
            className="absolute top-0 w-full bg-[#121212] transition-all duration-700 ease-out rounded-full"
            style={{ height: `${cappedProgressHeight}%` }}
          />
        </div>
        
        <div className="relative space-y-6">
          {steps.map((step, index) => {
            const stepNumber = index + 1;
            const isCompleted = stepNumber < currentStep;
            const isActive = stepNumber === currentStep;

            return (
              <div 
                key={step.id} 
                className={`relative flex items-start gap-4 transition-all duration-300 ${
                  isActive ? 'transform translate-x-0.5' : ''
                }`}
              >
                {/* Step Icon */}
                <div 
                  className={`
                    relative z-10 w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0
                    transition-all duration-300 ease-out border-2
                    ${isCompleted 
                      ? 'border-[#121212] shadow-md' 
                      : isActive 
                      ? 'border-[#121212] shadow-lg scale-105' 
                      : 'border-[#E5E5E5]'
                    }
                  `}
                  style={{
                    backgroundColor: isCompleted || isActive ? '#121212' : '#ffffff'
                  }}
                >
                  <div 
                    className={isCompleted || isActive ? 'text-white' : 'text-[#121212]'}
                    style={{
                      color: isCompleted || isActive ? '#ffffff' : '#121212'
                    }}
                  >
                    {React.cloneElement(step.icon as React.ReactElement, {
                      className: `w-5 h-5 ${isCompleted || isActive ? 'text-white' : 'text-[#121212]'}`,
                      style: { color: isCompleted || isActive ? '#ffffff' : '#121212' }
                    })}
                  </div>
                </div>

                {/* Step Content */}
                <div className="flex-1 pt-1">
                  <h3 
                    className={`text-sm font-bold mb-1 transition-all duration-300`}
                    style={{
                      color: isActive || isCompleted ? '#121212' : '#9CA3AF'
                    }}
                  >
                    {step.title}
                  </h3>
                  <p 
                    className={`text-xs leading-relaxed transition-all duration-300`}
                    style={{
                      color: isActive ? '#4B5563' : isCompleted ? '#6B7280' : '#9CA3AF'
                    }}
                  >
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Links */}
      <div className="mt-6 pt-6 border-t border-[#E5E5E5] space-y-3">
        <a 
          href="#" 
          className="flex items-center gap-2 text-xs text-gray-600 hover:text-[#121212] transition-all duration-200 group"
        >
          <svg className="w-3 h-3 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to home
        </a>
        <a 
          href="#" 
          className="text-xs text-gray-600 hover:text-[#121212] transition-colors duration-200"
        >
          Sign in
        </a>
      </div>
    </aside>
  );
}


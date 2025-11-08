import React from 'react';
import './StepIndicator.css';

const StepIndicator = ({ currentStep }) => {
  const steps = [
    { id: 1, name: 'Define', label: 'Define' },
    { id: 2, name: 'Plan', label: 'Plan' },
    { id: 3, name: 'Collect', label: 'Collect' },
    { id: 4, name: 'Analyze', label: 'Analyze' }
  ];

  return (
    <div className="step-indicator">
      {steps.map((step, index) => {
        const isCompleted = step.id < currentStep;
        const isActive = step.id === currentStep;
        
        return (
          <React.Fragment key={step.id}>
            <div className={`step-item ${isCompleted ? 'completed' : ''} ${isActive ? 'active' : ''}`}>
              {isCompleted ? (
                <div className="step-icon completed-icon">✓</div>
              ) : (
                <div className={`step-icon ${isActive ? 'active-icon' : ''}`}>
                  {step.id}
                </div>
              )}
              <span className="step-label">{step.label}</span>
            </div>
            {index < steps.length - 1 && <div className="step-connector" />}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default StepIndicator;



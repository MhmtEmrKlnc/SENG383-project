import React, { useState } from 'react';
import StepIndicator from './components/StepIndicator';
import Step1Define from './pages/Step1Define';
import Step2Plan from './pages/Step2Plan';
import Step3Collect from './pages/Step3Collect';
import Step4Analyze from './pages/Step4Analyze';
import './App.css';

function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});

  const handleStep1Next = (data) => {
    setFormData({ ...formData, ...data });
    setCurrentStep(2);
  };

  const handleStep2Next = (data) => {
    setFormData({ ...formData, ...data });
    setCurrentStep(3);
  };

  const handleStep2Previous = () => {
    setCurrentStep(1);
  };

  const handleStep3Next = (data) => {
    setFormData({ ...formData, ...data });
    setCurrentStep(4);
  };

  const handleStep3Previous = () => {
    setCurrentStep(2);
  };

  const handleStep4Previous = () => {
    setCurrentStep(3);
  };

  const handleStartNew = () => {
    setFormData({});
    setCurrentStep(1);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1Define onNext={handleStep1Next} initialData={formData} />;
      case 2:
        return (
          <Step2Plan
            onNext={handleStep2Next}
            onPrevious={handleStep2Previous}
            data={formData}
          />
        );
      case 3:
        return (
          <Step3Collect
            onNext={handleStep3Next}
            onPrevious={handleStep3Previous}
            data={formData}
          />
        );
      case 4:
        return (
          <Step4Analyze
            onPrevious={handleStep4Previous}
            onStartNew={handleStartNew}
            data={formData}
          />
        );
      default:
        return <Step1Define onNext={handleStep1Next} initialData={formData} />;
    }
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>ISO 15939 Measurement Process Simulator</h1>
        <p className="app-subtitle">
          Simulate software quality measurement using ISO 25010 quality model
        </p>
      </header>
      
      <StepIndicator currentStep={currentStep} />
      
      <main className="app-main">
        {renderStep()}
      </main>

      <footer className="app-footer">
        <p>Mehmet Emre Kılınç</p>
        <p>c2111058@student.cankaya.edu.tr</p>
      </footer>
    </div>
  );
}

export default App;

import React, { useState } from 'react';
import { getAllCaseStudies } from '../data/caseStudies';
import { getAllCharacteristics } from '../data/iso25010';
import './Step1Define.css';

const Step1Define = ({ onNext, initialData }) => {
  const [scenarioType, setScenarioType] = useState(initialData?.scenarioType || 'predefined');
  const [selectedCaseStudy, setSelectedCaseStudy] = useState(initialData?.selectedCaseStudy || null);
  const [selectedCharacteristics, setSelectedCharacteristics] = useState(
    initialData?.selectedCharacteristics || []
  );
  const [customScenarioName, setCustomScenarioName] = useState(initialData?.customScenarioName || '');

  const caseStudies = getAllCaseStudies();
  const allCharacteristics = getAllCharacteristics();

  const handleCaseStudySelect = (caseStudyId) => {
    const caseStudy = caseStudies.find(cs => cs.id === caseStudyId);
    setSelectedCaseStudy(caseStudyId);
    setSelectedCharacteristics(caseStudy.selectedCharacteristics);
  };

  const handleCharacteristicToggle = (charId) => {
    if (selectedCharacteristics.includes(charId)) {
      setSelectedCharacteristics(selectedCharacteristics.filter(id => id !== charId));
    } else {
      setSelectedCharacteristics([...selectedCharacteristics, charId]);
    }
  };

  const handleNext = () => {
    if (scenarioType === 'predefined' && !selectedCaseStudy) {
      alert('Please select a predefined case study');
      return;
    }
    if (scenarioType === 'custom' && selectedCharacteristics.length === 0) {
      alert('Please select at least one quality characteristic');
      return;
    }
    if (scenarioType === 'custom' && !customScenarioName.trim()) {
      alert('Please enter a scenario name');
      return;
    }

    onNext({
      scenarioType,
      selectedCaseStudy: scenarioType === 'predefined' ? selectedCaseStudy : null,
      selectedCharacteristics,
      customScenarioName: scenarioType === 'custom' ? customScenarioName : null
    });
  };

  return (
    <div className="step1-define">
      <h2>Step 1: Define Quality Dimensions</h2>
      <p className="step-description">
        Users can either load predefined case studies (IoT, Healthcare, Mobile App) or manually select quality dimensions from ISO 25010.
      </p>

      <div className="scenario-type-selector">
        <label>
          <input
            type="radio"
            value="predefined"
            checked={scenarioType === 'predefined'}
            onChange={(e) => {
              setScenarioType(e.target.value);
              setSelectedCaseStudy(null);
              setSelectedCharacteristics([]);
            }}
          />
          Load Predefined Case Study
        </label>
        <label>
          <input
            type="radio"
            value="custom"
            checked={scenarioType === 'custom'}
            onChange={(e) => {
              setScenarioType(e.target.value);
              setSelectedCaseStudy(null);
              setSelectedCharacteristics([]);
            }}
          />
          Create Custom Scenario
        </label>
      </div>

      {scenarioType === 'predefined' && (
        <div className="predefined-case-studies">
          <h3>Select a Predefined Case Study</h3>
          <div className="case-study-grid">
            {caseStudies.map(caseStudy => (
              <div
                key={caseStudy.id}
                className={`case-study-card ${selectedCaseStudy === caseStudy.id ? 'selected' : ''}`}
                onClick={() => handleCaseStudySelect(caseStudy.id)}
              >
                <h4>{caseStudy.name}</h4>
                <p>{caseStudy.description}</p>
                <div className="case-study-info">
                  {caseStudy.selectedCharacteristics.length} dimension(s) included
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {scenarioType === 'custom' && (
        <div className="custom-scenario">
          <div className="form-group">
            <label>Scenario Name:</label>
            <input
              type="text"
              value={customScenarioName}
              onChange={(e) => setCustomScenarioName(e.target.value)}
              placeholder="Enter scenario name"
            />
          </div>

          <h3>Or Select Dimensions Manually</h3>
          <p>Select the ISO 25010 quality characteristics you want to measure:</p>
          <div className="characteristics-grid">
            {allCharacteristics.map(char => (
              <div
                key={char.id}
                className={`characteristic-card ${selectedCharacteristics.includes(char.id) ? 'selected' : ''}`}
                onClick={() => handleCharacteristicToggle(char.id)}
              >
                <div className="characteristic-header">
                  <h4>{char.name}</h4>
                  {selectedCharacteristics.includes(char.id) && (
                    <span className="check-icon">✓</span>
                  )}
                </div>
                <p>{char.subCharacteristics.length} sub-characteristic(s)</p>
              </div>
            ))}
          </div>
          <div className="selected-info">
            Selected: {selectedCharacteristics.length} dimension(s)
          </div>
        </div>
      )}

      <div className="step-navigation">
        <button className="btn-secondary" disabled>Previous</button>
        <span className="step-counter">1/4</span>
        <button className="btn-primary" onClick={handleNext}>Next</button>
      </div>
    </div>
  );
};

export default Step1Define;



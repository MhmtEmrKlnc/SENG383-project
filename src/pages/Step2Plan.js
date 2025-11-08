import React, { useState, useEffect } from 'react';
import { getCaseStudyById } from '../data/caseStudies';
import { getCharacteristicById } from '../data/iso25010';
import './Step2Plan.css';

const Step2Plan = ({ onNext, onPrevious, data }) => {
  const [weights, setWeights] = useState(data?.weights || {});
  const [totalWeight, setTotalWeight] = useState(0);
  const [isPredefined, setIsPredefined] = useState(false);

  useEffect(() => {
    // Initialize weights if coming from predefined case study
    if (data?.scenarioType === 'predefined' && data?.selectedCaseStudy) {
      const caseStudy = getCaseStudyById(data.selectedCaseStudy);
      if (caseStudy && caseStudy.weights) {
        setWeights(caseStudy.weights);
        setIsPredefined(true);
      }
    } else {
      // Initialize with equal weights for custom scenario
      const initialWeights = {};
      data?.selectedCharacteristics?.forEach(charId => {
        initialWeights[charId] = 0;
      });
      setWeights(initialWeights);
      setIsPredefined(false);
    }
  }, [data]);

  useEffect(() => {
    const total = Object.values(weights).reduce((sum, weight) => sum + (parseFloat(weight) || 0), 0);
    setTotalWeight(total);
  }, [weights]);

  const handleWeightChange = (charId, value) => {
    const numValue = parseFloat(value) || 0;
    if (numValue < 0) return;
    
    setWeights({
      ...weights,
      [charId]: numValue
    });
  };

  const handleNext = () => {
    if (Math.abs(totalWeight - 100) > 0.01) {
      alert(`Total weights must equal 100%. Current total: ${totalWeight.toFixed(2)}%`);
      return;
    }
    onNext({ ...data, weights });
  };

  const getCharacteristicName = (charId) => {
    const char = getCharacteristicById(charId);
    return char ? char.name : charId;
  };

  return (
    <div className="step2-plan">
      <h2>Step 2: Plan - Assign Weights</h2>
      <p className="step-description">
        Users assign percentage weights to each selected dimension. The system validates that weights sum to exactly 100%.
      </p>

      {isPredefined && (
        <div className="predefined-banner">
          Case Study Mode: Weights are pre-configured for {getCaseStudyById(data?.selectedCaseStudy)?.name}
        </div>
      )}

      <div className="weights-section">
        <h3>Assign percentage weights to each selected dimension</h3>
        <p className="instruction">Total must equal 100%</p>

        <div className="weights-list">
          {data?.selectedCharacteristics?.map(charId => (
            <div key={charId} className="weight-item">
              <label>{getCharacteristicName(charId)}</label>
              <div className="weight-input-group">
                <input
                  type="number"
                  min="0"
                  max="100"
                  step="0.1"
                  value={weights[charId] || 0}
                  onChange={(e) => handleWeightChange(charId, e.target.value)}
                  disabled={isPredefined}
                />
                <span className="percent-sign">%</span>
              </div>
            </div>
          ))}
        </div>

        <div className={`total-weight ${totalWeight === 100 ? 'valid' : 'invalid'}`}>
          <strong>Total Weights: {totalWeight.toFixed(2)}%</strong>
          {totalWeight === 100 && <span className="check-mark">✓</span>}
        </div>
      </div>

      <div className="step-navigation">
        <button className="btn-secondary" onClick={onPrevious}>Previous</button>
        <span className="step-counter">2/4</span>
        <button className="btn-primary" onClick={handleNext}>Next</button>
      </div>
    </div>
  );
};

export default Step2Plan;



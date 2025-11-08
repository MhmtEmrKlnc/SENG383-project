import React, { useMemo } from 'react';
import { getCaseStudyById } from '../data/caseStudies';
import { getCharacteristicById } from '../data/iso25010';
import {
  calculateSubCharacteristicScore,
  calculateCharacteristicScore,
  calculateOverallScore,
  interpretScore,
  calculateGaps
} from '../utils/calculations';
import './Step4Analyze.css';

const Step4Analyze = ({ onPrevious, onStartNew, data }) => {
  const results = useMemo(() => {
    if (!data?.metricValues || !data?.metrics || !data?.weights) {
      return null;
    }

    // calculate scores
    const characteristicScores = {};
    
    data.selectedCharacteristics.forEach(charId => {
      const charMetrics = data.metrics[charId];
      if (!charMetrics) {
        characteristicScores[charId] = 0;
        return;
      }

      const subCharScores = {};
      Object.keys(charMetrics).forEach(subCharId => {
        const metricOrArray = charMetrics[subCharId];
        // Support both single metric and array of metrics
        const metricList = Array.isArray(metricOrArray) ? metricOrArray : [metricOrArray];
        
        const metricValuesForSubChar = {};
        const metricDefsForSubChar = {};
        
        metricList.forEach((metric, idx) => {
          const key = `${charId}_${subCharId}${idx > 0 ? `_${idx}` : ''}`;
          const metricValue = data.metricValues[key];
          
          if (metricValue !== undefined && metricValue !== null) {
            const metricKey = `${subCharId}_${idx}`;
            metricValuesForSubChar[metricKey] = metricValue;
            metricDefsForSubChar[metricKey] = metric;
          }
        });
        
        if (Object.keys(metricValuesForSubChar).length > 0) {
          subCharScores[subCharId] = calculateSubCharacteristicScore(
            metricValuesForSubChar,
            metricDefsForSubChar
          );
        }
      });

      characteristicScores[charId] = calculateCharacteristicScore(subCharScores);
    });

    const overallScore = calculateOverallScore(characteristicScores, data.weights);
    const interpretation = interpretScore(overallScore);
    const gaps = calculateGaps(characteristicScores);

    return {
      characteristicScores,
      overallScore,
      interpretation,
      gaps
    };
  }, [data]);

  if (!results) {
    return (
      <div className="step4-analyze">
        <h2>Step 4: Analyze - Results & Recommendations</h2>
        <p>No data available for analysis.</p>
        <div className="step-navigation">
          <button className="btn-secondary" onClick={onPrevious}>Previous</button>
          <span className="step-counter">4/4</span>
          <button className="btn-primary" onClick={onStartNew}>Start New Measurement</button>
        </div>
      </div>
    );
  }

  const getCharacteristicName = (charId) => {
    const char = getCharacteristicById(charId);
    return char ? char.name : charId;
  };

  const getCaseStudyName = () => {
    if (data?.scenarioType === 'predefined' && data?.selectedCaseStudy) {
      const caseStudy = getCaseStudyById(data.selectedCaseStudy);
      return caseStudy ? caseStudy.name : 'Unknown';
    }
    return data?.customScenarioName || 'Custom Scenario';
  };

  const getCaseStudyDescription = () => {
    if (data?.scenarioType === 'predefined' && data?.selectedCaseStudy) {
      const caseStudy = getCaseStudyById(data.selectedCaseStudy);
      return caseStudy ? caseStudy.description : '';
    }
    return 'Custom evaluation scenario';
  };

  return (
    <div className="step4-analyze">
      <h2>Step 5: Analyze - Results & Recommendations</h2>
      <p className="step-description">
        The analysis dashboard shows overall weighted score, radar chart visualization, gap analysis with severity levels, and context-aware recommendations.
      </p>

      <div className="case-study-banner">
        <strong>Case Study: {getCaseStudyName()}</strong>
        <p>{getCaseStudyDescription()}</p>
      </div>

      <div className="overall-score-card" style={{ backgroundColor: results.interpretation.color + '20', borderColor: results.interpretation.color }}>
        <div className="score-value">{results.overallScore.toFixed(1)}/100</div>
        <div className="score-label">{results.interpretation.label}</div>
      </div>

      <div className="results-section">
        <h3>Quality Dimensions Scores</h3>
        <div className="scores-table">
          <table>
            <thead>
              <tr>
                <th>Quality Characteristic</th>
                <th>Score</th>
                <th>Weight</th>
                <th>Weighted</th>
                <th>Interpretation</th>
              </tr>
            </thead>
            <tbody>
              {data.selectedCharacteristics.map(charId => {
                const score = results.characteristicScores[charId] || 0;
                const weight = data.weights[charId] || 0;
                const weighted = (score * weight) / 100;
                const charInterpretation = interpretScore(score);
                
                return (
                  <tr key={charId}>
                    <td>{getCharacteristicName(charId)}</td>
                    <td>{score.toFixed(1)}</td>
                    <td>{weight}%</td>
                    <td>{weighted.toFixed(1)}</td>
                    <td>
                      <span className={`interpretation-badge ${charInterpretation.level}`}>
                        {charInterpretation.label}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {results.gaps.length > 0 && (
        <div className="gap-analysis">
          <h3>Gap Analysis</h3>
          <div className="gaps-list">
            {results.gaps.map(gap => (
              <div key={gap.characteristicId} className="gap-item">
                <div className="gap-header">
                  <span className="gap-icon">⚠️</span>
                  <strong>{getCharacteristicName(gap.characteristicId)}</strong>
                </div>
                <div className="gap-details">
                  <span>Score: {gap.score.toFixed(1)}</span>
                  <span>Gap: {gap.gap.toFixed(1)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="recommendations">
        <h3>Recommendations</h3>
        <ul>
          {results.gaps.map(gap => {
            const charName = getCharacteristicName(gap.characteristicId);
            // Ön tanımlı basit recommandationlar, hepsi için ayrı ayrı eklenebilir sonradan
            let recommendation = '';
            if (gap.characteristicId === 'security') {
              recommendation = `Enhance Security. Implement robust authentication, encrypt data in transit and at rest, and ensure regular security updates.`;
            } else if (gap.characteristicId === 'performanceEfficiency') {
              recommendation = `Optimize Performance Efficiency. Implement efficient algorithms, reduce resource usage, and optimize data processing.`;
            } else if (gap.characteristicId === 'reliability') {
              recommendation = `Improve Reliability. Increase system uptime, implement fault tolerance mechanisms, and reduce recovery time.`;
            } else {
              recommendation = `Focus on improving ${charName} to meet quality standards.`;
            }
            
            return (
              <li key={gap.characteristicId}>{recommendation}</li>
            );
          })}
          {results.gaps.length === 0 && (
            <li>All quality dimensions meet the expected thresholds. Continue monitoring and maintaining quality standards.</li>
          )}
        </ul>
      </div>

      <div className="step-navigation">
        <button className="btn-secondary" onClick={onPrevious}>Previous</button>
        <span className="step-counter">4/4</span>
        <button className="btn-primary" onClick={onStartNew}>Start New Measurement</button>
      </div>
    </div>
  );
};

export default Step4Analyze;



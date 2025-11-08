import React, { useState, useEffect } from 'react';
import { getCaseStudyById } from '../data/caseStudies';
import { getCharacteristicById, qualityCharacteristics } from '../data/iso25010';
import { getDefaultMetricsForSubCharacteristic } from '../data/iso25023Metrics';
import './Step3Collect.css';

const Step3Collect = ({ onNext, onPrevious, data }) => {
  const [metricValues, setMetricValues] = useState(data?.metricValues || {});
  const [metrics, setMetrics] = useState(data?.metrics || {});
  const [selectedMetrics, setSelectedMetrics] = useState(data?.selectedMetrics || {});
  const [customMetrics, setCustomMetrics] = useState(data?.customMetrics || {});
  const [showCustomForm, setShowCustomForm] = useState({});
  const [isCustomScenario, setIsCustomScenario] = useState(false);

  useEffect(() => {
    if (data?.scenarioType === 'predefined' && data?.selectedCaseStudy) {
      const caseStudy = getCaseStudyById(data.selectedCaseStudy);
      if (caseStudy && caseStudy.metrics) {
        setMetrics(caseStudy.metrics);
        setIsCustomScenario(false);

        const initialValues = {};
        Object.keys(caseStudy.metrics).forEach(charId => {
          Object.keys(caseStudy.metrics[charId]).forEach(subCharId => {
            const metric = caseStudy.metrics[charId][subCharId];
            if (metric.exampleValue !== undefined) {
              initialValues[`${charId}_${subCharId}`] = metric.exampleValue;
            }
          });
        });
        setMetricValues(prev => ({ ...prev, ...initialValues }));
      }
    } else if (data?.scenarioType === 'custom') {
      setIsCustomScenario(true);
      if (!data?.selectedMetrics) {
        const initialMetrics = {};
        data?.selectedCharacteristics?.forEach(charId => {
          initialMetrics[charId] = {};
          const char = getCharacteristicById(charId);
          if (char) {
            char.subCharacteristics.forEach(subChar => {
              initialMetrics[charId][subChar.id] = [];
            });
          }
        });
        setSelectedMetrics(initialMetrics);
      } else {
        setSelectedMetrics(data.selectedMetrics);
        if (Object.keys(data.selectedMetrics).length > 0) {
          const convertedMetrics = {};
          Object.keys(data.selectedMetrics).forEach(charId => {
            convertedMetrics[charId] = {};
            Object.keys(data.selectedMetrics[charId]).forEach(subCharId => {
              const metricList = data.selectedMetrics[charId][subCharId];
              if (metricList.length > 0) {
                convertedMetrics[charId][subCharId] = metricList[0];
              }
            });
          });
          setMetrics(convertedMetrics);
        }
      }
    }
  }, [data]);

  const handleMetricToggle = (charId, subCharId, metric) => {
    const currentMetrics = selectedMetrics[charId]?.[subCharId] || [];
    const metricId = metric.id || `${charId}_${subCharId}_${metric.name}`;

    const isSelected = currentMetrics.some(m => 
      (m.id && m.id === metricId) || 
      (!m.id && m.name === metric.name && m.unit === metric.unit)
    );

    if (isSelected) {
      // Remove metric
      setSelectedMetrics(prev => ({
        ...prev,
        [charId]: {
          ...prev[charId],
          [subCharId]: currentMetrics.filter(m => 
            !((m.id && m.id === metricId) || 
              (!m.id && m.name === metric.name && m.unit === metric.unit))
          )
        }
      }));
    } else {
      // Add metric
      setSelectedMetrics(prev => ({
        ...prev,
        [charId]: {
          ...prev[charId],
          [subCharId]: [...currentMetrics, { ...metric, id: metricId, isCustom: false }]
        }
      }));
    }
  };

  const handleAddCustomMetric = (charId, subCharId, customMetric) => {
    const metricId = `custom_${Date.now()}`;
    setSelectedMetrics(prev => ({
      ...prev,
      [charId]: {
        ...prev[charId],
        [subCharId]: [
          ...(prev[charId]?.[subCharId] || []),
          { ...customMetric, id: metricId, isCustom: true }
        ]
      }
    }));
    setShowCustomForm(prev => ({ ...prev, [`${charId}_${subCharId}`]: false }));
    setCustomMetrics(prev => ({ ...prev, [`${charId}_${subCharId}`]: {} }));
  };

  const handleCustomMetricChange = (charId, subCharId, field, value) => {
    const key = `${charId}_${subCharId}`;
    setCustomMetrics(prev => ({
      ...prev,
      [key]: {
        ...prev[key],
        [field]: value
      }
    }));
  };

  const isMetricSelected = (charId, subCharId, metric) => {
    const currentMetrics = selectedMetrics[charId]?.[subCharId] || [];
    const metricId = metric.id || `${charId}_${subCharId}_${metric.name}`;
    return currentMetrics.some(m => 
      (m.id && m.id === metricId) || 
      (!m.id && m.name === metric.name && m.unit === metric.unit)
    );
  };

  const handleMetricChange = (key, value) => {
    setMetricValues({
      ...metricValues,
      [key]: parseFloat(value) || 0
    });
  };

  const handleNext = () => {
    //for custom scenarios, first check if metrics are selected
    if (isCustomScenario) {
      let hasAllMetrics = true;
      const errors = [];

      data?.selectedCharacteristics?.forEach(charId => {
        const char = getCharacteristicById(charId);
        if (char) {
          char.subCharacteristics.forEach(subChar => {
            const metrics = selectedMetrics[charId]?.[subChar.id] || [];
            if (metrics.length === 0) {
              hasAllMetrics = false;
              errors.push(`${char.name} - ${subChar.name}`);
            }
          });
        }
      });

      if (!hasAllMetrics) {
        alert(`Please select at least one metric for each sub-characteristic.\n\nMissing metrics for:\n${errors.join('\n')}`);
        return;
      }

      const convertedMetrics = {};
      Object.keys(selectedMetrics).forEach(charId => {
        convertedMetrics[charId] = {};
        Object.keys(selectedMetrics[charId]).forEach(subCharId => {
          const metricList = selectedMetrics[charId][subCharId];
          if (metricList.length > 0) {
            // all selected metrics as an array
            convertedMetrics[charId][subCharId] = metricList;
          }
        });
      });
      setMetrics(convertedMetrics);
    }

    let hasAllValues = true;
    const metricsToCheck = Object.keys(metrics).length > 0 ? metrics : selectedMetrics;
    
    Object.keys(metricsToCheck).forEach(charId => {
      Object.keys(metricsToCheck[charId]).forEach(subCharId => {
        const metricList = Array.isArray(metricsToCheck[charId][subCharId]) 
          ? metricsToCheck[charId][subCharId] 
          : [metricsToCheck[charId][subCharId]];
        
        metricList.forEach((metric, idx) => {
          const key = `${charId}_${subCharId}${idx > 0 ? `_${idx}` : ''}`;
          if (metricValues[key] === undefined || metricValues[key] === null || metricValues[key] === '') {
            hasAllValues = false;
          }
        });
      });
    });

    if (!hasAllValues) {
      alert('Please enter values for all selected metrics');
      return;
    }

    const finalMetrics = Object.keys(metrics).length > 0 ? metrics : 
      (() => {
        const converted = {};
        Object.keys(selectedMetrics).forEach(charId => {
          converted[charId] = {};
          Object.keys(selectedMetrics[charId]).forEach(subCharId => {
            const metricList = selectedMetrics[charId][subCharId];
            if (metricList.length > 0) {
              converted[charId][subCharId] = metricList;
            }
          });
        });
        return converted;
      })();

    onNext({ ...data, metricValues, metrics: finalMetrics, selectedMetrics });
  };

  const getCharacteristicName = (charId) => {
    const char = getCharacteristicById(charId);
    return char ? char.name : charId;
  };

  const getSubCharacteristicName = (charId, subCharId) => {
    const char = getCharacteristicById(charId);
    if (char) {
      const subChar = char.subCharacteristics.find(sc => sc.id === subCharId);
      return subChar ? subChar.name : subCharId;
    }
    return subCharId;
  };

  const renderCustomMetricForm = (charId, subCharId) => {
    const key = `${charId}_${subCharId}`;
    const customMetric = customMetrics[key] || {};

    return (
      <div className="custom-metric-form">
        <h5>Add Custom Metric</h5>
        <div className="form-row">
          <label>
            Name:
            <input
              type="text"
              value={customMetric.name || ''}
              onChange={(e) => handleCustomMetricChange(charId, subCharId, 'name', e.target.value)}
              placeholder="e.g., Custom Response Time"
            />
          </label>
        </div>
        <div className="form-row">
          <label>
            Unit:
            <input
              type="text"
              value={customMetric.unit || ''}
              onChange={(e) => handleCustomMetricChange(charId, subCharId, 'unit', e.target.value)}
              placeholder="e.g., ms, %, score"
            />
          </label>
        </div>
        <div className="form-row">
          <label>
            Min Value:
            <input
              type="number"
              value={customMetric.min || ''}
              onChange={(e) => handleCustomMetricChange(charId, subCharId, 'min', e.target.value)}
              placeholder="0"
            />
          </label>
          <label>
            Max Value:
            <input
              type="number"
              value={customMetric.max || ''}
              onChange={(e) => handleCustomMetricChange(charId, subCharId, 'max', e.target.value)}
              placeholder="100"
            />
          </label>
        </div>
        <div className="form-row">
          <label>
            Target Value:
            <input
              type="number"
              value={customMetric.target || ''}
              onChange={(e) => handleCustomMetricChange(charId, subCharId, 'target', e.target.value)}
              placeholder="Optional"
            />
          </label>
          <label>
            Direction:
            <select
              value={customMetric.direction || 'higher'}
              onChange={(e) => handleCustomMetricChange(charId, subCharId, 'direction', e.target.value)}
            >
              <option value="higher">Higher is Better</option>
              <option value="lower">Lower is Better</option>
            </select>
          </label>
        </div>
        <div className="form-actions">
          <button
            className="btn-add"
            onClick={() => {
              if (!customMetric.name || !customMetric.unit) {
                alert('Please enter metric name and unit');
                return;
              }
              handleAddCustomMetric(charId, subCharId, {
                name: customMetric.name,
                unit: customMetric.unit,
                range: {
                  min: parseFloat(customMetric.min) || 0,
                  max: parseFloat(customMetric.max) || 100
                },
                direction: customMetric.direction || 'higher',
                target: customMetric.target ? parseFloat(customMetric.target) : null
              });
            }}
          >
            Add Metric
          </button>
          <button
            className="btn-cancel"
            onClick={() => {
              setShowCustomForm(prev => ({ ...prev, [key]: false }));
              setCustomMetrics(prev => ({ ...prev, [key]: {} }));
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    );
  };

  const renderMetricInput = (charId, subCharId, metric, metricIndex = 0) => {
    const key = `${charId}_${subCharId}${metricIndex > 0 ? `_${metricIndex}` : ''}`;
    const value = metricValues[key] || '';

    return (
      <div key={key} className="metric-input-group">
        <label>
          {metric.name}
          <div className="metric-input-wrapper">
            <input
              type="number"
              min={metric.range.min}
              max={metric.range.max}
              step="0.01"
              value={value}
              onChange={(e) => handleMetricChange(key, e.target.value)}
              placeholder={`Enter ${metric.name.toLowerCase()}`}
            />
            <span className="metric-unit">{metric.unit}</span>
          </div>
          <div className="metric-info">
            <span className="metric-range">
              range: {metric.range.min} - {metric.range.max}
            </span>
            <span className={`metric-direction ${metric.direction}`}>
              {metric.direction === 'higher' ? 'HIGHER IS BETTER' : 'LOWER IS BETTER'}
            </span>
          </div>
        </label>
      </div>
    );
  };

  //custom scenarios, show metric selection first
  if (isCustomScenario && Object.keys(metrics).length === 0) {
    return (
      <div className="step3-collect">
        <h2>Step 3: Collect - Select Metrics & Enter Values</h2>
        <p className="step-description">
          For each sub-characteristic, choose from default ISO 25023 metrics or define your own custom metric. Then enter values for selected metrics.
        </p>

        <div className="metrics-selection-section">
          {data?.selectedCharacteristics?.map(charId => {
            const char = getCharacteristicById(charId);
            if (!char) return null;

            return (
              <div key={charId} className="characteristic-metrics-selection">
                <h3>{char.name}</h3>
                {char.subCharacteristics.map(subChar => {
                  const defaultMetrics = getDefaultMetricsForSubCharacteristic(subChar.id);
                  const selected = selectedMetrics[charId]?.[subChar.id] || [];
                  const formKey = `${charId}_${subChar.id}`;

                  return (
                    <div key={subChar.id} className="sub-characteristic-metrics-selection">
                      <h4>{subChar.name}</h4>
                      
                      {defaultMetrics.length > 0 && (
                        <div className="default-metrics">
                          <label>ISO 25023 Default Metrics:</label>
                          <div className="metrics-checkbox-list">
                            {defaultMetrics.map((metric, idx) => {
                              const isSelected = isMetricSelected(charId, subChar.id, metric);
                              return (
                                <div
                                  key={idx}
                                  className={`metric-option ${isSelected ? 'selected' : ''}`}
                                  onClick={() => handleMetricToggle(charId, subChar.id, metric)}
                                >
                                  <input
                                    type="checkbox"
                                    checked={isSelected}
                                    onChange={() => {}}
                                  />
                                  <div className="metric-info">
                                    <strong>{metric.name}</strong>
                                    <span className="metric-details">
                                      Unit: {metric.unit} | Range: {metric.range.min}-{metric.range.max} | 
                                      {metric.direction === 'higher' ? ' Higher is better' : ' Lower is better'}
                                    </span>
                                    {metric.description && (
                                      <span className="metric-description">{metric.description}</span>
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {selected.length > 0 && (
                        <div className="selected-metrics">
                          <label>Selected Metrics:</label>
                          <div className="selected-metrics-list">
                            {selected.map((metric, idx) => (
                              <div key={idx} className="selected-metric-tag">
                                {metric.name} ({metric.unit})
                                {metric.isCustom && <span className="custom-badge">Custom</span>}
                              </div>
                            ))}
                          </div>
                          <div className="metric-values-section">
                            <label>Enter Values:</label>
                            {selected.map((metric, idx) => renderMetricInput(charId, subChar.id, metric, idx))}
                          </div>
                        </div>
                      )}

                      <div className="custom-metric-section">
                        {!showCustomForm[formKey] ? (
                          <button
                            className="btn-add-custom"
                            onClick={() => setShowCustomForm(prev => ({ ...prev, [formKey]: true }))}
                          >
                            + Add Custom Metric
                          </button>
                        ) : (
                          renderCustomMetricForm(charId, subChar.id)
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>

        <div className="step-navigation">
          <button className="btn-secondary" onClick={onPrevious}>Previous</button>
          <span className="step-counter">3/4</span>
          <button className="btn-primary" onClick={handleNext}>Next</button>
        </div>
      </div>
    );
  }

  return (
    <div className="step3-collect">
      <h2>Step 3: Collect - Enter Metric Values</h2>
      <p className="step-description">
        Users enter measurement values for each sub-characteristic. Different metric types (%, ms, score, count) are suggested with appropriate units and ranges.
      </p>

      <div className="metrics-section">
        {data?.selectedCharacteristics?.map(charId => {
          const charMetrics = metrics[charId];
          if (!charMetrics || Object.keys(charMetrics).length === 0) return null;

          return (
            <div key={charId} className="characteristic-metrics">
              <h3>{getCharacteristicName(charId)}</h3>
              {Object.keys(charMetrics).map(subCharId => {
                const metricOrArray = charMetrics[subCharId];
                const metricList = Array.isArray(metricOrArray) ? metricOrArray : [metricOrArray];
                
                return (
                  <div key={subCharId} className="sub-characteristic-metrics">
                    <h4>{getSubCharacteristicName(charId, subCharId)}</h4>
                    {metricList.map((metric, idx) => 
                      renderMetricInput(charId, subCharId, metric, idx)
                    )}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>

      <div className="step-navigation">
        <button className="btn-secondary" onClick={onPrevious}>Previous</button>
        <span className="step-counter">3/4</span>
        <button className="btn-primary" onClick={handleNext}>Next</button>
      </div>
    </div>
  );
};

export default Step3Collect;

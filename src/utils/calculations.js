/**
 * Normalize a metric value to 0-100 scale
 * @param {number} value - The actual metric value
 * @param {number} min - Minimum value in range
 * @param {number} max - Maximum value in range
 * @param {string} direction - 'higher' or 'lower' (is better)
 * @param {number} target - Target value (optional, for better normalization)
 * @returns {number} Normalized score (0-100)
 */
export const normalizeMetric = (value, min, max, direction, target = null) => {
  if (value < min) value = min;
  if (value > max) value = max;

  if (direction === 'higher') {
    // value closer to max = higher score
    if (target && target > 0) {
      // target as reference point
      const normalized = (value / target) * 100;
      return Math.min(100, Math.max(0, normalized));
    }
    return ((value - min) / (max - min)) * 100;
  } else {
    // lower is better
    if (target && target > 0) {
      const normalized = (target / value) * 100;
      return Math.min(100, Math.max(0, normalized));
    }
    return ((max - value) / (max - min)) * 100;
  }
};

/**
 * Calculate score for a sub-characteristic
 * @param {Object} metricValues - Object with metric IDs as keys and values
 * @param {Object} metricDefinitions - Metric definitions with ranges and directions
 * @returns {number} Average score for the sub-characteristic
 */
export const calculateSubCharacteristicScore = (metricValues, metricDefinitions) => {
  const scores = [];
  
  Object.keys(metricValues).forEach(metricId => {
    const value = metricValues[metricId];
    const definition = metricDefinitions[metricId];
    
    if (definition && value !== null && value !== undefined) {
      const score = normalizeMetric(
        value,
        definition.range.min,
        definition.range.max,
        definition.direction,
        definition.target
      );
      scores.push(score);
    }
  });

  if (scores.length === 0) return 0;
  return scores.reduce((sum, score) => sum + score, 0) / scores.length;
};

/**
 * Calculate score for a quality characteristic
 * @param {Object} subCharacteristicScores - Object with sub-characteristic IDs as keys and scores as values
 * @returns {number} Average score for the characteristic
 */
export const calculateCharacteristicScore = (subCharacteristicScores) => {
  const scores = Object.values(subCharacteristicScores).filter(s => s !== null && s !== undefined);
  if (scores.length === 0) return 0;
  return scores.reduce((sum, score) => sum + score, 0) / scores.length;
};

/**
 * Calculate overall weighted quality score
 * @param {Object} characteristicScores - Object with characteristic IDs as keys and scores as values
 * @param {Object} weights - Object with characteristic IDs as keys and weight percentages as values
 * @returns {number} Overall weighted score (0-100)
 */
export const calculateOverallScore = (characteristicScores, weights) => {
  let totalScore = 0;
  let totalWeight = 0;

  Object.keys(weights).forEach(charId => {
    const score = characteristicScores[charId] || 0;
    const weight = weights[charId] || 0;
    totalScore += (score * weight) / 100;
    totalWeight += weight;
  });

  // normalize
  if (totalWeight > 0 && totalWeight !== 100) {
    return (totalScore / totalWeight) * 100;
  }

  return totalScore;
};

/**
 * Interpret score level
 * @param {number} score - Score (0-100)
 * @returns {Object} Interpretation object with level and label
 */
export const interpretScore = (score) => {
  if (score >= 80) {
    return { level: 'strong', label: 'Very Good Quality', color: '#4CAF50' };
  } else if (score >= 60) {
    return { level: 'moderate', label: 'Good Quality', color: '#FF9800' };
  } else {
    return { level: 'weak', label: 'Needs Improvement', color: '#F44336' };
  }
};

/**
 * Calculate gap analysis
 * @param {Object} characteristicScores - Characteristic scores
 * @param {number} threshold - Threshold for weak areas (default: 60)
 * @returns {Array} Array of gaps with characteristic ID, score, and gap value
 */
export const calculateGaps = (characteristicScores, threshold = 60) => {
  const gaps = [];
  
  Object.keys(characteristicScores).forEach(charId => {
    const score = characteristicScores[charId] || 0;
    if (score < threshold) {
      gaps.push({
        characteristicId: charId,
        score: score,
        gap: threshold - score
      });
    }
  });

  return gaps.sort((a, b) => b.gap - a.gap);
};




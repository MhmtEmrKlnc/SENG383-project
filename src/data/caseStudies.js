// Predefined Case Studies
import { qualityCharacteristics } from './iso25010';

export const predefinedCaseStudies = {
  iotSystem: {
    id: 'iotSystem',
    name: 'IoT System',
    description: 'Internet of Things device with smart-standards and connectivity requirements. Measure design-centric with resource-constrained and connectivity requirements.',
    selectedCharacteristics: [
      qualityCharacteristics.performanceEfficiency.id,
      qualityCharacteristics.compatibility.id,
      qualityCharacteristics.reliability.id,
      qualityCharacteristics.security.id
    ],
    weights: {
      [qualityCharacteristics.performanceEfficiency.id]: 30,
      [qualityCharacteristics.compatibility.id]: 20,
      [qualityCharacteristics.reliability.id]: 20,
      [qualityCharacteristics.security.id]: 30
    },
    metrics: {
      [qualityCharacteristics.performanceEfficiency.id]: {
        [qualityCharacteristics.performanceEfficiency.subCharacteristics[0].id]: {
          name: 'Response time',
          unit: 'ms',
          range: { min: 0, max: 1000 },
          direction: 'lower', // lower is better
          target: 100,
          exampleValue: 1
        },
        [qualityCharacteristics.performanceEfficiency.subCharacteristics[1].id]: {
          name: 'CPU/Memory usage',
          unit: '%',
          range: { min: 0, max: 100 },
          direction: 'lower',
          target: 50,
          exampleValue: 80
        },
        [qualityCharacteristics.performanceEfficiency.subCharacteristics[2].id]: {
          name: 'Concurrent users',
          unit: 'users',
          range: { min: 0, max: 1000 },
          direction: 'higher',
          target: 1000,
          exampleValue: 800
        }
      },
      [qualityCharacteristics.reliability.id]: {
        [qualityCharacteristics.reliability.subCharacteristics[1].id]: {
          name: 'Uptime percentage',
          unit: '%',
          range: { min: 0, max: 100 },
          direction: 'higher',
          target: 99.9,
          exampleValue: 98
        },
        [qualityCharacteristics.reliability.subCharacteristics[3].id]: {
          name: 'Recovery time',
          unit: 'seconds',
          range: { min: 0, max: 100 },
          direction: 'lower',
          target: 10,
          exampleValue: 30
        }
      },
      [qualityCharacteristics.compatibility.id]: {
        [qualityCharacteristics.compatibility.subCharacteristics[1].id]: {
          name: 'Protocol compatibility',
          unit: 'score',
          range: { min: 0, max: 100 },
          direction: 'higher',
          target: 100,
          exampleValue: 85
        }
      },
      [qualityCharacteristics.security.id]: {
        [qualityCharacteristics.security.subCharacteristics[0].id]: {
          name: 'Encryption strength',
          unit: 'score',
          range: { min: 0, max: 100 },
          direction: 'higher',
          target: 100,
          exampleValue: 75
        },
        [qualityCharacteristics.security.subCharacteristics[1].id]: {
          name: 'Data integrity score',
          unit: 'score',
          range: { min: 0, max: 100 },
          direction: 'higher',
          target: 100,
          exampleValue: 68
        }
      }
    }
  },
  healthcare: {
    id: 'healthcare',
    name: 'Safety Critical (Health)',
    description: 'Healthcare system where reliability and accuracy are critical.',
    selectedCharacteristics: [
      qualityCharacteristics.functionalSuitability.id,
      qualityCharacteristics.reliability.id,
      qualityCharacteristics.security.id,
      qualityCharacteristics.usability.id,
      qualityCharacteristics.performanceEfficiency.id,
      qualityCharacteristics.maintainability.id
    ],
    weights: {
      [qualityCharacteristics.functionalSuitability.id]: 25,
      [qualityCharacteristics.reliability.id]: 25,
      [qualityCharacteristics.security.id]: 20,
      [qualityCharacteristics.usability.id]: 15,
      [qualityCharacteristics.performanceEfficiency.id]: 10,
      [qualityCharacteristics.maintainability.id]: 5
    }
  },
  mobileApp: {
    id: 'mobileApp',
    name: 'Mobile Application',
    description: 'A consumer-facing mobile app for quick, secure transactions.',
    selectedCharacteristics: [
      qualityCharacteristics.usability.id,
      qualityCharacteristics.performanceEfficiency.id,
      qualityCharacteristics.security.id,
      qualityCharacteristics.reliability.id,
      qualityCharacteristics.compatibility.id
    ],
    weights: {
      [qualityCharacteristics.usability.id]: 30,
      [qualityCharacteristics.performanceEfficiency.id]: 25,
      [qualityCharacteristics.security.id]: 25,
      [qualityCharacteristics.reliability.id]: 15,
      [qualityCharacteristics.compatibility.id]: 5
    }
  }
};

export const getCaseStudyById = (id) => {
  return predefinedCaseStudies[id];
};

export const getAllCaseStudies = () => {
  return Object.values(predefinedCaseStudies);
};




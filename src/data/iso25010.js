// ISO 25010 Quality Characteristics and Sub-characteristics
export const qualityCharacteristics = {
  functionalSuitability: {
    id: 'functionalSuitability',
    name: 'Functional Suitability',
    subCharacteristics: [
      { id: 'functionalCompleteness', name: 'Functional Completeness' },
      { id: 'functionalCorrectness', name: 'Functional Correctness' },
      { id: 'functionalAppropriateness', name: 'Functional Appropriateness' }
    ]
  },
  performanceEfficiency: {
    id: 'performanceEfficiency',
    name: 'Performance Efficiency',
    subCharacteristics: [
      { id: 'timeBehaviour', name: 'Time Behaviour' },
      { id: 'resourceUtilization', name: 'Resource Utilization' },
      { id: 'capacity', name: 'Capacity' }
    ]
  },
  compatibility: {
    id: 'compatibility',
    name: 'Compatibility',
    subCharacteristics: [
      { id: 'coexistence', name: 'Co-existence' },
      { id: 'interoperability', name: 'Interoperability' }
    ]
  },
  usability: {
    id: 'usability',
    name: 'Usability',
    subCharacteristics: [
      { id: 'appropriatenessRecognizability', name: 'Appropriateness Recognizability' },
      { id: 'learnability', name: 'Learnability' },
      { id: 'operability', name: 'Operability' },
      { id: 'userErrorProtection', name: 'User Error Protection' },
      { id: 'userInterfaceAesthetics', name: 'User Interface Aesthetics' },
      { id: 'accessibility', name: 'Accessibility' }
    ]
  },
  reliability: {
    id: 'reliability',
    name: 'Reliability',
    subCharacteristics: [
      { id: 'maturity', name: 'Maturity' },
      { id: 'availability', name: 'Availability' },
      { id: 'faultTolerance', name: 'Fault Tolerance' },
      { id: 'recoverability', name: 'Recoverability' }
    ]
  },
  security: {
    id: 'security',
    name: 'Security',
    subCharacteristics: [
      { id: 'confidentiality', name: 'Confidentiality' },
      { id: 'integrity', name: 'Integrity' },
      { id: 'nonRepudiation', name: 'Non-repudiation' },
      { id: 'accountability', name: 'Accountability' },
      { id: 'authenticity', name: 'Authenticity' }
    ]
  },
  maintainability: {
    id: 'maintainability',
    name: 'Maintainability',
    subCharacteristics: [
      { id: 'modularity', name: 'Modularity' },
      { id: 'reusability', name: 'Reusability' },
      { id: 'analysability', name: 'Analysability' },
      { id: 'modifiability', name: 'Modifiability' },
      { id: 'testability', name: 'Testability' }
    ]
  },
  portability: {
    id: 'portability',
    name: 'Portability',
    subCharacteristics: [
      { id: 'adaptability', name: 'Adaptability' },
      { id: 'installability', name: 'Installability' },
      { id: 'replaceability', name: 'Replaceability' }
    ]
  }
};

export const getAllCharacteristics = () => {
  return Object.values(qualityCharacteristics);
};

export const getCharacteristicById = (id) => {
  return qualityCharacteristics[id];
};




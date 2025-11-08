// Standard metrics defined in ISO/IEC 25023:2016

export const iso25023DefaultMetrics = {
  // Functional Suitability
  functionalCompleteness: {
    name: 'Functional Completeness',
    defaultMetrics: [
      {
        id: 'functionalCoverage',
        name: 'Functional Coverage (FCp-1-G)',
        unit: 'ratio',
        range: { min: 0, max: 1 },
        direction: 'higher',
        target: 1,
        description: 'What proportion of the specified functions has been implemented? (1 - A/B where A=missing, B=specified)'
      }
    ]
  },
  functionalCorrectness: {
    name: 'Functional Correctness',
    defaultMetrics: [
      {
        id: 'functionalCorrectness',
        name: 'Functional Correctness (FCr-1-G)',
        unit: 'ratio',
        range: { min: 0, max: 1 },
        direction: 'higher',
        target: 1,
        description: 'What proportion of functions provides the correct results? (1 - A/B where A=incorrect, B=considered)'
      }
    ]
  },
  functionalAppropriateness: {
    name: 'Functional Appropriateness',
    defaultMetrics: [
      {
        id: 'functionalAppropriatenessOfUsageObjective',
        name: 'Functional Appropriateness of Usage Objective (FAp-1-G)',
        unit: 'ratio',
        range: { min: 0, max: 1 },
        direction: 'higher',
        target: 1,
        description: 'What proportion of the functions required by the user provides appropriate outcome to achieve a specific usage objective?'
      },
      {
        id: 'functionalAppropriatenessOfSystem',
        name: 'Functional Appropriateness of System (FAp-2-G)',
        unit: 'ratio',
        range: { min: 0, max: 1 },
        direction: 'higher',
        target: 1,
        description: 'What proportion of the functions required by the users to achieve their objectives provides appropriate outcome?'
      }
    ]
  },

  // Performance Efficiency
  timeBehaviour: {
    name: 'Time Behaviour',
    defaultMetrics: [
      {
        id: 'meanResponseTime',
        name: 'Mean Response Time (PTb-1-G)',
        unit: 'ms',
        range: { min: 0, max: 10000 },
        direction: 'lower',
        target: 1000,
        description: 'How long is the mean time taken by the system to respond to a user task or system task?'
      },
      {
        id: 'responseTimeAdequacy',
        name: 'Response Time Adequacy (PTb-2-G)',
        unit: 'ratio',
        range: { min: 0, max: 10 },
        direction: 'lower',
        target: 1,
        description: 'How well does the system response time meet the specified target? (A/B where A=mean response time, B=target)'
      },
      {
        id: 'meanTurnaroundTime',
        name: 'Mean Turnaround Time (PTb-3-G)',
        unit: 'ms',
        range: { min: 0, max: 100000 },
        direction: 'lower',
        target: 5000,
        description: 'What is the mean time taken for completion of a job or an asynchronous process?'
      },
      {
        id: 'turnaroundTimeAdequacy',
        name: 'Turnaround Time Adequacy (PTb-4-G)',
        unit: 'ratio',
        range: { min: 0, max: 10 },
        direction: 'lower',
        target: 1,
        description: 'How well does the turnaround time meet the specified targets? (A/B where A=mean turnaround time, B=target)'
      },
      {
        id: 'meanThroughput',
        name: 'Mean Throughput (PTb-5-G)',
        unit: 'ops/sec',
        range: { min: 0, max: 10000 },
        direction: 'higher',
        target: 1000,
        description: 'What is the mean number of jobs completed per unit time?'
      }
    ]
  },
  resourceUtilization: {
    name: 'Resource Utilization',
    defaultMetrics: [
      {
        id: 'meanProcessorUtilization',
        name: 'Mean Processor Utilization (PRu-1-G)',
        unit: 'ratio',
        range: { min: 0, max: 1 },
        direction: 'lower',
        target: 0.7,
        description: 'How much processor time is used to execute a given set of tasks compared to the operation time?'
      },
      {
        id: 'meanMemoryUtilization',
        name: 'Mean Memory Utilization (PRu-2-G)',
        unit: 'ratio',
        range: { min: 0, max: 1 },
        direction: 'lower',
        target: 0.8,
        description: 'How much of memory is used to execute a given set of tasks compared to the available memory?'
      },
      {
        id: 'meanIODevicesUtilization',
        name: 'Mean I/O Devices Utilization (PRu-3-G)',
        unit: 'ratio',
        range: { min: 0, max: 1 },
        direction: 'lower',
        target: 0.7,
        description: 'How much of I/O device busy time is used to perform a given set of tasks compared to the I/O operation time?'
      },
      {
        id: 'bandwidthUtilization',
        name: 'Bandwidth Utilization (PRu-4-S)',
        unit: 'ratio',
        range: { min: 0, max: 1 },
        direction: 'lower',
        target: 0.8,
        description: 'What proportion of the available bandwidth is utilized to perform a given set of tasks?'
      }
    ]
  },
  capacity: {
    name: 'Capacity',
    defaultMetrics: [
      {
        id: 'transactionProcessingCapacity',
        name: 'Transaction Processing Capacity (PCa-1-G)',
        unit: 'transactions/sec',
        range: { min: 0, max: 100000 },
        direction: 'higher',
        target: 1000,
        description: 'How many transactions can be processed per unit time?'
      },
      {
        id: 'userAccessCapacity',
        name: 'User Access Capacity (PCa-2-G)',
        unit: 'users',
        range: { min: 0, max: 100000 },
        direction: 'higher',
        target: 10000,
        description: 'How many users can access the system simultaneously at a certain time?'
      },
      {
        id: 'userAccessIncreaseAdequacy',
        name: 'User Access Increase Adequacy (PCa-3-S)',
        unit: 'users/sec',
        range: { min: 0, max: 1000 },
        direction: 'higher',
        target: 100,
        description: 'How many users can be added successfully per unit time?'
      }
    ]
  },

  // Compatibility
  coexistence: {
    name: 'Co-existence',
    defaultMetrics: [
      {
        id: 'coexistenceWithOtherProducts',
        name: 'Co-existence with Other Products (CCo-1-G)',
        unit: 'ratio',
        range: { min: 0, max: 1 },
        direction: 'higher',
        target: 1,
        description: 'What proportion of specified software products can share the environment with this software product without adverse impact?'
      }
    ]
  },
  interoperability: {
    name: 'Interoperability',
    defaultMetrics: [
      {
        id: 'dataFormatsExchangeability',
        name: 'Data Formats Exchangeability (CIn-1-G)',
        unit: 'ratio',
        range: { min: 0, max: 1 },
        direction: 'higher',
        target: 1,
        description: 'What proportion of the specified data formats is exchangeable with other software or systems?'
      },
      {
        id: 'dataExchangeProtocolSufficiency',
        name: 'Data Exchange Protocol Sufficiency (Cln-2-G)',
        unit: 'ratio',
        range: { min: 0, max: 1 },
        direction: 'higher',
        target: 1,
        description: 'What proportion of the specified data exchange protocols is supported?'
      },
      {
        id: 'externalInterfaceAdequacy',
        name: 'External Interface Adequacy (CIn-3-S)',
        unit: 'ratio',
        range: { min: 0, max: 1 },
        direction: 'higher',
        target: 1,
        description: 'What proportion of the specified external interfaces (interfaces with other software and systems) is functional?'
      }
    ]
  },

  // Usability
  appropriatenessRecognizability: {
    name: 'Appropriateness Recognizability',
    defaultMetrics: [
      {
        id: 'descriptionCompleteness',
        name: 'Description Completeness (UAp-1-G)',
        unit: 'ratio',
        range: { min: 0, max: 1 },
        direction: 'higher',
        target: 1,
        description: 'What proportion of usage scenarios is described in the product description or user documents?'
      },
      {
        id: 'demonstrationCoverage',
        name: 'Demonstration Coverage (UAp-2-S)',
        unit: 'ratio',
        range: { min: 0, max: 1 },
        direction: 'higher',
        target: 0.8,
        description: 'What proportion of tasks has demonstration features for users to recognize the appropriateness?'
      },
      {
        id: 'entryPointSelfDescriptiveness',
        name: 'Entry Point Self-descriptiveness (UAp-3-S)',
        unit: 'ratio',
        range: { min: 0, max: 1 },
        direction: 'higher',
        target: 1,
        description: 'What proportion of the commonly used landing pages on a website explains the purpose of the website?'
      }
    ]
  },
  learnability: {
    name: 'Learnability',
    defaultMetrics: [
      {
        id: 'userGuidanceCompleteness',
        name: 'User Guidance Completeness (ULe-1-G)',
        unit: 'ratio',
        range: { min: 0, max: 1 },
        direction: 'higher',
        target: 1,
        description: 'What proportion of functions is explained in sufficient detail in user documentation and/or help facility?'
      },
      {
        id: 'entryFieldsDefaults',
        name: 'Entry Fields Defaults (ULe-2-S)',
        unit: 'ratio',
        range: { min: 0, max: 1 },
        direction: 'higher',
        target: 0.8,
        description: 'What proportion of entry fields that could have default values are automatically filled with default values?'
      },
      {
        id: 'errorMessagesUnderstandability',
        name: 'Error Messages Understandability (ULe-3-S)',
        unit: 'ratio',
        range: { min: 0, max: 1 },
        direction: 'higher',
        target: 1,
        description: 'What proportion of the error messages state the reason why the error occurred and how to resolve it?'
      },
      {
        id: 'selfExplanatoryUserInterface',
        name: 'Self-explanatory User Interface (ULe-4-S)',
        unit: 'ratio',
        range: { min: 0, max: 1 },
        direction: 'higher',
        target: 0.8,
        description: 'What proportion of information elements and steps presented to the user enable common tasks to be completed by a first-time user?'
      }
    ]
  },
  operability: {
    name: 'Operability',
    defaultMetrics: [
      {
        id: 'operationalConsistency',
        name: 'Operational Consistency (UOp-1-G)',
        unit: 'ratio',
        range: { min: 0, max: 1 },
        direction: 'higher',
        target: 1,
        description: 'To what extent do interactive tasks have a behaviour and appearance that is consistent both within the task and across similar tasks? (1 - A/B)'
      },
      {
        id: 'messageClarity',
        name: 'Message Clarity (UOp-2-G)',
        unit: 'ratio',
        range: { min: 0, max: 1 },
        direction: 'higher',
        target: 1,
        description: 'What proportion of messages from a system conveys the right outcome or instructions to the user?'
      },
      {
        id: 'functionalCustomizability',
        name: 'Functional Customizability (UOp-3-S)',
        unit: 'ratio',
        range: { min: 0, max: 1 },
        direction: 'higher',
        target: 0.7,
        description: 'What proportion of functions and operational procedures can a user customize for his convenience?'
      },
      {
        id: 'userInterfaceCustomizability',
        name: 'User Interface Customizability (UOp-4-S)',
        unit: 'ratio',
        range: { min: 0, max: 1 },
        direction: 'higher',
        target: 0.7,
        description: 'What proportion of user interface elements can be customized in appearance?'
      },
      {
        id: 'monitoringCapability',
        name: 'Monitoring Capability (UOp-5-S)',
        unit: 'ratio',
        range: { min: 0, max: 1 },
        direction: 'higher',
        target: 0.8,
        description: 'What proportion of function states can be monitored during operation?'
      },
      {
        id: 'undoCapability',
        name: 'Undo Capability (UOp-6-S)',
        unit: 'ratio',
        range: { min: 0, max: 1 },
        direction: 'higher',
        target: 0.9,
        description: 'What proportion of tasks that has a significant consequence provides an option for re-confirmation or undo capability?'
      },
      {
        id: 'understandableCategorizationOfInformation',
        name: 'Understandable Categorization of Information (UOp-7-S)',
        unit: 'ratio',
        range: { min: 0, max: 1 },
        direction: 'higher',
        target: 0.8,
        description: 'To what extent does the software organize information in categories that are familiar to the intended users?'
      },
      {
        id: 'appearanceConsistency',
        name: 'Appearance Consistency (UOp-8-S)',
        unit: 'ratio',
        range: { min: 0, max: 1 },
        direction: 'higher',
        target: 1,
        description: 'What proportion of user interfaces with similar items has a similar appearance? (1 - A/B)'
      },
      {
        id: 'inputDeviceSupport',
        name: 'Input Device Support (UOp-9-S)',
        unit: 'ratio',
        range: { min: 0, max: 1 },
        direction: 'higher',
        target: 0.8,
        description: 'To what extent can tasks be initiated by all appropriate input modalities (such as keyboard, mouse or voice)?'
      }
    ]
  },
  userErrorProtection: {
    name: 'User Error Protection',
    defaultMetrics: [
      {
        id: 'avoidanceOfUserOperationError',
        name: 'Avoidance of User Operation Error (UEp-1-G)',
        unit: 'ratio',
        range: { min: 0, max: 1 },
        direction: 'higher',
        target: 1,
        description: 'What portion of user actions and inputs are protected against causing any system malfunction?'
      },
      {
        id: 'userEntryErrorCorrection',
        name: 'User Entry Error Correction (UEp-2-S)',
        unit: 'ratio',
        range: { min: 0, max: 1 },
        direction: 'higher',
        target: 0.8,
        description: 'To what extent does the system provide a suggested correct value for detected user entry errors?'
      },
      {
        id: 'userErrorRecoverability',
        name: 'User Error Recoverability (UEp-3-S)',
        unit: 'ratio',
        range: { min: 0, max: 1 },
        direction: 'higher',
        target: 0.9,
        description: 'What proportion of user errors can be corrected or recovered by the system?'
      }
    ]
  },
  userInterfaceAesthetics: {
    name: 'User Interface Aesthetics',
    defaultMetrics: [
      {
        id: 'appearanceAestheticsOfUserInterfaces',
        name: 'Appearance Aesthetics of User Interfaces (UIn-1-S)',
        unit: 'ratio',
        range: { min: 0, max: 1 },
        direction: 'higher',
        target: 0.8,
        description: 'To what extent are user interfaces and the overall design aesthetically pleasing in appearance?'
      }
    ]
  },
  accessibility: {
    name: 'Accessibility',
    defaultMetrics: [
      {
        id: 'accessibilityForUsersWithDisabilities',
        name: 'Accessibility for Users with Disabilities (UAc-1-G)',
        unit: 'ratio',
        range: { min: 0, max: 1 },
        direction: 'higher',
        target: 0.9,
        description: 'To what extent can potential users with specific disabilities successfully use the system?'
      },
      {
        id: 'supportedLanguagesAdequacy',
        name: 'Supported Languages Adequacy (UAc-2-S)',
        unit: 'ratio',
        range: { min: 0, max: 1 },
        direction: 'higher',
        target: 1,
        description: 'What proportion of needed languages is supported?'
      }
    ]
  },

  // Reliability
  maturity: {
    name: 'Maturity',
    defaultMetrics: [
      {
        id: 'faultCorrection',
        name: 'Fault Correction (RMa-1-G)',
        unit: 'ratio',
        range: { min: 0, max: 1 },
        direction: 'higher',
        target: 1,
        description: 'What proportion of detected reliability-related faults has been corrected?'
      },
      {
        id: 'meanTimeBetweenFailure',
        name: 'Mean Time Between Failure - MTBF (RMa-2-G)',
        unit: 'hours',
        range: { min: 0, max: 100000 },
        direction: 'higher',
        target: 720,
        description: 'What is the MTBF during the system/software operation?'
      },
      {
        id: 'failureRate',
        name: 'Failure Rate (RMa-3-G)',
        unit: 'failures/hour',
        range: { min: 0, max: 100 },
        direction: 'lower',
        target: 0.001,
        description: 'What is the average number of failures during a defined period?'
      },
      {
        id: 'testCoverage',
        name: 'Test Coverage (RMa-4-S)',
        unit: 'ratio',
        range: { min: 0, max: 1 },
        direction: 'higher',
        target: 0.8,
        description: 'What percentage of the system or software capabilities, operational scenarios or functions that are included in their associated test suites are actually performed?'
      }
    ]
  },
  availability: {
    name: 'Availability',
    defaultMetrics: [
      {
        id: 'systemAvailability',
        name: 'System Availability (RAv-1-G)',
        unit: 'ratio',
        range: { min: 0, max: 1 },
        direction: 'higher',
        target: 0.999,
        description: 'For what proportion of the scheduled system operational time is the system actually available?'
      },
      {
        id: 'meanDownTime',
        name: 'Mean Down Time (RAv-2-G)',
        unit: 'minutes',
        range: { min: 0, max: 1440 },
        direction: 'lower',
        target: 30,
        description: 'How long does the system stay unavailable when a failure occurs?'
      }
    ]
  },
  faultTolerance: {
    name: 'Fault Tolerance',
    defaultMetrics: [
      {
        id: 'failureAvoidance',
        name: 'Failure Avoidance (RFt-1-G)',
        unit: 'ratio',
        range: { min: 0, max: 1 },
        direction: 'higher',
        target: 0.9,
        description: 'What proportion of fault patterns has been brought under control to avoid critical and serious failures?'
      },
      {
        id: 'redundancyOfComponents',
        name: 'Redundancy of Components (RFt-2-S)',
        unit: 'ratio',
        range: { min: 0, max: 1 },
        direction: 'higher',
        target: 0.8,
        description: 'What proportion of system components is installed redundantly to avoid system failure?'
      },
      {
        id: 'meanFaultNotificationTime',
        name: 'Mean Fault Notification Time (RFt-3-S)',
        unit: 'seconds',
        range: { min: 0, max: 3600 },
        direction: 'lower',
        target: 60,
        description: 'How quickly does the system report the occurrence of faults?'
      }
    ]
  },
  recoverability: {
    name: 'Recoverability',
    defaultMetrics: [
      {
        id: 'meanRecoveryTime',
        name: 'Mean Recovery Time (RRe-1-G)',
        unit: 'minutes',
        range: { min: 0, max: 1440 },
        direction: 'lower',
        target: 30,
        description: 'How long does it take for the software/system to recover from failure?'
      },
      {
        id: 'backupDataCompleteness',
        name: 'Backup Data Completeness (RRe-2-S)',
        unit: 'ratio',
        range: { min: 0, max: 1 },
        direction: 'higher',
        target: 1,
        description: 'What proportion of data items is backed up regularly?'
      }
    ]
  },

  // Security
  confidentiality: {
    name: 'Confidentiality',
    defaultMetrics: [
      {
        id: 'accessControllability',
        name: 'Access Controllability (SCo-1-G)',
        unit: 'ratio',
        range: { min: 0, max: 1 },
        direction: 'higher',
        target: 1,
        description: 'What proportion of confidential data items are protected from unauthorized accesses? (1 - A/B)'
      },
      {
        id: 'dataEncryptionCorrectness',
        name: 'Data Encryption Correctness (SCo-2-G)',
        unit: 'ratio',
        range: { min: 0, max: 1 },
        direction: 'higher',
        target: 1,
        description: 'How correctly is the encryption/decryption of data items implemented as stated in the requirement specification?'
      },
      {
        id: 'strengthOfCryptographicAlgorithms',
        name: 'Strength of Cryptographic Algorithms (SCo-3-S)',
        unit: 'ratio',
        range: { min: 0, max: 1 },
        direction: 'higher',
        target: 1,
        description: 'What proportion of cryptographic algorithms has been well-vetted? (1 - A/B)'
      }
    ]
  },
  integrity: {
    name: 'Integrity',
    defaultMetrics: [
      {
        id: 'dataIntegrity',
        name: 'Data Integrity (SIn-1-G)',
        unit: 'ratio',
        range: { min: 0, max: 1 },
        direction: 'higher',
        target: 1,
        description: 'To what extent is the data corruption or modification by unauthorized access prevented? (1 - A/B)'
      },
      {
        id: 'internalDataCorruptionPrevention',
        name: 'Internal Data Corruption Prevention (SIn-2-G)',
        unit: 'ratio',
        range: { min: 0, max: 1 },
        direction: 'higher',
        target: 1,
        description: 'To what extent are the available prevention methods for data corruption implemented?'
      },
      {
        id: 'bufferOverflowPrevention',
        name: 'Buffer Overflow Prevention (SIn-3-S)',
        unit: 'ratio',
        range: { min: 0, max: 1 },
        direction: 'higher',
        target: 1,
        description: 'What portion of memory accesses with user input in software modules has been done bounds checking for preventing buffer overflow?'
      }
    ]
  },
  nonRepudiation: {
    name: 'Non-repudiation',
    defaultMetrics: [
      {
        id: 'digitalSignatureUsage',
        name: 'Digital Signature Usage (SNo-1-G)',
        unit: 'ratio',
        range: { min: 0, max: 1 },
        direction: 'higher',
        target: 1,
        description: 'What proportion of events requiring non-repudiation is processed using digital signature?'
      }
    ]
  },
  accountability: {
    name: 'Accountability',
    defaultMetrics: [
      {
        id: 'userAuditTrailCompleteness',
        name: 'User Audit Trail Completeness (SAc-1-G)',
        unit: 'ratio',
        range: { min: 0, max: 1 },
        direction: 'higher',
        target: 1,
        description: 'How complete is the audit trail concerning the user access to the system or data?'
      },
      {
        id: 'systemLogRetention',
        name: 'System Log Retention (SAc-2-S)',
        unit: 'ratio',
        range: { min: 0, max: 2 },
        direction: 'higher',
        target: 1,
        description: 'For what percent of the required retention period is the system log retained in stable storage?'
      }
    ]
  },
  authenticity: {
    name: 'Authenticity',
    defaultMetrics: [
      {
        id: 'authenticationMechanismSufficiency',
        name: 'Authentication Mechanism Sufficiency (SAu-1-G)',
        unit: 'ratio',
        range: { min: 0, max: 1 },
        direction: 'higher',
        target: 1,
        description: 'How well does the system authenticate the identity of a subject?'
      },
      {
        id: 'authenticationRulesConformity',
        name: 'Authentication Rules Conformity (SAu-2-S)',
        unit: 'ratio',
        range: { min: 0, max: 1 },
        direction: 'higher',
        target: 1,
        description: 'What proportion of the required authentication rules is established?'
      }
    ]
  },

  // Maintainability
  modularity: {
    name: 'Modularity',
    defaultMetrics: [
      {
        id: 'couplingOfComponents',
        name: 'Coupling of Components (MMo-1-G)',
        unit: 'ratio',
        range: { min: 0, max: 1 },
        direction: 'higher',
        target: 0.8,
        description: 'How strongly are the components independent and how many components are free from impacts from changes to other components?'
      },
      {
        id: 'cyclomaticComplexityAdequacy',
        name: 'Cyclomatic Complexity Adequacy (MMo-2-S)',
        unit: 'ratio',
        range: { min: 0, max: 1 },
        direction: 'higher',
        target: 0.8,
        description: 'How many software modules have acceptable cyclomatic complexity? (1 - A/B)'
      }
    ]
  },
  reusability: {
    name: 'Reusability',
    defaultMetrics: [
      {
        id: 'reusabilityOfAssets',
        name: 'Reusability of Assets (MRe-1-G)',
        unit: 'ratio',
        range: { min: 0, max: 1 },
        direction: 'higher',
        target: 0.7,
        description: 'How many assets in a system can be reusable?'
      },
      {
        id: 'codingRulesConformity',
        name: 'Coding Rules Conformity (MRe-2-S)',
        unit: 'ratio',
        range: { min: 0, max: 1 },
        direction: 'higher',
        target: 0.9,
        description: 'How many modules conform to required coding rules?'
      }
    ]
  },
  analysability: {
    name: 'Analysability',
    defaultMetrics: [
      {
        id: 'systemLogCompleteness',
        name: 'System Log Completeness (MAn-1-G)',
        unit: 'ratio',
        range: { min: 0, max: 1 },
        direction: 'higher',
        target: 1,
        description: 'To what extent does the system record its operations in logs so that they are to be traceable?'
      },
      {
        id: 'diagnosisFunctionEffectiveness',
        name: 'Diagnosis Function Effectiveness (MAn-2-S)',
        unit: 'ratio',
        range: { min: 0, max: 1 },
        direction: 'higher',
        target: 0.8,
        description: 'What proportion of the diagnosis functions meets the requirements of causal analysis?'
      },
      {
        id: 'diagnosisFunctionSufficiency',
        name: 'Diagnosis Function Sufficiency (MAn-3-S)',
        unit: 'ratio',
        range: { min: 0, max: 1 },
        direction: 'higher',
        target: 1,
        description: 'What proportion of the required diagnosis functions has been implemented?'
      }
    ]
  },
  modifiability: {
    name: 'Modifiability',
    defaultMetrics: [
      {
        id: 'modificationEfficiency',
        name: 'Modification Efficiency (MMd-1-G)',
        unit: 'ratio',
        range: { min: 0, max: 5 },
        direction: 'lower',
        target: 1,
        description: 'How efficiently are the modifications made compared to the expected time? (A/B where A=actual time, B=expected time)'
      },
      {
        id: 'modificationCorrectness',
        name: 'Modification Correctness (MMd-2-G)',
        unit: 'ratio',
        range: { min: 0, max: 1 },
        direction: 'higher',
        target: 0.95,
        description: 'What proportion of modifications has been implemented correctly? (1 - A/B where A=modifications causing incidents)'
      },
      {
        id: 'modificationCapability',
        name: 'Modification Capability (MMd-3-S)',
        unit: 'ratio',
        range: { min: 0, max: 1 },
        direction: 'higher',
        target: 1,
        description: 'To what extent are the required modifications made within a specified duration?'
      }
    ]
  },
  testability: {
    name: 'Testability',
    defaultMetrics: [
      {
        id: 'testFunctionCompleteness',
        name: 'Test Function Completeness (MTe-1-G)',
        unit: 'ratio',
        range: { min: 0, max: 1 },
        direction: 'higher',
        target: 1,
        description: 'How completely are test functions and facilities implemented?'
      },
      {
        id: 'autonomousTestability',
        name: 'Autonomous Testability (MTe-2-S)',
        unit: 'ratio',
        range: { min: 0, max: 1 },
        direction: 'higher',
        target: 0.8,
        description: 'How independently can the software be tested?'
      },
      {
        id: 'testRestartability',
        name: 'Test Restartability (MTe-3-S)',
        unit: 'ratio',
        range: { min: 0, max: 1 },
        direction: 'higher',
        target: 0.9,
        description: 'How easily can the operation test be carried out from the restart point after maintenance?'
      }
    ]
  },

  // Portability
  adaptability: {
    name: 'Adaptability',
    defaultMetrics: [
      {
        id: 'hardwareEnvironmentalAdaptability',
        name: 'Hardware Environmental Adaptability (PAd-1-G)',
        unit: 'ratio',
        range: { min: 0, max: 1 },
        direction: 'higher',
        target: 0.9,
        description: 'Is software or system capable enough to adapt itself to different hardware environment? (1 - A/B)'
      },
      {
        id: 'systemSoftwareEnvironmentalAdaptability',
        name: 'System Software Environmental Adaptability (PAd-2-G)',
        unit: 'ratio',
        range: { min: 0, max: 1 },
        direction: 'higher',
        target: 0.9,
        description: 'Is software or system capable enough to adapt itself to different system software environment? (1 - A/B)'
      },
      {
        id: 'operationalEnvironmentAdaptability',
        name: 'Operational Environment Adaptability (PAd-3-S)',
        unit: 'ratio',
        range: { min: 0, max: 1 },
        direction: 'higher',
        target: 0.8,
        description: 'Is software or system capable enough to adapt itself to different operational environment? (1 - A/B)'
      }
    ]
  },
  installability: {
    name: 'Installability',
    defaultMetrics: [
      {
        id: 'installationTimeEfficiency',
        name: 'Installation Time Efficiency (PIn-1-G)',
        unit: 'ratio',
        range: { min: 0, max: 5 },
        direction: 'lower',
        target: 1,
        description: 'How efficient is the actual installation time compared to expected time? (A/B where A=actual, B=expected)'
      },
      {
        id: 'easeOfInstallation',
        name: 'Ease of Installation (PIn-2-G)',
        unit: 'ratio',
        range: { min: 0, max: 1 },
        direction: 'higher',
        target: 0.9,
        description: 'Can users or maintainers customize the installation procedure for their convenience?'
      }
    ]
  },
  replaceability: {
    name: 'Replaceability',
    defaultMetrics: [
      {
        id: 'usageSimilarity',
        name: 'Usage Similarity (PRe-1-G)',
        unit: 'ratio',
        range: { min: 0, max: 1 },
        direction: 'higher',
        target: 0.8,
        description: 'What proportion of user functions of the replaced product can be performed without any additional learning or workaround?'
      },
      {
        id: 'productQualityEquivalence',
        name: 'Product Quality Equivalence (PRe-2-S)',
        unit: 'ratio',
        range: { min: 0, max: 1 },
        direction: 'higher',
        target: 0.9,
        description: 'What proportion of the quality measures is satisfied after replacing previous software product by this one?'
      },
      {
        id: 'functionalInclusiveness',
        name: 'Functional Inclusiveness (PRe-3-S)',
        unit: 'ratio',
        range: { min: 0, max: 1 },
        direction: 'higher',
        target: 0.9,
        description: 'Can the similar functions easily be used after replacing previous software product by this one?'
      },
      {
        id: 'dataReusabilityImportCapability',
        name: 'Data Reusability/Import Capability (PRe-4-S)',
        unit: 'ratio',
        range: { min: 0, max: 1 },
        direction: 'higher',
        target: 1,
        description: 'Can the same data be used after replacing previous software product by this one?'
      }
    ]
  }
};

export const getDefaultMetricsForSubCharacteristic = (subCharId) => {
  return iso25023DefaultMetrics[subCharId]?.defaultMetrics || [];
};

export const createMetricsForCustomScenario = (selectedCharacteristics, qualityCharacteristics) => {
  const metrics = {};
  
  selectedCharacteristics.forEach(charId => {
    const char = qualityCharacteristics[charId];
    if (!char) return;
    
    metrics[charId] = {};
    
    char.subCharacteristics.forEach(subChar => {
      const defaultMetrics = getDefaultMetricsForSubCharacteristic(subChar.id);
      if (defaultMetrics.length > 0) {
        metrics[charId][subChar.id] = {
          ...defaultMetrics[0],
          id: undefined,
          description: undefined
        };
      }
    });
  });
  
  return metrics;
};


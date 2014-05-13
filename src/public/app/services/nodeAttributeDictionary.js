angular.module('apolloApp').factory('nodeAttributeDictionary', function() {
    return {
        'Organization': {
            'attributeGroups': {
                'General Information': {
                    'heading': 'General Information',
                    'sortIndex': 0,
                    'attributes': {
                        'fullName': {
                            'sortIndex': 0,
                            'description': 'Full name of Organziation'
                        },
                        'shortName': {
                            'sortIndex': 1,
                            'description': 'Abbreviation of Organization'
                        },
                        'cdcEntity': {
                            'sortIndex': 2,
                            'description': 'Is organziation a part of CDC'
                        },
                        'fullNameDivision': {
                            'sortIndex': 3,
                            'description': 'Full name of Division (if applies)'
                        },
                        'shortNameDivision': {
                            'sortIndex': 4,
                            'description': 'Short name of Division (if applies)'
                        },
                        'mission': {
                            'sortIndex': 5,
                            'description': 'Describes the purpose / mission of Organization'
                        },
                        'missionLastUpdatedDate': {
                            'sortIndex': 6,
                            'description': ''
                        }
                    }
                },
                'Contact Information': {
                    'heading': 'Contact Information',
                    'sortIndex': 1,
                    'attributes': {
                        'locationCity': {
                            'contactName': 0,
                            'description': 'City location of Center, Institute or Office'
                        },
                        'locationState': {
                            'sortIndex': 1,
                            'description': 'State location of Center, Institute or Office'
                        },
                        'contactName': {
                            'sortIndex': 2,
                            'description': ''
                        },
                        'phoneContact': {
                            'sortIndex': 3,
                            'description': ''
                        },
                        'emailContact': {
                            'sortIndex': 4,
                            'description': ''
                        }
                    }
                }
            }
        },
        'Program': {
            'attributeGroups': {
                'General Information': {
                    'heading': 'General Information',
                    'sortIndex': 0,
                    'attributes': {
                        'fullName': {
                            'sortIndex': 0,
                            'description': ''
                        },
                        'shortName': {
                            'sortIndex': 1,
                            'description': ''
                        },
                        'purpose': {
                            'sortIndex': 2,
                            'description': 'Description of the entity - including a bit of, for example, it\'s history'
                        },
                        'webResource': {
                            'sortIndex': 3,
                            'description': 'Where a user can find out more information about this resource'
                        },
                        'operationalStatus': {
                            'sortIndex': 4,
                            'description': ''
                        },
                        'startDate': {
                            'sortIndex': 4,
                            'description': 'What is the first year your Activity became operational?'
                        },
                        'surveillanceType': {
                            'sortIndex': 4,
                            'description': ''
                        },
                        'geographicCoverageArea': {
                            'sortIndex': 4,
                            'description': ''
                        },
                        'surveillanceDomain': {
                            'sortIndex': 4,
                            'description': 'This is really getting at what area is this system focusing on (e.g., Asthma, HIV, Diphtheria, Plutonium exposure, etc)'
                        },
                        'conditionsUnderSurveillance': {
                            'sortIndex': 4,
                            'description': 'Specific term, e.g., Silicosis'
                        },
                        'patientTrackingCapability': {
                            'sortIndex': 4,
                            'description': 'Can system track patient-level data to support an authorized public health investigation?'
                        },
                        'overallCapability': {
                            'sortIndex': 4,
                            'description': 'Which of the following capabilities are available through the electronic component of this Activity?'
                        }
                    }
                },
                'Data-Related Information': {
                    'heading': 'Data-Related Information',
                    'sortIndex': 1,
                    'attributes': {
                        'startDateGeneration': {
                            'sortIndex': 4,
                            'description': 'What is the first year data are available or collected from your Activity?'
                        },
                        'ageFormat': {
                            'sortIndex': 4,
                            'description': 'How is age collected?'
                        },
                        'specialPopulations': {
                            'sortIndex': 4,
                            'description': 'Does your system focus on a particular population/cohort?  Select all that apply.'
                        }
                    }
                },
                'Technical Information': {
                    'heading': 'Technical Information',
                    'sortIndex': 2,
                    'attributes': {
                        'appilicationSoultionType': {
                            'sortIndex': 4,
                            'description': ''
                        },
                        'applicationPlatform': {
                            'sortIndex': 4,
                            'description': ''
                        },
                        'operatingSystemPlatform': {
                            'sortIndex': 4,
                            'description': ''
                        },
                        'databaseTechnology': {
                            'sortIndex': 4,
                            'description': ''
                        },
                        'dataPayloadFormat': {
                            'sortIndex': 4,
                            'description': ''
                        },
                        'dataPayloadTransmissionType': {
                            'sortIndex': 4,
                            'description': 'Please note that any specific transmission method should be able to be tagged "send to recipient" and/or "receive from provider"'
                        }
                    }
                },
                'Other Information': {
                    'heading': 'Other Information',
                    'sortIndex': 3,
                    'attributes': {
                        'evaluationDate': {
                            'sortIndex': 0,
                            'description': 'If available, please provide the date of your activity\'s most recent formal evaluation'
                        },
                        'evaluationDetails': {
                            'sortIndex': 1,
                            'description': 'If evaluation was done, what categories/areas of the resource were examined?  Select all that apply.'
                        },
                        'fundingSource': {
                            'sortIndex': 2,
                            'description': 'If evaluation was done, what categories/areas of the resource were examined?  Select all that apply.'
                        },
                        'fundingLevels': {
                            'sortIndex': 3,
                            'description': ''
                        },
                        'nationalBiosurveillanceStrategyMapping': {
                            'sortIndex': 4,
                            'description': ''
                        }
                    }
                }
            }
        },
        'SurveillanceSystem': {
            'attributeGroups': {
                'General Information': {
                    'heading': 'General Information',
                    'sortIndex': 0,
                    'attributes': {
                        'fullName': {
                            'sortIndex': 0,
                            'description': ''
                        },
                        'shortName': {
                            'sortIndex': 1,
                            'description': ''
                        },
                        'purpose': {
                            'sortIndex': 2,
                            'description': 'Description of the entity - including a bit of, for example, it\'s history'
                        },
                        'webResource': {
                            'sortIndex': 3,
                            'description': 'Where a user can find out more information about this resource'
                        },
                        'operationalStatus': {
                            'sortIndex': 4,
                            'description': ''
                        },
                        'startDate': {
                            'sortIndex': 4,
                            'description': 'What is the first year your Activity became operational?'
                        },
                        'startDateGeneration': {
                            'sortIndex': 4,
                            'description': 'What is the first year data are available in your Activity?'
                        },
                        'surveillanceType': {
                            'sortIndex': 4,
                            'description': ''
                        },
                        'geographicCoverageArea': {
                            'sortIndex': 4,
                            'description': ''
                        },
                        'surveillanceDomain': {
                            'sortIndex': 4,
                            'description': 'This is really getting at what area is this system focusing on (e.g., Asthma, HIV, Diphtheria, Plutonium exposure, etc)'
                        },
                        'conditionsUnderSurveillance': {
                            'sortIndex': 4,
                            'description': 'Specific term, e.g., Silicosis'
                        },
                        'patientTrackingCapability': {
                            'sortIndex': 4,
                            'description': 'Can system track patient-level data to support an authorized public health investigation?'
                        },
                        'overallCapability': {
                            'sortIndex': 4,
                            'description': 'Which of the following capabilities are available through the electronic component of this Activity?'
                        }
                    }
                },
                'Data-Related Information': {
                    'heading': 'Data-Related Information',
                    'sortIndex': 0,
                    'attributes': {                        
                        'ageFormat': {
                            'sortIndex': 4,
                            'description': 'How is age collected?'
                        },
                        'specialPopulations': {
                            'sortIndex': 4,
                            'description': 'Does your system focus on a particular population/cohort?  Select all that apply.'
                        }
                    }
                },
                'Technical Information': {
                    'heading': 'Technical Information',
                    'sortIndex': 0,
                    'attributes': {                        
                        'appilicationSoultionType': {
                            'sortIndex': 4,
                            'description': ''
                        },
                        'applicationPlatform': {
                            'sortIndex': 4,
                            'description': ''
                        },
                        'operatingSystemPlatform': {
                            'sortIndex': 4,
                            'description': ''
                        },
                        'databaseTechnology': {
                            'sortIndex': 4,
                            'description': ''
                        },
                        'dataPayloadFormat': {
                            'sortIndex': 4,
                            'description': ''
                        },
                        'dataPayloadTransmissionType': {
                            'sortIndex': 4,
                            'description': 'Please note that any specific transmission method should be able to be tagged "send to recipient" and/or "receive from provider"'
                        },
                        'reportFrequency': {
                            'sortIndex': 4,
                            'description': 'What is the frequency of report dissemination for analyzed data?'
                        }
                    }
                },
                'Contact Information': {
                    'heading': 'Contact Information',
                    'sortIndex': 0,
                    'attributes': {                        
                        'city': {
                            'sortIndex': 0,
                            'description': ''
                        },
                        'state': {
                            'sortIndex': 1,
                            'description': ''
                        },
                        'contactName': {
                            'sortIndex': 2,
                            'description': ''
                        },
                        'contactEmail': {
                            'sortIndex': 3,
                            'description': ''
                        },
                        'contactPhone': {
                            'sortIndex': 4,
                            'description': ''
                        },
                        'Notes': {
                            'sortIndex': 4,
                            'description': ''
                        }
                    }
                },
                'Other Information': {
                    'heading': 'Other Information',
                    'sortIndex': 0,
                    'attributes': {                        
                        'evaluationDate': {
                            'sortIndex': 0,
                            'description': 'If available, please provide the date of your activity\'s most recent formal evaluation'
                        },
                        'evaluationDetails': {
                            'sortIndex': 1,
                            'description': 'If evaluation was done, what categories/areas of the resource were examined?  Select all that apply.'
                        },
                        'fundingSource': {
                            'sortIndex': 2,
                            'description': 'If evaluation was done, what categories/areas of the resource were examined?  Select all that apply.'
                        },
                        'fundingLevels': {
                            'sortIndex': 3,
                            'description': ''
                        },
                        'nationalBiosurveillanceStrategyMapping': {
                            'sortIndex': 4,
                            'description': ''
                        }
                    }
                }
            }
        },
        'Tool': {
            'attributeGroups': {
                'General Information': {
                    'heading': 'General Information',
                    'sortIndex': 0,
                    'attributes': {
                        'fullName': {
                            'sortIndex': 0,
                            'description': ''
                        },
                        'shortName': {
                            'sortIndex': 1,
                            'description': ''
                        },
                        'purpose': {
                            'sortIndex': 2,
                            'description': 'Description of the entity - including a bit of, for example, it\'s history'
                        },
                        'webResource': {
                            'sortIndex': 3,
                            'description': 'Where a user can find out more information about this resource'
                        },
                        'operationalStatus': {
                            'sortIndex': 4,
                            'description': ''
                        },
                        'startDate': {
                            'sortIndex': 4,
                            'description': 'What is the first year your Activity became operational?'
                        },
                        'startDateGeneration': {
                            'sortIndex': 4,
                            'description': 'What is the first year data are available in your Activity?'
                        },
                        'surveillanceType': {
                            'sortIndex': 4,
                            'description': ''
                        },
                        'geographicCoverageArea': {
                            'sortIndex': 4,
                            'description': ''
                        },
                        'surveillanceDomain': {
                            'sortIndex': 4,
                            'description': 'This is really getting at what area is this system focusing on (e.g., Asthma, HIV, Diphtheria, Plutonium exposure, etc)'
                        },
                        'conditionsUnderSurveillance': {
                            'sortIndex': 4,
                            'description': 'Specific term, e.g., Silicosis'
                        },
                        'patientTrackingCapability': {
                            'sortIndex': 4,
                            'description': 'Can system track patient-level data to support an authorized public health investigation?'
                        },
                        'overallCapability': {
                            'sortIndex': 4,
                            'description': 'Which of the following capabilities are available through the electronic component of this Activity?'
                        },
                        'reportFrequency': {
                            'sortIndex': 4,
                            'description': 'What is the frequency of report dissemination for analyzed data?'
                        }
                    }
                },
                'Data-Related Information': {
                    'heading': 'Data-Related Information',
                    'sortIndex': 0,
                    'attributes': {                        
                        'ageFormat': {
                            'sortIndex': 4,
                            'description': 'How is age collected?'
                        },
                        'specialPopulations': {
                            'sortIndex': 4,
                            'description': 'Does your system focus on a particular population/cohort?  Select all that apply.'
                        },
                        'dataPayloadFormat': {
                            'sortIndex': 4,
                            'description': ''
                        },
                        'dataPayloadTransmissionType': {
                            'sortIndex': 4,
                            'description': 'Please note that any specific transmission method should be able to be tagged "send to recipient" and/or "receive from provider"'
                        }
                    }
                },
                'Technical Information': {
                    'heading': 'Technical Information',
                    'sortIndex': 0,
                    'attributes': {                        
                        'appilicationSoultionType': {
                            'sortIndex': 4,
                            'description': ''
                        },
                        'applicationPlatform': {
                            'sortIndex': 4,
                            'description': ''
                        },
                        'operatingSystemPlatform': {
                            'sortIndex': 4,
                            'description': ''
                        },
                        'databaseTechnology': {
                            'sortIndex': 4,
                            'description': ''
                        }
                    }
                },
                'Contact Information': {
                    'heading': 'Contact Information',
                    'sortIndex': 0,
                    'attributes': {                        
                        'city': {
                            'sortIndex': 0,
                            'description': ''
                        },
                        'state': {
                            'sortIndex': 1,
                            'description': ''
                        },
                        'contactName': {
                            'sortIndex': 2,
                            'description': ''
                        },
                        'contactEmail': {
                            'sortIndex': 3,
                            'description': ''
                        },
                        'contactPhone': {
                            'sortIndex': 4,
                            'description': ''
                        },
                        'Notes': {
                            'sortIndex': 4,
                            'description': ''
                        }
                    }
                },
                'Other Information': {
                    'heading': 'Other Information',
                    'sortIndex': 0,
                    'attributes': {                        
                        'evaluationDate': {
                            'sortIndex': 0,
                            'description': 'If available, please provide the date of your activity\'s most recent formal evaluation'
                        },
                        'evaluationDetails': {
                            'sortIndex': 1,
                            'description': 'If evaluation was done, what categories/areas of the resource were examined?  Select all that apply.'
                        },
                        'fundingSource': {
                            'sortIndex': 2,
                            'description': 'If evaluation was done, what categories/areas of the resource were examined?  Select all that apply.'
                        },
                        'fundingLevels': {
                            'sortIndex': 3,
                            'description': ''
                        },
                        'nationalBiosurveillanceStrategyMapping': {
                            'sortIndex': 4,
                            'description': ''
                        }
                    }
                }
            }
        },
        'Registry': {
            'attributeGroups': {
                'General Information': {
                    'heading': 'General Information',
                    'sortIndex': 0,
                    'attributes': {
                        'fullName': {
                            'sortIndex': 0,
                            'description': ''
                        },
                        'shortName': {
                            'sortIndex': 1,
                            'description': ''
                        },
                        'registryType': {
                            'sortIndex': 1,
                            'description': 'Surveillance or Research'
                        },
                        'purpose': {
                            'sortIndex': 2,
                            'description': 'Description of the entity - including a bit of, for example, it\'s history'
                        },
                        'webResource': {
                            'sortIndex': 3,
                            'description': 'Where a user can find out more information about this resource'
                        },
                        'operationalStatus': {
                            'sortIndex': 4,
                            'description': ''
                        },
                        'startDate': {
                            'sortIndex': 4,
                            'description': 'What is the first year your Activity became operational?'
                        },
                        'startDateGeneration': {
                            'sortIndex': 4,
                            'description': 'What is the first year data are available in your Activity?'
                        },
                        'surveillanceType': {
                            'sortIndex': 4,
                            'description': ''
                        },
                        'surveillanceDomain': {
                            'sortIndex': 4,
                            'description': 'This is really getting at what area is this system focusing on (e.g., Asthma, HIV, Diphtheria, Plutonium exposure, etc)'
                        },
                        'conditionsUnderSurveillance': {
                            'sortIndex': 4,
                            'description': 'Specific term, e.g., Silicosis'
                        },
                        'geographicCoverageArea': {
                            'sortIndex': 4,
                            'description': ''
                        },
                        'patientTrackingCapability': {
                            'sortIndex': 4,
                            'description': 'Can system track patient-level data to support an authorized public health investigation?'
                        },
                        'overallCapability': {
                            'sortIndex': 4,
                            'description': 'Which of the following capabilities are available through the electronic component of this Activity?'
                        },
                        'reportFrequency': {
                            'sortIndex': 4,
                            'description': 'What is the frequency of report dissemination for analyzed data?'
                        }
                    }
                },
                'Data-Related Information': {
                    'heading': 'Data-Related Information',
                    'sortIndex': 0,
                    'attributes': {                        
                        'ageFormat': {
                            'sortIndex': 4,
                            'description': 'How is age collected?'
                        },
                        'specialPopulations': {
                            'sortIndex': 4,
                            'description': 'Does your system focus on a particular population/cohort?  Select all that apply.'
                        },
                        'dataPayloadFormat': {
                            'sortIndex': 4,
                            'description': ''
                        },
                        'dataPayloadTransmissionType': {
                            'sortIndex': 4,
                            'description': 'Please note that any specific transmission method should be able to be tagged "send to recipient" and/or "receive from provider"'
                        }
                    }
                },
                'Technical Information': {
                    'heading': 'Technical Information',
                    'sortIndex': 0,
                    'attributes': {                        
                        'appilicationSoultionType': {
                            'sortIndex': 4,
                            'description': ''
                        },
                        'applicationPlatform': {
                            'sortIndex': 4,
                            'description': ''
                        },
                        'operatingSystemPlatform': {
                            'sortIndex': 4,
                            'description': ''
                        },
                        'databaseTechnology': {
                            'sortIndex': 4,
                            'description': ''
                        }
                    }
                },
                'Contact Information': {
                    'heading': 'Contact Information',
                    'sortIndex': 0,
                    'attributes': {                        
                        'city': {
                            'sortIndex': 0,
                            'description': ''
                        },
                        'state': {
                            'sortIndex': 1,
                            'description': ''
                        },
                        'contactName': {
                            'sortIndex': 2,
                            'description': ''
                        },
                        'contactEmail': {
                            'sortIndex': 3,
                            'description': ''
                        },
                        'contactPhone': {
                            'sortIndex': 4,
                            'description': ''
                        },
                        'Notes': {
                            'sortIndex': 4,
                            'description': ''
                        }
                    }
                },
                'Other Information': {
                    'heading': 'Other Information',
                    'sortIndex': 0,
                    'attributes': {                        
                        'evaluationDate': {
                            'sortIndex': 0,
                            'description': 'If available, please provide the date of your activity\'s most recent formal evaluation'
                        },
                        'evaluationDetails': {
                            'sortIndex': 1,
                            'description': 'If evaluation was done, what categories/areas of the resource were examined?  Select all that apply.'
                        },
                        'fundingSource': {
                            'sortIndex': 2,
                            'description': 'If evaluation was done, what categories/areas of the resource were examined?  Select all that apply.'
                        },
                        'fundingLevels': {
                            'sortIndex': 3,
                            'description': ''
                        },
                        'nationalBiosurveillanceStrategyMapping': {
                            'sortIndex': 4,
                            'description': ''
                        }
                    }
                }
            }
        },
        'HealthSurvey': {
            'attributeGroups': {
                'General Information': {
                    'heading': 'General Information',
                    'sortIndex': 0,
                    'attributes': {
                        'fullName': {
                            'sortIndex': 0,
                            'description': ''
                        },
                        'shortName': {
                            'sortIndex': 1,
                            'description': ''
                        },
                        'purpose': {
                            'sortIndex': 2,
                            'description': 'Description of the entity - including a bit of, for example, it\'s history'
                        },
                        'webResource': {
                            'sortIndex': 3,
                            'description': 'Where a user can find out more information about this resource'
                        },
                        'operationalStatus': {
                            'sortIndex': 4,
                            'description': ''
                        },
                        'startDate': {
                            'sortIndex': 4,
                            'description': 'What is the first year your Activity became operational?'
                        },
                        'startDateGeneration': {
                            'sortIndex': 4,
                            'description': 'What is the first year data are available in your Activity?'
                        },
                        'surveillanceType': {
                            'sortIndex': 4,
                            'description': ''
                        },
                        'surveillanceDomain': {
                            'sortIndex': 4,
                            'description': 'This is really getting at what area is this system focusing on (e.g., Asthma, HIV, Diphtheria, Plutonium exposure, etc)'
                        },
                        'conditionsUnderSurveillance': {
                            'sortIndex': 4,
                            'description': 'Specific term, e.g., Silicosis'
                        },
                        'geographicCoverageArea': {
                            'sortIndex': 4,
                            'description': ''
                        },
                        'patientTrackingCapability': {
                            'sortIndex': 4,
                            'description': 'Can system track patient-level data to support an authorized public health investigation?'
                        },
                        'overallCapability': {
                            'sortIndex': 4,
                            'description': 'Which of the following capabilities are available through the electronic component of this Activity?'
                        },
                        'reportFrequency': {
                            'sortIndex': 4,
                            'description': 'What is the frequency of report dissemination for analyzed data?'
                        }
                    }
                },
                'Data-Related Information': {
                    'heading': 'Data-Related Information',
                    'sortIndex': 0,
                    'attributes': {                        
                        'ageFormat': {
                            'sortIndex': 4,
                            'description': 'How is age collected?'
                        },
                        'specialPopulations': {
                            'sortIndex': 4,
                            'description': 'Does your system focus on a particular population/cohort?  Select all that apply.'
                        },
                        'dataPayloadFormat': {
                            'sortIndex': 4,
                            'description': ''
                        },
                        'dataPayloadTransmissionType': {
                            'sortIndex': 4,
                            'description': 'Please note that any specific transmission method should be able to be tagged "send to recipient" and/or "receive from provider"'
                        }
                    }
                },
                'Technical Information': {
                    'heading': 'Technical Information',
                    'sortIndex': 0,
                    'attributes': {                        
                        'appilicationSoultionType': {
                            'sortIndex': 4,
                            'description': ''
                        },
                        'applicationPlatform': {
                            'sortIndex': 4,
                            'description': ''
                        },
                        'operatingSystemPlatform': {
                            'sortIndex': 4,
                            'description': ''
                        },
                        'databaseTechnology': {
                            'sortIndex': 4,
                            'description': ''
                        }
                    }
                },
                'Contact Information': {
                    'heading': 'Contact Information',
                    'sortIndex': 0,
                    'attributes': {                        
                        'city': {
                            'sortIndex': 0,
                            'description': ''
                        },
                        'state': {
                            'sortIndex': 1,
                            'description': ''
                        },
                        'contactName': {
                            'sortIndex': 2,
                            'description': ''
                        },
                        'contactEmail': {
                            'sortIndex': 3,
                            'description': ''
                        },
                        'contactPhone': {
                            'sortIndex': 4,
                            'description': ''
                        },
                        'Notes': {
                            'sortIndex': 4,
                            'description': ''
                        }
                    }
                },
                'Other Information': {
                    'heading': 'Other Information',
                    'sortIndex': 0,
                    'attributes': {                        
                        'evaluationDate': {
                            'sortIndex': 0,
                            'description': 'If available, please provide the date of your activity\'s most recent formal evaluation'
                        },
                        'evaluationDetails': {
                            'sortIndex': 1,
                            'description': 'If evaluation was done, what categories/areas of the resource were examined?  Select all that apply.'
                        },
                        'fundingSource': {
                            'sortIndex': 2,
                            'description': 'If evaluation was done, what categories/areas of the resource were examined?  Select all that apply.'
                        },
                        'fundingLevels': {
                            'sortIndex': 3,
                            'description': ''
                        },
                        'nationalBiosurveillanceStrategyMapping': {
                            'sortIndex': 4,
                            'description': ''
                        }
                    }
                }
            }
        },
        'Collaborative': {
            'attributeGroups': {
                'General Information': {
                    'heading': 'General Information',
                    'sortIndex': 0,
                    'attributes': {
                        'fullName': {
                            'sortIndex': 0,
                            'description': ''
                        },
                        'shortName': {
                            'sortIndex': 1,
                            'description': ''
                        },
                        'purpose': {
                            'sortIndex': 2,
                            'description': 'Description of the entity - including a bit of, for example, it\'s history'
                        },
                        'webResource': {
                            'sortIndex': 3,
                            'description': 'Where a user can find out more information about this resource'
                        },
                        'operationalStatus': {
                            'sortIndex': 4,
                            'description': ''
                        },
                        'operationStartDate': {
                            'sortIndex': 4,
                            'description': ''
                        },
                        'collaborativeParticipants': {
                            'sortIndex': 4,
                            'description': ''
                        },
                        'surveillanceDomain': {
                            'sortIndex': 4,
                            'description': ''
                        },
                        'conditionsUnderSurveillance': {
                            'sortIndex': 4,
                            'description': 'Specific term, e.g., Silicosis'
                        },
                        'geographicCoverageArea': {
                            'sortIndex': 4,
                            'description': ''
                        }
                    }
                },
                'Data-Related Information': {
                    'heading': 'Data-Related Information',
                    'sortIndex': 0,
                    'attributes': {
                        'dataProvidersManual': {
                            'sortIndex': 4,
                            'description': ''
                        },
                        'dataProvidersElectronic': {
                            'sortIndex': 4,
                            'description': ''
                        },
                        'dataRecipientsManual': {
                            'sortIndex': 4,
                            'description': ''
                        },
                        'dataRecipientsElectronic': {
                            'sortIndex': 4,
                            'description': ''
                        }
                    }
                },
                'Contact Information': {
                    'heading': 'Contact Information',
                    'sortIndex': 0,
                    'attributes': {                                                
                        'contactName': {
                            'sortIndex': 2,
                            'description': ''
                        },
                        'contactEmail': {
                            'sortIndex': 3,
                            'description': ''
                        }
                    }
                }
            }
        },
        'DataSet': {
            'attributeGroups': {
                'General Information': {
                    'heading': 'General Information',
                    'sortIndex': 0,
                    'attributes': {
                        'fullName': {
                            'sortIndex': 0,
                            'description': ''
                        },
                        'shortName': {
                            'sortIndex': 1,
                            'description': ''
                        },
                        'description': {
                            'sortIndex': 2,
                            'description': 'Description of the entity - including a bit of, for example, it\'s history'
                        },
                        'startDate': {
                            'sortIndex': 3,
                            'description': ''
                        },
                        'endDate': {
                            'sortIndex': 4,
                            'description': ''
                        },
                        'dataUpdateFrequency': {
                            'sortIndex': 4,
                            'description': ''
                        },
                        'currentlyAvailable': {
                            'sortIndex': 4,
                            'description': ''
                        },
                        'data.govLink': {
                            'sortIndex': 4,
                            'description': ''
                        },
                        'fileName': {
                            'sortIndex': 4,
                            'description': ''
                        },
                        'fileLocation': {
                            'sortIndex': 4,
                            'description': ''
                        }
                    }
                },
                'Data-Related Information': {
                    'heading': 'Data-Related Information',
                    'sortIndex': 0,
                    'attributes': {
                        'dataCategoryTypes': {
                            'sortIndex': 4,
                            'description': ''
                        },
                        'dataFormat': {
                            'sortIndex': 4,
                            'description': ''
                        }
                    }
                },
                'Contact Information': {
                    'heading': 'Contact Information',
                    'sortIndex': 0,
                    'attributes': {                                                
                        'nameContact': {
                            'sortIndex': 2,
                            'description': ''
                        },
                        'emailContact': {
                            'sortIndex': 3,
                            'description': ''
                        },
                        'phoneContact': {
                            'sortIndex': 3,
                            'description': ''
                        }
                    }
                }
            }
        },
        'DataStandard': {
            'attributeGroups': {
                'General Information': {
                    'heading': 'General Information',
                    'sortIndex': 0,
                    'attributes': {
                        'terminologyShortName': {
                            'sortIndex': 0,
                            'description': ''
                        },
                        'terminologyFullName': {
                            'sortIndex': 1,
                            'description': ''
                        },
                        'description': {
                            'sortIndex': 2,
                            'description': ''
                        },
                        'terminoloyID': {
                            'sortIndex': 3,
                            'description': ''
                        },
                        'terminologyVersionNumber': {
                            'sortIndex': 4,
                            'description': ''
                        },
                        'licenseType': {
                            'sortIndex': 4,
                            'description': ''
                        },
                        'referenceURL': {
                            'sortIndex': 4,
                            'description': ''
                        },
                        'notes': {
                            'sortIndex': 4,
                            'description': ''
                        }
                    }
                }
            }
        },
        'Tag': {
            'attributeGroups': {
                'General Information': {
                    'heading': 'General Information',
                    'sortIndex': 0,
                    'attributes': {
                        'tagRelationship': {
                            'sortIndex': 0,
                            'description': ''
                        }
                    }
                }
            }
        }
    };
});
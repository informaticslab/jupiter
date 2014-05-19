angular.module('apolloApp').factory('nodeAttributeDictionary', function() {
    return {
        'Organization': {
            'attributeGroups': {
                'Summary': {
                    'heading': 'Summary',
                    'attributes': {
                        'id': {
                            'description': 'Identifier',
                            'displayLabel': 'ID'
                        },
                        'mission': {
                            'description': 'Describes the overall purpose / mission of Organization',
                            'displayLabel': 'Mission'
                        }
                    }
                },
                'General Information': {
                    'heading': 'General Information',
                    'attributes': {
                        'lastUpdated': {
                            'description': 'Date of last update to information in this system',
                            'displayLabel': 'Last Updated'
                        },
                        'missionLastUpdatedDate': {
                            'description': 'When was the mission last updated?',
                            'displayLabel': 'Mission - Date last updated'
                        },
                        'informationValidated': {
                            'description': 'Has the information in this system been validated by an appropriate program / team?',
                            'displayLabel': 'Information Validated by Program'
                        },
                        'cdcEntity': {
                            'description': 'Is this organization a part of CDC',
                            'displayLabel': 'CDC Entity'
                        },
                        'fullName': {
                            'description': 'Full name of Organization, Center, Institute or Office',
                            'displayLabel': 'Full Name'
                        },
                        'shortName': {
                            'description': 'Abbreviation or Acronym of the Organization (e.g., CDC).',
                            'displayLabel': 'Short Name'
                        },
                        'fullNameDivision': {
                            'description': 'Full name of the Division (if applies)',
                            'displayLabel': 'Full Name'
                        },
                        'shortNameDivision': {
                            'description': 'Abbreviation or Acronym of the Division (if applies)',
                            'displayLabel': 'Short Name'
                        },
                        'locationCity': {
                            'description': 'City location of Organization, Center, Institute or Office',
                            'displayLabel': 'Location - City'
                        },
                        'locationState': {
                            'description': 'State location of Organization, Center, Institute or Office',
                            'displayLabel': 'Location - State'
                        }
                    }
                },
                'Contact Information': {
                    'heading': 'Contact Information',
                    'attributes': {
                        'contactName': {
                            'description': 'Person who is the best to contact for more information',
                            'displayLabel': 'Point of Contact'
                        },
                        'phoneContact': {
                            'description': 'Phone number',
                            'displayLabel': 'Phone'
                        },
                        'emailContact': {
                            'description': 'Email address',
                            'displayLabel': 'email'
                        }
                    }
                }
            }
        },
        'Program': {
            'attributeGroups': {
                'General Information': {
                    'heading': 'General Information',
                    'attributes': {
                        'lastUpdated': {
                            'description': 'Date of last update to information in this program.',
                            'displayLabel': 'Last Updated'
                        },
                        'informationValidated': {
                            'description': 'Has the information in this program been validated by an appropriate program / team?',
                            'displayLabel': 'Information Validated by Program'
                        },
                        'fullName': {
                            'description': 'Full name of the Program',
                            'displayLabel': 'Full Name'
                        },
                        'shortName': {
                            'description': 'Abbreviation or Acronym of the Program',
                            'displayLabel': 'Short Name / Acronym'
                        },
                        'purpose': {
                            'description': 'Provide an overview of the purpose of the program',
                            'displayLabel': 'Purpose / Summary'
                        },
                        'webResource': {
                            'description': 'Where can someone find out more information about this resource on the web?',
                            'displayLabel': 'Web Resource'
                        },
                        'operationalStatus': {
                            'description': 'What is the current operational status of the program? Is it planned for future development? Is it under development, but not yet operational? Is it partially operational and implemented?  Is it fully operational and Implemented?  Is it retired?',
                            'displayLabel': 'Operational Status'
                        },
                        'startDate': {
                            'description': 'What was the first year the program became operational?',
                            'displayLabel': 'Start Date'
                        },
                        'surveillanceType': {
                            'description': 'What type of surveillance is done by the program (e.g., sentinel surveillance, case-based surveillance, individual or summary, etc.,)?',
                            'displayLabel': 'Surveillance Type'
                        },
                        'surveillanceDomain': {
                            'description': 'What general area (e.g., human, animal, food, etc.) as well as specific area (e.g., Asthma, HIV, Diphtheria, Plutonium exposure, etc.) does the program focus on?',
                            'displayLabel': 'Surveillance Domain'
                        },
                        'conditionsUnderSurveillance': {
                            'description': 'What specific diseases, conditions, or other public health issues are being addressed by the program?',
                            'displayLabel': 'Conditions under Surveillance'
                        },
                        'geographicCoverageArea': {
                            'description': 'What geographic areas are covered by the program?',
                            'displayLabel': 'Geographic Coverage Area'
                        },
                        'overallCapability': {
                            'description': 'If the program has an electronic component, what are its capabilities?  (e.g., can it recieve data, send data, analyze data, generate reports, send alerts, etc.).',
                            'displayLabel': 'Overall Capability'
                        },
                        'specialPopulations': {
                            'description': 'Does the program focus on a particular population/cohort? (e.g., children, elderly, adolescents, disability, pregnant, etc.).',
                            'displayLabel': 'Special Populations'
                        },
                        'avrCapability': {
                            'description': 'If the program has analysis, visualization, and reporting (AVR) capability, what are its specific capabilities (e.g., chart generation, map generation, ad-hoc reports, etc.).',
                            'displayLabel': 'Analysis, Visualization, and Reporting (AVR) capability'
                        },
                        'reportFrequency': {
                            'description': 'If it applies, what is the frequency of report dissemination for analyzed data? Who are the reports for? (e.g., CDC, general public, etc.,).',
                            'displayLabel': 'Report Frequency'
                        },
                        'city': {
                            'description': 'City location of Organization, Center, Institute or Office',
                            'displayLabel': 'Location - City'
                        },
                        'state': {
                            'description': 'State location of Organization, Center, Institute or Office',
                            'displayLabel': 'Location - State'
                        }
                    }
                },
                'Technical Information': {
                    'heading': 'Technical Information',
                    'attributes': {
                        'applicationSolutionType': {
                            'description': 'Is the program based on a commercial off-the-shelf (COTS) solution or is it custom built?',
                            'displayLabel': 'Application Solution Type'
                        },
                        'applicationPlatform': {
                            'description': 'What platform, if any, is used for the program (e.g., web, mobile, desktop application, paper-based, etc.)?',
                            'displayLabel': 'Application Platform'
                        },
                        'operatingSystemPlatform': {
                            'description': 'If it applies, what operating system(s) is used for the program (e.g., Linux, Mac OS, Microsoft Windows, etc.)?',
                            'displayLabel': 'Platform - Operating System'
                        },
                        'databaseTechnology': {
                            'description': 'If it applies, what database platform(s) is used for the program (e.g., Oracle, Microsoft SQL Server, Microsoft Access, etc.)?',
                            'displayLabel': 'Database Technology'
                        }
                    }
                },
                'Data-Related Information': {
                    'heading': 'Data-Related Information',
                    'attributes': {
                        'startDateGeneration': {
                            'description': 'What was the first year data became available or were collected from the program?',
                            'displayLabel': 'Start Data Collection / Generation'
                        },
                        'dataProviders-Manual': {
                            'description': 'The manually-provided sources of data for this program (e.g., postal mail, phone).',
                            'displayLabel': 'Data Providers - Manual'
                        },
                        'dataProviders-Electronic': {
                            'description': 'The electronically-provided sources of data for this program (e.g., web-based, FTP, electronic messaging).',
                            'displayLabel': 'Data Providers - Electronic'
                        },
                        'dataRecipients-Manual': {
                            'description': 'The manually-provided recipients of data for this program (e.g., postal mail, phone).',
                            'displayLabel': 'Data Recipients - Manual'
                        },
                        'dataRecipients-Electronic': {
                            'description': 'The electronically-provided recipients of data for this program (e.g., web-based, FTP, electronic messaging).',
                            'displayLabel': 'Data Recipients - Electronic'
                        },
                        'patientTrackingCapability': {
                            'description': 'Can the program track patient-level data to support an authorized public health investigation?',
                            'displayLabel': 'Patient Tracking Capability'
                        },
                        'ageFormat': {
                            'description': 'If it is collected, how is age collected in this program?  (e.g., year cohorts, complete or partial birth date).',
                            'displayLabel': 'Age Format'
                        },
                        'dataPayloadFormat': {
                            'description': 'If information is transmitted electronically in the program, how is it structured/organized? (e.g., HL7 v3, HL7 v2.X, CDA, ebXML, JSON, SOAP, etc.)',
                            'displayLabel': 'Data Payload Format'
                        },
                        'dataPayloadTransmissionType': {
                            'description': 'If information is transmitted as part of the program, how is it carried out? (e.g., postal mail, email, FTP, web services, eFax, EDI, etc.)',
                            'displayLabel': 'Data Payload Transmission Type'
                        }
                    }
                },
                'Contact Information': {
                    'heading': 'Contact Information',
                    'attributes': {
                        'contactName': {
                            'description': 'Person who is the best to contact for more information',
                            'displayLabel': 'Contact Name'
                        },
                        'contactEmail': {
                            'description': 'email address',
                            'displayLabel': 'Contact Email'
                        },
                        'contactPhone': {
                            'description': 'Phone number',
                            'displayLabel': 'Contact Phone'
                        }
                    }
                },
                'Other Information': {
                    'heading': 'Other Information',
                    'attributes': {
                        'evaluationDate': {
                            'description': 'If available, please provide the date of the program\'s most recent formal evaluation.',
                            'displayLabel': ' Evaluation Date'
                        },
                        'evaluationDetails': {
                            'description': 'If an evaluation was performed, what categories/areas of the program were examined? (e.g., flexibility, data quality, timeliness, stability, etc.,).',
                            'displayLabel': 'Evaluation Details'
                        },
                        'fundingSource': {
                            'description': 'Does the program compete internally to CDC for funding?  Does the program receive funds specifically appropriated by Congress?',
                            'displayLabel': 'Funding Source'
                        },
                        'fundingLevels': {
                            'description': 'Provide funding levels (in development).',
                            'displayLabel': 'Funding Levels'
                        },
                        'nationalBiosurveillanceStrategyMapping': {
                            'description': 'Does the program map to one or more of the priorities described in the National Biosurveillance Strategy for Human Health? (e.g., Biosurveillance Workforce of the future, etc.)',
                            'displayLabel': 'National Biosurveillance Strategy Mapping'
                        },
                        'Notes': {
                            'description': 'Please add any relevant information that may be of use.',
                            'displayLabel': 'Notes / Other information'
                        }
                    }
                }
            }
        },
        'SurveillanceSystem': {
            'attributeGroups': {
                'General Information': {
                    'heading': 'General Information',
                    'attributes': {
                        'lastUpdated': {
                            'description': 'Date of last update to information in this surveillance system.',
                            'displayLabel': 'Last Updated'
                        },
                        'informationValidated': {
                            'description': 'Has the information in this surveillance system been validated by an appropriate program / team?',
                            'displayLabel': 'Information Validated by Program'
                        },
                        'fullName': {
                            'description': 'Full name of the surveillance system',
                            'displayLabel': 'Full Name'
                        },
                        'shortName': {
                            'description': 'Abbreviation or Acronym of the surveillance system',
                            'displayLabel': 'Short Name / Acronym'
                        },
                        'purpose': {
                            'description': 'Provide an overview of the purpose of the surveillance system',
                            'displayLabel': 'Purpose / Summary'
                        },
                        'webResource': {
                            'description': 'Where can someone find out more information about this surveillance system on the web?',
                            'displayLabel': 'Web Resource'
                        },
                        'operationalStatus': {
                            'description': 'What is the current operational status of the surveillance system? (e.g., Is it planned for future development? Is it under development, but not yet operational? Is it partially operational and implemented?  Is it fully operational and Implemented?  Is it retired?)',
                            'displayLabel': 'Operational Status'
                        },
                        'startDate': {
                            'description': 'What was the first year the surveillance system became operational?',
                            'displayLabel': 'Start Date'
                        },
                        'surveillanceType': {
                            'description': 'What type of surveillance is done by the surveillance system (e.g., sentinel surveillance, case-based surveillance, individual or summary, etc.,)?',
                            'displayLabel': 'Surveillance Type'
                        },
                        'surveillanceDomain': {
                            'description': 'What general area (e.g., human, animal, food, etc.) as well as specific area (e.g., Asthma, HIV, Diphtheria, Plutonium exposure, etc.) does the surveillance system focus on?',
                            'displayLabel': 'Surveillance Domain'
                        },
                        'conditionsUnderSurveillance': {
                            'description': 'What specific diseases, conditions, or other public health issues are being addressed by the surveillance system?',
                            'displayLabel': 'Conditions under Surveillance'
                        },
                        'geographicCoverageArea': {
                            'description': 'What geographic areas are covered by the surveillance system?',
                            'displayLabel': 'Geographic Coverage Area'
                        },
                        'overallCapability': {
                            'description': 'If the surveillance system has an electronic component, what are its capabilities?  (e.g., can it receive data, send data, analyze data, generate reports, send alerts, etc.).',
                            'displayLabel': 'Overall Capability'
                        },
                        'specialPopulations': {
                            'description': 'Does the surveillance system focus on a particular population/cohort? (e.g., children, elderly, adolescents, disability, pregnant, etc.).',
                            'displayLabel': 'Special Populations'
                        },
                        'avrCapability': {
                            'description': 'If the surveillance system has analysis, visualization, and reporting (AVR) capability, what are its specific capabilities (e.g., chart generation, map generation, ad-hoc reports, etc.).',
                            'displayLabel': 'Analysis, Visualization, and Reporting (AVR) capability'
                        },
                        'reportFrequency': {
                            'description': 'If it applies, what is the frequency of report dissemination for analyzed data? Who are the reports for? (e.g., CDC, general public, etc.,).',
                            'displayLabel': 'Report Frequency'
                        },
                        'city': {
                            'description': 'City location of Organization, Center, Institute or Office',
                            'displayLabel': 'Location - City'
                        },
                        'state': {
                            'description': 'State location of Organization, Center, Institute or Office',
                            'displayLabel': 'Location - State'
                        }
                    }
                },
                'Technical Information': {
                    'heading': 'Technical Information',
                    'attributes': {
                        'applicationSolutionType': {
                            'description': 'Is the surveillance system based on a commercial off-the-shelf (COTS) solution or is it custom built?',
                            'displayLabel': 'Application Solution Type'
                        },
                        'applicationPlatform': {
                            'description': 'What platform, if any, is used for the surveillance system (e.g., web, mobile, desktop application, paper-based, etc.)?',
                            'displayLabel': 'Application Platform'
                        },
                        'operatingSystemPlatform': {
                            'description': 'If it applies, what operating system(s) is used for the surveillance system (e.g., Linux, Mac OS, Microsoft Windows, etc.)?',
                            'displayLabel': 'Platform - Operating System'
                        },
                        'databaseTechnology': {
                            'description': 'If it applies, what database platform(s) is used in the surveillance system (e.g., Oracle, Microsoft SQL Server, Microsoft Access, etc.)?',
                            'displayLabel': 'Database Technology'
                        }
                    }
                },
                'Data-Related Information': {
                    'heading': 'Data-Related Information',
                    'attributes': {
                        'startDateGeneration': {
                            'description': 'What was the first year data became available or were collected from the surveillance system?',
                            'displayLabel': 'Start Data Generation'
                        },
                        'dataProviders-Manual': {
                            'description': 'The manually-provided sources of data for this surveillance system (e.g., postal mail, phone).',
                            'displayLabel': 'Data Providers - Manual'
                        },
                        'dataProviders-Electronic': {
                            'description': 'The electronically-provided sources of data for this surveillance system (e.g., web-based, FTP, electronic messaging).',
                            'displayLabel': 'Data Providers - Electronic'
                        },
                        'dataRecipients-Manual': {
                            'description': 'The manually-provided recipients of data for this surveillance system (e.g., postal mail, phone).',
                            'displayLabel': 'Data Recipients - Manual'
                        },
                        'dataRecipients-Electronic': {
                            'description': 'The electronically-provided recipients of data for this surveillance system (e.g., web-based, FTP, electronic messaging).',
                            'displayLabel': 'Data Recipients - Electronic'
                        },
                        'patientTrackingCapability': {
                            'description': 'Can the surveillance system track patient-level data to support an authorized public health investigation?',
                            'displayLabel': 'Patient Tracking Capability'
                        },
                        'ageFormat': {
                            'description': 'If it is collected, how is age collected in this surveillance system?  (e.g., year cohorts, complete or partial birth date).',
                            'displayLabel': 'Age Format'
                        },
                        'dataPayloadFormat': {
                            'description': 'If information is transmitted electronically in the surveillance system, how is it structured/organized? (e.g., HL7 v3, HL7 v2.X, CDA, ebXML, JSON, SOAP, etc.)',
                            'displayLabel': 'Data Payload Format'
                        },
                        'dataPayloadTransmissionType': {
                            'description': 'If information is transmitted as part of the surveillance system, how is it carried out? (e.g., postal mail, email, FTP, web services, eFax, EDI, etc.)',
                            'displayLabel': 'Data Payload Transmission Type'
                        }
                    }
                },
                'Contact Information': {
                    'heading': 'Contact Information',
                    'attributes': {
                        'contactName': {
                            'description': 'Person who is the best to contact for more information',
                            'displayLabel': 'Contact Name'
                        },
                        'contactEmail': {
                            'description': 'email address',
                            'displayLabel': 'Contact Email'
                        },
                        'contactPhone': {
                            'description': 'Phone number',
                            'displayLabel': 'Contact Phone'
                        }
                    }
                },
                'Other Information': {
                    'heading': 'Other Information',
                    'attributes': {
                        'evaluationDate': {
                            'description': 'If available, please provide the date of the surveillance system\'s most recent formal evaluation.',
                            'displayLabel': ' Evaluation Date'
                        },
                        'evaluationDetails': {
                            'description': 'If an evaluation was performed, what categories/areas of the surveillance system were examined? (e.g., flexibility, data quality, timeliness, stability, etc.,).',
                            'displayLabel': 'Evaluation Details'
                        },
                        'fundingSource': {
                            'description': 'Does the surveillance system compete internally to CDC for funding?  Does the program receive funds specifically appropriated by Congress?',
                            'displayLabel': 'Funding Source'
                        },
                        'fundingLevels': {
                            'description': 'Provide funding levels (in development).',
                            'displayLabel': 'Funding Levels'
                        },
                        'nationalBiosurveillanceStrategyMapping': {
                            'description': 'Does the surveillance system map to one or more of the priorities described in the National Biosurveillance Strategy for Human Health? (e.g., Biosurveillance Workforce of the future, etc.)',
                            'displayLabel': 'National Biosurveillance Strategy Mapping'
                        },
                        'Notes': {
                            'description': 'Please add any relevant information that may be of use.',
                            'displayLabel': 'Notes / Other information'
                        }
                    }
                }
            }
        },
        'Tool': {
            'attributeGroups': {
                'General Information': {
                    'heading': 'General Information',
                    'attributes': {
                        'purpose': {
                            'description': 'Provide an overview of the purpose of the tool.',
                            'displayLabel': 'Purpose / Summary'
                        },
                        'webResource': {
                            'description': 'Where can someone find out more information about this tool on the web?',
                            'displayLabel': 'Web Resource'
                        },
                        'operationalStatus': {
                            'description': 'What is the current operational status of the tool? (e.g., Is it planned for future development? Is it under development, but not yet operational? Is it partially operational and implemented?  Is it fully operational and Implemented?  Is it retired?).',
                            'displayLabel': 'Operational Status'
                        },
                        'startDate': {
                            'description': 'What was the first year the tool became operational?',
                            'displayLabel': 'Start Date'
                        },
                        'surveillanceType': {
                            'description': 'What type of surveillance is done by the tool? (e.g., sentinel surveillance, case-based surveillance, individual or summary, etc.,)',
                            'displayLabel': 'Surveillance Type'
                        },
                        'surveillanceDomain': {
                            'description': 'What general area (e.g., human, animal, food, etc.) as well as specific area (e.g., Asthma, HIV, Diphtheria, Plutonium exposure, etc.) does the surveillance system focus on?',
                            'displayLabel': 'Surveillance Domain'
                        },
                        'conditionsUnderSurveillance': {
                            'description': 'What specific diseases, conditions, or other public health issues are being addressed by the tool?',
                            'displayLabel': 'Conditions under Surveillance'
                        },
                        'geographicCoverageArea': {
                            'description': 'What geographic areas are covered by the tool?',
                            'displayLabel': 'Geographic Coverage Area'
                        },
                        'overallCapability': {
                            'description': 'If the tool has an electronic component, what are its capabilities?  (e.g., can it receive data, send data, analyze data, generate reports, send alerts, etc.).',
                            'displayLabel': 'Overall Capability'
                        },
                        'specialPopulations': {
                            'description': 'Does the tool focus on a particular population/cohort? (e.g., children, elderly, adolescents, disability, pregnant, etc.).',
                            'displayLabel': 'Special Populations'
                        },
                        'avrCapability': {
                            'description': 'If the tool has analysis, visualization, and reporting (AVR) capability, what are its specific capabilities (e.g., chart generation, map generation, ad-hoc reports, etc.).',
                            'displayLabel': 'Analysis, Visualization, and Reporting (AVR) capability'
                        },
                        'reportFrequency': {
                            'description': 'If it applies, what is the frequency of report dissemination for analyzed data? Who are the reports for? (e.g., CDC, general public, etc.,).',
                            'displayLabel': 'Report Frequency'
                        },
                        'city': {
                            'description': 'City location of the program',
                            'displayLabel': 'Location - City'
                        },
                        'state': {
                            'description': 'State location of the program',
                            'displayLabel': 'Location - State'
                        },
                        'lastUpdated': {
                            'description': 'Date of last update to information in this tool.',
                            'displayLabel': 'Last Updated'
                        },
                        'informationValidated': {
                            'description': 'Has the information in this tool been validated by an appropriate program / team?',
                            'displayLabel': 'Information Validated by Program'
                        },
                        'fullName': {
                            'description': 'Full name of the tool.',
                            'displayLabel': 'Full Name'
                        },
                        'shortName': {
                            'description': 'Abbreviation or Acronym of the tool.',
                            'displayLabel': 'Short Name / Acronym'
                        }
                    }
                },
                'Technical Information': {
                    'heading': 'Technical Information',
                    'attributes': {
                        'applicationSolutionType': {
                            'description': 'Is the tool based on a commercial off-the-shelf (COTS) solution or is it custom built?',
                            'displayLabel': 'Application Solution Type'
                        },
                        'applicationPlatform': {
                            'description': 'What platform, if any, is used for the tool (e.g., web, mobile, desktop application, paper-based, etc.)?',
                            'displayLabel': 'Application Platform'
                        },
                        'operatingSystemPlatform': {
                            'description': 'If it applies, what operating system(s) is used for the tool (e.g., Linux, Mac OS, Microsoft Windows, etc.)?',
                            'displayLabel': 'Platform - Operating System'
                        },
                        'databaseTechnology': {
                            'description': 'If it applies, what database platform(s) is used in the tool (e.g., Oracle, Microsoft SQL Server, Microsoft Access, etc.)?',
                            'displayLabel': 'Database Technology'
                        }
                    }
                },
                'Data-Related Information': {
                    'heading': 'Data-Related Information',
                    'attributes': {
                        'startDateGeneration': {
                            'description': 'What was the first year data became available or were collected from the tool?',
                            'displayLabel': 'Start Data Generation'
                        },
                        'dataProvidersManual': {
                            'description': 'The manually-provided sources of data for this tool (e.g., postal mail, phone).',
                            'displayLabel': 'Data Providers - Manual'
                        },
                        'dataProvidersElectronic': {
                            'description': 'The electronically-provided sources of data for this tool (e.g., web-based, FTP, electronic messaging).',
                            'displayLabel': 'Data Providers - Electronic'
                        },
                        'dataRecipientsManual': {
                            'description': 'The manually-provided recipients of data for this surveillance system (e.g., postal mail, phone).',
                            'displayLabel': 'Data Recipients - Manual'
                        },
                        'dataRecipientsElectronic': {
                            'description': 'The electronically-provided recipients of data for this surveillance system (e.g., web-based, FTP, electronic messaging).',
                            'displayLabel': 'Data Recipients - Electronic'
                        },
                        'patientTrackingCapability': {
                            'description': 'Can the tool track patient-level data to support an authorized public health investigation?',
                            'displayLabel': 'Patient Tracking Capability'
                        },
                        'ageFormat': {
                            'description': 'If it is collected, how is age collected in this tool?  (e.g., year cohorts, complete or partial birth date).',
                            'displayLabel': 'Age Format'
                        },
                        'dataPayloadFormat': {
                            'description': 'If information is transmitted electronically in the tool, how is it structured/organized? (e.g., HL7 v3, HL7 v2.X, CDA, ebXML, JSON, SOAP, etc.)',
                            'displayLabel': 'Data Payload Format'
                        },
                        'dataPayloadTransmissionType': {
                            'description': 'If information is transmitted as part of the tool, how is it carried out? (e.g., postal mail, email, FTP, web services, eFax, EDI, etc.)',
                            'displayLabel': 'Data Payload Transmission Type'
                        }
                    }
                },
                'Contact Information': {
                    'heading': 'Contact Information',
                    'attributes': {
                        'contactName': {
                            'description': 'Person who is the best to contact for more information',
                            'displayLabel': 'Contact Name'
                        },
                        'contactEmail': {
                            'description': 'email address',
                            'displayLabel': 'Contact Email'
                        },
                        'contactPhone': {
                            'description': 'Phone number',
                            'displayLabel': 'Contact Phone'
                        }
                    }
                },
                'Other Information': {
                    'heading': 'Other Information',
                    'attributes': {
                        'evaluationDate': {
                            'description': 'If available, please provide the date of the tool\'s most recent formal evaluation.',
                            'displayLabel': ' Evaluation Date'
                        },
                        'evaluationDetails': {
                            'description': 'If an evaluation was performed, what categories/areas of the tool were examined? (e.g., flexibility, data quality, timeliness, stability, etc.,).',
                            'displayLabel': 'Evaluation Details'
                        },
                        'fundingSource': {
                            'description': 'Does the tool compete internally to CDC for funding?  Does the program receive funds specifically appropriated by Congress?',
                            'displayLabel': 'Funding Source'
                        },
                        'fundingLevels': {
                            'description': 'Provide funding levels (in development).',
                            'displayLabel': 'Funding Levels'
                        },
                        'nationalBiosurveillanceStrategyMapping': {
                            'description': 'Does the tool map to one or more of the priorities described in the National Biosurveillance Strategy for Human Health? (e.g., Biosurveillance Workforce of the future, etc.)',
                            'displayLabel': 'National Biosurveillance Strategy Mapping'
                        },
                        'Notes': {
                            'description': 'Please add any relevant information that may be of use.',
                            'displayLabel': 'Notes / Other information'
                        }
                    }
                }
            }
        },
        'Registry': {
            'attributeGroups': {
                'General Information': {
                    'heading': 'General Information',
                    'attributes': {
                        'lastUpdated': {
                            'description': 'Date of last update to information in this registry.',
                            'displayLabel': 'Last Updated'
                        },
                        'informationValidated': {
                            'description': 'Has the information in this registry been validated by an appropriate program / team?',
                            'displayLabel': 'Information Validated by Program'
                        },
                        'fullName': {
                            'description': 'Full name of the registry',
                            'displayLabel': 'Full Name'
                        },
                        'shortName': {
                            'description': 'Abbreviation or Acronym of the registry',
                            'displayLabel': 'Short Name / Acronym'
                        },
                        'registryType': {
                            'description': 'Does the registry focus on Surveillance or Research?',
                            'displayLabel': 'Registry Type'
                        },
                        'purpose': {
                            'description': 'Provide an overview of the purpose of the registry',
                            'displayLabel': 'Purpose / Summary'
                        },
                        'webResource': {
                            'description': 'Where can someone find out more information about this registry on the web?',
                            'displayLabel': 'Web Resource'
                        },
                        'operationalStatus': {
                            'description': 'What is the current operational status of the registry? (e.g., Is it planned for future development? Is it under development, but not yet operational? Is it partially operational and implemented?  Is it fully operational and Implemented?  Is it retired?)',
                            'displayLabel': 'Operational Status'
                        },
                        'startDate': {
                            'description': 'What was the first year the registry became operational?',
                            'displayLabel': 'Start Date'
                        },
                        'surveillanceType': {
                            'description': 'What type of surveillance is done by the registry (e.g., sentinel surveillance, case-based surveillance, individual or summary, etc.,)?',
                            'displayLabel': 'Surveillance Type'
                        },
                        'surveillanceDomain': {
                            'description': 'What general area (e.g., human, animal, food, etc.) as well as specific area (e.g., Asthma, HIV, Diphtheria, Plutonium exposure, etc.) does the registry focus on?',
                            'displayLabel': 'Surveillance Domain'
                        },
                        'conditionsUnderSurveillance': {
                            'description': 'What specific diseases, conditions, or other public health issues are being addressed by the registry?',
                            'displayLabel': 'Conditions under Surveillance'
                        },
                        'geographicCoverageArea': {
                            'description': 'What geographic areas are covered by the registry?',
                            'displayLabel': 'Geographic Coverage Area'
                        },
                        'overallCapability': {
                            'description': 'If the registry has an electronic component, what are its capabilities?  (e.g., can it receive data, send data, analyze data, generate reports, send alerts, etc.).',
                            'displayLabel': 'Overal Capability'
                        },
                        'specialPopulations': {
                            'description': 'Does the registry focus on a particular population/cohort? (e.g., children, elderly, adolescents, disability, pregnant, etc.).',
                            'displayLabel': 'Special Populations'
                        },
                        'avrCapability': {
                            'description': 'If the registry has analysis, visualization, and reporting (AVR) capability, what are its specific capabilities (e.g., chart generation, map generation, ad-hoc reports, etc.).',
                            'displayLabel': 'Analysis, Visualization, and Reporting (AVR) capability'
                        },
                        'reportFrequency': {
                            'description': 'If it applies, what is the frequency of report dissemination for analyzed data? Who are the reports for? (e.g., CDC, general public, etc.,).',
                            'displayLabel': 'Report Frequency'
                        },
                        'city': {
                            'description': 'City location of registry',
                            'displayLabel': 'Location - City'
                        },
                        'state': {
                            'description': 'State location of registry',
                            'displayLabel': 'Location - State'
                        }
                    }
                },
                'Technical Information': {
                    'heading': 'Technical Information',
                    'attributes': {
                        'applicationSolutionType': {
                            'description': 'Is the registry based on a commercial off-the-shelf (COTS) solution or is it custom built?',
                            'displayLabel': 'Application Solution Type'
                        },
                        'applicationPlatform': {
                            'description': 'What platform, if any, is used for the registry (e.g., web, mobile, desktop application, paper-based, etc.)?',
                            'displayLabel': 'Application Platform'
                        },
                        'operatingSystemPlatform': {
                            'description': 'If it applies, what operating system(s) is used for the registry (e.g., Linux, Mac OS, Microsoft Windows, etc.)?',
                            'displayLabel': 'Platform - Operating System'
                        },
                        'databaseTechnology': {
                            'description': 'If it applies, what database platform(s) is used in the registry (e.g., Oracle, Microsoft SQL Server, Microsoft Access, etc.)?',
                            'displayLabel': 'Database Technology'
                        }
                    }
                },
                'Data-Related Information': {
                    'heading': 'Data-Related Information',
                    'attributes': {
                        'startDateGeneration': {
                            'description': 'What was the first year data became available or were collected from the registry?',
                            'displayLabel': 'Start Data Generation'
                        },
                        'dataProvidersManual': {
                            'description': 'The manually-provided sources of data for this registry (e.g., postal mail, phone).',
                            'displayLabel': 'Data Providers - Manual'
                        },
                        'dataProvidersElectronic': {
                            'description': 'The electronically-provided sources of data for this registry (e.g., web-based, FTP, electronic messaging).',
                            'displayLabel': 'Data Providers - Electronic'
                        },
                        'dataRecipientsManual': {
                            'description': 'The manually-provided recipients of data for this registry (e.g., postal mail, phone).',
                            'displayLabel': 'Data Recipients - Manual'
                        },
                        'dataRecipientsElectronic': {
                            'description': 'The electronically-provided recipients of data for this registry (e.g., web-based, FTP, electronic messaging).',
                            'displayLabel': 'Data Recipients - Electronic'
                        },
                        'patientTrackingCapability': {
                            'description': 'Can the registry track patient-level data to support an authorized public health investigation?',
                            'displayLabel': 'Patient Tracking Capability'
                        },
                        'ageFormat': {
                            'description': 'If it is collected, how is age collected in this registry?  (e.g., year cohorts, complete or partial birth date).',
                            'displayLabel': 'Age Format'
                        },
                        'dataPayloadFormat': {
                            'description': 'If information is transmitted electronically in the registry, how is it structured/organized? (e.g., HL7 v3, HL7 v2.X, CDA, ebXML, JSON, SOAP, etc.)',
                            'displayLabel': 'Data Payload Format'
                        },
                        'dataPayloadTransmissionType': {
                            'description': 'If information is transmitted as part of the registry, how is it carried out? (e.g., postal mail, email, FTP, web services, eFax, EDI, etc.)',
                            'displayLabel': 'Data Payload Transmission Type'
                        }
                    }
                },
                'Contact Information': {
                    'heading': 'Contact Information',
                    'attributes': {
                        'contactName': {
                            'description': 'Person who is the best to contact for more information',
                            'displayLabel': 'Contact Name'
                        },
                        'contactEmail': {
                            'description': 'email address',
                            'displayLabel': 'Contact Email'
                        },
                        'contactPhone': {
                            'description': 'Phone number',
                            'displayLabel': 'Contact Phone'
                        }
                    }
                },
                'Other Information': {
                    'heading': 'Other Information',
                    'attributes': {
                        'evaluationDate': {
                            'description': 'If available, please provide the date of the registry\'s most recent formal evaluation.',
                            'displayLabel': ' Evaluation Date'
                        },
                        'evaluationDetails': {
                            'description': 'If an evaluation was performed, what categories/areas of the registry were examined? (e.g., flexibility, data quality, timeliness, stability, etc.,).',
                            'displayLabel': 'Evaluation Details'
                        },
                        'fundingSource': {
                            'description': 'Does the registry compete internally to CDC for funding?  Does the program receive funds specifically appropriated by Congress?',
                            'displayLabel': 'Funding Source'
                        },
                        'fundingLevels': {
                            'description': 'Provide funding levels (in development).',
                            'displayLabel': 'Funding Levels'
                        },
                        'nationalBiosurveillanceStrategyMapping': {
                            'description': 'Does the registry map to one or more of the priorities described in the National Biosurveillance Strategy for Human Health? (e.g., Biosurveillance Workforce of the future, etc.)',
                            'displayLabel': 'National Biosurveillance Strategy Mapping'
                        },
                        'Notes': {
                            'description': 'Please add any relevant information that may be of use.',
                            'displayLabel': 'Notes / Other information'
                        }
                    }
                }
            }
        },
        'HealthSurvey': {
            'attributeGroups': {
                'General Information': {
                    'heading': 'General Information',
                    'attributes': {
                        'lastUpdated': {
                            'description': 'Date of last update to information in this heath survey.',
                            'displayLabel': 'Last Updated'
                        },
                        'informationValidated': {
                            'description': 'Has the information in this heath survey been validated by an appropriate program / team?',
                            'displayLabel': 'Information Validated by Program'
                        },
                        'fullName': {
                            'description': 'Full name of the heath survey',
                            'displayLabel': 'Full Name'
                        },
                        'shortName': {
                            'description': 'Abbreviation or Acronym of the heath survey',
                            'displayLabel': 'Short Name / Acronym'
                        },
                        'purpose': {
                            'description': 'Provide an overview of the purpose of the heath survey',
                            'displayLabel': 'Purpose / Summary'
                        },
                        'webResource': {
                            'description': 'Where can someone find out more information about this heath survey on the web?',
                            'displayLabel': 'Web Resource'
                        },
                        'operationalStatus': {
                            'description': 'What is the current operational status of the heath survey? (e.g., Is it planned for future development? Is it under development, but not yet operational? Is it partially operational and implemented?  Is it fully operational and Implemented?  Is it retired?)',
                            'displayLabel': 'Operational Status'
                        },
                        'startDate': {
                            'description': 'What was the first year the heath survey became operational?',
                            'displayLabel': 'Start Date'
                        },
                        'surveillanceType': {
                            'description': 'What type of surveillance is done by the heath survey (e.g., sentinel surveillance, case-based surveillance, individual or summary, etc.,)?',
                            'displayLabel': 'Surveillance Type'
                        },
                        'surveillanceDomain': {
                            'description': 'What general area (e.g., human, animal, food, etc.) as well as specific area (e.g., Asthma, HIV, Diphtheria, Plutonium exposure, etc.) does the heath survey focus on?',
                            'displayLabel': 'Surveillance Domain'
                        },
                        'conditionsUnderSurveillance': {
                            'description': 'What specific diseases, conditions, or other public health issues are being addressed by the heath survey?',
                            'displayLabel': 'Conditions under Surveillance'
                        },
                        'geographicCoverageArea': {
                            'description': 'What geographic areas are covered by the heath survey?',
                            'displayLabel': 'Geographic Coverage Area'
                        },
                        'overallCapability': {
                            'description': 'If the heath survey has an electronic component, what are its capabilities?  (e.g., can it receive data, send data, analyze data, generate reports, send alerts, etc.).',
                            'displayLabel': 'Overall Capability'
                        },
                        'specialPopulations': {
                            'description': 'Does the heath survey focus on a particular population/cohort? (e.g., children, elderly, adolescents, disability, pregnant, etc.).',
                            'displayLabel': 'Special Populations'
                        },
                        'avrCapability': {
                            'description': 'If the heath survey has analysis, visualization, and reporting (AVR) capability, what are its specific capabilities (e.g., chart generation, map generation, ad-hoc reports, etc.).',
                            'displayLabel': 'Analysis, Visualization, and Reporting (AVR) capability'
                        },
                        'reportFrequency': {
                            'description': 'If it applies, what is the frequency of report dissemination for analyzed data? Who are the reports for? (e.g., CDC, general public, etc.,).',
                            'displayLabel': 'Report Frequency'
                        },
                        'city': {
                            'description': 'City location of the health survey',
                            'displayLabel': 'Location - City'
                        },
                        'state': {
                            'description': 'State location of the health survey',
                            'displayLabel': 'Location - State'
                        }
                    }
                },
                'Technical Information': {
                    'heading': 'Technical Information',
                    'attributes': {
                        'applicationSolutionType': {
                            'description': 'Is the heath survey based on a commercial off-the-shelf (COTS) solution or is it custom built?',
                            'displayLabel': 'Application Solution Type'
                        },
                        'applicationPlatform': {
                            'description': 'What platform, if any, is used for the heath survey (e.g., web, mobile, desktop application, paper-based, etc.)?',
                            'displayLabel': 'Application Platform'
                        },
                        'operatingSystemPlatform': {
                            'description': 'If it applies, what operating system(s) is used for the heath survey (e.g., Linux, Mac OS, Microsoft Windows, etc.)?',
                            'displayLabel': 'Platform - Operating System'
                        },
                        'databaseTechnology': {
                            'description': 'If it applies, what database platform(s) is used in the heath survey (e.g., Oracle, Microsoft SQL Server, Microsoft Access, etc.)?',
                            'displayLabel': 'Database Technology'
                        }
                    }
                },
                'Data-Related Information': {
                    'heading': 'Data-Related Information',
                    'attributes': {
                        'startDateGeneration': {
                            'description': 'What was the first year data became available or were collected from the heath survey?',
                            'displayLabel': 'Start Data Generation'
                        },
                        'dataProvidersManual': {
                            'description': 'The manually-provided sources of data for this heath survey (e.g., postal mail, phone).',
                            'displayLabel': 'Data Providers - Manual'
                        },
                        'dataProvidersElectronic': {
                            'description': 'The electronically-provided sources of data for this heath survey (e.g., web-based, FTP, electronic messaging).',
                            'displayLabel': 'Data Providers - Electronic'
                        },
                        'dataRecipientsManual': {
                            'description': 'The manually-provided recipients of data for this heath survey (e.g., postal mail, phone).',
                            'displayLabel': 'Data Recipients - Manual'
                        },
                        'dataRecipientsElectronic': {
                            'description': 'The electronically-provided recipients of data for this heath survey (e.g., web-based, FTP, electronic messaging).',
                            'displayLabel': 'Data Recipients - Electronic'
                        },
                        'patientTrackingCapability': {
                            'description': 'Can the heath survey track patient-level data to support an authorized public health investigation?',
                            'displayLabel': 'Patient Tracking Capability'
                        },
                        'ageFormat': {
                            'description': 'If it is collected, how is age collected in this heath survey?  (e.g., year cohorts, complete or partial birth date).',
                            'displayLabel': 'Age Format'
                        },
                        'dataPayloadFormat': {
                            'description': 'If information is transmitted electronically in the heath survey, how is it structured/organized? (e.g., HL7 v3, HL7 v2.X, CDA, ebXML, JSON, SOAP, etc.)',
                            'displayLabel': 'Data Payload Format'
                        },
                        'dataPayloadTransmissionType': {
                            'description': 'If information is transmitted as part of the heath survey, how is it carried out? (e.g., postal mail, email, FTP, web services, eFax, EDI, etc.)',
                            'displayLabel': 'Data Payload Transmission Type'
                        }
                    }
                },
                'Contact Information': {
                    'heading': 'Contact Information',
                    'attributes': {
                        'contactName': {
                            'description': 'Person who is the best to contact for more information',
                            'displayLabel': 'Contact Name'
                        },
                        'contactEmail': {
                            'description': 'email address',
                            'displayLabel': 'Contact Email'
                        },
                        'contactPhone': {
                            'description': 'Phone number',
                            'displayLabel': 'Contact Phone'
                        }
                    }
                },
                'Other Information': {
                    'heading': 'Other Information',
                    'attributes': {
                        'evaluationDate': {
                            'description': 'If available, please provide the date of the heath survey\'s most recent formal evaluation.',
                            'displayLabel': ' Evaluation Date'
                        },
                        'evaluationDetails': {
                            'description': 'If an evaluation was performed, what categories/areas of the heath survey were examined? (e.g., flexibility, data quality, timeliness, stability, etc.,).',
                            'displayLabel': 'Evaluation Details'
                        },
                        'fundingSource': {
                            'description': 'Does the heath survey compete internally to CDC for funding?  Does the program receive funds specifically appropriated by Congress?',
                            'displayLabel': 'Funding Source'
                        },
                        'fundingLevels': {
                            'description': 'Provide funding levels (in development).',
                            'displayLabel': 'Funding Levels'
                        },
                        'nationalBiosurveillanceStrategyMapping': {
                            'description': 'Does the heath survey map to one or more of the priorities described in the National Biosurveillance Strategy for Human Health? (e.g., Biosurveillance Workforce of the future, etc.)',
                            'displayLabel': 'National Biosurveillance Strategy Mapping'
                        },
                        'Notes': {
                            'description': 'Please add any relevant information that may be of use.',
                            'displayLabel': 'Notes / Other information'
                        }
                    }
                }
            }
        },
        'Collaborative': {
            'attributeGroups': {
                'General Information': {
                    'heading': 'General Information',
                    'attributes': {
                        'lastUpdated': {
                            'description': 'Date of last update to information in this collaborative.',
                            'displayLabel': 'Last Updated'
                        },
                        'informationValidated': {
                            'description': 'Has the information in this collaborative been validated by an appropriate program / team?',
                            'displayLabel': 'Information Validated by Program'
                        },
                        'fullName': {
                            'description': 'Full name of the collaborative',
                            'displayLabel': 'Full Name'
                        },
                        'shortName': {
                            'description': 'Abbreviation or Acronym of the collaborative',
                            'displayLabel': 'Short Name'
                        },
                        'purpose': {
                            'description': 'Provide an overview of the purpose of the collaborative',
                            'displayLabel': 'Mission / Summary / Purpose'
                        },
                        'operationStartDate': {
                            'description': 'What was the first year the collaborative became operational?',
                            'displayLabel': 'Operation Start Date'
                        },
                        'operationalStatus': {
                            'description': 'What is the current operational status of the collaborative? (e.g., Is it planned for future development? Is it under development, but not yet operational? Is it partially operational and implemented?  Is it fully operational and Implemented?  Is it retired?)',
                            'displayLabel': 'Operational Status'
                        },
                        'collaborativeParticipants': {
                            'description': 'The names of the organizations participating in the collaborative',
                            'displayLabel': 'Collaborative Participants'
                        },
                        'surveillanceDomain': {
                            'description': 'What general area (e.g., human, animal, food, etc.) as well as specific area (e.g., Asthma, HIV, Diphtheria, Plutonium exposure, etc.) does the collaborative focus on?',
                            'displayLabel': 'Surveillance Domain'
                        },
                        'conditionsUnderSurveillance': {
                            'description': 'What specific diseases, conditions, or other public health issues are being addressed by the collaborative?',
                            'displayLabel': 'Condition (under surveillance)'
                        },
                        'geographicCoverageArea': {
                            'description': 'What geographic areas are covered by the collaborative?',
                            'displayLabel': 'Geographic Coverage'
                        }
                    }
                },
                'Data-Related Information': {
                    'heading': 'Data-Related Information',
                    'attributes': {
                        'dataProvidersManual': {
                            'description': 'The manually-provided sources of data for this collaborative (e.g., postal mail, phone).',
                            'displayLabel': 'Data Providers - Manual'
                        },
                        'dataProvidersElectronic': {
                            'description': 'The electronically-provided sources of data for this collaborative (e.g., web-based, FTP, electronic messaging).',
                            'displayLabel': 'Data Providers - Electronic'
                        },
                        'dataRecipientsManual': {
                            'description': 'The manually-provided recipients of data for this collaborative (e.g., postal mail, phone).',
                            'displayLabel': 'Data Recipients - Manual'
                        },
                        'dataRecipientsElectronic': {
                            'description': 'The electronically-provided recipients of data for this collaborative (e.g., web-based, FTP, electronic messaging).',
                            'displayLabel': 'Data Recipients - Electronic'
                        }
                    }
                },
                'Contact Information': {
                    'heading': 'Contact Information',
                    'attributes': {
                        'contactName': {
                            'description': 'Person who is the best to contact for more information',
                            'displayLabel': ' Contact Name'
                        },
                        'contactEmail': {
                            'description': 'email address',
                            'displayLabel': ' Contact Email'
                        },
                        'contactPhone': {
                            'description': 'Phone number',
                            'displayLabel': 'Contact Phone'
                        }
                    }
                },
                'Other Information': {
                    'heading': 'Other Information',
                    'attributes': {
                        'Notes': {
                            'description': 'Please add any relevant information that may be of use.',
                            'displayLabel': 'Notes / Other information'
                        }
                    }
                }
            }
        },
        'DataSet': {
            'attributeGroups': {
                'General Information': {
                    'heading': 'General Information',
                    'attributes': {
                        'lastUpdated': {
                            'description': 'Date of last update to information in this dataset.',
                            'displayLabel': 'Last Updated'
                        },
                        'informationValidated': {
                            'description': 'Has the information in this dataset been validated by an appropriate program / team?',
                            'displayLabel': 'Information Validated by Program'
                        },
                        'fullName': {
                            'description': 'Full name of the dataset',
                            'displayLabel': 'Full Name'
                        },
                        'shortName': {
                            'description': 'Abbreviation or Acronym of the dataset',
                            'displayLabel': 'Short Name'
                        },
                        'Description': {
                            'description': 'An overview / summary of what the dataset contains / provides',
                            'displayLabel': 'Description / Summary'
                        },
                        'currentlyAvailable': {
                            'description': 'Is the dataset currently available?',
                            'displayLabel': 'Currently Available?'
                        },
                        'data.govLink': {
                            'description': 'This is a link to the dataset on data.gov',
                            'displayLabel': 'Data.gov Link'
                        },
                        'fileName': {
                            'description': 'if it applies, what is the name of the digital file of the dataset',
                            'displayLabel': 'File Name'
                        },
                        'fileLocation': {
                            'description': 'if it applies, what is the location of the digital file of the dataset',
                            'displayLabel': 'File Location / Path'
                        }
                    }
                },
                'Data-Related Information': {
                    'heading': 'Data-Related Information',
                    'attributes': {
                        'startDate': {
                            'description': 'When did data start being collected for this dataset?',
                            'displayLabel': 'Start Date'
                        },
                        'endDate': {
                            'description': 'When did data stop being collected for this dataset?',
                            'displayLabel': 'End Date'
                        },
                        'dataUpdateFrequency': {
                            'description': 'If data is updated in the dataset on a regular basis, how often does it occur?',
                            'displayLabel': 'Data Update Frequency'
                        },
                        'dataCategoryTypes': {
                            'description': 'What general types of data are in this dataset (demographics, outcome data, vital statistics, etc)?',
                            'displayLabel': 'Data Category types'
                        },
                        'dataFormat': {
                            'description': 'What is the format of the dataset (paper,  spreadsheet, SAS file, MS Word Document, Text file, etc.)?',
                            'displayLabel': 'Data Format'
                        }
                    }
                },
                'Contact Information': {
                    'heading': 'Contact Information',
                    'attributes': {
                        'nameContact': {
                            'description': 'Person who is the best to contact for more information',
                            'displayLabel': 'Name - Contact'
                        },
                        'emailContact': {
                            'description': 'email address',
                            'displayLabel': 'email - Contact'
                        },
                        'phoneContact': {
                            'description': 'Phone number',
                            'displayLabel': 'phone - contact'
                        }
                    }
                }
            }
        },
        'DataStandard': {
            'attributeGroups': {
                'General Information': {
                    'heading': 'General Information',
                    'attributes': {
                        'lastUpdated': {
                            'description': 'Date of last update to information in this data standard.',
                            'displayLabel': 'Last Updated'
                        },
                        'informationValidated': {
                            'description': 'Has the information in this data standard been validated by an appropriate program / team?',
                            'displayLabel': 'Information Validated by Program'
                        },
                        'terminologyShortName': {
                            'description': '',
                            'displayLabel': 'Terminology / Coding System / Controlled Vocabulary SHORT Name'
                        },
                        'terminologyFullName': {
                            'description': 'Full name of the data standard',
                            'displayLabel': 'Terminology / Coding System / Controlled Vocabulary FULL Name'
                        },
                        'description': {
                            'description': 'Abbreviation or Acronym of the data standard',
                            'displayLabel': 'Description'
                        },
                        'terminoloyId': {
                            'description': 'The unique identifier (ID) for the data standard (e.g., LOINC OID: 2.16.840.1.113883.6.1)',
                            'displayLabel': 'Terminology / Coding System / Controlled Vocabulary  ID (or Object Identifier- OID)'
                        },
                        'terminologyVersionNumber': {
                            'description': 'The version number of the data standard.(e.g., LOINC 2.46).',
                            'displayLabel': 'Terminology / Coding System / Controlled Vocabulary version number'
                        },
                        'licenseType': {
                            'description': 'What type of license does this data standard use? (e.g.,free)',
                            'displayLabel': 'License type'
                        },
                        'referenceUrl': {
                            'description': 'What is the link to the data standard (e.g., LOINC.org).',
                            'displayLabel': 'Reference URL'
                        },
                        'notes': {
                            'description': 'Please add any relevant information that may be of use.',
                            'displayLabel': 'Notes'
                        }
                    }
                }
            }
        },
        'Tag': {
            'attributeGroups': {
                'General Information': {
                    'heading': 'General Information',
                    'attributes': {
                        'tagRelationship': {
                            'description': 'Denotes the tagging relationship between the core and tag nodes.',
                            'displayLabel': 'Tag Relationship'
                        }
                    }
                }
            }
        }
    };
});
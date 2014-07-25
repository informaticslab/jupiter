angular.module('apolloApp').factory('nodeAttributeDictionary', function() {
    return {
        'Organization': {
            'attributeGroups': {
                'Summary': {
                    'heading': 'Summary',
                    'sortIndex': '1',
                    'attributes': {
                        'name': {
                            'description': 'Organization Name',
                            'displayLabel': 'Name',
                            'sortIndex': '1'
                        },
                        'mission': {
                            'description': 'Describes the overall purpose / mission of Organization',
                            'displayLabel': 'Mission',
                            'sortIndex': '15'
                        },
                        'id': {
                            'description': 'Identifier',
                            'displayLabel': 'ID',
                            'sortIndex': '2'
                        }
                    }
                },
                'General Information': {
                    'heading': 'General Information',
                    'sortIndex': '2',
                    'attributes': {
                        'locationCity': {
                            'description': 'City location of Organization, Center, Institute or Office',
                            'displayLabel': 'Location - City',
                            'sortIndex': '10'
                        },
                        'locationState': {
                            'description': 'State location of Organization, Center, Institute or Office',
                            'displayLabel': 'Location - State',
                            'sortIndex': '11'
                        },
                        'missionLastUpdatedDate': {
                            'description': 'When was the mission last updated?',
                            'displayLabel': 'Mission - Date last updated',
                            'sortIndex': '16'
                        },
                        'lastUpdated': {
                            'description': 'Date of last update to information in this system',
                            'displayLabel': 'Last Updated',
                            'sortIndex': '3'
                        },
                        'informationValidated': {
                            'description': 'Has the information in this system been validated by an appropriate program / team?',
                            'displayLabel': 'Information Validated by Program',
                            'sortIndex': '4'
                        },
                        'cdcEntity': {
                            'description': 'Is this organization a part of CDC',
                            'displayLabel': 'CDC Entity',
                            'sortIndex': '5'
                        },
                        'fullName': {
                            'description': 'Full name of Organization, Center, Institute or Office',
                            'displayLabel': 'Full Name',
                            'sortIndex': '6'
                        },
                        'shortName': {
                            'description': 'Abbreviation or Acronym of the Organization (e.g., CDC).',
                            'displayLabel': 'Short Name',
                            'sortIndex': '7'
                        },
                        'fullNameDivision': {
                            'description': 'Full name of the Division (if applies)',
                            'displayLabel': 'Division Full Name',
                            'sortIndex': '8'
                        },
                        'shortNameDivision': {
                            'description': 'Abbreviation or Acronym of the Division (if applies)',
                            'displayLabel': 'Division Short Name',
                            'sortIndex': '9'
                        }
                    }
                },
                'Contact Information': {
                    'heading': 'Contact Information',
                    'sortIndex': '5',
                    'attributes': {
                        'contactName': {
                            'description': 'Person who is the best to contact for more information',
                            'displayLabel': 'Point of Contact',
                            'sortIndex': '12'
                        },
                        'phoneContact': {
                            'description': 'Phone number',
                            'displayLabel': 'Phone',
                            'sortIndex': '13'
                        },
                        'emailContact': {
                            'description': 'Email address',
                            'displayLabel': 'email',
                            'sortIndex': '14'
                        }
                    }
                }
            }
        },
        'Program': {
            'attributeGroups': {
                'Summary': {
                    'heading': 'Summary',
                    'sortIndex': '1',
                    'attributes': {
                        'name': {
                            'description': 'Program Name',
                            'displayLabel': 'Name',
                            'sortIndex': '17'
                        },
                        'id': {
                            'description': 'Identifier',
                            'displayLabel': 'ID',
                            'sortIndex': '18'
                        },
                        'purpose': {
                            'description': 'Provide an overview of the purpose of the program',
                            'displayLabel': 'Purpose / Summary',
                            'sortIndex': '23'
                        }
                    }
                },
                'General Information': {
                    'heading': 'General Information',
                    'sortIndex': '2',
                    'attributes': {
                        'lastUpdated': {
                            'description': 'Date of last update to information in this program.',
                            'displayLabel': 'Last Updated',
                            'sortIndex': '19'
                        },
                        'informationValidated': {
                            'description': 'Has the information in this program been validated by an appropriate program / team?',
                            'displayLabel': 'Information Validated by Program',
                            'sortIndex': '20'
                        },
                        'fullName': {
                            'description': 'Full name of the Program',
                            'displayLabel': 'Full Name',
                            'sortIndex': '21'
                        },
                        'shortName': {
                            'description': 'Abbreviation or Acronym of the Program',
                            'displayLabel': 'Short Name / Acronym',
                            'sortIndex': '22'
                        },
                        'webResource': {
                            'description': 'Where can someone find out more information about this resource on the web?',
                            'displayLabel': 'Web Resource',
                            'sortIndex': '24'
                        },
                        'operationalStatus': {
                            'description': 'What is the current operational status of the program? Is it planned for future development? Is it under development, but not yet operational? Is it partially operational and implemented?  Is it fully operational and Implemented?  Is it retired?',
                            'displayLabel': 'Operational Status',
                            'sortIndex': '25'
                        },
                        'startDate': {
                            'description': 'What was the first year the program became operational?',
                            'displayLabel': 'Start Date',
                            'sortIndex': '26'
                        },
                        'surveillanceType': {
                            'description': 'What type of surveillance is done by the program (e.g., sentinel surveillance, case-based surveillance, individual or summary, etc.,)?',
                            'displayLabel': 'Surveillance Type',
                            'sortIndex': '28'
                        },
                        'surveillanceDomain': {
                            'description': 'What general area (e.g., human, animal, food, etc.) as well as specific area (e.g., Asthma, HIV, Diphtheria, Plutonium exposure, etc.) does the program focus on?',
                            'displayLabel': 'Surveillance Domain',
                            'sortIndex': '29'
                        },
                        'conditionsUnderSurveillance': {
                            'description': 'What specific diseases, conditions, or other public health issues are being addressed by the program?',
                            'displayLabel': 'Conditions under Surveillance',
                            'sortIndex': '30'
                        },
                        'geographicCoverageArea': {
                            'description': 'What geographic areas are covered by the program?',
                            'displayLabel': 'Geographic Coverage Area',
                            'sortIndex': '31'
                        },
                        'overallCapability': {
                            'description': 'If the program has an electronic component, what are its capabilities?  (e.g., can it recieve data, send data, analyze data, generate reports, send alerts, etc.).',
                            'displayLabel': 'Overall Capability',
                            'sortIndex': '37'
                        },
                        'specialPopulations': {
                            'description': 'Does the program focus on a particular population/cohort? (e.g., children, elderly, adolescents, disability, pregnant, etc.).',
                            'displayLabel': 'Special Populations',
                            'sortIndex': '39'
                        },
                        'avrCapability': {
                            'description': 'If the program has analysis, visualization, and reporting (AVR) capability, what are its specific capabilities (e.g., chart generation, map generation, ad-hoc reports, etc.).',
                            'displayLabel': 'Analysis, Visualization, and Reporting (AVR) capability',
                            'sortIndex': '46'
                        },
                        'reportFrequency': {
                            'description': 'If it applies, what is the frequency of report dissemination for analyzed data? Who are the reports for? (e.g., CDC, general public, etc.,).',
                            'displayLabel': 'Report Frequency',
                            'sortIndex': '47'
                        },
                        'city': {
                            'description': 'City location of Organization, Center, Institute or Office',
                            'displayLabel': 'Location - City',
                            'sortIndex': '53'
                        },
                        'state': {
                            'description': 'State location of Organization, Center, Institute or Office',
                            'displayLabel': 'Location - State',
                            'sortIndex': '54'
                        }
                    }
                },
                'Technical Information': {
                    'heading': 'Technical Information',
                    'sortIndex': '3',
                    'attributes': {
                        'applicationSolutionType': {
                            'description': 'Is the program based on a commercial off-the-shelf (COTS) solution or is it custom built?',
                            'displayLabel': 'Application Solution Type',
                            'sortIndex': '40'
                        },
                        'applicationPlatform': {
                            'description': 'What platform, if any, is used for the program (e.g., web, mobile, desktop application, paper-based, etc.)?',
                            'displayLabel': 'Application Platform',
                            'sortIndex': '41'
                        },
                        'operatingSystemPlatform': {
                            'description': 'If it applies, what operating system(s) is used for the program (e.g., Linux, Mac OS, Microsoft Windows, etc.)?',
                            'displayLabel': 'Platform - Operating System',
                            'sortIndex': '42'
                        },
                        'databaseTechnology': {
                            'description': 'If it applies, what database platform(s) is used for the program (e.g., Oracle, Microsoft SQL Server, Microsoft Access, etc.)?',
                            'displayLabel': 'Database Technology',
                            'sortIndex': '43'
                        }
                    }
                },
                'Data-Related Information': {
                    'heading': 'Data-Related Information',
                    'sortIndex': '4',
                    'attributes': {
                        'startDateGeneration': {
                            'description': 'What was the first year data became available or were collected from the program?',
                            'displayLabel': 'Start Data Collection / Generation',
                            'sortIndex': '27'
                        },
                        'dataProviders-Manual': {
                            'description': 'The manually-provided sources of data for this program (e.g., postal mail, phone).',
                            'displayLabel': 'Data Providers - Manual',
                            'sortIndex': '32'
                        },
                        'dataProviders-Electronic': {
                            'description': 'The electronically-provided sources of data for this program (e.g., web-based, FTP, electronic messaging).',
                            'displayLabel': 'Data Providers - Electronic',
                            'sortIndex': '33'
                        },
                        'dataRecipients-Manual': {
                            'description': 'The manually-provided recipients of data for this program (e.g., postal mail, phone).',
                            'displayLabel': 'Data Recipients - Manual',
                            'sortIndex': '34'
                        },
                        'dataRecipients-Electronic': {
                            'description': 'The electronically-provided recipients of data for this program (e.g., web-based, FTP, electronic messaging).',
                            'displayLabel': 'Data Recipients - Electronic',
                            'sortIndex': '35'
                        },
                        'patientTrackingCapability': {
                            'description': 'Can the program track patient-level data to support an authorized public health investigation?',
                            'displayLabel': 'Patient Tracking Capability',
                            'sortIndex': '36'
                        },
                        'ageFormat': {
                            'description': 'If it is collected, how is age collected in this program?  (e.g., year cohorts, complete or partial birth date).',
                            'displayLabel': 'Age Format',
                            'sortIndex': '38'
                        },
                        'dataPayloadFormat': {
                            'description': 'If information is transmitted electronically in the program, how is it structured/organized? (e.g., HL7 v3, HL7 v2.X, CDA, ebXML, JSON, SOAP, etc.)',
                            'displayLabel': 'Data Payload Format',
                            'sortIndex': '44'
                        },
                        'dataPayloadTransmissionType': {
                            'description': 'If information is transmitted as part of the program, how is it carried out? (e.g., postal mail, email, FTP, web services, eFax, EDI, etc.)',
                            'displayLabel': 'Data Payload Transmission Type',
                            'sortIndex': '45'
                        }
                    }
                },
                'Contact Information': {
                    'heading': 'Contact Information',
                    'sortIndex': '5',
                    'attributes': {
                        'contactName': {
                            'description': 'Person who is the best to contact for more information',
                            'displayLabel': 'Contact Name',
                            'sortIndex': '55'
                        },
                        'contactEmail': {
                            'description': 'email address',
                            'displayLabel': 'Contact Email',
                            'sortIndex': '56'
                        },
                        'contactPhone': {
                            'description': 'Phone number',
                            'displayLabel': 'Contact Phone',
                            'sortIndex': '57'
                        }
                    }
                },
                'Other Information': {
                    'heading': 'Other Information',
                    'sortIndex': '6',
                    'attributes': {
                        'evaluationDate': {
                            'description': 'If available, please provide the date of the program\'s most recent formal evaluation.',
                            'displayLabel': 'Evaluation Date',
                            'sortIndex': '48'
                        },
                        'evaluationDetails': {
                            'description': 'If an evaluation was performed, what categories/areas of the program were examined? (e.g., flexibility, data quality, timeliness, stability, etc.,).',
                            'displayLabel': 'Evaluation Details',
                            'sortIndex': '49'
                        },
                        'fundingSource': {
                            'description': 'Does the program compete internally to CDC for funding?  Does the program receive funds specifically appropriated by Congress?',
                            'displayLabel': 'Funding Source',
                            'sortIndex': '50'
                        },
                        'fundingLevels': {
                            'description': 'Provide funding levels (in development).',
                            'displayLabel': 'Funding Levels',
                            'sortIndex': '51'
                        },
                        'nationalBiosurveillanceStrategyMapping': {
                            'description': 'Does the program map to one or more of the priorities described in the National Biosurveillance Strategy for Human Health? (e.g., Biosurveillance Workforce of the future, etc.)',
                            'displayLabel': 'National Biosurveillance Strategy Mapping',
                            'sortIndex': '52'
                        },
                        'Notes': {
                            'description': 'Please add any relevant information that may be of use.',
                            'displayLabel': 'Notes / Other information',
                            'sortIndex': '58'
                        }
                    }
                }
            }
        },
        'SurveillanceSystem': {
            'attributeGroups': {
                'Summary': {
                    'heading': 'Summary',
                    'sortIndex': '1',
                    'attributes': {
                        'name': {
                            'description': 'System Name',
                            'displayLabel': 'Name',
                            'sortIndex': '59'
                        },
                        'id': {
                            'description': 'Identifier',
                            'displayLabel': 'ID',
                            'sortIndex': '60'
                        },
                        'purpose': {
                            'description': 'Provide an overview of the purpose of the surveillance system',
                            'displayLabel': 'Purpose / Summary',
                            'sortIndex': '65'
                        }
                    }
                },
                'General Information': {
                    'heading': 'General Information',
                    'sortIndex': '2',
                    'attributes': {
                        'lastUpdated': {
                            'description': 'Date of last update to information in this surveillance system.',
                            'displayLabel': 'Last Updated',
                            'sortIndex': '61'
                        },
                        'informationValidated': {
                            'description': 'Has the information in this surveillance system been validated by an appropriate program / team?',
                            'displayLabel': 'Information Validated by Program',
                            'sortIndex': '62'
                        },
                        'fullName': {
                            'description': 'Full name of the surveillance system',
                            'displayLabel': 'Full Name',
                            'sortIndex': '63'
                        },
                        'shortName': {
                            'description': 'Abbreviation or Acronym of the surveillance system',
                            'displayLabel': 'Short Name / Acronym',
                            'sortIndex': '64'
                        },
                        'webResource': {
                            'description': 'Where can someone find out more information about this surveillance system on the web?',
                            'displayLabel': 'Web Resource',
                            'sortIndex': '66'
                        },
                        'operationalStatus': {
                            'description': 'What is the current operational status of the surveillance system? (e.g., Is it planned for future development? Is it under development, but not yet operational? Is it partially operational and implemented?  Is it fully operational and Implemented?  Is it retired?)',
                            'displayLabel': 'Operational Status',
                            'sortIndex': '67'
                        },
                        'startDate': {
                            'description': 'What was the first year the surveillance system became operational?',
                            'displayLabel': 'Start Date',
                            'sortIndex': '68'
                        },
                        'surveillanceType': {
                            'description': 'What type of surveillance is done by the surveillance system (e.g., sentinel surveillance, case-based surveillance, individual or summary, etc.,)?',
                            'displayLabel': 'Surveillance Type',
                            'sortIndex': '70'
                        },
                        'surveillanceDomain': {
                            'description': 'What general area (e.g., human, animal, food, etc.) as well as specific area (e.g., Asthma, HIV, Diphtheria, Plutonium exposure, etc.) does the surveillance system focus on?',
                            'displayLabel': 'Surveillance Domain',
                            'sortIndex': '71'
                        },
                        'conditionsUnderSurveillance': {
                            'description': 'What specific diseases, conditions, or other public health issues are being addressed by the surveillance system?',
                            'displayLabel': 'Conditions under Surveillance',
                            'sortIndex': '72'
                        },
                        'geographicCoverageArea': {
                            'description': 'What geographic areas are covered by the surveillance system?',
                            'displayLabel': 'Geographic Coverage Area',
                            'sortIndex': '73'
                        },
                        'overallCapability': {
                            'description': 'If the surveillance system has an electronic component, what are its capabilities?  (e.g., can it receive data, send data, analyze data, generate reports, send alerts, etc.).',
                            'displayLabel': 'Overall Capability',
                            'sortIndex': '79'
                        },
                        'specialPopulations': {
                            'description': 'Does the surveillance system focus on a particular population/cohort? (e.g., children, elderly, adolescents, disability, pregnant, etc.).',
                            'displayLabel': 'Special Populations',
                            'sortIndex': '81'
                        },
                        'avrCapability': {
                            'description': 'If the surveillance system has analysis, visualization, and reporting (AVR) capability, what are its specific capabilities (e.g., chart generation, map generation, ad-hoc reports, etc.).',
                            'displayLabel': 'Analysis, Visualization, and Reporting (AVR) capability',
                            'sortIndex': '88'
                        },
                        'reportFrequency': {
                            'description': 'If it applies, what is the frequency of report dissemination for analyzed data? Who are the reports for? (e.g., CDC, general public, etc.,).',
                            'displayLabel': 'Report Frequency',
                            'sortIndex': '89'
                        },
                        'city': {
                            'description': 'City location of Organization, Center, Institute or Office',
                            'displayLabel': 'Location - City',
                            'sortIndex': '95'
                        },
                        'state': {
                            'description': 'State location of Organization, Center, Institute or Office',
                            'displayLabel': 'Location - State',
                            'sortIndex': '96'
                        }
                    }
                },
                'Technical Information': {
                    'heading': 'Technical Information',
                    'sortIndex': '3',
                    'attributes': {
                        'applicationSolutionType': {
                            'description': 'Is the surveillance system based on a commercial off-the-shelf (COTS) solution or is it custom built?',
                            'displayLabel': 'Application Solution Type',
                            'sortIndex': '82'
                        },
                        'applicationPlatform': {
                            'description': 'What platform, if any, is used for the surveillance system (e.g., web, mobile, desktop application, paper-based, etc.)?',
                            'displayLabel': 'Application Platform',
                            'sortIndex': '83'
                        },
                        'operatingSystemPlatform': {
                            'description': 'If it applies, what operating system(s) is used for the surveillance system (e.g., Linux, Mac OS, Microsoft Windows, etc.)?',
                            'displayLabel': 'Platform - Operating System',
                            'sortIndex': '84'
                        },
                        'databaseTechnology': {
                            'description': 'If it applies, what database platform(s) is used in the surveillance system (e.g., Oracle, Microsoft SQL Server, Microsoft Access, etc.)?',
                            'displayLabel': 'Database Technology',
                            'sortIndex': '85'
                        }
                    }
                },
                'Data-Related Information': {
                    'heading': 'Data-Related Information',
                    'sortIndex': '4',
                    'attributes': {
                        'startDateGeneration': {
                            'description': 'What was the first year data became available or were collected from the surveillance system?',
                            'displayLabel': 'Start Data Generation',
                            'sortIndex': '69'
                        },
                        'dataProvidersManual': {
                            'description': 'The manually-provided sources of data for this surveillance system (e.g., postal mail, phone).',
                            'displayLabel': 'Data Providers - Manual',
                            'sortIndex': '74'
                        },
                        'dataProvidersElectronic': {
                            'description': 'The electronically-provided sources of data for this surveillance system (e.g., web-based, FTP, electronic messaging).',
                            'displayLabel': 'Data Providers - Electronic',
                            'sortIndex': '75'
                        },
                        'dataRecipientsManual': {
                            'description': 'The manually-provided recipients of data for this surveillance system (e.g., postal mail, phone).',
                            'displayLabel': 'Data Recipients - Manual',
                            'sortIndex': '76'
                        },
                        'dataRecipientsElectronic': {
                            'description': 'The electronically-provided recipients of data for this surveillance system (e.g., web-based, FTP, electronic messaging).',
                            'displayLabel': 'Data Recipients - Electronic',
                            'sortIndex': '77'
                        },
                        'patientTrackingCapability': {
                            'description': 'Can the surveillance system track patient-level data to support an authorized public health investigation?',
                            'displayLabel': 'Patient Tracking Capability',
                            'sortIndex': '78'
                        },
                        'ageFormat': {
                            'description': 'If it is collected, how is age collected in this surveillance system?  (e.g., year cohorts, complete or partial birth date).',
                            'displayLabel': 'Age Format',
                            'sortIndex': '80'
                        },
                        'dataPayloadFormat': {
                            'description': 'If information is transmitted electronically in the surveillance system, how is it structured/organized? (e.g., HL7 v3, HL7 v2.X, CDA, ebXML, JSON, SOAP, etc.)',
                            'displayLabel': 'Data Payload Format',
                            'sortIndex': '86'
                        },
                        'dataPayloadTransmissionType': {
                            'description': 'If information is transmitted as part of the surveillance system, how is it carried out? (e.g., postal mail, email, FTP, web services, eFax, EDI, etc.)',
                            'displayLabel': 'Data Payload Transmission Type',
                            'sortIndex': '87'
                        }
                    }
                },
                'Contact Information': {
                    'heading': 'Contact Information',
                    'sortIndex': '5',
                    'attributes': {
                        'contactName': {
                            'description': 'Person who is the best to contact for more information',
                            'displayLabel': 'Contact Name',
                            'sortIndex': '97'
                        },
                        'contactEmail': {
                            'description': 'email address',
                            'displayLabel': 'Contact Email',
                            'sortIndex': '98'
                        },
                        'contactPhone': {
                            'description': 'Phone number',
                            'displayLabel': 'Contact Phone',
                            'sortIndex': '99'
                        }
                    }
                },
                'Other Information': {
                    'heading': 'Other Information',
                    'sortIndex': '6',
                    'attributes': {
                        'Notes': {
                            'description': 'Please add any relevant information that may be of use.',
                            'displayLabel': 'Notes / Other information',
                            'sortIndex': '100'
                        },
                        'evaluationDate': {
                            'description': 'If available, please provide the date of the surveillance system\'s most recent formal evaluation.',
                            'displayLabel': ' Evaluation Date',
                            'sortIndex': '90'
                        },
                        'evaluationDetails': {
                            'description': 'If an evaluation was performed, what categories/areas of the surveillance system were examined? (e.g., flexibility, data quality, timeliness, stability, etc.,).',
                            'displayLabel': 'Evaluation Details',
                            'sortIndex': '91'
                        },
                        'fundingSource': {
                            'description': 'Does the surveillance system compete internally to CDC for funding?  Does the program receive funds specifically appropriated by Congress?',
                            'displayLabel': 'Funding Source',
                            'sortIndex': '92'
                        },
                        'fundingLevels': {
                            'description': 'Provide funding levels (in development).',
                            'displayLabel': 'Funding Levels',
                            'sortIndex': '93'
                        },
                        'nationalBiosurveillanceStrategyMapping': {
                            'description': 'Does the surveillance system map to one or more of the priorities described in the National Biosurveillance Strategy for Human Health? (e.g., Biosurveillance Workforce of the future, etc.)',
                            'displayLabel': 'National Biosurveillance Strategy Mapping',
                            'sortIndex': '94'
                        }
                    }
                }
            }
        },
        'Tool': {
            'attributeGroups': {
                'Summary': {
                    'heading': 'Summary',
                    'sortIndex': '1',
                    'attributes': {
                        'name': {
                            'description': 'Name',
                            'displayLabel': 'Name',
                            'sortIndex': '101'
                        },
                        'id': {
                            'description': 'Identifier',
                            'displayLabel': 'ID',
                            'sortIndex': '102'
                        },
                        'purpose': {
                            'description': 'Provide an overview of the purpose of the tool.',
                            'displayLabel': 'Purpose / Summary',
                            'sortIndex': '107'
                        }
                    }
                },
                'General Information': {
                    'heading': 'General Information',
                    'sortIndex': '2',
                    'attributes': {
                        'lastUpdated': {
                            'description': 'Date of last update to information in this tool.',
                            'displayLabel': 'Last Updated',
                            'sortIndex': '103'
                        },
                        'informationValidated': {
                            'description': 'Has the information in this tool been validated by an appropriate program / team?',
                            'displayLabel': 'Information Validated by Program',
                            'sortIndex': '104'
                        },
                        'fullName': {
                            'description': 'Full name of the tool.',
                            'displayLabel': 'Full Name',
                            'sortIndex': '105'
                        },
                        'shortName': {
                            'description': 'Abbreviation or Acronym of the tool.',
                            'displayLabel': 'Short Name / Acronym',
                            'sortIndex': '106'
                        },
                        'webResource': {
                            'description': 'Where can someone find out more information about this tool on the web?',
                            'displayLabel': 'Web Resource',
                            'sortIndex': '108'
                        },
                        'operationalStatus': {
                            'description': 'What is the current operational status of the tool? (e.g., Is it planned for future development? Is it under development, but not yet operational? Is it partially operational and implemented?  Is it fully operational and Implemented?  Is it retired?).',
                            'displayLabel': 'Operational Status',
                            'sortIndex': '109'
                        },
                        'startDate': {
                            'description': 'What was the first year the tool became operational?',
                            'displayLabel': 'Start Date',
                            'sortIndex': '110'
                        },
                        'surveillanceType': {
                            'description': 'What type of surveillance is done by the tool? (e.g., sentinel surveillance, case-based surveillance, individual or summary, etc.,)',
                            'displayLabel': 'Surveillance Type',
                            'sortIndex': '112'
                        },
                        'surveillanceDomain': {
                            'description': 'What general area (e.g., human, animal, food, etc.) as well as specific area (e.g., Asthma, HIV, Diphtheria, Plutonium exposure, etc.) does the surveillance system focus on?',
                            'displayLabel': 'Surveillance Domain',
                            'sortIndex': '113'
                        },
                        'conditionsUnderSurveillance': {
                            'description': 'What specific diseases, conditions, or other public health issues are being addressed by the tool?',
                            'displayLabel': 'Conditions under Surveillance',
                            'sortIndex': '114'
                        },
                        'geographicCoverageArea': {
                            'description': 'What geographic areas are covered by the tool?',
                            'displayLabel': 'Geographic Coverage Area',
                            'sortIndex': '115'
                        },
                        'overallCapability': {
                            'description': 'If the tool has an electronic component, what are its capabilities?  (e.g., can it receive data, send data, analyze data, generate reports, send alerts, etc.).',
                            'displayLabel': 'Overall Capability',
                            'sortIndex': '121'
                        },
                        'specialPopulations': {
                            'description': 'Does the tool focus on a particular population/cohort? (e.g., children, elderly, adolescents, disability, pregnant, etc.).',
                            'displayLabel': 'Special Populations',
                            'sortIndex': '123'
                        },
                        'avrCapability': {
                            'description': 'If the tool has analysis, visualization, and reporting (AVR) capability, what are its specific capabilities (e.g., chart generation, map generation, ad-hoc reports, etc.).',
                            'displayLabel': 'Analysis, Visualization, and Reporting (AVR) capability',
                            'sortIndex': '130'
                        },
                        'reportFrequency': {
                            'description': 'If it applies, what is the frequency of report dissemination for analyzed data? Who are the reports for? (e.g., CDC, general public, etc.,).',
                            'displayLabel': 'Report Frequency',
                            'sortIndex': '131'
                        },
                        'city': {
                            'description': 'City location of the program',
                            'displayLabel': 'Location - City',
                            'sortIndex': '137'
                        },
                        'state': {
                            'description': 'State location of the program',
                            'displayLabel': 'Location - State',
                            'sortIndex': '138'
                        }
                    }
                },
                'Technical Information': {
                    'heading': 'Technical Information',
                    'sortIndex': '3',
                    'attributes': {
                        'applicationSolutionType': {
                            'description': 'Is the tool based on a commercial off-the-shelf (COTS) solution or is it custom built?',
                            'displayLabel': 'Application Solution Type',
                            'sortIndex': '124'
                        },
                        'applicationPlatform': {
                            'description': 'What platform, if any, is used for the tool (e.g., web, mobile, desktop application, paper-based, etc.)?',
                            'displayLabel': 'Application Platform',
                            'sortIndex': '125'
                        },
                        'operatingSystemPlatform': {
                            'description': 'If it applies, what operating system(s) is used for the tool (e.g., Linux, Mac OS, Microsoft Windows, etc.)?',
                            'displayLabel': 'Platform - Operating System',
                            'sortIndex': '126'
                        },
                        'databaseTechnology': {
                            'description': 'If it applies, what database platform(s) is used in the tool (e.g., Oracle, Microsoft SQL Server, Microsoft Access, etc.)?',
                            'displayLabel': 'Database Technology',
                            'sortIndex': '127'
                        }
                    }
                },
                'Data-Related Information': {
                    'heading': 'Data-Related Information',
                    'sortIndex': '4',
                    'attributes': {
                        'startDateGeneration': {
                            'description': 'What was the first year data became available or were collected from the tool?',
                            'displayLabel': 'Start Data Generation',
                            'sortIndex': '111'
                        },
                        'dataProvidersManual': {
                            'description': 'The manually-provided sources of data for this tool (e.g., postal mail, phone).',
                            'displayLabel': 'Data Providers - Manual',
                            'sortIndex': '116'
                        },
                        'dataProvidersElectronic': {
                            'description': 'The electronically-provided sources of data for this tool (e.g., web-based, FTP, electronic messaging).',
                            'displayLabel': 'Data Providers - Electronic',
                            'sortIndex': '117'
                        },
                        'dataRecipientsManual': {
                            'description': 'The manually-provided recipients of data for this surveillance system (e.g., postal mail, phone).',
                            'displayLabel': 'Data Recipients - Manual',
                            'sortIndex': '118'
                        },
                        'dataRecipientsElectronic': {
                            'description': 'The electronically-provided recipients of data for this surveillance system (e.g., web-based, FTP, electronic messaging).',
                            'displayLabel': 'Data Recipients - Electronic',
                            'sortIndex': '119'
                        },
                        'patientTrackingCapability': {
                            'description': 'Can the tool track patient-level data to support an authorized public health investigation?',
                            'displayLabel': 'Patient Tracking Capability',
                            'sortIndex': '120'
                        },
                        'ageFormat': {
                            'description': 'If it is collected, how is age collected in this tool?  (e.g., year cohorts, complete or partial birth date).',
                            'displayLabel': 'Age Format',
                            'sortIndex': '122'
                        },
                        'dataPayloadFormat': {
                            'description': 'If information is transmitted electronically in the tool, how is it structured/organized? (e.g., HL7 v3, HL7 v2.X, CDA, ebXML, JSON, SOAP, etc.)',
                            'displayLabel': 'Data Payload Format',
                            'sortIndex': '128'
                        },
                        'dataPayloadTransmissionType': {
                            'description': 'If information is transmitted as part of the tool, how is it carried out? (e.g., postal mail, email, FTP, web services, eFax, EDI, etc.)',
                            'displayLabel': 'Data Payload Transmission Type',
                            'sortIndex': '129'
                        }
                    }
                },
                'Contact Information': {
                    'heading': 'Contact Information',
                    'sortIndex': '5',
                    'attributes': {
                        'contactName': {
                            'description': 'Person who is the best to contact for more information',
                            'displayLabel': 'Contact Name',
                            'sortIndex': '139'
                        },
                        'contactEmail': {
                            'description': 'email address',
                            'displayLabel': 'Contact Email',
                            'sortIndex': '140'
                        },
                        'contactPhone': {
                            'description': 'Phone number',
                            'displayLabel': 'Contact Phone',
                            'sortIndex': '141'
                        }
                    }
                },
                'Other Information': {
                    'heading': 'Other Information',
                    'sortIndex': '6',
                    'attributes': {
                        'evaluationDate': {
                            'description': 'If available, please provide the date of the tool\'s most recent formal evaluation.',
                            'displayLabel': ' Evaluation Date',
                            'sortIndex': '132'
                        },
                        'evaluationDetails': {
                            'description': 'If an evaluation was performed, what categories/areas of the tool were examined? (e.g., flexibility, data quality, timeliness, stability, etc.,).',
                            'displayLabel': 'Evaluation Details',
                            'sortIndex': '133'
                        },
                        'fundingSource': {
                            'description': 'Does the tool compete internally to CDC for funding?  Does the program receive funds specifically appropriated by Congress?',
                            'displayLabel': 'Funding Source',
                            'sortIndex': '134'
                        },
                        'fundingLevels': {
                            'description': 'Provide funding levels (in development).',
                            'displayLabel': 'Funding Levels',
                            'sortIndex': '135'
                        },
                        'nationalBiosurveillanceStrategyMapping': {
                            'description': 'Does the tool map to one or more of the priorities described in the National Biosurveillance Strategy for Human Health? (e.g., Biosurveillance Workforce of the future, etc.)',
                            'displayLabel': 'National Biosurveillance Strategy Mapping',
                            'sortIndex': '136'
                        },
                        'Notes': {
                            'description': 'Please add any relevant information that may be of use.',
                            'displayLabel': 'Notes / Other information',
                            'sortIndex': '142'
                        }
                    }
                }
            }
        },
        'Registry': {
            'attributeGroups': {
                'Summary': {
                    'heading': 'Summary',
                    'sortIndex': '1',
                    'attributes': {
                        'name': {
                            'description': 'Name',
                            'displayLabel': 'Name',
                            'sortIndex': '143'
                        },
                        'id': {
                            'description': 'Identifier',
                            'displayLabel': 'ID',
                            'sortIndex': '144'
                        },
                        'purpose': {
                            'description': 'Provide an overview of the purpose of the registry',
                            'displayLabel': 'Purpose / Summary',
                            'sortIndex': '150'
                        }
                    }
                },
                'General Information': {
                    'heading': 'General Information',
                    'sortIndex': '2',
                    'attributes': {
                        'lastUpdated': {
                            'description': 'Date of last update to information in this registry.',
                            'displayLabel': 'Last Updated',
                            'sortIndex': '145'
                        },
                        'informationValidated': {
                            'description': 'Has the information in this registry been validated by an appropriate program / team?',
                            'displayLabel': 'Information Validated by Program',
                            'sortIndex': '146'
                        },
                        'fullName': {
                            'description': 'Full name of the registry',
                            'displayLabel': 'Full Name',
                            'sortIndex': '147'
                        },
                        'shortName': {
                            'description': 'Abbreviation or Acronym of the registry',
                            'displayLabel': 'Short Name / Acronym',
                            'sortIndex': '148'
                        },
                        'registryType': {
                            'description': 'Does the registry focus on Surveillance or Research?',
                            'displayLabel': 'Registry Type',
                            'sortIndex': '149'
                        },
                        'webResource': {
                            'description': 'Where can someone find out more information about this registry on the web?',
                            'displayLabel': 'Web Resource',
                            'sortIndex': '151'
                        },
                        'operationalStatus': {
                            'description': 'What is the current operational status of the registry? (e.g., Is it planned for future development? Is it under development, but not yet operational? Is it partially operational and implemented?  Is it fully operational and Implemented?  Is it retired?)',
                            'displayLabel': 'Operational Status',
                            'sortIndex': '152'
                        },
                        'startDate': {
                            'description': 'What was the first year the registry became operational?',
                            'displayLabel': 'Start Date',
                            'sortIndex': '153'
                        },
                        'surveillanceType': {
                            'description': 'What type of surveillance is done by the registry (e.g., sentinel surveillance, case-based surveillance, individual or summary, etc.,)?',
                            'displayLabel': 'Surveillance Type',
                            'sortIndex': '155'
                        },
                        'surveillanceDomain': {
                            'description': 'What general area (e.g., human, animal, food, etc.) as well as specific area (e.g., Asthma, HIV, Diphtheria, Plutonium exposure, etc.) does the registry focus on?',
                            'displayLabel': 'Surveillance Domain',
                            'sortIndex': '156'
                        },
                        'conditionsUnderSurveillance': {
                            'description': 'What specific diseases, conditions, or other public health issues are being addressed by the registry?',
                            'displayLabel': 'Conditions under Surveillance',
                            'sortIndex': '157'
                        },
                        'geographicCoverageArea': {
                            'description': 'What geographic areas are covered by the registry?',
                            'displayLabel': 'Geographic Coverage Area',
                            'sortIndex': '158'
                        },
                        'overallCapability': {
                            'description': 'If the registry has an electronic component, what are its capabilities?  (e.g., can it receive data, send data, analyze data, generate reports, send alerts, etc.).',
                            'displayLabel': 'Overal Capability',
                            'sortIndex': '164'
                        },
                        'specialPopulations': {
                            'description': 'Does the registry focus on a particular population/cohort? (e.g., children, elderly, adolescents, disability, pregnant, etc.).',
                            'displayLabel': 'Special Populations',
                            'sortIndex': '166'
                        },
                        'avrCapability': {
                            'description': 'If the registry has analysis, visualization, and reporting (AVR) capability, what are its specific capabilities (e.g., chart generation, map generation, ad-hoc reports, etc.).',
                            'displayLabel': 'Analysis, Visualization, and Reporting (AVR) capability',
                            'sortIndex': '173'
                        },
                        'reportFrequency': {
                            'description': 'If it applies, what is the frequency of report dissemination for analyzed data? Who are the reports for? (e.g., CDC, general public, etc.,).',
                            'displayLabel': 'Report Frequency',
                            'sortIndex': '174'
                        },
                        'city': {
                            'description': 'City location of registry',
                            'displayLabel': 'Location - City',
                            'sortIndex': '180'
                        },
                        'state': {
                            'description': 'State location of registry',
                            'displayLabel': 'Location - State',
                            'sortIndex': '181'
                        }
                    }
                },
                'Technical Information': {
                    'heading': 'Technical Information',
                    'sortIndex': '3',
                    'attributes': {
                        'applicationSolutionType': {
                            'description': 'Is the registry based on a commercial off-the-shelf (COTS) solution or is it custom built?',
                            'displayLabel': 'Application Solution Type',
                            'sortIndex': '167'
                        },
                        'applicationPlatform': {
                            'description': 'What platform, if any, is used for the registry (e.g., web, mobile, desktop application, paper-based, etc.)?',
                            'displayLabel': 'Application Platform',
                            'sortIndex': '168'
                        },
                        'operatingSystemPlatform': {
                            'description': 'If it applies, what operating system(s) is used for the registry (e.g., Linux, Mac OS, Microsoft Windows, etc.)?',
                            'displayLabel': 'Platform - Operating System',
                            'sortIndex': '169'
                        },
                        'databaseTechnology': {
                            'description': 'If it applies, what database platform(s) is used in the registry (e.g., Oracle, Microsoft SQL Server, Microsoft Access, etc.)?',
                            'displayLabel': 'Database Technology',
                            'sortIndex': '170'
                        }
                    }
                },
                'Data-Related Information': {
                    'heading': 'Data-Related Information',
                    'sortIndex': '4',
                    'attributes': {
                        'startDateGeneration': {
                            'description': 'What was the first year data became available or were collected from the registry?',
                            'displayLabel': 'Start Data Generation',
                            'sortIndex': '154'
                        },
                        'dataProvidersManual': {
                            'description': 'The manually-provided sources of data for this registry (e.g., postal mail, phone).',
                            'displayLabel': 'Data Providers - Manual',
                            'sortIndex': '159'
                        },
                        'dataProvidersElectronic': {
                            'description': 'The electronically-provided sources of data for this registry (e.g., web-based, FTP, electronic messaging).',
                            'displayLabel': 'Data Providers - Electronic',
                            'sortIndex': '160'
                        },
                        'dataRecipientsManual': {
                            'description': 'The manually-provided recipients of data for this registry (e.g., postal mail, phone).',
                            'displayLabel': 'Data Recipients - Manual',
                            'sortIndex': '161'
                        },
                        'dataRecipientsElectronic': {
                            'description': 'The electronically-provided recipients of data for this registry (e.g., web-based, FTP, electronic messaging).',
                            'displayLabel': 'Data Recipients - Electronic',
                            'sortIndex': '162'
                        },
                        'patientTrackingCapability': {
                            'description': 'Can the registry track patient-level data to support an authorized public health investigation?',
                            'displayLabel': 'Patient Tracking Capability',
                            'sortIndex': '163'
                        },
                        'ageFormat': {
                            'description': 'If it is collected, how is age collected in this registry?  (e.g., year cohorts, complete or partial birth date).',
                            'displayLabel': 'Age Format',
                            'sortIndex': '165'
                        },
                        'dataPayloadFormat': {
                            'description': 'If information is transmitted electronically in the registry, how is it structured/organized? (e.g., HL7 v3, HL7 v2.X, CDA, ebXML, JSON, SOAP, etc.)',
                            'displayLabel': 'Data Payload Format',
                            'sortIndex': '171'
                        },
                        'dataPayloadTransmissionType': {
                            'description': 'If information is transmitted as part of the registry, how is it carried out? (e.g., postal mail, email, FTP, web services, eFax, EDI, etc.)',
                            'displayLabel': 'Data Payload Transmission Type',
                            'sortIndex': '172'
                        }
                    }
                },
                'Contact Information': {
                    'heading': 'Contact Information',
                    'sortIndex': '5',
                    'attributes': {
                        'contactName': {
                            'description': 'Person who is the best to contact for more information',
                            'displayLabel': 'Contact Name',
                            'sortIndex': '182'
                        },
                        'contactEmail': {
                            'description': 'email address',
                            'displayLabel': 'Contact Email',
                            'sortIndex': '183'
                        },
                        'contactPhone': {
                            'description': 'Phone number',
                            'displayLabel': 'Contact Phone',
                            'sortIndex': '184'
                        }
                    }
                },
                'Other Information': {
                    'heading': 'Other Information',
                    'sortIndex': '6',
                    'attributes': {
                        'evaluationDate': {
                            'description': 'If available, please provide the date of the registry\'s most recent formal evaluation.',
                            'displayLabel': ' Evaluation Date',
                            'sortIndex': '175'
                        },
                        'evaluationDetails': {
                            'description': 'If an evaluation was performed, what categories/areas of the registry were examined? (e.g., flexibility, data quality, timeliness, stability, etc.,).',
                            'displayLabel': 'Evaluation Details',
                            'sortIndex': '176'
                        },
                        'fundingSource': {
                            'description': 'Does the registry compete internally to CDC for funding?  Does the program receive funds specifically appropriated by Congress?',
                            'displayLabel': 'Funding Source',
                            'sortIndex': '177'
                        },
                        'fundingLevels': {
                            'description': 'Provide funding levels (in development).',
                            'displayLabel': 'Funding Levels',
                            'sortIndex': '178'
                        },
                        'nationalBiosurveillanceStrategyMapping': {
                            'description': 'Does the registry map to one or more of the priorities described in the National Biosurveillance Strategy for Human Health? (e.g., Biosurveillance Workforce of the future, etc.)',
                            'displayLabel': 'National Biosurveillance Strategy Mapping',
                            'sortIndex': '179'
                        },
                        'Notes': {
                            'description': 'Please add any relevant information that may be of use.',
                            'displayLabel': 'Notes / Other information',
                            'sortIndex': '185'
                        }
                    }
                }
            }
        },
        'HealthSurvey': {
            'attributeGroups': {
                'Summary': {
                    'heading': 'Summary',
                    'sortIndex': '1',
                    'attributes': {
                        'name': {
                            'description': 'Name',
                            'displayLabel': 'Name',
                            'sortIndex': '186'
                        },
                        'id': {
                            'description': 'Identifier',
                            'displayLabel': 'ID',
                            'sortIndex': '187'
                        },
                        'purpose': {
                            'description': 'Provide an overview of the purpose of the heath survey',
                            'displayLabel': 'Purpose / Summary',
                            'sortIndex': '192'
                        }
                    }
                },
                'General Information': {
                    'heading': 'General Information',
                    'sortIndex': '2',
                    'attributes': {
                        'lastUpdated': {
                            'description': 'Date of last update to information in this heath survey.',
                            'displayLabel': 'Last Updated',
                            'sortIndex': '188'
                        },
                        'informationValidated': {
                            'description': 'Has the information in this heath survey been validated by an appropriate program / team?',
                            'displayLabel': 'Information Validated by Program',
                            'sortIndex': '189'
                        },
                        'fullName': {
                            'description': 'Full name of the heath survey',
                            'displayLabel': 'Full Name',
                            'sortIndex': '190'
                        },
                        'shortName': {
                            'description': 'Abbreviation or Acronym of the heath survey',
                            'displayLabel': 'Short Name / Acronym',
                            'sortIndex': '191'
                        },
                        'webResource': {
                            'description': 'Where can someone find out more information about this heath survey on the web?',
                            'displayLabel': 'Web Resource',
                            'sortIndex': '193'
                        },
                        'operationalStatus': {
                            'description': 'What is the current operational status of the heath survey? (e.g., Is it planned for future development? Is it under development, but not yet operational? Is it partially operational and implemented?  Is it fully operational and Implemented?  Is it retired?)',
                            'displayLabel': 'Operational Status',
                            'sortIndex': '194'
                        },
                        'startDate': {
                            'description': 'What was the first year the heath survey became operational?',
                            'displayLabel': 'Start Date',
                            'sortIndex': '195'
                        },
                        'surveillanceType': {
                            'description': 'What type of surveillance is done by the heath survey (e.g., sentinel surveillance, case-based surveillance, individual or summary, etc.,)?',
                            'displayLabel': 'Surveillance Type',
                            'sortIndex': '197'
                        },
                        'surveillanceDomain': {
                            'description': 'What general area (e.g., human, animal, food, etc.) as well as specific area (e.g., Asthma, HIV, Diphtheria, Plutonium exposure, etc.) does the heath survey focus on?',
                            'displayLabel': 'Surveillance Domain',
                            'sortIndex': '198'
                        },
                        'conditionsUnderSurveillance': {
                            'description': 'What specific diseases, conditions, or other public health issues are being addressed by the heath survey?',
                            'displayLabel': 'Conditions under Surveillance',
                            'sortIndex': '199'
                        },
                        'geographicCoverageArea': {
                            'description': 'What geographic areas are covered by the heath survey?',
                            'displayLabel': 'Geographic Coverage Area',
                            'sortIndex': '200'
                        },
                        'overallCapability': {
                            'description': 'If the heath survey has an electronic component, what are its capabilities?  (e.g., can it receive data, send data, analyze data, generate reports, send alerts, etc.).',
                            'displayLabel': 'Overall Capability',
                            'sortIndex': '206'
                        },
                        'specialPopulations': {
                            'description': 'Does the heath survey focus on a particular population/cohort? (e.g., children, elderly, adolescents, disability, pregnant, etc.).',
                            'displayLabel': 'Special Populations',
                            'sortIndex': '208'
                        },
                        'avrCapability': {
                            'description': 'If the heath survey has analysis, visualization, and reporting (AVR) capability, what are its specific capabilities (e.g., chart generation, map generation, ad-hoc reports, etc.).',
                            'displayLabel': 'Analysis, Visualization, and Reporting (AVR) capability',
                            'sortIndex': '215'
                        },
                        'reportFrequency': {
                            'description': 'If it applies, what is the frequency of report dissemination for analyzed data? Who are the reports for? (e.g., CDC, general public, etc.,).',
                            'displayLabel': 'Report Frequency',
                            'sortIndex': '216'
                        },
                        'city': {
                            'description': 'City location of the health survey',
                            'displayLabel': 'Location - City',
                            'sortIndex': '222'
                        },
                        'state': {
                            'description': 'State location of the health survey',
                            'displayLabel': 'Location - State',
                            'sortIndex': '223'
                        }
                    }
                },
                'Technical Information': {
                    'heading': 'Technical Information',
                    'sortIndex': '3',
                    'attributes': {
                        'applicationSolutionType': {
                            'description': 'Is the heath survey based on a commercial off-the-shelf (COTS) solution or is it custom built?',
                            'displayLabel': 'Application Solution Type',
                            'sortIndex': '209'
                        },
                        'applicationPlatform': {
                            'description': 'What platform, if any, is used for the heath survey (e.g., web, mobile, desktop application, paper-based, etc.)?',
                            'displayLabel': 'Application Platform',
                            'sortIndex': '210'
                        },
                        'operatingSystemPlatform': {
                            'description': 'If it applies, what operating system(s) is used for the heath survey (e.g., Linux, Mac OS, Microsoft Windows, etc.)?',
                            'displayLabel': 'Platform - Operating System',
                            'sortIndex': '211'
                        },
                        'databaseTechnology': {
                            'description': 'If it applies, what database platform(s) is used in the heath survey (e.g., Oracle, Microsoft SQL Server, Microsoft Access, etc.)?',
                            'displayLabel': 'Database Technology',
                            'sortIndex': '212'
                        }
                    }
                },
                'Data-Related Information': {
                    'heading': 'Data-Related Information',
                    'sortIndex': '4',
                    'attributes': {
                        'startDateGeneration': {
                            'description': 'What was the first year data became available or were collected from the heath survey?',
                            'displayLabel': 'Start Data Generation',
                            'sortIndex': '196'
                        },
                        'dataProvidersManual': {
                            'description': 'The manually-provided sources of data for this heath survey (e.g., postal mail, phone).',
                            'displayLabel': 'Data Providers - Manual',
                            'sortIndex': '201'
                        },
                        'dataProvidersElectronic': {
                            'description': 'The electronically-provided sources of data for this heath survey (e.g., web-based, FTP, electronic messaging).',
                            'displayLabel': 'Data Providers - Electronic',
                            'sortIndex': '202'
                        },
                        'dataRecipientsManual': {
                            'description': 'The manually-provided recipients of data for this heath survey (e.g., postal mail, phone).',
                            'displayLabel': 'Data Recipients - Manual',
                            'sortIndex': '203'
                        },
                        'dataRecipientsElectronic': {
                            'description': 'The electronically-provided recipients of data for this heath survey (e.g., web-based, FTP, electronic messaging).',
                            'displayLabel': 'Data Recipients - Electronic',
                            'sortIndex': '204'
                        },
                        'patientTrackingCapability': {
                            'description': 'Can the heath survey track patient-level data to support an authorized public health investigation?',
                            'displayLabel': 'Patient Tracking Capability',
                            'sortIndex': '205'
                        },
                        'ageFormat': {
                            'description': 'If it is collected, how is age collected in this heath survey?  (e.g., year cohorts, complete or partial birth date).',
                            'displayLabel': 'Age Format',
                            'sortIndex': '207'
                        },
                        'dataPayloadFormat': {
                            'description': 'If information is transmitted electronically in the heath survey, how is it structured/organized? (e.g., HL7 v3, HL7 v2.X, CDA, ebXML, JSON, SOAP, etc.)',
                            'displayLabel': 'Data Payload Format',
                            'sortIndex': '213'
                        },
                        'dataPayloadTransmissionType': {
                            'description': 'If information is transmitted as part of the heath survey, how is it carried out? (e.g., postal mail, email, FTP, web services, eFax, EDI, etc.)',
                            'displayLabel': 'Data Payload Transmission Type',
                            'sortIndex': '214'
                        }
                    }
                },
                'Contact Information': {
                    'heading': 'Contact Information',
                    'sortIndex': '5',
                    'attributes': {
                        'contactName': {
                            'description': 'Person who is the best to contact for more information',
                            'displayLabel': 'Contact Name',
                            'sortIndex': '224'
                        },
                        'contactEmail': {
                            'description': 'email address',
                            'displayLabel': 'Contact Email',
                            'sortIndex': '225'
                        },
                        'contactPhone': {
                            'description': 'Phone number',
                            'displayLabel': 'Contact Phone',
                            'sortIndex': '226'
                        }
                    }
                },
                'Other Information': {
                    'heading': 'Other Information',
                    'sortIndex': '6',
                    'attributes': {
                        'evaluationDate': {
                            'description': 'If available, please provide the date of the heath survey\'s most recent formal evaluation.',
                            'displayLabel': ' Evaluation Date',
                            'sortIndex': '217'
                        },
                        'evaluationDetails': {
                            'description': 'If an evaluation was performed, what categories/areas of the heath survey were examined? (e.g., flexibility, data quality, timeliness, stability, etc.,).',
                            'displayLabel': 'Evaluation Details',
                            'sortIndex': '218'
                        },
                        'fundingSource': {
                            'description': 'Does the heath survey compete internally to CDC for funding?  Does the program receive funds specifically appropriated by Congress?',
                            'displayLabel': 'Funding Source',
                            'sortIndex': '219'
                        },
                        'fundingLevels': {
                            'description': 'Provide funding levels (in development).',
                            'displayLabel': 'Funding Levels',
                            'sortIndex': '220'
                        },
                        'nationalBiosurveillanceStrategyMapping': {
                            'description': 'Does the heath survey map to one or more of the priorities described in the National Biosurveillance Strategy for Human Health? (e.g., Biosurveillance Workforce of the future, etc.)',
                            'displayLabel': 'National Biosurveillance Strategy Mapping',
                            'sortIndex': '221'
                        },
                        'Notes': {
                            'description': 'Please add any relevant information that may be of use.',
                            'displayLabel': 'Notes / Other information',
                            'sortIndex': '227'
                        }
                    }
                }
            }
        },
        'Collaborative': {
            'attributeGroups': {
                'Summary': {
                    'heading': 'Summary',
                    'sortIndex': '1',
                    'attributes': {
                        'name': {
                            'description': 'Name',
                            'displayLabel': 'Name',
                            'sortIndex': '228'
                        },
                        'id': {
                            'description': 'Identifier',
                            'displayLabel': 'ID',
                            'sortIndex': '229'
                        },
                        'purpose': {
                            'description': 'Provide an overview of the purpose of the collaborative',
                            'displayLabel': 'Mission / Summary / Purpose',
                            'sortIndex': '234'
                        }
                    }
                },
                'General Information': {
                    'heading': 'General Information',
                    'sortIndex': '2',
                    'attributes': {
                        'lastUpdated': {
                            'description': 'Date of last update to information in this collaborative.',
                            'displayLabel': 'Last Updated',
                            'sortIndex': '230'
                        },
                        'informationValidated': {
                            'description': 'Has the information in this collaborative been validated by an appropriate program / team?',
                            'displayLabel': 'Information Validated by Program',
                            'sortIndex': '231'
                        },
                        'fullName': {
                            'description': 'Full name of the collaborative',
                            'displayLabel': 'Full Name',
                            'sortIndex': '232'
                        },
                        'shortName': {
                            'description': 'Abbreviation or Acronym of the collaborative',
                            'displayLabel': 'Short Name',
                            'sortIndex': '233'
                        },
                        'webResource': {
                            'description': 'Where can someone find out more information about this surveillance system on the web?',
                            'displayLabel': 'Web Resource',
                            'sortIndex': '234'
                        },
                        'operationStartDate': {
                            'description': 'What was the first year the collaborative became operational?',
                            'displayLabel': 'Operation Start Date',
                            'sortIndex': '235'
                        },
                        'operationalStatus': {
                            'description': 'What is the current operational status of the collaborative? (e.g., Is it planned for future development? Is it under development, but not yet operational? Is it partially operational and implemented?  Is it fully operational and Implemented?  Is it retired?)',
                            'displayLabel': 'Operational Status',
                            'sortIndex': '236'
                        },
                        'collaborativeParticipants': {
                            'description': 'The names of the organizations participating in the collaborative',
                            'displayLabel': 'Collaborative Participants',
                            'sortIndex': '237'
                        },
                        'surveillanceDomain': {
                            'description': 'What general area (e.g., human, animal, food, etc.) as well as specific area (e.g., Asthma, HIV, Diphtheria, Plutonium exposure, etc.) does the collaborative focus on?',
                            'displayLabel': 'Surveillance Domain',
                            'sortIndex': '238'
                        },
                        'conditionsUnderSurveillance': {
                            'description': 'What specific diseases, conditions, or other public health issues are being addressed by the collaborative?',
                            'displayLabel': 'Condition (under surveillance)',
                            'sortIndex': '239'
                        },
                        'geographicCoverageArea': {
                            'description': 'What geographic areas are covered by the collaborative?',
                            'displayLabel': 'Geographic Coverage',
                            'sortIndex': '240'
                        }
                    }
                },
                'Data-Related Information': {
                    'heading': 'Data-Related Information',
                    'sortIndex': '4',
                    'attributes': {
                        'startDateGeneration': {
                            'description': 'What was the first year data became available or were collected from the program?',
                            'displayLabel': 'Start Data Collection / Generation',
                            'sortIndex': '241'
                        },
                        'dataProvidersManual': {
                            'description': 'The manually-provided sources of data for this collaborative (e.g., postal mail, phone).',
                            'displayLabel': 'Data Providers - Manual',
                            'sortIndex': '242'
                        },
                        'dataProvidersElectronic': {
                            'description': 'The electronically-provided sources of data for this collaborative (e.g., web-based, FTP, electronic messaging).',
                            'displayLabel': 'Data Providers - Electronic',
                            'sortIndex': '243'
                        },
                        'dataRecipientsManual': {
                            'description': 'The manually-provided recipients of data for this collaborative (e.g., postal mail, phone).',
                            'displayLabel': 'Data Recipients - Manual',
                            'sortIndex': '244'
                        },
                        'dataRecipientsElectronic': {
                            'description': 'The electronically-provided recipients of data for this collaborative (e.g., web-based, FTP, electronic messaging).',
                            'displayLabel': 'Data Recipients - Electronic',
                            'sortIndex': '244.1'
                        },
                        'patientTrackingCapability': {
                            'description': 'Can the program track patient-level data to support an authorized public health investigation?',
                            'displayLabel': 'Patient Tracking Capability',
                            'sortIndex': '244.2'
                        },
                        'ageFormat': {
                            'description': 'If it is collected, how is age collected in this program?  (e.g., year cohorts, complete or partial birth date).',
                            'displayLabel': 'Age Format',
                            'sortIndex': '244.3'
                        },
                        'dataPayloadFormat': {
                            'description': 'If information is transmitted electronically in the program, how is it structured/organized? (e.g., HL7 v3, HL7 v2.X, CDA, ebXML, JSON, SOAP, etc.)',
                            'displayLabel': 'Data Payload Format',
                            'sortIndex': '244.4'
                        },
                        'dataPayloadTransmissionType': {
                            'description': 'If information is transmitted as part of the program, how is it carried out? (e.g., postal mail, email, FTP, web services, eFax, EDI, etc.)',
                            'displayLabel': 'Data Payload Transmission Type',
                            'sortIndex': '244.5'
                        }
                    }
                },
                'Contact Information': {
                    'heading': 'Contact Information',
                    'sortIndex': '5',
                    'attributes': {
                        'contactName': {
                            'description': 'Person who is the best to contact for more information',
                            'displayLabel': ' Contact Name',
                            'sortIndex': '245'
                        },
                        'contactEmail': {
                            'description': 'email address',
                            'displayLabel': ' Contact Email',
                            'sortIndex': '246'
                        },
                        'contactPhone': {
                            'description': 'Phone number',
                            'displayLabel': 'Contact Phone',
                            'sortIndex': '247'
                        }
                    }
                },
                'Other Information': {
                    'heading': 'Other Information',
                    'sortIndex': '6',
                    'attributes': {
                        'Notes': {
                            'description': 'Please add any relevant information that may be of use.',
                            'displayLabel': 'Notes / Other information',
                            'sortIndex': '248'
                        }
                    }
                }
            }
        },
        'Dataset': {
            'attributeGroups': {
                'Summary': {
                    'heading': 'Summary',
                    'sortIndex': '1',
                    'attributes': {
                        'name': {
                            'description': 'Name',
                            'displayLabel': 'Name',
                            'sortIndex': '249'
                        },
                        'id': {
                            'description': 'Identifier',
                            'displayLabel': 'ID',
                            'sortIndex': '250'
                        },
                        'description': {
                            'description': 'An overview / summary of what the dataset contains / provides',
                            'displayLabel': 'Description / Summary',
                            'sortIndex': '255'
                        }
                    }
                },
                'General Information': {
                    'heading': 'General Information',
                    'sortIndex': '2',
                    'attributes': {
                        'lastUpdated': {
                            'description': 'Date of last update to information in this dataset.',
                            'displayLabel': 'Last Updated',
                            'sortIndex': '251'
                        },
                        'informationValidated': {
                            'description': 'Has the information in this dataset been validated by an appropriate program / team?',
                            'displayLabel': 'Information Validated by Program',
                            'sortIndex': '252'
                        },
                        'fullName': {
                            'description': 'Full name of the dataset',
                            'displayLabel': 'Full Name',
                            'sortIndex': '253'
                        },
                        'shortName': {
                            'description': 'Abbreviation or Acronym of the dataset',
                            'displayLabel': 'Short Name',
                            'sortIndex': '254'
                        },
                        'currentlyAvailable': {
                            'description': 'Is the dataset currently available?',
                            'displayLabel': 'Currently Available?',
                            'sortIndex': '259'
                        },
                        'data.govLink': {
                            'description': 'This is a link to the dataset on data.gov',
                            'displayLabel': 'Data.gov Link',
                            'sortIndex': '260'
                        },
                        'fileName': {
                            'description': 'if it applies, what is the name of the digital file of the dataset',
                            'displayLabel': 'File Name',
                            'sortIndex': '261'
                        },
                        'fileLocation': {
                            'description': 'if it applies, what is the location of the digital file of the dataset',
                            'displayLabel': 'File Location / Path',
                            'sortIndex': '262'
                        }
                    }
                },
                'Data-Related Information': {
                    'heading': 'Data-Related Information',
                    'sortIndex': '4',
                    'attributes': {
                        'startDate': {
                            'description': 'When did data start being collected for this dataset?',
                            'displayLabel': 'Start Date',
                            'sortIndex': '256'
                        },
                        'endDate': {
                            'description': 'When did data stop being collected for this dataset?',
                            'displayLabel': 'End Date',
                            'sortIndex': '257'
                        },
                        'dataUpdateFrequency': {
                            'description': 'If data is updated in the dataset on a regular basis, how often does it occur?',
                            'displayLabel': 'Data Update Frequency',
                            'sortIndex': '258'
                        },
                        'dataCategoryTypes': {
                            'description': 'What general types of data are in this dataset (demographics, outcome data, vital statistics, etc)?',
                            'displayLabel': 'Data Category types',
                            'sortIndex': '266'
                        },
                        'dataFormat': {
                            'description': 'What is the format of the dataset (paper,  spreadsheet, SAS file, MS Word Document, Text file, etc.)?',
                            'displayLabel': 'Data Format',
                            'sortIndex': '267'
                        }
                    }
                },
                'Contact Information': {
                    'heading': 'Contact Information',
                    'sortIndex': '5',
                    'attributes': {
                        'nameContact': {
                            'description': 'Person who is the best to contact for more information',
                            'displayLabel': 'Name - Contact',
                            'sortIndex': '263'
                        },
                        'emailContact': {
                            'description': 'email address',
                            'displayLabel': 'email - Contact',
                            'sortIndex': '264'
                        },
                        'phoneContact': {
                            'description': 'Phone number',
                            'displayLabel': 'phone - contact',
                            'sortIndex': '265'
                        }
                    }
                }
            }
        },
        'DataStandard': {
            'attributeGroups': {
                'Summary': {
                    'heading': 'Summary',
                    'sortIndex': '1',
                    'attributes': {
                        'name': {
                            'description': 'Name',
                            'displayLabel': 'Name',
                            'sortIndex': '268'
                        },
                        'id': {
                            'description': 'Identifier',
                            'displayLabel': 'ID',
                            'sortIndex': '269'
                        },
                        'description': {
                            'description': 'Abbreviation or Acronym of the data standard',
                            'displayLabel': 'Description',
                            'sortIndex': '274'
                        }
                    }
                },
                'General Information': {
                    'heading': 'General Information',
                    'sortIndex': '2',
                    'attributes': {
                        'lastUpdated': {
                            'description': 'Date of last update to information in this data standard.',
                            'displayLabel': 'Last Updated',
                            'sortIndex': '270'
                        },
                        'informationValidated': {
                            'description': 'Has the information in this data standard been validated by an appropriate program / team?',
                            'displayLabel': 'Information Validated by Program',
                            'sortIndex': '271'
                        },
                        'terminologyShortName': {
                            'description': '',
                            'displayLabel': 'Terminology / Coding System / Controlled Vocabulary SHORT Name',
                            'sortIndex': '272'
                        },
                        'terminologyFullName': {
                            'description': 'Full name of the data standard',
                            'displayLabel': 'Terminology / Coding System / Controlled Vocabulary FULL Name',
                            'sortIndex': '273'
                        },
                        'terminoloyId': {
                            'description': 'The unique identifier (ID) for the data standard (e.g., LOINC OID: 2.16.840.1.113883.6.1)',
                            'displayLabel': 'Terminology / Coding System / Controlled Vocabulary  ID (or Object Identifier- OID)',
                            'sortIndex': '275'
                        },
                        'terminologyVersionNumber': {
                            'description': 'The version number of the data standard.(e.g., LOINC 2.46).',
                            'displayLabel': 'Terminology / Coding System / Controlled Vocabulary version number',
                            'sortIndex': '276'
                        },
                        'licenseType': {
                            'description': 'What type of license does this data standard use? (e.g.,free)',
                            'displayLabel': 'License type',
                            'sortIndex': '277'
                        },
                        'referenceUrl': {
                            'description': 'What is the link to the data standard (e.g., LOINC.org).',
                            'displayLabel': 'Reference URL',
                            'sortIndex': '278'
                        },
                        'notes': {
                            'description': 'Please add any relevant information that may be of use.',
                            'displayLabel': 'Notes',
                            'sortIndex': '279'
                        }
                    }
                }
            }
        },
        'Tag': {
            'attributeGroups': {
                'Summary': {
                    'heading': 'Summary',
                    'sortIndex': '1',
                    'attributes': {
                        'name': {
                            'description': 'Name',
                            'displayLabel': 'Name',
                            'sortIndex': '280'
                        },
                        'id': {
                            'description': 'Identifier',
                            'displayLabel': 'ID',
                            'sortIndex': '281'
                        }
                    }
                },
                'General Information': {
                    'heading': 'General Information',
                    'sortIndex': '2',
                    'attributes': {
                        'tagRelationship': {
                            'description': 'Denotes the tagging relationship between the core and tag nodes.',
                            'displayLabel': 'Tag Relationship',
                            'sortIndex': '282'
                        }
                    }
                }
            }
        }
    };
});
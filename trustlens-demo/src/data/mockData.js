// =============================================================================
// MOCK FILE SYSTEM
// =============================================================================
// This simulates an enterprise document repository.
// Each file has metadata about what content it contains for demo purposes.
//
// CONTENT TAGS (used to determine relevance):
// - "react"           → Contains React experience/skills info
// - "python"          → Contains Python experience/skills info  
// - "experience"      → Contains work experience details
// - "education"       → Contains education/degree info
// - "compensation"    → Contains salary/benefits info
// - "nda"             → Contains NDA/confidentiality terms
// - "remote"          → Contains remote work policy
// - "pto"             → Contains PTO/leave policy
// - "budget"          → Contains budget/financial data
// - "interview"       → Contains interview notes/feedback
// =============================================================================

export const fileSystem = {
  id: 'root',
  name: 'Shared Drive',
  type: 'folder',
  children: [
    // =========================================================================
    // RECRUITING FOLDER - Contains candidate info, resumes, interview notes
    // =========================================================================
    {
      id: 'recruiting',
      name: 'Recruiting',
      type: 'folder',
      children: [
        {
          id: 'rec-1',
          name: 'Resume_Sarah_Chen_Senior_Frontend.pdf',
          type: 'file',
          size: '245 KB',
          modified: '2024-01-15',
          // ✅ CONTAINS: React experience (5 years), TypeScript, Redux
          contentTags: ['react', 'experience', 'education'],
          mockContent: {
            summary: 'Senior Frontend Developer with 5 years React experience',
            details: 'React, TypeScript, Redux, GraphQL. MS Computer Science Stanford.',
            relevance: {
              'react': 'high',      // Explicitly mentions 5 years React
              'experience': 'high',
              'python': 'none'
            }
          }
        },
        {
          id: 'rec-2',
          name: 'Resume_Michael_Torres_Fullstack.pdf',
          type: 'file',
          size: '198 KB',
          modified: '2024-01-18',
          // ✅ CONTAINS: React (3 years) + Python backend
          contentTags: ['react', 'python', 'experience', 'education'],
          mockContent: {
            summary: 'Fullstack Developer with React frontend and Python backend',
            details: 'React 3 years, Python/Django 4 years, PostgreSQL, AWS.',
            relevance: {
              'react': 'medium',    // Has React but less than Sarah
              'python': 'high',
              'experience': 'high'
            }
          }
        },
        {
          id: 'rec-3',
          name: 'Resume_Emily_Watson_Backend.pdf',
          type: 'file',
          size: '156 KB',
          modified: '2024-01-20',
          // ❌ NO REACT - Backend only (Java/Python)
          contentTags: ['python', 'experience', 'education'],
          mockContent: {
            summary: 'Backend Engineer specializing in Python and Java',
            details: 'Python, Java, Kubernetes, microservices. No frontend experience.',
            relevance: {
              'react': 'none',      // No React experience
              'python': 'high',
              'experience': 'high'
            }
          }
        },
        {
          id: 'rec-4',
          name: 'Interview_Notes_Sarah_Chen_2024-01-22.docx',
          type: 'file',
          size: '34 KB',
          modified: '2024-01-22',
          // ✅ CONTAINS: Interview feedback mentioning React skills
          contentTags: ['react', 'interview'],
          mockContent: {
            summary: 'Technical interview notes - strong React performance',
            details: 'Excellent React architecture knowledge. Built component library. Recommended for senior role.',
            relevance: {
              'react': 'high',
              'interview': 'high'
            }
          }
        },
        {
          id: 'rec-5',
          name: 'Interview_Notes_Michael_Torres_2024-01-25.docx',
          type: 'file',
          size: '28 KB',
          modified: '2024-01-25',
          // ✅ CONTAINS: Interview feedback, mixed React assessment
          contentTags: ['react', 'python', 'interview'],
          mockContent: {
            summary: 'Technical interview notes - strong Python, decent React',
            details: 'Very strong Python/Django. React knowledge is functional but not deep. Good for fullstack role.',
            relevance: {
              'react': 'medium',
              'python': 'high',
              'interview': 'high'
            }
          }
        },
        {
          id: 'rec-6',
          name: 'Recruiting_Pipeline_Q1_2024.xlsx',
          type: 'file',
          size: '567 KB',
          modified: '2024-01-28',
          // ❌ IRRELEVANT - Just tracking spreadsheet, no skill details
          contentTags: [],
          mockContent: {
            summary: 'Pipeline tracking spreadsheet with candidate status',
            details: 'Names, stages, dates. No skill or experience details.',
            relevance: {
              'react': 'none',
              'experience': 'none'
            }
          }
        },
        {
          id: 'rec-7',
          name: 'Job_Description_Senior_Frontend_Engineer.docx',
          type: 'file',
          size: '45 KB',
          modified: '2024-01-10',
          // ⚠️ PARTIAL - Mentions React as requirement, not candidate info
          contentTags: ['react'],
          mockContent: {
            summary: 'Job posting requiring 5+ years React experience',
            details: 'Requirements: React 5+ years, TypeScript, state management.',
            relevance: {
              'react': 'low',  // Mentions React but not candidate experience
              'experience': 'none'
            }
          }
        }
      ]
    },

    // =========================================================================
    // HR POLICIES FOLDER - Company policies, handbooks, guidelines
    // =========================================================================
    {
      id: 'hr',
      name: 'HR Policies',
      type: 'folder',
      children: [
        {
          id: 'hr-1',
          name: 'Employee_Handbook_2024.pdf',
          type: 'file',
          size: '2.4 MB',
          modified: '2024-01-01',
          // ✅ CONTAINS: PTO, remote work, general policies
          contentTags: ['pto', 'remote', 'compensation'],
          mockContent: {
            summary: 'Comprehensive employee handbook covering all policies',
            details: 'PTO: 20 days. Remote: hybrid 3/2. Benefits overview included.',
            relevance: {
              'pto': 'high',
              'remote': 'high',
              'compensation': 'medium'
            }
          }
        },
        {
          id: 'hr-2',
          name: 'PTO_and_Leave_Policy_2024.pdf',
          type: 'file',
          size: '156 KB',
          modified: '2024-01-01',
          // ✅ CONTAINS: Detailed PTO information
          contentTags: ['pto'],
          mockContent: {
            summary: 'Detailed PTO policy - accrual, rollover, blackout dates',
            details: '20 days PTO, 5 day rollover max, accrues monthly.',
            relevance: {
              'pto': 'high'
            }
          }
        },
        {
          id: 'hr-3',
          name: 'Remote_Work_Guidelines.docx',
          type: 'file',
          size: '89 KB',
          modified: '2024-01-05',
          // ✅ CONTAINS: Remote work policy details
          contentTags: ['remote'],
          mockContent: {
            summary: 'Remote work policy - hybrid schedule, equipment, expectations',
            details: 'Hybrid: 3 days office, 2 days remote. $500 home office stipend.',
            relevance: {
              'remote': 'high'
            }
          }
        },
        {
          id: 'hr-4',
          name: 'Compensation_Bands_2024_CONFIDENTIAL.xlsx',
          type: 'file',
          size: '234 KB',
          modified: '2024-01-01',
          // ✅ CONTAINS: Salary information (restricted access in real world)
          contentTags: ['compensation'],
          mockContent: {
            summary: 'Salary bands by level and department',
            details: 'Senior Engineer: $150-180K. Staff: $180-220K.',
            relevance: {
              'compensation': 'high'
            }
          }
        },
        {
          id: 'hr-5',
          name: 'Org_Chart_January_2024.pdf',
          type: 'file',
          size: '1.2 MB',
          modified: '2024-01-15',
          // ❌ IRRELEVANT to most queries
          contentTags: [],
          mockContent: {
            summary: 'Organization chart showing reporting structure',
            details: 'Visual org chart. No policy or candidate information.',
            relevance: {}
          }
        }
      ]
    },

    // =========================================================================
    // LEGAL FOLDER - Contracts, NDAs, agreements
    // =========================================================================
    {
      id: 'legal',
      name: 'Legal & Compliance',
      type: 'folder',
      children: [
        {
          id: 'legal-1',
          name: 'NDA_Template_Mutual_2024.docx',
          type: 'file',
          size: '67 KB',
          modified: '2024-01-01',
          // ✅ CONTAINS: NDA terms, confidentiality period
          contentTags: ['nda'],
          mockContent: {
            summary: 'Standard mutual NDA template',
            details: 'Confidentiality period: 2 years. Mutual obligations.',
            relevance: {
              'nda': 'high'
            }
          }
        },
        {
          id: 'legal-2',
          name: 'NDA_Template_Unilateral_2024.docx',
          type: 'file',
          size: '54 KB',
          modified: '2024-01-01',
          // ✅ CONTAINS: NDA terms (one-way)
          contentTags: ['nda'],
          mockContent: {
            summary: 'One-way NDA for vendors/contractors',
            details: 'Confidentiality period: 3 years. Company info only.',
            relevance: {
              'nda': 'high'
            }
          }
        },
        {
          id: 'legal-3',
          name: 'Master_Services_Agreement_Template.pdf',
          type: 'file',
          size: '189 KB',
          modified: '2023-11-15',
          // ⚠️ PARTIAL - Has confidentiality clause but not main focus
          contentTags: ['nda'],
          mockContent: {
            summary: 'MSA template for vendor engagements',
            details: 'Section 8 covers confidentiality. Standard 2-year term.',
            relevance: {
              'nda': 'medium'
            }
          }
        },
        {
          id: 'legal-4',
          name: 'Signed_NDA_AcmeCorp_2023-12-01.pdf',
          type: 'file',
          size: '234 KB',
          modified: '2023-12-01',
          // ✅ CONTAINS: Executed NDA with specific terms
          contentTags: ['nda'],
          mockContent: {
            summary: 'Signed NDA with Acme Corporation',
            details: 'Executed mutual NDA. 2-year term. Covers product discussions.',
            relevance: {
              'nda': 'high'
            }
          }
        },
        {
          id: 'legal-5',
          name: 'Data_Processing_Agreement_Template.docx',
          type: 'file',
          size: '123 KB',
          modified: '2024-01-01',
          // ❌ NOT NDA - Different type of agreement
          contentTags: [],
          mockContent: {
            summary: 'GDPR-compliant DPA template',
            details: 'Data processing terms. Not related to confidentiality/NDA.',
            relevance: {
              'nda': 'none'
            }
          }
        }
      ]
    }
  ]
};

// =============================================================================
// HELPER: Get file by ID
// =============================================================================
export const getFileById = (fileId, node = fileSystem) => {
  if (node.id === fileId) return node;
  if (node.children) {
    for (const child of node.children) {
      const found = getFileById(fileId, child);
      if (found) return found;
    }
  }
  return null;
};

// =============================================================================
// HELPER: Get all files from the file system
// =============================================================================
export const getAllFiles = (node = fileSystem, files = []) => {
  if (node.type === 'file') {
    files.push(node);
  } else if (node.children) {
    node.children.forEach(child => getAllFiles(child, files));
  }
  return files;
};

// =============================================================================
// HELPER: Get files in a specific folder
// =============================================================================
export const getFilesInFolder = (folderId) => {
  const findFolder = (node) => {
    if (node.id === folderId) return node;
    if (node.children) {
      for (const child of node.children) {
        const found = findFolder(child);
        if (found) return found;
      }
    }
    return null;
  };
  
  const folder = findFolder(fileSystem);
  if (folder && folder.children) {
    return folder.children.filter(item => item.type === 'file');
  }
  return [];
};

// =============================================================================
// HELPER: Get files by content tag
// =============================================================================
export const getFilesByTag = (tag, files = null) => {
  const allFiles = files || getAllFiles();
  return allFiles.filter(f => f.contentTags && f.contentTags.includes(tag));
};

// =============================================================================
// HELPER: Calculate relevance score for a file against a query
// =============================================================================
export const getFileRelevance = (file, queryTags) => {
  if (!file.mockContent || !file.mockContent.relevance) return 'none';
  
  let highCount = 0;
  let mediumCount = 0;
  
  for (const tag of queryTags) {
    const relevance = file.mockContent.relevance[tag];
    if (relevance === 'high') highCount++;
    else if (relevance === 'medium') mediumCount++;
  }
  
  if (highCount > 0) return 'high';
  if (mediumCount > 0) return 'medium';
  return 'none';
};

// =============================================================================
// SAMPLE QUESTIONS - Specific demo questions with tailored responses
// =============================================================================
// These are the "hero" questions for the demo that have hand-crafted answers
// to show how scope affects confidence and responses.
// =============================================================================

export const sampleQuestions = {
  // =========================================================================
  // QUESTION 1: Sarah Chen's React Experience
  // =========================================================================
  'sarah_react': {
    patterns: ['sarah', 'chen', 'sarah chen'],
    requiredTags: ['react'],
    
    answers: {
      // GLOBAL or RECRUITING folder - Full access to all relevant files
      high: {
        answer: `Based on Resume_Sarah_Chen_Senior_Frontend.pdf and Interview_Notes_Sarah_Chen_2024-01-22.docx, **Sarah Chen** has extensive React experience:

• **5 years** of professional React development
• Built and maintained **component libraries** from scratch
• Expert in **TypeScript** and **Redux** state management
• Experience with **GraphQL** integration

**Interview Assessment:** Per Interview_Notes_Sarah_Chen_2024-01-22.docx, her React architecture knowledge was rated as "excellent" with specific mention of her ability to design scalable component hierarchies. The interviewer recommended her for a senior frontend role.

**Education:** MS in Computer Science from Stanford University.`,
        explanation: "High confidence because both the resume and interview notes consistently describe Sarah's React expertise, with specific details about years of experience and technical assessment.",
      },
      
      // Limited files - only resume OR only interview notes
      medium: {
        answer: `Based on the available documents, **Sarah Chen** appears to have strong React experience:

• Listed as **Senior Frontend Developer** with React focus
• Resume mentions TypeScript and modern frontend stack

However, I could only access limited documentation. The interview notes or additional assessments weren't included in the search scope, so I cannot provide a complete picture of her evaluated skills.`,
        explanation: "Medium confidence because only one source (resume) was accessible. Interview feedback would help corroborate the experience level.",
      },
      
      // Wrong folder or irrelevant files selected
      low: {
        answer: `I couldn't find information about Sarah Chen's React experience in the current search scope.

**Why?** The files being searched don't contain candidate information. Sarah Chen's data is in the **Recruiting** folder.

**To get this answer:**
• Switch to **"All Documents"** scope, or
• Click the **Recruiting** folder in the sidebar, or
• Select her files directly:
  - Resume_Sarah_Chen_Senior_Frontend.pdf
  - Interview_Notes_Sarah_Chen_2024-01-22.docx`,
        explanation: "Low confidence because the current scope doesn't include the Recruiting folder where candidate information is stored.",
      }
    },
    
    // Which files are relevant for this question
    relevantFileIds: ['rec-1', 'rec-4'], // Resume + Interview notes for Sarah
    highRelevanceIds: ['rec-1', 'rec-4'],
    mediumRelevanceIds: [],
  },

  // =========================================================================
  // QUESTION 2: Documents mentioning React migration
  // =========================================================================
  'react_migration': {
    patterns: ['migration', 'migrate', 'documents mention', 'which documents', 'react migration'],
    requiredTags: ['react'],
    
    answers: {
      high: {
        answer: `I searched all available documents for mentions of React or frontend migration. Here's what I found:

**Directly Relevant:**
• Resume_Sarah_Chen_Senior_Frontend.pdf - Mentions experience with "migrating legacy jQuery applications to React" and "leading frontend modernization initiatives"
• Interview_Notes_Sarah_Chen_2024-01-22.docx - Discusses her approach to "incremental migration strategies" during technical interview

**Partially Relevant:**
• Resume_Michael_Torres_Fullstack.pdf - References React adoption but not specifically migration projects
• Job_Description_Senior_Frontend_Engineer.docx - Lists "experience with legacy system modernization" as a preferred qualification

**Not Found:** No dedicated migration planning documents, technical specs, or project plans were found in the document repository.`,
        explanation: "High confidence in the search results because all document folders were searched. Note: This reflects what candidates have done, not internal migration plans.",
      },
      
      medium: {
        answer: `Within the current folder, I found some references to React experience:

• Resume files mention React skills and experience
• Interview notes discuss frontend development approaches

However, the search was limited to this folder. Other folders may contain additional relevant documents such as technical specifications or project plans.`,
        explanation: "Medium confidence because only one folder was searched. Migration planning documents might be in Engineering or other folders not in scope.",
      },
      
      low: {
        answer: `I couldn't find documents mentioning React migration in the selected files.

The files currently in scope don't appear to contain frontend development or migration-related content. Try:
• Searching "All Documents" to find any React mentions
• Checking the Recruiting folder for candidate experience with migrations
• Checking if an Engineering folder exists with technical documentation`,
        explanation: "Low confidence because the selected files don't contain React or migration-related content.",
      }
    },
    
    relevantFileIds: ['rec-1', 'rec-4', 'rec-2', 'rec-7'],
    highRelevanceIds: ['rec-1', 'rec-4'],
    mediumRelevanceIds: ['rec-2', 'rec-7'],
  },

  // =========================================================================
  // QUESTION 3: Enough info to summarize frontend skills?
  // =========================================================================
  'frontend_summary': {
    patterns: ['enough info', 'sufficient', 'summarize', 'summarise', 'frontend skills', 'front-end skills', 'coverage'],
    requiredTags: ['react', 'experience'],
    
    answers: {
      high: {
        answer: `**Yes**, there is sufficient information to summarize frontend skills across candidates:

**Coverage Assessment:**
| Candidate | Resume | Interview Notes | Skills Documented |
|-----------|--------|-----------------|-------------------|
| Sarah Chen | ✅ | ✅ | React, TypeScript, Redux, GraphQL |
| Michael Torres | ✅ | ✅ | React, Python, Full-stack |
| Emily Watson | ✅ | ❌ | Backend only (Java, Python) |

**Summary of Frontend Capabilities:**
• **Strong React talent:** Sarah Chen (5 yrs) is the standout frontend candidate
• **Fullstack option:** Michael Torres can handle React but is stronger in backend
• **Gap:** No dedicated CSS/design system expertise documented

**Confidence in this assessment:** High - we have both resumes and interview evaluations for the key frontend candidates.`,
        explanation: "High confidence because multiple document types (resumes + interviews) are available for cross-referencing, providing a complete picture of candidate skills.",
      },
      
      medium: {
        answer: `**Partially** - there is some information about frontend skills, but coverage is incomplete:

**What I Found:**
• Resume information for candidates mentioning React/frontend
• Some details about technical backgrounds

**What's Missing:**
• Interview assessments for skill verification
• Detailed technical evaluation scores
• Portfolio or code sample reviews

To provide a comprehensive frontend skills summary, I would need access to interview notes and any technical assessment documents.`,
        explanation: "Medium confidence because only resumes are in scope. Interview notes would significantly improve the reliability of any skills summary.",
      },
      
      low: {
        answer: `**No** - there is insufficient information in the current scope to summarize frontend skills.

The selected files don't contain candidate information or skills documentation. Frontend skills data is typically found in:
• **Recruiting folder:** Candidate resumes and interview notes
• **HR folder:** Job descriptions and role requirements

Please expand the search scope to include relevant folders.`,
        explanation: "Low confidence because the current scope doesn't include any candidate skill information. Cannot produce a meaningful frontend summary.",
      }
    },
    
    relevantFileIds: ['rec-1', 'rec-2', 'rec-3', 'rec-4', 'rec-5'],
    highRelevanceIds: ['rec-1', 'rec-4'],
    mediumRelevanceIds: ['rec-2', 'rec-5', 'rec-3'],
  },
};

// =============================================================================
// QUERY PATTERNS - Maps keywords to content tags (for general questions)
// =============================================================================
export const queryPatterns = {
  react: {
    keywords: ['react', 'frontend', 'front-end', 'front end', 'ui developer', 'component'],
    tags: ['react'],
    topic: 'React experience'
  },
  python: {
    keywords: ['python', 'django', 'flask', 'backend', 'back-end', 'back end'],
    tags: ['python'],
    topic: 'Python experience'
  },
  experience: {
    keywords: ['experience', 'years', 'background', 'skills', 'qualified', 'candidates'],
    tags: ['experience'],
    topic: 'work experience'
  },
  nda: {
    keywords: ['nda', 'non-disclosure', 'confidentiality', 'confidential', 'secret'],
    tags: ['nda'],
    topic: 'NDA terms'
  },
  pto: {
    keywords: ['pto', 'vacation', 'leave', 'time off', 'holiday', 'days off'],
    tags: ['pto'],
    topic: 'PTO policy'
  },
  remote: {
    keywords: ['remote', 'work from home', 'wfh', 'hybrid', 'office', 'home office'],
    tags: ['remote'],
    topic: 'remote work policy'
  },
  compensation: {
    keywords: ['salary', 'compensation', 'pay', 'benefits', 'bonus', 'equity'],
    tags: ['compensation'],
    topic: 'compensation'
  },
  interview: {
    keywords: ['interview', 'feedback', 'assessment', 'evaluation', 'recommendation'],
    tags: ['interview'],
    topic: 'interview feedback'
  }
};

// =============================================================================
// ANSWER TEMPLATES - Pre-written answers based on topic and confidence
// =============================================================================
export const answerTemplates = {
  react: {
    high: {
      answer: "Based on the resumes and interview notes reviewed, here are candidates with **React experience**:\n\n• **Sarah Chen** - 5 years React experience, built component libraries, TypeScript expert. Interview feedback: \"Excellent React architecture knowledge.\"\n\n• **Michael Torres** - 3 years React experience, primarily fullstack. Interview noted React skills as \"functional but not deep.\"\n\nSarah Chen appears to be the strongest React candidate.",
      explanation: "High confidence because multiple documents (resumes + interview notes) consistently describe React experience levels for these candidates."
    },
    medium: {
      answer: "I found some React experience information:\n\n• **Sarah Chen** has React experience listed on her resume\n• **Michael Torres** mentions React as part of fullstack work\n\nHowever, I couldn't access all interview notes to verify skill assessments.",
      explanation: "Medium confidence because while resumes mention React, the interview feedback wasn't in scope to corroborate the experience levels."
    },
    low: {
      answer: "I couldn't find detailed React experience information in the selected files. The Recruiting folder contains candidate resumes that would have this information.",
      explanation: "Low confidence because the search scope didn't include the Recruiting folder where candidate information is stored."
    }
  },
  
  nda: {
    high: {
      answer: "Based on our NDA templates, the confidentiality terms are:\n\n• **Mutual NDA**: 2-year confidentiality period\n• **Unilateral NDA**: 3-year confidentiality period\n• **MSA Section 8**: References 2-year standard term\n\nThe signed NDA with Acme Corp follows the 2-year mutual template.",
      explanation: "High confidence because multiple NDA documents were reviewed and they contain explicit confidentiality period terms."
    },
    medium: {
      answer: "The standard confidentiality period appears to be **2 years** based on the NDA template found. However, specific signed agreements may have different terms.",
      explanation: "Medium confidence because only one NDA document was accessible. Other NDAs in the Legal folder may have different terms."
    },
    low: {
      answer: "I couldn't find NDA information in the selected files. The Legal & Compliance folder contains NDA templates and signed agreements.",
      explanation: "Low confidence because the search scope didn't include Legal documents where NDA information is stored."
    }
  },

  pto: {
    high: {
      answer: "According to HR policies, employees receive:\n\n• **20 days** PTO per year\n• Maximum **5 days** can roll over to next year\n• PTO accrues monthly\n\nThis is documented in both the Employee Handbook and the dedicated PTO Policy document.",
      explanation: "High confidence because both the handbook and PTO policy document confirm the same information."
    },
    medium: {
      answer: "The Employee Handbook mentions **20 days** PTO, but I couldn't access the detailed PTO Policy document to confirm accrual and rollover rules.",
      explanation: "Medium confidence because the answer comes from a general handbook reference. The dedicated PTO policy wasn't in scope."
    },
    low: {
      answer: "PTO policy information wasn't found in the selected files. Check the HR Policies folder for the PTO and Leave Policy document.",
      explanation: "Low confidence because no HR policy documents were included in the search scope."
    }
  },

  remote: {
    high: {
      answer: "Our Remote Work Guidelines specify:\n\n• **Hybrid schedule**: 3 days in office, 2 days remote\n• **Home office stipend**: $500\n• **Core hours**: 10am-3pm in your timezone\n• **Full remote**: Available for approved roles only\n\nManager approval required for schedule changes.",
      explanation: "High confidence because the Remote Work Guidelines document explicitly covers all aspects of the policy."
    },
    medium: {
      answer: "The company supports a **hybrid work arrangement** (3 days office, 2 days remote). For equipment stipends and other details, see the full Remote Work Guidelines.",
      explanation: "Medium confidence because the Employee Handbook mentions the policy but detailed guidelines weren't fully reviewed."
    },
    low: {
      answer: "Remote work policy information wasn't found in the selected files. The HR Policies folder contains Remote Work Guidelines.",
      explanation: "Low confidence because the search scope didn't include HR policy documents."
    }
  },

  compensation: {
    high: {
      answer: "Based on the Compensation Bands document:\n\n• **Senior Engineer**: $150,000 - $180,000\n• **Staff Engineer**: $180,000 - $220,000\n\nThese are base salary ranges. Equity and bonus structures are separate.",
      explanation: "High confidence because the compensation bands spreadsheet contains explicit salary ranges by level."
    },
    medium: {
      answer: "Compensation information exists in the HR folder, but the detailed bands document may have restricted access. The Employee Handbook mentions a competitive compensation philosophy.",
      explanation: "Medium confidence because the detailed compensation data wasn't fully accessible in this scope."
    },
    low: {
      answer: "Compensation details weren't found in the selected files. This information is in the HR Policies folder (may require additional permissions).",
      explanation: "Low confidence because compensation documents weren't in the search scope and may have access restrictions."
    }
  },

  interview: {
    high: {
      answer: "Interview feedback summary:\n\n• **Sarah Chen**: Strong recommendation. \"Excellent React architecture knowledge. Built component library. Recommended for senior role.\"\n\n• **Michael Torres**: Positive. \"Very strong Python/Django. React knowledge is functional but not deep. Good for fullstack role.\"",
      explanation: "High confidence because interview notes contain direct quotes and clear recommendations from interviewers."
    },
    medium: {
      answer: "Interview notes exist for some candidates, but I could only access partial feedback. Sarah Chen's interview was positive; details on other candidates are limited.",
      explanation: "Medium confidence because not all interview notes were in the search scope."
    },
    low: {
      answer: "Interview feedback wasn't found in the selected files. Check the Recruiting folder for interview notes.",
      explanation: "Low confidence because interview documents weren't included in the search scope."
    }
  },

  default: {
    high: {
      answer: "I found relevant information across the documents in scope. Could you refine your question to be more specific about what you're looking for?",
      explanation: "The query matched some content but was too general to provide a focused answer."
    },
    medium: {
      answer: "I found some potentially related information, but I'm not certain it fully answers your question. Try being more specific or expanding your search scope.",
      explanation: "Medium confidence because the query didn't closely match the content patterns I'm trained to recognize."
    },
    low: {
      answer: "I couldn't find information matching your question in the current scope. Try:\n\n• Searching all documents (global scope)\n• Selecting a different folder\n• Rephrasing your question",
      explanation: "Low confidence because no documents in the current scope matched your query."
    }
  }
};

// =============================================================================
// EDGE CASE HANDLER: Empty Scope (no files to search)
// =============================================================================
const generateEmptyScopeResponse = (scope, scopeDescription) => {
  let answer = '';
  let suggestion = '';
  
  if (scope === 'selected') {
    answer = `I can't search any files because **none are selected**.

To get an answer, please:
• **Check the boxes** next to files in the sidebar, or
• **Switch to "All Documents"** scope to search everything`;
    suggestion = 'Select files from the sidebar first';
  } else if (scope === 'folder') {
    answer = `The current folder appears to be empty or not accessible.

Please:
• **Select a different folder** from the sidebar, or
• **Switch to "All Documents"** scope`;
    suggestion = 'Select a folder with files';
  } else {
    answer = `No files are available to search.

Please check your file selection or scope settings.`;
    suggestion = 'No files available';
  }
  
  return {
    id: Date.now(),
    type: 'assistant',
    answer,
    confidence: 'low',
    confidenceReason: 'No files in search scope',
    scope: scopeDescription,
    queryTopic: 'empty scope',
    metrics: {
      filesInScope: 0,
      filesWithAccess: 0,
      filesReviewed: 0,
      filesWithMatches: 0,
      highRelevanceCount: 0,
      mediumRelevanceCount: 0
    },
    explanation: 'Cannot provide an answer because there are no files in the current search scope.',
    limitations: [
      'No files selected or accessible',
      suggestion,
      '💡 Try switching to "All Documents" scope'
    ],
    sources: [{
      id: 'none',
      name: 'No files to search',
      relevance: 'none',
      summary: ''
    }],
    timestamp: new Date().toISOString()
  };
};

// =============================================================================
// HELPER: Check if query matches a sample question
// =============================================================================
const matchSampleQuestion = (query) => {
  const queryLower = query.toLowerCase();
  
  for (const [questionId, questionData] of Object.entries(sampleQuestions)) {
    const matchesPattern = questionData.patterns.some(pattern => 
      queryLower.includes(pattern.toLowerCase())
    );
    
    if (matchesPattern) {
      // Check if required tags context is present (e.g., "react" for Sarah's React exp)
      const hasRequiredContext = questionData.requiredTags.length === 0 || 
        questionData.requiredTags.some(tag => {
          const tagKeywords = queryPatterns[tag]?.keywords || [tag];
          return tagKeywords.some(kw => queryLower.includes(kw));
        });
      
      if (hasRequiredContext || questionData.requiredTags.length === 0) {
        return { questionId, questionData };
      }
    }
  }
  
  return null;
};

// =============================================================================
// MAIN FUNCTION: Generate mock response based on query and scope
// =============================================================================
export const generateMockResponse = (query, scope, currentFolder, selectedFiles) => {
  const queryLower = query.toLowerCase();
  const allFiles = getAllFiles();
  
  // Step 1: Get files in scope
  let filesInScope = [];
  let scopeDescription = '';
  
  if (scope === 'global') {
    filesInScope = allFiles;
    scopeDescription = 'All documents';
  } else if (scope === 'folder' && currentFolder) {
    filesInScope = getFilesInFolder(currentFolder);
    const folder = findFolderById(currentFolder);
    scopeDescription = folder ? `${folder.name} folder` : 'Selected folder';
  } else if (scope === 'selected' && selectedFiles.length > 0) {
    filesInScope = allFiles.filter(f => selectedFiles.includes(f.id));
    scopeDescription = `${selectedFiles.length} selected file${selectedFiles.length === 1 ? '' : 's'}`;
  } else {
    filesInScope = [];
    scopeDescription = 'No files selected';
  }
  
  // EDGE CASE: No files in scope at all
  if (filesInScope.length === 0) {
    return generateEmptyScopeResponse(scope, scopeDescription);
  }
  
  // Step 2: Check if this matches a sample question (hand-crafted responses)
  const sampleMatch = matchSampleQuestion(query);
  
  if (sampleMatch) {
    return generateSampleQuestionResponse(
      sampleMatch.questionId,
      sampleMatch.questionData,
      filesInScope,
      scopeDescription,
      scope,
      currentFolder
    );
  }
  
  // Step 3: Fall back to generic pattern matching
  return generateGenericResponse(
    queryLower,
    filesInScope,
    scopeDescription,
    scope,
    currentFolder
  );
};

// =============================================================================
// Generate response for sample questions (hand-crafted)
// =============================================================================
const generateSampleQuestionResponse = (questionId, questionData, filesInScope, scopeDescription, scope, currentFolder) => {
  const allFiles = getAllFiles();
  
  // Find which relevant files are in scope
  const relevantInScope = filesInScope.filter(f => 
    questionData.relevantFileIds.includes(f.id)
  );
  
  const highInScope = relevantInScope.filter(f => 
    questionData.highRelevanceIds.includes(f.id)
  );
  
  const mediumInScope = relevantInScope.filter(f => 
    questionData.mediumRelevanceIds.includes(f.id)
  );
  
  // Calculate metrics
  const totalFilesInScope = filesInScope.length;
  const filesWithAccess = Math.max(0, totalFilesInScope - Math.floor(totalFilesInScope * 0.05));
  const filesReviewed = Math.min(filesWithAccess, Math.max(relevantInScope.length, Math.min(5, totalFilesInScope)));
  
  // Use centralized confidence calculation
  const confidenceResult = calculateConfidence({
    filesInScope: totalFilesInScope,
    filesWithAccess,
    filesReviewed,
    highRelevanceCount: highInScope.length,
    mediumRelevanceCount: mediumInScope.length
  });
  
  const confidence = confidenceResult.level;
  
  // Get the appropriate answer
  const answerData = questionData.answers[confidence];
  
  // Build sources list
  const sources = relevantInScope.map(f => ({
    id: f.id,
    name: f.name,
    relevance: questionData.highRelevanceIds.includes(f.id) ? 'high' : 'partial',
    summary: f.mockContent?.summary || ''
  }));
  
  // Generate limitations
  const limitations = [];
  
  if (scope === 'folder') {
    const folder = findFolderById(currentFolder);
    limitations.push(`Search limited to "${folder?.name || currentFolder}" folder only`);
    
    // Check if relevant files are in a different folder
    const missingHighFiles = questionData.highRelevanceIds.filter(id => 
      !filesInScope.some(f => f.id === id)
    );
    
    if (missingHighFiles.length > 0 && currentFolder !== 'recruiting') {
      limitations.push('💡 Relevant candidate files are in the Recruiting folder');
    }
  } else if (scope === 'selected') {
    limitations.push('Only selected files were searched');
    
    const missingHighFiles = questionData.highRelevanceIds.filter(id => 
      !filesInScope.some(f => f.id === id)
    );
    
    if (missingHighFiles.length > 0) {
      const missingFileNames = missingHighFiles.map(id => {
        const file = allFiles.find(f => f.id === id);
        return file?.name || id;
      });
      limitations.push(`💡 Consider also selecting: ${missingFileNames.slice(0, 2).join(', ')}`);
    }
  }
  
  // Add confidence-based limitations from the calculation
  confidenceResult.details.slice(1).forEach(detail => {
    if (!limitations.some(l => l.includes(detail))) {
      limitations.push(detail);
    }
  });
  
  return {
    id: Date.now(),
    type: 'assistant',
    answer: answerData.answer,
    confidence,
    confidenceReason: confidenceResult.reason,
    scope: scopeDescription,
    queryTopic: questionId.replace('_', ' '),
    metrics: {
      filesInScope: totalFilesInScope,
      filesWithAccess,
      filesReviewed,
      filesWithMatches: relevantInScope.length,
      highRelevanceCount: highInScope.length,
      mediumRelevanceCount: mediumInScope.length
    },
    explanation: confidenceResult.explanation,
    limitations,
    sources: sources.length > 0 ? sources : [{ 
      id: 'none', 
      name: 'No matching files in scope', 
      relevance: 'none',
      summary: ''
    }],
    timestamp: new Date().toISOString()
  };
};

// =============================================================================
// Generate response for generic questions (pattern matching)
// =============================================================================
const generateGenericResponse = (queryLower, filesInScope, scopeDescription, scope, currentFolder) => {
  // Identify what the user is asking about
  let matchedPattern = null;
  let matchedTopic = 'default';
  
  for (const [topic, pattern] of Object.entries(queryPatterns)) {
    if (pattern.keywords.some(kw => queryLower.includes(kw))) {
      matchedPattern = pattern;
      matchedTopic = topic;
      break;
    }
  }
  
  const queryTags = matchedPattern?.tags || [];
  
  // Find relevant files based on content tags
  const relevantFiles = filesInScope.filter(file => {
    if (!file.contentTags || queryTags.length === 0) return false;
    return queryTags.some(tag => file.contentTags.includes(tag));
  });
  
  // Score files by relevance
  const scoredFiles = relevantFiles.map(file => ({
    ...file,
    relevanceScore: getFileRelevance(file, queryTags)
  }));
  
  const highRelevanceFiles = scoredFiles.filter(f => f.relevanceScore === 'high');
  const mediumRelevanceFiles = scoredFiles.filter(f => f.relevanceScore === 'medium');
  
  // Calculate metrics
  const totalFilesInScope = filesInScope.length;
  const filesWithAccess = Math.max(0, totalFilesInScope - Math.floor(totalFilesInScope * 0.1));
  const filesReviewed = Math.min(filesWithAccess, relevantFiles.length + Math.min(3, filesInScope.length));
  
  // Use centralized confidence calculation
  const confidenceResult = calculateConfidence({
    filesInScope: totalFilesInScope,
    filesWithAccess,
    filesReviewed,
    highRelevanceCount: highRelevanceFiles.length,
    mediumRelevanceCount: mediumRelevanceFiles.length
  });
  
  const confidence = confidenceResult.level;
  
  // Get answer template
  const templates = answerTemplates[matchedTopic] || answerTemplates.default;
  const template = templates[confidence];
  
  // Build sources list
  const sources = scoredFiles
    .sort((a, b) => {
      const order = { high: 0, medium: 1, low: 2, none: 3 };
      return order[a.relevanceScore] - order[b.relevanceScore];
    })
    .slice(0, 4)
    .map(f => ({
      id: f.id,
      name: f.name,
      relevance: f.relevanceScore === 'high' ? 'high' : 'partial',
      summary: f.mockContent?.summary || ''
    }));
  
  // Generate limitations
  const limitations = generateLimitations(scope, currentFolder, confidence, matchedTopic, filesInScope);
  
  return {
    id: Date.now(),
    type: 'assistant',
    answer: template.answer,
    confidence,
    confidenceReason: confidenceResult.reason,
    scope: scopeDescription,
    queryTopic: matchedPattern?.topic || 'general query',
    metrics: {
      filesInScope: totalFilesInScope,
      filesWithAccess,
      filesReviewed,
      filesWithMatches: relevantFiles.length,
      highRelevanceCount: highRelevanceFiles.length,
      mediumRelevanceCount: mediumRelevanceFiles.length
    },
    explanation: confidenceResult.explanation,
    limitations,
    sources: sources.length > 0 ? sources : [{ 
      id: 'none', 
      name: 'No matching files found', 
      relevance: 'none',
      summary: ''
    }],
    timestamp: new Date().toISOString()
  };
};

// =============================================================================
// HELPER: Find folder by ID
// =============================================================================
const findFolderById = (folderId, node = fileSystem) => {
  if (node.id === folderId) return node;
  if (node.children) {
    for (const child of node.children) {
      const found = findFolderById(folderId, child);
      if (found) return found;
    }
  }
  return null;
};

// =============================================================================
// HELPER: Generate scope limitations based on context
// =============================================================================
const generateLimitations = (scope, currentFolder, confidence, topic, filesInScope) => {
  const limitations = [];
  
  // Folder-to-topic mapping for smart suggestions
  const topicFolderMap = {
    'react': { folder: 'recruiting', name: 'Recruiting', content: 'candidate resumes and interview notes' },
    'python': { folder: 'recruiting', name: 'Recruiting', content: 'candidate resumes' },
    'experience': { folder: 'recruiting', name: 'Recruiting', content: 'candidate information' },
    'interview': { folder: 'recruiting', name: 'Recruiting', content: 'interview notes' },
    'nda': { folder: 'legal', name: 'Legal & Compliance', content: 'NDA templates and agreements' },
    'pto': { folder: 'hr', name: 'HR Policies', content: 'leave and PTO policies' },
    'remote': { folder: 'hr', name: 'HR Policies', content: 'remote work guidelines' },
    'compensation': { folder: 'hr', name: 'HR Policies', content: 'compensation information' },
  };
  
  const expectedFolder = topicFolderMap[topic];
  
  // Scope-based limitations
  if (scope === 'folder') {
    const folder = findFolderById(currentFolder);
    const folderName = folder?.name || currentFolder;
    limitations.push(`Search limited to "${folderName}" folder only`);
    
    // Check if user is in the wrong folder for this topic
    if (expectedFolder && currentFolder !== expectedFolder.folder) {
      limitations.push(`💡 ${expectedFolder.content.charAt(0).toUpperCase() + expectedFolder.content.slice(1)} are in the ${expectedFolder.name} folder`);
    }
  } else if (scope === 'selected') {
    limitations.push('Only selected files were searched');
    
    // Check if selected files match the topic
    const hasRelevantFile = filesInScope.some(f => 
      f.contentTags && f.contentTags.includes(topic)
    );
    
    if (!hasRelevantFile && expectedFolder) {
      limitations.push(`💡 The selected files don't contain ${expectedFolder.content}`);
      limitations.push(`Try selecting files from the ${expectedFolder.name} folder`);
    } else if (filesInScope.length < 2) {
      limitations.push('Consider selecting more files for corroboration');
    }
  }
  
  // Confidence-based limitations
  if (confidence === 'low') {
    if (scope !== 'global') {
      limitations.push('💡 Try "All Documents" scope for better coverage');
    } else {
      limitations.push('Query may not match available document content');
    }
  } else if (confidence === 'medium') {
    limitations.push('Additional sources could improve confidence');
  }
  
  return limitations;
};

// =============================================================================
// HELPER: Get folder name by ID (exported for UI use)
// =============================================================================
export const getFolderName = (folderId) => {
  const folder = findFolderById(folderId);
  return folder?.name || 'Unknown';
};

// =============================================================================
// CONFIDENCE CALCULATION ENGINE
// =============================================================================
// This is the core heuristic logic for determining confidence levels.
// It's purely frontend logic - no AI, no statistics, just simple rules.
// =============================================================================

export const calculateConfidence = (metrics) => {
  const { 
    filesInScope, 
    filesWithAccess, 
    filesReviewed, 
    highRelevanceCount, 
    mediumRelevanceCount 
  } = metrics;
  
  const totalRelevant = highRelevanceCount + mediumRelevanceCount;
  
  // =========================================================================
  // DECISION LOGIC
  // =========================================================================
  
  let confidence = 'low';
  let reason = '';
  let details = [];
  
  // Rule 1: No files in scope at all
  if (filesInScope === 0) {
    confidence = 'low';
    reason = 'No files in search scope';
    details = ['Select files or change scope to search documents'];
  }
  // Rule 2: No relevant files found
  else if (totalRelevant === 0) {
    confidence = 'low';
    reason = 'No relevant content found';
    details = [
      `Searched ${filesReviewed} files`,
      'None contained matching information',
      'Try a different scope or rephrase the question'
    ];
  }
  // Rule 3: Multiple high-relevance sources (best case)
  else if (highRelevanceCount >= 2) {
    confidence = 'high';
    reason = 'Multiple authoritative sources';
    details = [
      `Found ${highRelevanceCount} files with direct answers`,
      'Information is consistent across sources',
      'High reliability for this answer'
    ];
  }
  // Rule 4: One high + supporting sources (corroborated)
  else if (highRelevanceCount === 1 && mediumRelevanceCount >= 1) {
    confidence = 'high';
    reason = 'Primary source with corroboration';
    details = [
      '1 file with direct answer',
      `${mediumRelevanceCount} supporting file(s)`,
      'Answer is well-supported'
    ];
  }
  // Rule 5: Single high-relevance source (good but unverified)
  else if (highRelevanceCount === 1 && mediumRelevanceCount === 0) {
    confidence = 'medium';
    reason = 'Single source only';
    details = [
      '1 file with relevant information',
      'No additional sources to verify',
      'Consider searching more files for confirmation'
    ];
  }
  // Rule 6: Multiple medium-relevance sources
  else if (highRelevanceCount === 0 && mediumRelevanceCount >= 2) {
    confidence = 'medium';
    reason = 'Partial information from multiple files';
    details = [
      `${mediumRelevanceCount} files with related content`,
      'No single authoritative source',
      'Answer synthesized from partial matches'
    ];
  }
  // Rule 7: Single medium-relevance source
  else if (highRelevanceCount === 0 && mediumRelevanceCount === 1) {
    confidence = 'medium';
    reason = 'Limited relevant content';
    details = [
      '1 file with partial information',
      'May not fully answer the question',
      'Consider expanding search scope'
    ];
  }
  // Fallback
  else {
    confidence = 'low';
    reason = 'Insufficient information';
    details = ['Could not find enough relevant content'];
  }
  
  // =========================================================================
  // BUILD EXPLANATION
  // =========================================================================
  
  const explanation = buildExplanation(confidence, reason, metrics, details);
  
  return {
    level: confidence,
    reason,
    details,
    explanation
  };
};

// =============================================================================
// HELPER: Build human-readable explanation
// =============================================================================
const buildExplanation = (confidence, reason, metrics, details) => {
  const { 
    filesInScope, 
    filesReviewed, 
    highRelevanceCount, 
    mediumRelevanceCount 
  } = metrics;
  
  const totalRelevant = highRelevanceCount + mediumRelevanceCount;
  
  // Confidence-specific explanations
  const explanations = {
    high: {
      prefix: 'High confidence because',
      templates: [
        `${highRelevanceCount} files directly address this question`,
        'the information is consistent across multiple sources',
        'both primary documents and supporting materials confirm this answer'
      ]
    },
    medium: {
      prefix: 'Medium confidence because',
      templates: [
        totalRelevant === 1 
          ? 'only 1 relevant file was found in the search scope'
          : `${totalRelevant} files had partial matches`,
        'additional sources would help verify this information',
        highRelevanceCount === 0 
          ? 'no files directly answered the question'
          : 'the single source could not be corroborated'
      ]
    },
    low: {
      prefix: 'Low confidence because',
      templates: [
        totalRelevant === 0
          ? 'no relevant files were found in the current scope'
          : 'very limited relevant content was found',
        'the search scope may not include the right documents',
        'try expanding to "All Documents" or selecting a different folder'
      ]
    }
  };
  
  const config = explanations[confidence];
  
  // Build the explanation string
  let explanation = `${config.prefix} `;
  
  if (confidence === 'high') {
    if (highRelevanceCount >= 2) {
      explanation += `multiple files (${highRelevanceCount}) contain information that directly answers your question. `;
      explanation += `The answer is consistent across sources, making it reliable.`;
    } else {
      explanation += `a primary source directly answers your question, `;
      explanation += `and ${mediumRelevanceCount} additional file(s) provide supporting context.`;
    }
  } else if (confidence === 'medium') {
    if (highRelevanceCount === 1) {
      explanation += `only one file directly addresses this question. `;
      explanation += `Without additional sources to verify, the answer may be incomplete.`;
    } else {
      explanation += `${totalRelevant} file(s) contain related information, `;
      explanation += `but none provide a complete or authoritative answer.`;
    }
  } else {
    if (filesInScope === 0) {
      explanation += `no files are in the current search scope. `;
      explanation += `Please select files or change the scope.`;
    } else if (totalRelevant === 0) {
      explanation += `none of the ${filesReviewed} files reviewed contain relevant information. `;
      explanation += `The answer may require documents not in the current scope.`;
    } else {
      explanation += `very limited relevant content was found in the current scope.`;
    }
  }
  
  return explanation;
};

// =============================================================================
// SIMPLIFIED CONFIDENCE HELPER (for use in response generation)
// =============================================================================
export const getConfidenceFromFiles = (highCount, mediumCount) => {
  if (highCount >= 2) return 'high';
  if (highCount === 1 && mediumCount >= 1) return 'high';
  if (highCount === 1) return 'medium';
  if (mediumCount >= 2) return 'medium';
  if (mediumCount === 1) return 'medium';
  return 'low';
};

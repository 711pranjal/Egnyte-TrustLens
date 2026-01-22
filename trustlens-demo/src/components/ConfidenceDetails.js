import React from 'react';
import './ConfidenceDetails.css';

// Icons as components for cleaner code
const CheckIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

const AlertIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10"/>
    <line x1="12" y1="8" x2="12" y2="12"/>
    <line x1="12" y1="16" x2="12.01" y2="16"/>
  </svg>
);

const WarningIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
    <line x1="12" y1="9" x2="12" y2="13"/>
    <line x1="12" y1="17" x2="12.01" y2="17"/>
  </svg>
);

const FileIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
  </svg>
);

const ArrowRightIcon = () => (
  <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="5" y1="12" x2="19" y2="12"/>
    <polyline points="12 5 19 12 12 19"/>
  </svg>
);

const ConfidenceDetails = ({
  confidence,
  confidenceReason,
  explanation,
  metrics,
  limitations,
  sources,
  scopeUsed
}) => {
  // Configuration for each confidence level
  const confidenceConfig = {
    high: {
      label: 'High Confidence',
      icon: <CheckIcon />,
      className: 'confidence-high',
      summary: 'Answer is well-supported'
    },
    medium: {
      label: 'Medium Confidence',
      icon: <AlertIcon />,
      className: 'confidence-medium',
      summary: 'Answer may be incomplete'
    },
    low: {
      label: 'Low Confidence',
      icon: <WarningIcon />,
      className: 'confidence-low',
      summary: 'Limited information found'
    }
  };

  const config = confidenceConfig[confidence] || confidenceConfig.medium;
  
  // Calculate display values
  const highRelevanceCount = metrics.highRelevanceCount || 0;
  const mediumRelevanceCount = metrics.mediumRelevanceCount || 0;
  const hasMatches = metrics.filesWithMatches > 0;
  const hasSources = sources && sources.length > 0 && sources[0].id !== 'none';

  return (
    <div className={`confidence-details ${config.className}`}>
      
      {/* ===== SECTION 1: Confidence Summary ===== */}
      <div className="details-hero">
        <div className={`hero-badge ${config.className}`}>
          {config.icon}
          <span>{config.label}</span>
        </div>
        <p className="hero-summary">{confidenceReason || config.summary}</p>
      </div>

      {/* ===== SECTION 2: Scope Used ===== */}
      <div className="details-scope">
        <div className="scope-row">
          <span className="scope-label">Scope searched:</span>
          <span className="scope-value">{scopeUsed || `${metrics.filesInScope} files`}</span>
        </div>
      </div>

      {/* ===== SECTION 3: File Funnel (Visual) ===== */}
      <div className="details-funnel">
        <h4>How we got this answer</h4>
        <div className="funnel-steps">
          <div className="funnel-step">
            <div className="step-number">{metrics.filesInScope}</div>
            <div className="step-label">in scope</div>
          </div>
          <ArrowRightIcon />
          <div className="funnel-step">
            <div className="step-number">{metrics.filesReviewed}</div>
            <div className="step-label">reviewed</div>
          </div>
          <ArrowRightIcon />
          <div className={`funnel-step ${hasMatches ? 'highlight' : 'empty'}`}>
            <div className="step-number">{metrics.filesWithMatches}</div>
            <div className="step-label">matched</div>
          </div>
          <ArrowRightIcon />
          <div className={`funnel-step ${hasSources ? 'highlight' : 'empty'}`}>
            <div className="step-number">{hasSources ? sources.length : 0}</div>
            <div className="step-label">cited</div>
          </div>
        </div>
        
        {/* Relevance breakdown if we have matches */}
        {(highRelevanceCount > 0 || mediumRelevanceCount > 0) && (
          <div className="funnel-breakdown">
            {highRelevanceCount > 0 && (
              <span className="breakdown-tag high">
                {highRelevanceCount} direct match{highRelevanceCount !== 1 ? 'es' : ''}
              </span>
            )}
            {mediumRelevanceCount > 0 && (
              <span className="breakdown-tag medium">
                {mediumRelevanceCount} partial match{mediumRelevanceCount !== 1 ? 'es' : ''}
              </span>
            )}
          </div>
        )}
      </div>

      {/* ===== SECTION 4: Why This Confidence ===== */}
      <div className="details-explanation">
        <h4>Why this confidence level?</h4>
        <p>{explanation}</p>
      </div>

      {/* ===== SECTION 5: Sources Used ===== */}
      {hasSources ? (
        <div className="details-sources">
          <h4>Files referenced</h4>
          <ul className="sources-list">
            {sources.map((source, index) => (
              <li key={index} className="source-item">
                <FileIcon />
                <span className="source-name">{source.name}</span>
                <span className={`source-relevance ${source.relevance}`}>
                  {source.relevance === 'high' ? '● Direct' : '○ Partial'}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="details-no-sources">
          <h4>Files referenced</h4>
          <div className="no-sources-message">
            <WarningIcon />
            <span>No matching files found in the current scope</span>
          </div>
        </div>
      )}

      {/* ===== SECTION 6: Suggestions (for low/medium confidence) ===== */}
      {confidence !== 'high' && (
        <div className={`details-suggestions ${config.className}`}>
          <h4>
            {confidence === 'low' ? '⚡ Improve this answer' : '💡 For higher confidence'}
          </h4>
          <ul className="suggestions-list">
            {confidence === 'low' ? (
              <>
                <li>
                  <strong>Expand scope:</strong> Switch to "All Documents" to search everything
                </li>
                <li>
                  <strong>Check folder:</strong> Make sure you're searching the right folder
                </li>
                <li>
                  <strong>Select files:</strong> Manually select files you know are relevant
                </li>
              </>
            ) : (
              <>
                <li>
                  <strong>Add more files:</strong> Select additional related documents
                </li>
                <li>
                  <strong>Try global search:</strong> Search all documents for corroboration
                </li>
              </>
            )}
          </ul>
        </div>
      )}

      {/* ===== SECTION 7: Limitations ===== */}
      {limitations && limitations.length > 0 && (
        <div className="details-limitations">
          <h4>Limitations</h4>
          <ul className="limitations-list">
            {limitations.map((limitation, index) => (
              <li key={index}>
                {limitation.startsWith('💡') ? (
                  <span className="limitation-tip">{limitation}</span>
                ) : (
                  <span className="limitation-warning">{limitation}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* ===== SECTION 8: High Confidence Affirmation ===== */}
      {confidence === 'high' && (
        <div className="details-affirmation">
          <CheckIcon />
          <span>This answer is well-supported by multiple relevant documents.</span>
        </div>
      )}
    </div>
  );
};

export default ConfidenceDetails;

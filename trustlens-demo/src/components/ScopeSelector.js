import React from 'react';
import './ScopeSelector.css';

const ScopeSelector = ({
  scope,
  currentFolder,
  selectedFiles,
  onScopeChange,
  folderName
}) => {
  // Determine if folder scope should be disabled (only root selected)
  const isFolderDisabled = currentFolder === 'root';
  
  const scopes = [
    {
      id: 'global',
      label: 'All Documents',
      icon: (
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"/>
          <line x1="2" y1="12" x2="22" y2="12"/>
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
        </svg>
      ),
      description: 'Search all 17 files across all folders',
      fileCount: 17
    },
    {
      id: 'folder',
      label: isFolderDisabled ? 'Select Folder' : folderName,
      icon: (
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
        </svg>
      ),
      description: isFolderDisabled 
        ? 'Click a folder in the sidebar first' 
        : `Search only in ${folderName} folder`,
      disabled: isFolderDisabled
    },
    {
      id: 'selected',
      label: selectedFiles.length === 0 ? 'No Files' : `${selectedFiles.length} File${selectedFiles.length !== 1 ? 's' : ''}`,
      icon: (
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14 2 14 8 20 8"/>
          <polyline points="9 15 11 17 15 13"/>
        </svg>
      ),
      description: selectedFiles.length === 0 
        ? 'Check files in the sidebar first' 
        : `Search only the ${selectedFiles.length} selected file${selectedFiles.length !== 1 ? 's' : ''}`,
      disabled: selectedFiles.length === 0
    }
  ];

  // Get helpful hint based on current state
  const getHint = () => {
    if (scope === 'global') {
      return 'Searching all files. Click a folder or select files to narrow scope.';
    }
    if (scope === 'folder') {
      return `Searching only in "${folderName}". Other folders are excluded.`;
    }
    if (scope === 'selected') {
      return `Searching only ${selectedFiles.length} selected file${selectedFiles.length !== 1 ? 's' : ''}. Other files are excluded.`;
    }
    return null;
  };

  return (
    <div className="scope-selector">
      <div className="scope-header">
        <span className="scope-label">Search scope:</span>
      </div>
      
      <div className="scope-buttons">
        {scopes.map((s) => (
          <button
            key={s.id}
            className={`scope-button ${scope === s.id ? 'active' : ''} ${s.disabled ? 'disabled' : ''}`}
            onClick={() => !s.disabled && onScopeChange(s.id)}
            disabled={s.disabled}
            title={s.description}
          >
            {s.icon}
            <span className="scope-button-label">{s.label}</span>
            {scope === s.id && <span className="scope-active-dot" />}
          </button>
        ))}
      </div>
      
      <div className="scope-hint">
        <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="16" x2="12" y2="12"/>
          <line x1="12" y1="8" x2="12.01" y2="8"/>
        </svg>
        <span>{getHint()}</span>
      </div>
    </div>
  );
};

export default ScopeSelector;

import React from 'react';
import './Sidebar.css';

const FileIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
  </svg>
);

const FolderIcon = ({ isOpen }) => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
    {isOpen ? (
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
    ) : (
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
    )}
  </svg>
);

const ChevronIcon = ({ isOpen }) => (
  <svg 
    viewBox="0 0 24 24" 
    width="14" 
    height="14" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2"
    className={`chevron ${isOpen ? 'open' : ''}`}
  >
    <polyline points="9 18 15 12 9 6"/>
  </svg>
);

const FolderTree = ({ 
  node, 
  depth = 0, 
  expandedFolders, 
  selectedFiles, 
  currentFolder,
  onToggleFolder, 
  onToggleFile 
}) => {
  const isFolder = node.type === 'folder';
  const isExpanded = expandedFolders.includes(node.id);
  const isSelected = currentFolder === node.id;
  const isFileSelected = selectedFiles.includes(node.id);

  if (isFolder) {
    return (
      <div className="folder-item">
        <div 
          className={`folder-header ${isSelected ? 'selected' : ''}`}
          style={{ paddingLeft: `${depth * 16 + 8}px` }}
          onClick={() => onToggleFolder(node.id)}
        >
          <ChevronIcon isOpen={isExpanded} />
          <FolderIcon isOpen={isExpanded} />
          <span className="folder-name">{node.name}</span>
          <span className="folder-count">{node.children?.filter(c => c.type === 'file').length}</span>
        </div>
        
        {isExpanded && node.children && (
          <div className="folder-children">
            {node.children.map(child => (
              <FolderTree
                key={child.id}
                node={child}
                depth={depth + 1}
                expandedFolders={expandedFolders}
                selectedFiles={selectedFiles}
                currentFolder={currentFolder}
                onToggleFolder={onToggleFolder}
                onToggleFile={onToggleFile}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  // File
  return (
    <div 
      className={`file-item ${isFileSelected ? 'selected' : ''}`}
      style={{ paddingLeft: `${depth * 16 + 8}px` }}
    >
      <label className="file-checkbox">
        <input
          type="checkbox"
          checked={isFileSelected}
          onChange={() => onToggleFile(node.id)}
        />
        <span className="checkmark"></span>
      </label>
      <FileIcon />
      <span className="file-name" title={node.name}>
        {node.name}
      </span>
    </div>
  );
};

const Sidebar = ({
  fileSystem,
  currentFolder,
  selectedFiles,
  expandedFolders,
  scope,
  onToggleFolder,
  onToggleFile,
  onClearSelection
}) => {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>Files</h2>
      </div>
      
      <div className="sidebar-content">
        <FolderTree
          node={fileSystem}
          expandedFolders={expandedFolders}
          selectedFiles={selectedFiles}
          currentFolder={currentFolder}
          onToggleFolder={onToggleFolder}
          onToggleFile={onToggleFile}
        />
      </div>
      
      {selectedFiles.length > 0 && (
        <div className="sidebar-footer">
          <div className="selection-info">
            <div className="selection-details">
              <span className="selection-count">
                {selectedFiles.length} file{selectedFiles.length !== 1 ? 's' : ''} selected
              </span>
              {scope === 'selected' && (
                <span className="scope-active-badge">● Active scope</span>
              )}
            </div>
            <button className="clear-selection" onClick={onClearSelection}>
              Clear
            </button>
          </div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;

import React, { useState, useCallback } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import ChatArea from './components/ChatArea';
import { fileSystem, generateMockResponse } from './data/mockData';

function App() {
  // =========================================================================
  // STATE
  // =========================================================================
  
  // File system state
  const [currentFolder, setCurrentFolder] = useState('root');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [expandedFolders, setExpandedFolders] = useState(['root']);
  
  // Scope state: 'global' | 'folder' | 'selected'
  const [scope, setScope] = useState('global');
  
  // Track previous scope for reverting when files are deselected
  const [previousScope, setPreviousScope] = useState('global');
  
  // Chat state
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      type: 'assistant',
      answer: "👋 Hi! I'm your Document Copilot. Ask me anything about your files.\n\n**Try these sample questions:**\n• What is Sarah Chen's React experience?\n• Which documents mention React migration?\n• Is there enough info to summarize frontend skills?\n\n**Demo tip:** Change the search scope (Global → Folder → Selected Files) to see how confidence levels change based on which files are searched!",
      confidence: null,
      isWelcome: true
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  
  // UI state
  const [expandedMessageId, setExpandedMessageId] = useState(null);

  // =========================================================================
  // SCOPE LOGIC
  // =========================================================================
  
  // Toggle folder expansion AND auto-switch to folder scope
  const toggleFolder = useCallback((folderId) => {
    // Toggle expansion
    setExpandedFolders(prev => 
      prev.includes(folderId) 
        ? prev.filter(id => id !== folderId)
        : [...prev, folderId]
    );
    
    // Set current folder
    setCurrentFolder(folderId);
    
    // Auto-switch to folder scope (only if clicking a real folder, not root)
    if (folderId !== 'root') {
      // Save current scope before switching (for potential revert)
      if (scope !== 'selected') {
        setPreviousScope(scope);
      }
      setScope('folder');
    }
  }, [scope]);

  // Toggle file selection AND auto-switch to selected scope
  const toggleFileSelection = useCallback((fileId) => {
    setSelectedFiles(prev => {
      const isCurrentlySelected = prev.includes(fileId);
      const newSelection = isCurrentlySelected
        ? prev.filter(id => id !== fileId)
        : [...prev, fileId];
      
      // Auto-switch scope based on selection
      if (newSelection.length > 0) {
        // Files selected → switch to "selected" scope
        if (scope !== 'selected') {
          setPreviousScope(scope);
        }
        setScope('selected');
      } else {
        // No files selected → revert to previous scope
        setScope(previousScope);
      }
      
      return newSelection;
    });
  }, [scope, previousScope]);

  // Handle manual scope change (user clicks scope buttons)
  const handleScopeChange = useCallback((newScope) => {
    // When switching to global, we keep selections but ignore them
    // When switching to folder, we use currentFolder
    // When switching to selected, we use selectedFiles (may be empty)
    setScope(newScope);
    setPreviousScope(newScope === 'selected' ? previousScope : newScope);
  }, [previousScope]);
  
  // Clear all file selections
  const clearFileSelection = useCallback(() => {
    setSelectedFiles([]);
    // Revert to previous non-selected scope
    setScope(previousScope);
  }, [previousScope]);

  // Handle message expand/collapse
  const toggleMessageExpand = useCallback((messageId) => {
    setExpandedMessageId(prev => prev === messageId ? null : messageId);
  }, []);

  // Handle query submission
  const handleSubmitQuery = useCallback((query) => {
    if (!query.trim()) return;

    // Add user message
    const userMessage = {
      id: `user-${Date.now()}`,
      type: 'user',
      content: query,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    // Simulate AI thinking time
    const thinkingTime = 1000 + Math.random() * 1500;
    
    setTimeout(() => {
      const response = generateMockResponse(
        query,
        scope,
        currentFolder,
        selectedFiles
      );
      
      setMessages(prev => [...prev, response]);
      setIsTyping(false);
    }, thinkingTime);
  }, [scope, currentFolder, selectedFiles]);

  return (
    <div className="app">
      <header className="app-header">
        <div className="app-logo">
          <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2L2 7l10 5 10-5-10-5z"/>
            <path d="M2 17l10 5 10-5"/>
            <path d="M2 12l10 5 10-5"/>
          </svg>
          <span className="app-title">TrustLens</span>
          <span className="app-subtitle">Document Copilot</span>
        </div>
        <div className="app-header-right">
          <span className="demo-badge">Demo Mode</span>
        </div>
      </header>
      
      <main className="app-main">
        <Sidebar
          fileSystem={fileSystem}
          currentFolder={currentFolder}
          selectedFiles={selectedFiles}
          expandedFolders={expandedFolders}
          scope={scope}
          onToggleFolder={toggleFolder}
          onToggleFile={toggleFileSelection}
          onClearSelection={clearFileSelection}
        />
        
        <ChatArea
          messages={messages}
          isTyping={isTyping}
          scope={scope}
          currentFolder={currentFolder}
          selectedFiles={selectedFiles}
          expandedMessageId={expandedMessageId}
          onScopeChange={handleScopeChange}
          onToggleExpand={toggleMessageExpand}
          onSubmitQuery={handleSubmitQuery}
          fileSystem={fileSystem}
        />
      </main>
    </div>
  );
}

export default App;

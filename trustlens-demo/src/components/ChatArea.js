import React, { useState, useRef, useEffect } from 'react';
import './ChatArea.css';
import ScopeSelector from './ScopeSelector';
import Message from './Message';

const ChatArea = ({
  messages,
  isTyping,
  scope,
  currentFolder,
  selectedFiles,
  expandedMessageId,
  onScopeChange,
  onToggleExpand,
  onSubmitQuery,
  fileSystem
}) => {
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Get folder name for display
  const getFolderName = (folderId) => {
    const findFolder = (node) => {
      if (node.id === folderId) return node.name;
      if (node.children) {
        for (const child of node.children) {
          const found = findFolder(child);
          if (found) return found;
        }
      }
      return null;
    };
    return findFolder(fileSystem) || 'Unknown';
  };

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSubmitQuery(inputValue);
      setInputValue('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  // Suggested questions - these have hand-crafted responses
  const suggestions = [
    "What is Sarah Chen's React experience?",
    "Which documents mention React migration?",
    "Is there enough info to summarize frontend skills?",
    "What's our NDA confidentiality period?"
  ];

  const handleSuggestionClick = (suggestion) => {
    onSubmitQuery(suggestion);
  };

  return (
    <div className="chat-area">
      <div className="chat-header">
        <ScopeSelector
          scope={scope}
          currentFolder={currentFolder}
          selectedFiles={selectedFiles}
          onScopeChange={onScopeChange}
          folderName={getFolderName(currentFolder)}
        />
      </div>

      <div className="chat-messages">
        {messages.map((message) => (
          <Message
            key={message.id}
            message={message}
            isExpanded={expandedMessageId === message.id}
            onToggleExpand={() => onToggleExpand(message.id)}
          />
        ))}
        
        {isTyping && (
          <div className="typing-indicator">
            <div className="typing-dot"></div>
            <div className="typing-dot"></div>
            <div className="typing-dot"></div>
            <span className="typing-text">Searching documents...</span>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {messages.length === 1 && (
        <div className="suggestions">
          <p className="suggestions-label">Try asking:</p>
          <div className="suggestions-list">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                className="suggestion-chip"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}

      <form className="chat-input-form" onSubmit={handleSubmit}>
        <div className="input-container">
          <textarea
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask a question about your documents..."
            rows={1}
            disabled={isTyping}
          />
          <button 
            type="submit" 
            className="send-button"
            disabled={!inputValue.trim() || isTyping}
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="22" y1="2" x2="11" y2="13"/>
              <polygon points="22 2 15 22 11 13 2 9 22 2"/>
            </svg>
          </button>
        </div>
        <p className="input-hint">
          Press Enter to send · Shift+Enter for new line
        </p>
      </form>
    </div>
  );
};

export default ChatArea;

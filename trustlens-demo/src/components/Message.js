import React, { useState, useEffect, useRef } from 'react';
import './Message.css';
import ConfidenceDetails from './ConfidenceDetails';

// Streaming configuration
const CHUNK_SIZE = 8; // words per chunk
const CHUNK_DELAY = 50; // ms between chunks
const FINAL_DELAY = 300; // ms before showing confidence badge

const Message = ({ message, isExpanded, onToggleExpand }) => {
  // Streaming state
  const [displayedText, setDisplayedText] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamComplete, setStreamComplete] = useState(false);
  const streamRef = useRef(null);
  
  // Start streaming effect for new assistant messages
  useEffect(() => {
    // Skip streaming for welcome messages or user messages
    if (message.type === 'user' || message.isWelcome) {
      setDisplayedText(message.answer || message.content || '');
      setStreamComplete(true);
      streamRef.current = message.id;
      return;
    }
    
    // Skip if already streamed (message streaming has completed)
    if (streamRef.current === message.id) {
      return;
    }
    
    // Note: We set streamRef.current only AFTER streaming completes,
    // not at the start. This ensures React 18 StrictMode double-effect
    // runs work correctly (the first run's interval gets cleaned up,
    // allowing the second run to properly start and complete streaming).
    const fullText = message.answer || '';
    const words = fullText.split(' ');
    let currentIndex = 0;
    
    setIsStreaming(true);
    setStreamComplete(false);
    setDisplayedText('');
    
    // Stream words in chunks
    const streamInterval = setInterval(() => {
      currentIndex += CHUNK_SIZE;
      
      if (currentIndex >= words.length) {
        // Finished streaming
        setDisplayedText(fullText);
        setIsStreaming(false);
        clearInterval(streamInterval);
        
        // Mark this message as fully streamed (prevents re-streaming on re-renders)
        streamRef.current = message.id;
        
        // Show confidence badge after a short delay
        setTimeout(() => {
          setStreamComplete(true);
        }, FINAL_DELAY);
      } else {
        // Show next chunk
        setDisplayedText(words.slice(0, currentIndex).join(' '));
      }
    }, CHUNK_DELAY);
    
    // Cleanup - clears interval if component unmounts or effect re-runs
    // In StrictMode, this allows the second effect run to start fresh
    return () => {
      clearInterval(streamInterval);
    };
  }, [message.id, message.answer, message.content, message.type, message.isWelcome]);
  // User message
  if (message.type === 'user') {
    return (
      <div className="message user-message">
        <div className="message-content">
          <p>{message.content}</p>
        </div>
        <div className="message-avatar user-avatar">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
          </svg>
        </div>
      </div>
    );
  }

  // Welcome message (no confidence)
  if (message.isWelcome) {
    return (
      <div className="message assistant-message welcome-message">
        <div className="message-avatar assistant-avatar">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2L2 7l10 5 10-5-10-5z"/>
            <path d="M2 17l10 5 10-5"/>
            <path d="M2 12l10 5 10-5"/>
          </svg>
        </div>
        <div className="message-content">
          <div className="answer-text" dangerouslySetInnerHTML={{ 
            __html: formatMarkdown(displayedText) 
          }} />
        </div>
      </div>
    );
  }

  // Assistant message with confidence
  return (
    <div className="message assistant-message">
      <div className="message-avatar assistant-avatar">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2L2 7l10 5 10-5-10-5z"/>
          <path d="M2 17l10 5 10-5"/>
          <path d="M2 12l10 5 10-5"/>
        </svg>
      </div>
      
      <div className="message-content">
        {/* Main answer text - with streaming effect */}
        <div className="answer-text" dangerouslySetInnerHTML={{ 
          __html: formatMarkdown(displayedText) 
        }} />
        
        {/* Streaming cursor */}
        {isStreaming && (
          <span className="streaming-cursor">▊</span>
        )}
        
        {/* Compact metadata bar - only shows after streaming completes */}
        {streamComplete && (
          <div className="answer-meta fade-in">
            <ConfidenceBadge 
              confidence={message.confidence} 
              onClick={onToggleExpand}
              isExpanded={isExpanded}
            />
            
            <span className="meta-divider">·</span>
            
            <span className="meta-scope">
              <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/>
                <line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              {message.scope}
            </span>
            
            <span className="meta-divider">·</span>
            
            <span className="meta-files">
              <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
              </svg>
              {message.metrics.filesReviewed} files reviewed
            </span>
          </div>
        )}
        
        {/* Expandable "Why?" link - only shows after streaming */}
        {streamComplete && (
          <button 
            className={`why-button fade-in ${isExpanded ? 'expanded' : ''}`}
            onClick={onToggleExpand}
          >
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
            {isExpanded ? 'Hide details' : 'Why this confidence?'}
          </button>
        )}
        
        {/* Expanded details panel */}
        {isExpanded && streamComplete && (
          <ConfidenceDetails
            confidence={message.confidence}
            confidenceReason={message.confidenceReason}
            explanation={message.explanation}
            metrics={message.metrics}
            limitations={message.limitations}
            sources={message.sources}
            scopeUsed={message.scope}
          />
        )}
      </div>
    </div>
  );
};

// Confidence Badge Component
const ConfidenceBadge = ({ confidence, onClick, isExpanded }) => {
  const config = {
    high: { label: 'High', className: 'confidence-high' },
    medium: { label: 'Medium', className: 'confidence-medium' },
    low: { label: 'Low', className: 'confidence-low' }
  };

  const { label, className } = config[confidence] || config.medium;

  return (
    <button 
      className={`confidence-badge ${className} ${isExpanded ? 'active' : ''}`}
      onClick={onClick}
      title="Click for details"
    >
      <span className="confidence-dot"></span>
      {label} confidence
    </button>
  );
};

// Simple markdown formatter with citation highlighting
const formatMarkdown = (text) => {
  if (!text) return '';
  
  return text
    // Bold
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    // Italic
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    // File citations (e.g., Resume_Sarah_Chen.pdf or Interview_Notes.docx)
    .replace(/(\b\w+(?:_\w+)*\.(?:pdf|docx|xlsx|md|txt)\b)/gi, '<span class="inline-citation">$1</span>')
    // Lists
    .replace(/^• (.*)$/gm, '<li>$1</li>')
    // Wrap consecutive li in ul
    .replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>')
    // Line breaks
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n/g, '<br/>');
};

export default Message;

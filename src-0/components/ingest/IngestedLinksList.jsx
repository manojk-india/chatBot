import React from 'react';
import './IngestedLinksList.css';

const IngestedLinksList = ({ links, searchTerm, loading }) => {
  const highlightText = (text, highlight) => {
    if (!highlight) return text;
    
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return parts.map((part, index) =>
      part.toLowerCase() === highlight.toLowerCase() ? (
        <mark key={index} className="highlight">{part}</mark>
      ) : (
        part
      )
    );
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'ingested':
        return (
          <svg className="status-icon success" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        );
      case 'failed':
        return (
          <svg className="status-icon error" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/>
            <line x1="15" y1="9" x2="9" y2="15"/>
            <line x1="9" y1="9" x2="15" y2="15"/>
          </svg>
        );
      case 'processing':
        return (
          <div className="status-icon processing">
            <div className="spinner-tiny"></div>
          </div>
        );
      default:
        return null;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'ingested':
        return 'Successfully ingested';
      case 'failed':
        return 'Ingestion failed';
      case 'processing':
        return 'Processing...';
      default:
        return 'Unknown status';
    }
  };

  if (loading) {
    return (
      <div className="links-loading">
        <div className="loading-spinner"></div>
        <p>Loading links...</p>
      </div>
    );
  }

  if (links.length === 0) {
    return (
      <div className="no-results">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="11" cy="11" r="8"/>
          <path d="m21 21-4.35-4.35"/>
        </svg>
        <p>No links found matching "{searchTerm}"</p>
      </div>
    );
  }

  return (
    <div className="ingested-links-list">
      {links.map((link) => (
        <div key={link.id} className={`link-card ${link.status}`}>
          <div className="link-header">
            <div className="link-info">
              <h4 className="link-title">
                {highlightText(link.title, searchTerm)}
              </h4>
              <a 
                href={link.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="link-url"
                title={link.url}
              >
                {highlightText(link.url, searchTerm)}
              </a>
            </div>
            <div className="link-actions">
              <button 
                className="action-btn"
                title="View details"
                onClick={() => console.log('View details for:', link.id)}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
              </button>
              <button 
                className="action-btn"
                title="Re-ingest"
                onClick={() => console.log('Re-ingest:', link.id)}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="23 4 23 10 17 10"/>
                  <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
                </svg>
              </button>
            </div>
          </div>
          
          <div className="link-footer">
            <div className="link-status">
              {getStatusIcon(link.status)}
              <span className="status-text">{getStatusText(link.status)}</span>
            </div>
            <div className="link-meta">
              <span className="source-badge">{link.source.name || link.source}</span>
              <span className="date-text">Last ingested: {link.lastIngested}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default IngestedLinksList;
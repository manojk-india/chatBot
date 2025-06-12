import React, { useState } from 'react';
import CustomDropdown from './CustomDropdown';
import LinksInput from './LinksInput';
import './LeftIngestionPanel.css';

const LeftIngestionPanel = ({
  topics,
  sources,
  selectedTopic,
  selectedSource,
  links,
  onTopicChange,
  onSourceChange,
  onLinksChange,
  onIngestLinks,
  loading
}) => {
  const [showCreateTopic, setShowCreateTopic] = useState(false);
  const [newTopicName, setNewTopicName] = useState('');

  const handleCreateTopic = () => {
    if (newTopicName.trim()) {
      const newTopic = {
        id: Date.now(),
        name: newTopicName.trim()
      };
      onTopicChange(newTopic);
      setNewTopicName('');
      setShowCreateTopic(false);
    }
  };

  const topicOptions = [
    ...topics.map(topic => ({
      id: topic.id,
      label: topic.name,
      value: topic
    })),
    {
      id: 'create-new',
      label: '+ Create New Topic',
      value: 'create-new',
      isSpecial: true
    }
  ];

  const sourceOptions = sources.map(source => ({
    id: source.id,
    label: source.name,
    value: source
  }));

  const handleTopicSelect = (option) => {
    if (option.value === 'create-new') {
      setShowCreateTopic(true);
    } else {
      onTopicChange(option.value);
      setShowCreateTopic(false);
    }
  };

  const handleSourceSelect = (option) => {
    onSourceChange(option.value);
  };

  return (
    <div className="left-ingestion-panel">
      <div className="panel-header">
        <div className="logo-section">
          <div className="ingestion-logo-circle">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14,2 14,8 20,8"/>
              <line x1="16" y1="13" x2="8" y2="13"/>
              <line x1="16" y1="17" x2="8" y2="17"/>
              <polyline points="10,9 9,9 8,9"/>
            </svg>
          </div>
          <h2>Ingest Files</h2>
        </div>
      </div>

      <div className="ingestion-controls">
        {/* Topic Selection */}
        <div className="control-section">
          <label className="control-label">Topic</label>
          <CustomDropdown
            options={topicOptions}
            placeholder="Select or create topic..."
            selectedValue={selectedTopic}
            onSelect={handleTopicSelect}
            disabled={loading}
          />
          
          {showCreateTopic && (
            <div className="create-topic-section">
              <input
                type="text"
                value={newTopicName}
                onChange={(e) => setNewTopicName(e.target.value)}
                placeholder="Enter new topic name"
                className="create-topic-input"
                autoFocus
                onKeyPress={(e) => e.key === 'Enter' && handleCreateTopic()}
              />
              <div className="create-topic-buttons">
                <button 
                  onClick={handleCreateTopic}
                  className="create-btn"
                  disabled={!newTopicName.trim()}
                >
                  Create
                </button>
                <button 
                  onClick={() => setShowCreateTopic(false)}
                  className="cancel-btn"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Source Selection */}
        {selectedTopic && (
          <div className="control-section">
            <label className="control-label">Source</label>
            <CustomDropdown
              options={sourceOptions}
              placeholder="Select source..."
              selectedValue={selectedSource}
              onSelect={handleSourceSelect}
              disabled={loading}
            />
          </div>
        )}

        {/* Links Input */}
        {selectedTopic && selectedSource && (
          <div className="control-section">
            <label className="control-label">Links</label>
            <LinksInput
              links={links}
              onLinksChange={onLinksChange}
              disabled={loading}
            />
            
            {links.length > 0 && (
              <button 
                onClick={onIngestLinks}
                className="ingest-button"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner-small"></span>
                    Ingesting...
                  </>
                ) : (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                      <polyline points="17 8 12 3 7 8"/>
                      <line x1="12" y1="3" x2="12" y2="15"/>
                    </svg>
                    Ingest Links ({links.length})
                  </>
                )}
              </button>
            )}
          </div>
        )}
      </div>

      <div className="panel-footer">
        <div className="tips">
          <h4>Tips:</h4>
          <ul>
            <li>Select a topic to organize your content</li>
            <li>Choose the appropriate source type</li>
            <li>Add multiple links separated by new lines</li>
            <li>Ensure links are accessible and valid</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LeftIngestionPanel;
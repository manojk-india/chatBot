import React from 'react';
import SearchBar from './SearchBar';
import IngestedLinksList from './IngestedLinksList';
import EmptyState from './EmptyState';
import './RightIngestionPanel.css';

const RightIngestionPanel = ({
  ingestedLinks,
  selectedTopic,
  selectedSource,
  searchTerm,
  onSearchChange,
  loading
}) => {
  const filteredLinks = ingestedLinks.filter(link =>
    link.url.toLowerCase().includes(searchTerm.toLowerCase()) ||
    link.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderContent = () => {
    // Show empty state if no topic or source selected
    if (!selectedTopic || !selectedSource) {
      return (
        <EmptyState
          title="Select Topic & Source"
          subtitle="Choose a topic and source to view ingested links"
          icon="selection"
        />
      );
    }

    // Show loading state
    if (loading && ingestedLinks.length === 0) {
      return (
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Loading ingested links...</p>
        </div>
      );
    }

    // Show empty state if no links found
    if (ingestedLinks.length === 0) {
      return (
        <EmptyState
          title="No Links Found"
          subtitle={`No ingested links found for ${selectedTopic.name} from ${selectedSource.name}`}
          icon="empty"
        />
      );
    }

    // Show search results or all links
    return (
      <>
        <div className="panel-header-right">
          <div className="header-info">
            <h3>Ingested Links</h3>
            <span className="links-count">
              {filteredLinks.length} of {ingestedLinks.length} links
            </span>
          </div>
          <SearchBar
            searchTerm={searchTerm}
            onSearchChange={onSearchChange}
            placeholder="Search links..."
          />
        </div>
        
        <IngestedLinksList
          links={filteredLinks}
          searchTerm={searchTerm}
          loading={loading}
        />
      </>
    );
  };

  return (
    <div className="right-ingestion-panel">
      {renderContent()}
    </div>
  );
};

export default RightIngestionPanel;
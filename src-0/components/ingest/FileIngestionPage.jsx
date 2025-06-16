import React, { useState, useEffect } from 'react';
import LeftIngestionPanel from './LeftIngestionPanel';
import RightIngestionPanel from './RightIngestionPanel';
import './FileIngestionPage.css';

const FileIngestionPage = () => {
  const [selectedTopic, setSelectedTopic] = useState('');
  const [selectedSource, setSelectedSource] = useState('');
  const [links, setLinks] = useState([]);
  const [ingestedLinks, setIngestedLinks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  // Mock topics data - replace with actual API call
  const [topics] = useState([
    { id: 1, name: 'Product Documentation' },
    { id: 2, name: 'Technical Guides' },
    { id: 3, name: 'User Manuals' },
    { id: 4, name: 'API Documentation' }
  ]);

  const sources = [
    { id: 'confluence', name: 'Confluence' },
    { id: 'sharedrive', name: 'ShareDrive' }
  ];

  // Fetch ingested links when topic and source are selected
  useEffect(() => {
    if (selectedTopic && selectedSource) {
      fetchIngestedLinks();
    } else {
      setIngestedLinks([]);
    }
  }, [selectedTopic, selectedSource]);

  const fetchIngestedLinks = async () => {
    setLoading(true);
    try {
      // Simulate API call - replace with actual API endpoint
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Mock data - replace with actual API response
      const mockIngestedLinks = [
        {
          id: 1,
          url: 'https://confluence.company.com/display/PROD/Getting-Started',
          title: 'Getting Started Guide',
          status: 'ingested',
          lastIngested: '2024-06-10',
          source: selectedSource
        },
        {
          id: 2,
          url: 'https://confluence.company.com/display/PROD/API-Reference',
          title: 'API Reference Documentation',
          status: 'ingested',
          lastIngested: '2024-06-09',
          source: selectedSource
        },
        {
          id: 3,
          url: 'https://confluence.company.com/display/PROD/User-Manual',
          title: 'User Manual - Advanced Features',
          status: 'failed',
          lastIngested: '2024-06-08',
          source: selectedSource
        },
        {
          id: 4,
          url: 'https://drive.company.com/file/d/1234567890/Technical-Specs',
          title: 'Technical Specifications',
          status: 'ingested',
          lastIngested: '2024-06-11',
          source: selectedSource
        }
      ];
      
      setIngestedLinks(mockIngestedLinks);
    } catch (error) {
      console.error('Failed to fetch ingested links:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTopicChange = (topic) => {
    setSelectedTopic(topic);
  };

  const handleSourceChange = (source) => {
    setSelectedSource(source);
  };

  const handleLinksChange = (newLinks) => {
    setLinks(newLinks);
  };

  const handleIngestLinks = async () => {
    if (!selectedTopic || !selectedSource || links.length === 0) {
      alert('Please select topic, source and add at least one link');
      return;
    }

    setLoading(true);
    try {
      // Simulate API call for ingesting links
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Add new links to ingested links list
      const newIngestedLinks = links.map((link, index) => ({
        id: Date.now() + index,
        url: link,
        title: `Document from ${link}`,
        status: 'ingested',
        lastIngested: new Date().toISOString().split('T')[0],
        source: selectedSource
      }));
      
      setIngestedLinks(prev => [...newIngestedLinks, ...prev]);
      setLinks([]); // Clear the input links
      
      alert('Links ingested successfully!');
    } catch (error) {
      console.error('Failed to ingest links:', error);
      alert('Failed to ingest links. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="file-ingestion-container">
      <LeftIngestionPanel
        topics={topics}
        sources={sources}
        selectedTopic={selectedTopic}
        selectedSource={selectedSource}
        links={links}
        onTopicChange={handleTopicChange}
        onSourceChange={handleSourceChange}
        onLinksChange={handleLinksChange}
        onIngestLinks={handleIngestLinks}
        loading={loading}
      />
      <RightIngestionPanel
        ingestedLinks={ingestedLinks}
        selectedTopic={selectedTopic}
        selectedSource={selectedSource}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        loading={loading}
      />
    </div>
  );
};

export default FileIngestionPage;
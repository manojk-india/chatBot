// components/ingest/LinkInput.jsx
import React, { useState } from 'react';
import './LinksInput.css';

function isValidUrl(url) {
  try {
    // Accepts http(s) and share drive links
    const pattern = /^(https?:\/\/|\\\\[a-zA-Z0-9_.$-]+)/;
    return pattern.test(url.trim());
  } catch {
    return false;
  }
}

const LinkInput = ({ links, setLinks, disabled }) => {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');

  // Parse multiple links from textarea (newline or comma separated)
  const parseLinks = (text) => {
    return text
      .split(/\n|,/)
      .map(link => link.trim())
      .filter(link => link.length > 0);
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
    setError('');
  };

  const handleAddLinks = (e) => {
    e.preventDefault();
    const newLinks = parseLinks(input);
    const invalids = newLinks.filter(link => !isValidUrl(link));
    if (invalids.length > 0) {
      setError(`Invalid link(s): ${invalids.join(', ')}`);
      return;
    }
    // Prevent duplicates
    const allLinks = Array.from(new Set([...links, ...newLinks]));
    setLinks(allLinks);
    setInput('');
    setError('');
  };

  const handleRemove = (idx) => {
    setLinks(links.filter((_, i) => i !== idx));
  };

  return (
    <div className="link-input-section">
      <label className="link-input-label">Paste links (one per line or comma):</label>
      <form onSubmit={handleAddLinks} className="link-input-form">
        <textarea
          className="link-input-textarea"
          placeholder="https://confluence.company.com/page1
\\\\SHAREDRIVE\\folder\\file.pdf"
          value={input}
          onChange={handleInputChange}
          rows={3}
          disabled={disabled}
        />
        <button
          type="submit"
          className="add-link-btn"
          disabled={disabled || !input.trim()}
        >
          Add
        </button>
      </form>
      {error && <div className="link-input-error">{error}</div>}
      <div className="link-list">
        {links.map((link, idx) => (
          <div className="link-chip" key={link}>
            <span className={isValidUrl(link) ? '' : 'invalid-link'}>
              {link}
            </span>
            <button
              className="remove-link-btn"
              title="Remove"
              onClick={() => handleRemove(idx)}
              type="button"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LinkInput;

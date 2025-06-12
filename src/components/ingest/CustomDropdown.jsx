import React, { useState, useRef, useEffect } from 'react';
import './CustomDropdown.css';

const CustomDropdown = ({ 
  options, 
  placeholder, 
  selectedValue, 
  onSelect, 
  disabled = false 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (option) => {
    onSelect(option);
    setIsOpen(false);
  };

  const getDisplayValue = () => {
    if (!selectedValue) return placeholder;
    if (typeof selectedValue === 'object') {
      return selectedValue.name || selectedValue.label;
    }
    return selectedValue;
  };

  return (
    <div className={`custom-dropdown ${disabled ? 'disabled' : ''}`} ref={dropdownRef}>
      <button
        type="button"
        className={`dropdown-toggle ${isOpen ? 'open' : ''}`}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
      >
        <span className="dropdown-value">{getDisplayValue()}</span>
        <svg 
          className={`dropdown-arrow ${isOpen ? 'rotated' : ''}`}
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2"
        >
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </button>

      {isOpen && !disabled && (
        <div className="dropdown-menu">
          {options.map((option) => (
            <button
              key={option.id}
              type="button"
              className={`dropdown-item ${option.isSpecial ? 'special' : ''}`}
              onClick={() => handleSelect(option)}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
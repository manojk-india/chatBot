// // components/ingest/LinkInput.jsx
// import React, { useState } from 'react';
// import './LinksInput.css';

// function isValidUrl(url) {
//   try {
//     // Accepts http(s) and share drive links
//     const pattern = /^(https?:\/\/|\\\\[a-zA-Z0-9_.$-]+)/;
//     return pattern.test(url.trim());
//   } catch {
//     return false;
//   }
// }

// const LinkInput = ({ links, setLinks, disabled }) => {
//   const [input, setInput] = useState('');
//   const [error, setError] = useState('');

//   // Parse multiple links from textarea (newline or comma separated)
//   const parseLinks = (text) => {
//     return text
//       .split(/\n|,/)
//       .map(link => link.trim())
//       .filter(link => link.length > 0);
//   };

//   const handleInputChange = (e) => {
//     setInput(e.target.value);
//     setError('');
//   };

//   const handleAddLinks = (e) => {
//     e.preventDefault();
//     const newLinks = parseLinks(input);
//     const invalids = newLinks.filter(link => !isValidUrl(link));
//     if (invalids.length > 0) {
//       setError(`Invalid link(s): ${invalids.join(', ')}`);
//       return;
//     }
//     // Prevent duplicates
//     const allLinks = Array.from(new Set([...links, ...newLinks]));
//     setLinks(allLinks);
//     setInput('');
//     setError('');
//   };

//   const handleRemove = (idx) => {
//     setLinks(links.filter((_, i) => i !== idx));
//   };

//   return (
//     <div className="link-input-section">
//       <label className="link-input-label">Paste links (one per line or comma):</label>
//       <form onSubmit={handleAddLinks} className="link-input-form">
//         <textarea
//           className="link-input-textarea"
//           placeholder="https://confluence.company.com/page1
// \\\\SHAREDRIVE\\folder\\file.pdf"
//           value={input}
//           onChange={handleInputChange}
//           rows={3}
//           disabled={disabled}
//         />
//         <button
//           type="submit"
//           className="add-link-btn"
//           disabled={disabled || !input.trim()}
//         >
//           Add
//         </button>
//       </form>
//       {error && <div className="link-input-error">{error}</div>}
//       <div className="link-list">
//         {links.map((link, idx) => (
//           <div className="link-chip" key={link}>
//             <span className={isValidUrl(link) ? '' : 'invalid-link'}>
//               {link}
//             </span>
//             <button
//               className="remove-link-btn"
//               title="Remove"
//               onClick={() => handleRemove(idx)}
//               type="button"
//             >
//               ×
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default LinkInput;


// import React, { useState } from 'react';
// import './LinksInput.css';

// function isValidUrl(url) {
//   try {
//     const pattern = /^(https?:\/\/|\\\\[a-zA-Z0-9_.$-]+)/;
//     return pattern.test(url.trim());
//   } catch {
//     return false;
//   }
// }

// const LinkInput = ({ onSubmit, disabled }) => {
//   const [inputs, setInputs] = useState(['']);
//   const [error, setError] = useState('');

//   const handleInputChange = (idx, value) => {
//     const newInputs = [...inputs];
//     newInputs[idx] = value;
//     setInputs(newInputs);
//   };

//   const handleAddInput = () => {
//     setInputs([...inputs, '']);
//   };

//   const handleRemoveInput = (idx) => {
//     const newInputs = inputs.filter((_, i) => i !== idx);
//     setInputs(newInputs.length ? newInputs : ['']);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const links = inputs.map(link => link.trim()).filter(link => link);
//     if (!links.length) {
//       setError('Please enter at least one link.');
//       return;
//     }
//     if (!links.every(isValidUrl)) {
//       setError('Please enter only valid links.');
//       return;
//     }
//     setError('');
//     onSubmit && onSubmit(links);
//   };

//   return (
//     <div className="link-input-section">
//       <label className="link-input-label">Paste each link in a separate box:</label>
//       <form onSubmit={handleSubmit} className="link-input-form-multi">
//         {inputs.map((input, idx) => (
//           <div key={idx} className="link-input-row">
//             <input
//               className={`link-input-single ${input && !isValidUrl(input) ? 'invalid-link' : ''}`}
//               type="text"
//               placeholder="Paste link here"
//               value={input}
//               onChange={e => handleInputChange(idx, e.target.value)}
//               disabled={disabled}
//             />
//             {inputs.length > 1 && (
//               <button
//                 type="button"
//                 className="remove-link-btn"
//                 title="Remove"
//                 onClick={() => handleRemoveInput(idx)}
//                 disabled={disabled}
//               >
//                 ×
//               </button>
//             )}
//           </div>
//         ))}
//         <button
//           type="button"
//           className="add-link-btn"
//           onClick={handleAddInput}
//           disabled={disabled}
//         >
//           + Add Link
//         </button>
//         <button
//           type="submit"
//           className="submit-link-btn"
//           disabled={disabled}
//         >
//           Submit
//         </button>
//       </form>
//       {error && <div className="link-input-error">{error}</div>}
//     </div>
//   );
// };

// export default LinkInput;


import React, { useState } from 'react';
import './LinksInput.css';

function isValidUrl(url) {
    return true
}

const LinkInput = ({ onSubmit, disabled }) => {
  const [input, setInput] = useState('');
  const [links, setLinks] = useState([]);
  const [error, setError] = useState('');

  const handleAdd = (e) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;
    if (!isValidUrl(trimmed)) {
      setError('Please enter a valid link.');
      return;
    }
    if (links.includes(trimmed)) {
      setError('Link already added.');
      return;
    }
    setLinks([...links, trimmed]);
    setInput('');
    setError('');
  };

  const handleRemove = (idx) => {
    setLinks(links.filter((_, i) => i !== idx));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!links.length) {
      setError('Please add at least one link.');
      return;
    }
    setError('');
    onSubmit && onSubmit(links);
  };

  return (
    <div className="link-input-section">
      <label className="link-input-label">Paste a link and click Add:</label>
      <form onSubmit={handleAdd} className="link-input-form">
        <input
          className={`link-input-single ${input && !isValidUrl(input) ? 'invalid-link' : ''}`}
          type="text"
          placeholder="Paste link here"
          value={input}
          onChange={e => { setInput(e.target.value); setError(''); }}
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
      {links.length > 0 && (
        <div className="link-list-scroll">
          {links.map((link, idx) => (
            <div className="link-chip" key={link}>
              <span>{link}</span>
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
      )}
      <button
        className="submit-link-btn"
        onClick={handleSubmit}
        disabled={disabled || links.length === 0}
        style={{ marginTop: 16 }}
      >
        Submit
      </button>
    </div>
  );
};

export default LinkInput;
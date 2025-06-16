// import React, { useState } from 'react';
// import CopyButton from './CopyButton';
// import './TabbedMessageBubble.css';

// const TabbedMessageBubble = ({ message }) => {
//   const [activeTab, setActiveTab] = useState('answer');
//   const isUser = message.sender === 'user';

//   if (isUser) {
//     // User message (no tabs)
//     return (
//       <div className="message-row user">
//         <div className="message-bubble user-bubble">
//           <div className="bubble-text">{message.text}</div>
//           <div className="bubble-actions">
//             <span className="bubble-time">{message.timestamp}</span>
//           </div>
//         </div>
//         <div className="avatar-user">
//           <span role="img" aria-label="User">🧑</span>
//         </div>
//       </div>
//     );
//   }

//   // Bot message with tabs
//   return (
//     <div className="message-row bot">
//       <div className="avatar-bot">
//         <span role="img" aria-label="Bot">🤖</span>
//       </div>
//       <div className="message-bubble bot-bubble">
//         <div className="tab-header">
//           <button
//             className={activeTab === 'answer' ? 'tab active' : 'tab'}
//             onClick={() => setActiveTab('answer')}
//           >
//             Answer
//           </button>
//           <button
//             className={activeTab === 'sources' ? 'tab active' : 'tab'}
//             onClick={() => setActiveTab('sources')}
//           >
//             Sources
//           </button>
//         </div>
//         <div className="tab-content">
//           {activeTab === 'answer' && (
//             <div className="bubble-text">{message.text}</div>
//           )}
//           {activeTab === 'sources' && (
//             <div className="bubble-sources">
//               {Array.isArray(message.links) && message.links.length > 0 ? (
//                 message.links.map((link, idx) => {
//                   const url = typeof link === 'string'
//                     ? (link.startsWith('http') ? link : `https://${link}`)
//                     : (link.url.startsWith('http') ? link.url : `https://${link.url}`);
//                   const domain = (() => {
//                     try {
//                       return new URL(url).hostname.replace('www.', '');
//                     } catch {
//                       return url;
//                     }
//                   })();
//                   return (
//                     <a
//                       key={idx}
//                       href={url}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="source-chip"
//                       title={url}
//                     >
//                       <span role="img" aria-label="link" style={{ marginRight: 4 }}>🔗</span>
//                       {domain}
//                     </a>
//                   );
//                 })
//               ) : (
//                 <div className="no-sources">No sources found.</div>
//               )}
//             </div>
//           )}
//         </div>
//         <div className="bubble-actions">
//             <CopyButton text={message.text} />
//           <span className="bubble-time">{message.timestamp}</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TabbedMessageBubble;



import React, { useState } from 'react';
import CopyButton from './CopyButton';
import './TabbedMessageBubble.css';

const TabbedMessageBubble = ({ message, onFeedback }) => {
  const [activeTab, setActiveTab] = useState('answer');
  const isUser = message.sender === 'user';
  const [showComment, setShowComment] = useState(false);
  const [commentValue, setCommentValue] = useState(message.feedback?.comment || '');

  // Handle like/dislike click
  const handleFeedback = (type) => {
    setShowComment(true);
    onFeedback(type, message, commentValue);
  };

  // Handle comment submit
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    onFeedback(message.feedback?.type, message, commentValue);
    setShowComment(false);
  };

  if (isUser) {
    return (
      <div className="message-row user">
        <div className="message-bubble user-bubble">
          <div className="bubble-text">{message.text}</div>
          <div className="bubble-actions">
            <span className="bubble-time">{message.timestamp}</span>
          </div>
        </div>
        <div className="avatar-user">
          <span role="img" aria-label="User">🧑</span>
        </div>
      </div>
    );
  }

  // Bot message with tabs, feedback, and comment
  return (
    <div className="message-row bot">
      <div className="avatar-bot">
        <span role="img" aria-label="Bot">🤖</span>
      </div>
      <div className="message-bubble bot-bubble">
        <div className="tab-header">
          <button className={activeTab === 'answer' ? 'tab active' : 'tab'} onClick={() => setActiveTab('answer')}>Answer</button>
          <button className={activeTab === 'sources' ? 'tab active' : 'tab'} onClick={() => setActiveTab('sources')}>Sources</button>
        </div>
        <div className="tab-content">
          {activeTab === 'answer' && (
            <div className="bubble-text">{message.text}</div>
          )}
          {activeTab === 'sources' && (
            <div className="bubble-sources">
              {Array.isArray(message.links) && message.links.length > 0 ? (
                message.links.map((link, idx) => {
                  const url = typeof link === 'string'
                    ? (link.startsWith('http') ? link : `https://${link}`)
                    : (link.url.startsWith('http') ? link.url : `https://${link.url}`);
                  const domain = (() => {
                    try {
                      return new URL(url).hostname.replace('www.', '');
                    } catch {
                      return url;
                    }
                  })();
                  return (
                    <a key={idx} href={url} target="_blank" rel="noopener noreferrer" className="source-chip" title={url}>
                      <span role="img" aria-label="link" style={{ marginRight: 4 }}>🔗</span>
                      {domain}
                    </a>
                  );
                })
              ) : (
                <div className="no-sources">No sources found.</div>
              )}
            </div>
          )}
        </div>
        <div className="bubble-actions" style={{ display: 'flex', alignItems: 'center', marginTop: 4, gap: 8 }}>
          <CopyButton text={message.text} />
          {/* Thumbs up/down */}
          <button
            className={`like-btn${message.feedback?.type === 'like' ? ' selected' : ''}`}
            onClick={() => handleFeedback('like')}
            aria-label="Like"
          >👍</button>
          <button
            className={`dislike-btn${message.feedback?.type === 'dislike' ? ' selected' : ''}`}
            onClick={() => handleFeedback('dislike')}
            aria-label="Dislike"
          >👎</button>
          <span className="bubble-time">{message.timestamp}</span>
        </div>
        {/* Comment box for feedback */}
        {showComment && (
          <form className="comment-box" onSubmit={handleCommentSubmit}>
            <input
              type="text"
              value={commentValue}
              onChange={e => setCommentValue(e.target.value)}
              placeholder="Add a comment..."
              autoFocus
            />
            <button type="submit" className="comment-submit-btn">Submit</button>
          </form>
        )}
        {/* Show submitted comment */}
        {message.feedback?.comment && (
          <div className="feedback-comment">
            <span className="feedback-label">{message.feedback?.type === 'like' ? '👍' : '👎'} Feedback:</span>
            <span>{message.feedback.comment}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default TabbedMessageBubble;

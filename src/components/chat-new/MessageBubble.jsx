// import React from 'react';
// import './MessageBubble.css';
// import CopyButton from './CopyButton';


// const MessageBubble = ({ message }) => {
//   const isUser = message.sender === 'user';
//   return (
//     <div className={`message-row ${isUser ? 'user' : 'bot'}`}>
//       {!isUser && (
//         <div className="avatar-bot">
//           <span role="img" aria-label="Bot">🤖</span>
//         </div>
//       )}
//       <div className={`message-bubble ${isUser ? 'user-bubble' : 'bot-bubble'}`}>
//         <div className="bubble-text">{message.text}</div>
//          <div className="bubble-actions" style={{ display: 'flex', alignItems: 'center', marginTop: 4, gap: 4 }}>
//           <CopyButton text={message.text} />
//           <span className="bubble-time">{message.timestamp}</span>
//         </div>
//       </div>
//       {isUser && (
//         <div className="avatar-user">
//           <span role="img" aria-label="User">🧑</span>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MessageBubble;


import React from 'react';
import './MessageBubble.css';
import ReactMarkdown from 'react-markdown';
import CopyButton from './CopyButton';

const MessageBubble = ({ message }) => {
  const isUser = message.sender === 'user';
  return (
    <div className={`message-row ${isUser ? 'user' : 'bot'}`}>
      {!isUser && (
        <div className="avatar-bot">
          <span role="img" aria-label="Bot">🤖</span>
        </div>
      )}
      <div className={`message-bubble ${isUser ? 'user-bubble' : 'bot-bubble'}`}>
        <div className="bubble-text">{message.text}</div>
        <div className="bubble-actions" style={{ display: 'flex', alignItems: 'center', marginTop: 4, gap: 4 }}>
          {/* Show CopyButton only for bot messages */}
          {!isUser && <CopyButton text={message.text} />}
          <span className="bubble-time">{message.timestamp}</span>
        </div>
      </div>
      {isUser && (
        <div className="avatar-user">
          <span role="img" aria-label="User">🧑</span>
        </div>
      )}
    </div>
  );
};

export default MessageBubble;

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
import ReactMarkdown from 'react-markdown';


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
        {/* <div className="avatar-user">
          <span role="img" aria-label="User">🧑</span>
        </div> */}
      </div>
    );
  }

  // Bot message with tabs, feedback, and comment
  return (
    <div className="message-row bot">
      {/* <div className="avatar-bot">
        <span role="img" aria-label="Bot">🤖</span>
      </div> */}
      <div className="message-bubble bot-bubble">
        <div className="tab-header">
            <button className="tab active" disabled>Answer</button>
        </div>
        <div className="tab-content">
          {activeTab === 'answer' && (
            <div className="bubble-text">
              <ReactMarkdown>{message.text}</ReactMarkdown>
            </div>
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
          <div style={{ display: 'flex', alignItems: 'center', gap: 10}}>
          <CopyButton text={message.text} />
          {/* Thumbs up/down */}
          <button
            className={`like-btn${message.feedback?.type === 'like' ? ' selected' : ''}`}
            onClick={() => handleFeedback('like')}
            aria-label="Like"
          >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" class="icon"><path d="M10.9153 1.83987L11.2942 1.88772L11.4749 1.91507C13.2633 2.24201 14.4107 4.01717 13.9749 5.78225L13.9261 5.95901L13.3987 7.6719C13.7708 7.67575 14.0961 7.68389 14.3792 7.70608C14.8737 7.74486 15.3109 7.82759 15.7015 8.03323L15.8528 8.11819C16.5966 8.56353 17.1278 9.29625 17.3167 10.1475L17.347 10.3096C17.403 10.69 17.3647 11.0832 17.2835 11.5098C17.2375 11.7517 17.1735 12.0212 17.096 12.3233L16.8255 13.3321L16.4456 14.7276C16.2076 15.6001 16.0438 16.2356 15.7366 16.7305L15.595 16.9346C15.2989 17.318 14.9197 17.628 14.4866 17.8408L14.2982 17.9258C13.6885 18.1774 12.9785 18.1651 11.9446 18.1651H7.33331C6.64422 18.1651 6.08726 18.1657 5.63702 18.1289C5.23638 18.0962 4.87565 18.031 4.53936 17.8867L4.39679 17.8203C3.87576 17.5549 3.43916 17.151 3.13507 16.6553L3.013 16.4366C2.82119 16.0599 2.74182 15.6541 2.7044 15.1963C2.66762 14.7461 2.66827 14.1891 2.66827 13.5V11.667C2.66827 10.9349 2.66214 10.4375 2.77569 10.0137L2.83722 9.81253C3.17599 8.81768 3.99001 8.05084 5.01397 7.77639L5.17706 7.73928C5.56592 7.66435 6.02595 7.66799 6.66632 7.66799C6.9429 7.66799 7.19894 7.52038 7.33624 7.2803L10.2562 2.16995L10.3118 2.08792C10.4544 1.90739 10.6824 1.81092 10.9153 1.83987ZM7.33136 14.167C7.33136 14.9841 7.33714 15.2627 7.39386 15.4746L7.42999 15.5918C7.62644 16.1686 8.09802 16.6134 8.69171 16.7725L8.87042 16.8067C9.07652 16.8323 9.38687 16.835 10.0003 16.835H11.9446C13.099 16.835 13.4838 16.8228 13.7903 16.6963L13.8997 16.6465C14.1508 16.5231 14.3716 16.3444 14.5433 16.1221L14.6155 16.0166C14.7769 15.7552 14.8968 15.3517 15.1624 14.378L15.5433 12.9824L15.8079 11.9922C15.8804 11.7102 15.9368 11.4711 15.9769 11.2608C16.0364 10.948 16.0517 10.7375 16.0394 10.5791L16.0179 10.4356C15.9156 9.97497 15.641 9.57381 15.2542 9.31253L15.0814 9.20999C14.9253 9.12785 14.6982 9.06544 14.2747 9.03225C13.8477 8.99881 13.2923 8.99807 12.5003 8.99807C12.2893 8.99807 12.0905 8.89822 11.9651 8.72854C11.8398 8.55879 11.8025 8.33942 11.8646 8.13772L12.6556 5.56741L12.7054 5.36331C12.8941 4.35953 12.216 3.37956 11.1878 3.2178L8.49054 7.93948C8.23033 8.39484 7.81431 8.72848 7.33136 8.88967V14.167ZM3.99835 13.5C3.99835 14.2111 3.99924 14.7044 4.03058 15.0879C4.06128 15.4636 4.11804 15.675 4.19854 15.833L4.26886 15.959C4.44517 16.2466 4.69805 16.4808 5.0003 16.6348L5.13019 16.6905C5.27397 16.7419 5.46337 16.7797 5.74542 16.8028C5.97772 16.8217 6.25037 16.828 6.58722 16.8311C6.41249 16.585 6.27075 16.3136 6.1712 16.0215L6.10968 15.8194C5.99614 15.3956 6.00128 14.899 6.00128 14.167V9.00296C5.79386 9.0067 5.65011 9.01339 5.53741 9.02737L5.3587 9.06057C4.76502 9.21965 4.29247 9.66448 4.09601 10.2412L4.06085 10.3584C4.00404 10.5705 3.99835 10.8493 3.99835 11.667V13.5Z"></path></svg>
          </button>
          <button
            className={`dislike-btn${message.feedback?.type === 'dislike' ? ' selected' : ''}`}
            onClick={() => handleFeedback('dislike')}
            aria-label="Dislike"
          >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" class="icon"><path d="M12.6687 5.83304C12.6687 5.22006 12.6649 4.91019 12.6394 4.70413L12.6062 4.52542C12.4471 3.93179 12.0022 3.45922 11.4255 3.26272L11.3083 3.22757C11.0963 3.17075 10.8175 3.16507 9.99974 3.16507H8.0554C7.04558 3.16507 6.62456 3.17475 6.32982 3.26175L6.2097 3.30374C5.95005 3.41089 5.71908 3.57635 5.53392 3.78616L5.45677 3.87796C5.30475 4.0748 5.20336 4.33135 5.03392 4.91702L4.83763 5.6221L4.45677 7.01761C4.24829 7.78204 4.10326 8.31846 4.02318 8.73929C3.94374 9.15672 3.94298 9.39229 3.98119 9.56448L4.03587 9.75784C4.18618 10.1996 4.50043 10.5702 4.91771 10.7901L5.05052 10.8477C5.20009 10.9014 5.40751 10.9429 5.72533 10.9678C6.15231 11.0012 6.70771 11.002 7.49974 11.002C7.71076 11.002 7.90952 11.1018 8.0349 11.2715C8.14465 11.4201 8.18683 11.6067 8.15404 11.7862L8.13548 11.8623L7.34447 14.4326C7.01523 15.5033 7.71404 16.6081 8.81126 16.7813L11.5095 12.0606L11.5827 11.9405C11.8445 11.5461 12.2289 11.2561 12.6687 11.1094V5.83304ZM17.3318 8.33304C17.3318 8.97366 17.3364 9.43432 17.2615 9.82327L17.2234 9.98538C16.949 11.0094 16.1821 11.8233 15.1872 12.1621L14.9861 12.2237C14.5624 12.3372 14.0656 12.3321 13.3337 12.3321C13.0915 12.3321 12.8651 12.4453 12.7204 12.6348L12.6638 12.7198L9.74388 17.8301C9.61066 18.0631 9.35005 18.1935 9.08372 18.1602L8.70579 18.1123C6.75379 17.8682 5.49542 15.9213 6.07396 14.041L6.60033 12.3272C6.22861 12.3233 5.90377 12.3161 5.62083 12.294C5.18804 12.26 4.79914 12.1931 4.44701 12.0391L4.29857 11.9668C3.52688 11.5605 2.95919 10.8555 2.72533 10.0205L2.68333 9.85257C2.58769 9.42154 2.62379 8.97768 2.71654 8.49026C2.80865 8.00634 2.97082 7.41139 3.17357 6.668L3.55443 5.27249L3.74583 4.58011C3.9286 3.94171 4.10186 3.45682 4.40404 3.06546L4.53685 2.9053C4.85609 2.54372 5.25433 2.25896 5.70189 2.07425L5.93626 1.99222C6.49455 1.82612 7.15095 1.83499 8.0554 1.83499H12.6667C13.3558 1.83499 13.9128 1.83434 14.363 1.87112C14.8208 1.90854 15.2266 1.98789 15.6033 2.17972L15.821 2.30179C16.317 2.6059 16.7215 3.04226 16.987 3.56351L17.0535 3.70608C17.1977 4.04236 17.2629 4.40311 17.2956 4.80374C17.3324 5.25398 17.3318 5.81094 17.3318 6.50003V8.33304ZM13.9978 10.9961C14.3321 10.9901 14.5013 10.977 14.6413 10.9395L14.7585 10.9033C15.3353 10.7069 15.7801 10.2353 15.9392 9.64163L15.9724 9.46292C15.998 9.25682 16.0017 8.94657 16.0017 8.33304V6.50003C16.0017 5.78899 16.0008 5.29566 15.9695 4.91214C15.9464 4.6301 15.9086 4.44069 15.8572 4.2969L15.8015 4.16702C15.6475 3.86478 15.4133 3.6119 15.1257 3.43558L14.9997 3.36526C14.8418 3.28477 14.6302 3.228 14.2546 3.19729C14.0221 3.1783 13.7491 3.17109 13.4118 3.168C13.6267 3.47028 13.7914 3.81126 13.8904 4.18069L13.9275 4.34378C13.981 4.62163 13.9947 4.93582 13.9978 5.3262V10.9961Z"></path></svg>
          </button>
          </div>
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

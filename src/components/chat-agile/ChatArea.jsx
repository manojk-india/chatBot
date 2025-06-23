import MessageBubble from './MessageBubble';
import ChatInput from './ChatInput';
import LoadingIndicator from './LoadingIndicator';
import './ChatArea.css';
import React, { useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import TabbedMessageBubble from './TabbedMessageBubble';



const ChatArea = ({ messages, onSend, loading, chatEndRef ,onRefresh,onFeedback }) => {
  const chatRef = useRef();

  const handleFeedback = (type, msg, comment) => {
  // Update feedback for the correct message
  onFeedback && onFeedback(type, msg, comment);
  };


  // const handleDownloadPDF = async () => {
  //   const input = chatRef.current;
  //   if (!input) return;
  //   const canvas = await html2canvas(input, { scale: 2 });
  //   const imgData = canvas.toDataURL('image/png');
  //   const pdf = new jsPDF({
  //     orientation: 'portrait',
  //     unit: 'pt',
  //     format: 'a4',
  //   });
  //   const pageWidth = pdf.internal.pageSize.getWidth();
  //   const imgProps = pdf.getImageProperties(imgData);
  //   const pdfWidth = pageWidth;
  //   const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
  //   pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
  //   pdf.save('chat-history.pdf');
  // };

const handleDownloadPDF = () => {
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'pt',
    format: 'a4',
  });

  const margin = 40;
  const lineHeight = 16;
  const sectionSpacing = 12;
  const boxPadding = 15;
  const maxWidth = 500;
  let y = margin + 20;

  // Add title
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(18);
  pdf.setTextColor(99, 102, 241);
  pdf.text('KnowAssist Chat History', margin, y);
  y += 35;

  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(12);

  messages.forEach((msg, idx) => {
    const pageHeight = pdf.internal.pageSize.getHeight();

    // Calculate total height needed for this message
    const textLines = pdf.splitTextToSize(msg.text, maxWidth - 2 * boxPadding);
    let totalHeight = 40; // Base height for sender + spacing
    totalHeight += textLines.length * lineHeight; // Message text
    totalHeight += 25; // Timestamp space

    // Add height for sources
    if (msg.links && msg.links.length > 0) {
      totalHeight += 30; // "Sources:" header
      msg.links.forEach(link => {
        const linkLines = pdf.splitTextToSize(link, maxWidth - 2 * boxPadding - 15);
        totalHeight += linkLines.length * lineHeight + 5;
      });
    }

    // Add height for feedback
    if (msg.sender === 'bot' && msg.feedback && msg.feedback.type) {
      totalHeight += 30; // "Feedback:" header
      totalHeight += lineHeight; // Feedback type
      if (msg.feedback.comment) {
        const commentLines = pdf.splitTextToSize(msg.feedback.comment, maxWidth - 2 * boxPadding - 15);
        totalHeight += commentLines.length * lineHeight + 5;
      }
    }

    // Check if new page is needed
    if (y + totalHeight > pageHeight - margin) {
      pdf.addPage();
      y = margin + 20;
    }

    // Draw message container with background
    pdf.setFillColor(248, 250, 252);
    pdf.setDrawColor(226, 232, 240);
    pdf.setLineWidth(1);
    pdf.roundedRect(margin, y, maxWidth, totalHeight, 8, 8, 'FD');

    y += boxPadding;

    // Sender label with color coding
    const sender = msg.sender === 'user' ? 'You' : 'KnowAssist';
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(13);
    pdf.setTextColor(msg.sender === 'user' ? 99 : 34, msg.sender === 'user' ? 102 : 197, msg.sender === 'user' ? 241 : 94);
    pdf.text(`${sender}:`, margin + boxPadding, y);
    y += lineHeight + 8;

    // Message text
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(12);
    pdf.setTextColor(31, 41, 55);
    textLines.forEach(line => {
      pdf.text(line, margin + boxPadding, y);
      y += lineHeight;
    });
    y += sectionSpacing;

    // Sources section
    if (msg.links && msg.links.length > 0) {
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(11);
      pdf.setTextColor(99, 102, 241);
      pdf.text('Sources:', margin + boxPadding, y);
      y += lineHeight + 5;

      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(37, 99, 235);
      msg.links.forEach((link, linkIdx) => {
        const linkText = `${linkIdx + 1}. ${link}`;
        const linkLines = pdf.splitTextToSize(linkText, maxWidth - 2 * boxPadding - 15);
        linkLines.forEach(line => {
          pdf.text(line, margin + boxPadding + 15, y);
          y += lineHeight;
        });
        y += 3;
      });
      y += sectionSpacing;
    }

    // Feedback section (only for bot messages)
    if (msg.sender === 'bot' && msg.feedback && msg.feedback.type) {
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(11);
      pdf.setTextColor(99, 102, 241);
      pdf.text('Feedback:', margin + boxPadding, y);
      y += lineHeight + 5;

      // Feedback type with color coding
      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(
        msg.feedback.type === 'like' ? 34 : 220,
        msg.feedback.type === 'like' ? 197 : 53,
        msg.feedback.type === 'like' ? 94 : 69
      );
      const feedbackIcon = msg.feedback.type === 'like' ? 'Emotion' : 'Emotion';
      const feedbackText = `${feedbackIcon} ${msg.feedback.type === 'like' ? 'Liked' : 'Disliked'}`;
      pdf.text(feedbackText, margin + boxPadding + 15, y);
      y += lineHeight + 3;

      // Feedback comment
      if (msg.feedback.comment) {
        pdf.setTextColor(75, 85, 99);
        const commentLines = pdf.splitTextToSize(`Comment: ${msg.feedback.comment}`, maxWidth - 2 * boxPadding - 15);
        commentLines.forEach(line => {
          pdf.text(line, margin + boxPadding + 15, y);
          y += lineHeight;
        });
        y += 3;
      }
      y += sectionSpacing;
    }

    // Timestamp
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(10);
    pdf.setTextColor(107, 114, 128);
    pdf.text(msg.timestamp || '', margin + boxPadding, y);
    
    y += 30; // Space before next message
  });

  // Save PDF with timestamp
  const timestamp = new Date().toISOString().slice(0, 10);
  pdf.save(`knowassist-chat-${timestamp}.pdf`);
};



  return (
    <div className="chat-area">
      <div className="chat-header">
        <span role="img" aria-label="AI">💡</span> Chat with Agile-Specialist
        <button
          className="download-btn"
          onClick={handleDownloadPDF}
          title="Download chat as PDF"
          style={{
            marginLeft: 'auto',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '0 8px'
          }}
        >
        {/* <svg width="24" height="24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 4v12l-6-6h4v-6h4v6h4l-6 6z"/>
        </svg> */}

        
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" 
            stroke-linecap="round" stroke-linejoin="round" class="feather feather-download">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
          <polyline points="7 10 12 15 17 10"/>
          <line x1="12" y1="15" x2="12" y2="3"/>
        </svg>
        </button>
           {/* Refresh button */}
        <button
          className="refresh-btn"
          onClick={onRefresh}
          title="Refresh chat"
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0 8px' }}
        >
          {/* Refresh SVG icon */}
          <svg width="24" height="24" fill="currentColor">
            <path d="M17.65 6.35A7.95 7.95 0 0 0 12 4V1l-4 4 4 4V6c3.31 0 6 2.69 6 6 0 1.3-.42 2.5-1.13 3.47l1.46 1.46A7.932 7.932 0 0 0 20 12c0-2.21-.89-4.21-2.35-5.65zM6.35 17.65A7.95 7.95 0 0 0 12 20v3l4-4-4-4v3c-3.31 0-6-2.69-6-6 0-1.3.42-2.5 1.13-3.47l-1.46-1.46A7.932 7.932 0 0 0 4 12c0 2.21.89 4.21 2.35 5.65z"/>
          </svg>
        </button>


      </div>
      <div className="messages-container" ref={chatRef}>
        {/* {messages.map((msg, idx) => (
           <TabbedMessageBubble key={idx} message={msg} />
        ))} */}

        {messages.map((msg, idx) => (
          <TabbedMessageBubble key={idx} message={msg} onFeedback={handleFeedback} />
        ))}
        {loading && <LoadingIndicator />}
        <div ref={chatEndRef} />
      </div>
      <ChatInput onSend={onSend} disabled={loading} />
    </div>
  );
};

export default ChatArea;
import React, { useState, useRef, useEffect } from 'react';
import LeftPanel from './LeftPanel';
import ChatArea from './ChatArea';
import './Chatbot.css';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';


const Chatbot = () => {

  const handleFeedback = (type, msg, comment) => {
  setMessages(prevMsgs =>
    prevMsgs.map(m =>
      m === msg
        ? { ...m, feedback: { type, comment } }
        : m
    )
  );
};

  const chatRef = useRef();
  const initialMessages = [
      {
        sender: 'bot',
        text: 'Hello! I am Agile bot, your AI-powered Jira Assistant. How can I help you today?',
        links: [],
        feedback: {
          type: null, // 'like' or 'dislike'
          comment: ''
        },
        timestamp: new Date().toLocaleTimeString(),
      },
    ];

  const [messages, setMessages] = useState(initialMessages);

  
  const handleRefreshChat = () => {
    setMessages(initialMessages);
  };

  const [loading, setLoading] = useState(false);

  // Scroll to bottom on new message
  const chatEndRef = useRef(null);
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, loading]);

  const sendMessage = async (messageText) => {
    if (!messageText.trim()) return;
    const userMessage = {
      sender: 'user',
      text: messageText,
      timestamp: new Date().toLocaleTimeString(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      // Simulate API call with timeout; replace with your axios call
      await new Promise((resolve) => setTimeout(resolve, 1200));
      // Example: const response = await axios.post('/api/chat', { message: messageText });
      const botReply = {
        sender: 'bot',
        text: "This is a simulated response. Replace with your backend's reply",
        links: ["https://www.youtube.com", "https://www.google.com", "https://www.wikipedia.org","https://www.youtube.com","https://www.youtube.com"],
        timestamp: new Date().toLocaleTimeString(),
        feedback: {
          type: null, // 'like' or 'dislike'
          comment: ''
        }
      };
      setMessages((prev) => [...prev, botReply]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: 'Sorry, something went wrong. Please try again.',
          timestamp: new Date().toLocaleTimeString(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chatbot-container" ref={chatRef}>
      <LeftPanel />
      <ChatArea
        messages={messages}
        onSend={sendMessage}
        loading={loading}
        chatEndRef={chatEndRef}
        onRefresh={handleRefreshChat}
        onFeedback={handleFeedback}
      />
    </div>
  );
};

export default Chatbot;

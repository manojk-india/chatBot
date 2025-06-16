import React from 'react';
import Chatbot from './components/chat/Chatbot.jsx';
import IngestPage from './components/ingest/FileIngestionPage.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Chatbot />} />
      <Route path="/ingest" element={<IngestPage />} />
    </Routes>
  </Router>
);


export default App;


// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Chatbot from './components/Chatbot';
// import Navbar from './components/Navbar';

// // Placeholder components
// const Ingest = () => <div style={{ padding: '20px' }}>Ingest Page (Design not needed)</div>;
// const History = () => <div style={{ padding: '20px' }}>History Page (Design not needed)</div>;

// const App = () => (
//   <Router>
//     <Navbar />
//     <Routes>
//       <Route path="/" element={<Chatbot />} />
//       <Route path="/ingest" element={<Ingest />} />
//       <Route path="/history" element={<History />} />
//     </Routes>
//   </Router>
// );

// export default App;

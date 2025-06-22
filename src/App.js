// import React from 'react';
// import Chatbot from './components/chat/Chatbot.jsx';
// import IngestPage from './components/ingest/FileIngestionPage.jsx';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import LoginPage from './components/login.jsx';

// import './App.css';

// const App = () => (
//   <Router>
//     <Routes>
//       <Route path="/" element={<LoginPage />} />
//       <Route path="/chat" element={<Chatbot />} />
//       <Route path="/ingest" element={<IngestPage />} />
//     </Routes>
//   </Router>
// );


// export default App;

import React from 'react';
import Chatbot from './components/chat/Chatbot.jsx';
import IngestPage from './components/ingest/FileIngestionPage.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/login.jsx';
import { AuthProvider } from './AuthContext';
import ProtectedRoute from './ProtectedRoute';

import './App.css';

const App = () => (
  <AuthProvider>
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/chat"
          element={
            <ProtectedRoute>
              <Chatbot />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ingest"
          element={
            <ProtectedRoute>
              <IngestPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  </AuthProvider>
);

export default App;

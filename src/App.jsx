import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import SpotifyAuth from './components/SpotifyAuth';
import './styles/App.css';

const App = () => {
  return (
    <div className="app">
      <h1>Spotify Recommendations</h1>
      <Routes>
        <Route path="/" element={<SpotifyAuth />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};

export default App;
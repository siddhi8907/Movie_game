import React from 'react';

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Import all paths
import Signup from './pages/SignupTemp';
import Login from './pages/Login_3';
import Home from './pages/Home_2';
import Game from './pages/Game_1';
import ProtectedRoute from './components/ProtectedRoute_2';
import Leaderboard from './pages/Leaderboard_5';

function App() {


  return (
    <Router>
      <div className="min-h-screen bg-zinc-950 text-white font-mono">
        <Routes>
          {/* Public Routes */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

          {/* Protected Routes */}
          <Route path="/home" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
          
          <Route path="/game" element={
            <ProtectedRoute>
              <Game />
            </ProtectedRoute>
          } />

          <Route path="/leaderboard" element={
            <ProtectedRoute>
              <Leaderboard />
            </ProtectedRoute>
          } />

          {/* Fallback option */}
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
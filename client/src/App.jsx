import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';

//import all the pages
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';
//import Game from './pages/Game';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
    return (
        <Router>
            <div className='min-h-screen bg-zinc-950 text-white font-mono'>
                <Routes>
                    {/*Public routes */}
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login />} />

                    {/* Protected Routes */}

                    <Route
                    path="/home"
                    element={
                   <ProtectedRoute>
                   <Home />
                  </ProtectedRoute>
                   }/>

                   <Route
                   path="/game"
                   element={
                    <ProtectedRoute>
                        <Game/>
                    </ProtectedRoute>
                   }
                   />
                    
                   {/*Default Redirect*/} 
                   <Route path="/" element={<Navigate to="/login" />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
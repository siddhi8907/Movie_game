import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
//import Gamecard from '../components/Gamecard_1';

function Game() {
  const [puzzle, setPuzzle] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  // Getting the difficulty passed from the Home page 
  const difficulty = location.state?.difficulty || 'Medium';

  const fetchPuzzle = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      // Connecting ith the backend
      const res = await axios.get(`http://localhost:5001/api/puzzles/random?difficulty=${difficulty}`, {
        headers: { 'x-auth-token': token }
        //we havre to pass the jwt token 
      });

      //axios wraps everything in data
      setPuzzle(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching puzzle", err);
      setLoading(false);
    }
  };

  // Fetch a puzzle as soon as the page loads
  useEffect(() => {
    fetchPuzzle();
  }, []);

  if (loading) return <div className="text-white text-center mt-20">Loading Puzzle...</div>;
  
  if (!puzzle) return (
    <div className="text-white text-center mt-20">
      <p>No more puzzles left in this difficulty!</p>
      <button onClick={() => navigate('/home')} className="mt-4 underline">Go Back</button>
    </div>
  );

  return (
    <div className="min-h-screen bg-pink-100 p-4">
      <button 
        onClick={() => navigate('/home')} 
        className="text-zinc-950 mb-8 hover:text-white"
      >
        ← Back
      </button>

      <div className="max-w-md mx-auto">
        <h2 className="text-zinc-950 uppercase text-xs tracking-widest mb-2">
          Difficulty: {difficulty}
        </h2>
        
        {/* We pass the fetched puzzle into our GameCard component */}
        <GameCard puzzle={puzzle} nextPuzzle={fetchPuzzle} />
      </div>
    </div>
  );
}

export default Game;
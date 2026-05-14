import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Gamecard({ puzzle, nextPuzzle }) {
  const [userGuess, setUserGuess] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [status, setStatus] = useState('playing');

  //  Reset all state when a new puzzle loads
  useEffect(() => {
    setUserGuess('');
    setAttempts(0);
    setShowHint(false);
    setStatus('playing');
  }, [puzzle._id]);

  const markSolved = async () => {
    try {
      const token = localStorage.getItem('token');
      // Tell the backend this puzzle is solved so it won't repeat
      await axios.post(
        'http://localhost:5001/api/puzzles/solve',
        { puzzleId: puzzle._id },
        { headers: { 'x-auth-token': token } }
      );
    } catch (err) {
      console.error("Failed to save progress", err);
    }
  };

  const Check = async () => {
    if (userGuess.trim().toLowerCase() === puzzle.answer.toLowerCase()) {
      setStatus('correct');
      await markSolved(); //  Save progress to DB
    } else {
      setAttempts(prev => prev + 1);
      setStatus('wrong');
      setTimeout(() => setStatus('playing'), 1000);
    }
  };

  return (
    <div className='game-card'>
      <div className='description-box'>
        <p>{puzzle.description}</p>
      </div>

      {status === 'correct' ? (
        <div>
          <div>✅ Correct! 😇</div>
          {/* Next puzzle button appears after correct answer */}
          <button
            onClick={nextPuzzle}
            className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
          >
            Next Puzzle →
          </button>
        </div>
      ) : (
        <>
          <input
            value={userGuess}
            onChange={(e) => setUserGuess(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && Check()}
            placeholder="Guess the movie..."
            className={status === 'wrong' ? 'border-red-500' : ''}
          />
          {status === 'wrong' && <div className="text-red-500">❌ Wrong, try again!</div>}
          <button onClick={Check}>Submit</button>
        </>
      )}

      {attempts >= 3 && !showHint && (
        <button onClick={() => setShowHint(true)}>💡 Need a HINT?</button>
      )}
      {showHint && <div className='hint-text'>{puzzle.hint}</div>}
    </div>
  );
}

export default Gamecard;
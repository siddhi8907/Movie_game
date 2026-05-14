import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Leaderboard() {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLeaders = async () => {
      try {
        const res = await axios.get('http://localhost:5001/api/users/leaderboard');
        setLeaders(res.data);
      } catch (err) {
        console.error("Error fetching leaderboard", err);
      } finally {
        setLoading(false);
      }
    };
    fetchLeaders();
  }, []);

  // medals for top 3
  const medal = (index) => ['#1', '#2', '#3'][index] ?? `#${index + 1}`;

  return (
    <div className="min-h-screen bg-zinc-950 p-8 text-zinc-100 font-mono">
      <button onClick={() => navigate('/home')} className="mb-8 text-zinc-500 hover:text-white">
        ← Back 
      </button>

      <h1 className="text-3xl mb-8 tracking-tighter border-b border-zinc-800 pb-2">
        TOP PERFORMERS
      </h1>

      {loading ? (
        <p>Decrypting rankings...</p>
      ) : leaders.length === 0 ? (
        <p className="text-zinc-500">No agents on the board yet. Start solving!</p>
      ) : (
        <div className="border border-zinc-800 bg-zinc-900 rounded overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-zinc-800 text-zinc-400 text-xs uppercase">
                <th className="p-4">Rank</th>
                <th className="p-4">Name</th>
                <th className="p-4 text-right">Puzzles Solved</th>
              </tr>
            </thead>
            <tbody>
              {leaders.map((user, index) => (
                <tr
                  key={user._id}
                  className={`border-t border-zinc-800 hover:bg-zinc-800/50 ${
                    index === 0 ? 'text-yellow-400' : '' 
                  }`}
                >
                  <td className="p-4 font-bold text-zinc-500">{medal(index)}</td>
                  <td className="p-4">{user.username}</td>
                  
                  <td className="p-4 text-right text-green-500">{user.solvedCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Leaderboard;
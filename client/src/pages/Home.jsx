import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
    const [difficulty, setDifficulty]= useState('Medium')
    const navigate = useNavigate();

    const handlePlay= () =>{
        navigate('/game', {state: { difficulty }});
        //start the game and pass the difficulty
    };

    return(
        <div className='flex flex-col items-center justify-center min-h-screen bg-zinc-950 text-black font-mono'>
            <h1 className="text-4xl mb-8 tracking-tighter border-b-2 border-zinc-100">THE MOVIE PUZZLER</h1>

            <div className='flex flex-col gap-4 w-64'>

                <label className="text-xs text-zinc-500 uppercase">Select Difficulty</label>
                <select
                value={difficulty}
                onChange={(e)=> setDifficulty(e.target.value)}
                className='bg-pink-100 border border-zinc-700 p-3 rounded'
                >
                    <option>Easy</option>
                    <option>Medium</option>
                    <option>Hard</option>
                 </select>

                 <button onClick={handlePlay}
                 className='mt-4 bg-rose-950 text-white-950 py-3 font-bold hover:bg-zinc-300'
                 >
                    PLAY GAME
                 </button>
            </div>
        </div>
    );


}
export default Home;
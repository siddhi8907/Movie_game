import React, {useState, useEffect} from 'react';

function GameCard({puzzle}){
    const [userGuess, setUserGuess]= useState('');
    const [attempts, setAttempts]= useState(0);
    const [showHint, setShowHint]= useState(false);
    const [status, setStatus]= useState('playing')

    //the attempts no will decide when to show the hint
    //the status variable is so that we know if ans is correct, wrong or playing

    //for checking the answer:
    const Check = () => {
        if(userGuess.toLowerCase() === puzzle.answer.toLowerCase()){
            setStatus('correct');}

        else{
            setAttempts(attempts+1);
            setStatus('wrong');

            setTimeout(() => setStatus('playing'), 1000);
            //so that after the cross comes we can again start guessing answers

        }
    };

    return(
        <div className='game-card'>
            {/*the whole ui of the game card*/}
            <div className='description-box'>
                <p>{puzzle.description}</p>
            </div>

            {/*Show tick or cross based on status */}

            {status==='correct'? (
                <div>✅ Correct! 😇</div>
            ):(
        <input 
          value={userGuess}
          onChange={(e) => setUserGuess(e.target.value)} 
          placeholder="Guess the movie..."
        />
      )}

      <button onClick={Check}>Submit</button>

      {/*Hint logic only if attempts are more than 3 */}

      {attempts>=3 && !showHint &&(
        <button onClick={()=> setShowHint(true)}>💡 Need a HINT?</button>
      ) }

      {/*if this button is pressed then hint will be shown */}
      {showHint && <div className='hint-text'>{puzzle.hint}</div>}

            </div>

    );

}


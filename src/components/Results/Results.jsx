import React from 'react'
import './Results.css'

const Results = ({ displayAnswers, setCheckAnswer, setStarted, setShowBtn }) => {
  const resetGame = () => {
    setCheckAnswer(false)
    setStarted(false)
    setShowBtn(false)
  }
  return (
    <div className='results'>
        <p>You scored {displayAnswers()}/5 correct answers!</p>
        <button onClick={resetGame}>Play Again</button>
    </div>
  )
}

export default Results
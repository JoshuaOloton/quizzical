import React from "react"
import './Start.css'

const Start = ({ startQuiz }) => {
    return (
        <div className="start-page">
            <h3 className="start-header">Quizzical</h3>
            <p className="start-description">Click to start</p>
            <button className="start-btn" onClick={startQuiz}>Start quiz</button>
        </div>
    )
}

export default Start
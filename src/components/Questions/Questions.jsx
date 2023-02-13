import React from "react"
import { useState } from 'react'
import { nanoid } from "nanoid"
import './Questions.css'
import Results from '../Results/Results'
import ClipLoader from "react-spinners/ClipLoader";
import BarLoader from "react-spinners/BarLoader";


// fisher yates method for sorting arrays
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const Question = ({ setStarted }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [questions, setQuestions] = useState([])
    const [allAnswers, setAllAnswers] = useState([])
    const [checkAnswer, setCheckAnswer] = useState(false)
    const [showBtn, setShowBtn] = useState(false)

    // const getAsyncQuestions = () => new Promise((resolve, reject) => resolve({data: questions}))
    
    React.useEffect(() => {
        setIsLoading(true)
        fetch("https://opentdb.com/api.php?amount=5")
        .then(response => response.json())  
        .then(data => {
            setTimeout(() => {
                setShowBtn(true)
            }, 200)
            setIsLoading(false)
            setQuestions(data.results)
            // setAllAnswers(data.results.map(question => question.incorrect_answers))
            setAllAnswers(all_answers(data.results))
        })
    },[])
    
    const all_answers = (data) => 
        data.map(question => {
            const correct_answer = {
                id: nanoid(),
                answer: question.correct_answer,
                selected: false,
                correct: true
            }
            
            const answers = question.incorrect_answers.map(ans => (
                {
                    id: nanoid(),
                    answer: ans,
                    selected: false,
                    correct: false
                }
            ))
            
            answers.push(correct_answer)
            return shuffleArray(answers)
        })

    console.log(allAnswers[0])
    
    const displayAnswers = () => {
        setCheckAnswer(true)
        const correctAnswers = allAnswers.filter(answer => answer.find(ans => ans.correct).selected)
        return correctAnswers.length
    }
    
    function updateAnswers(no, id) {
        setAllAnswers(oldAnswers => oldAnswers.map((ans, index) => 
            index+1 === no ?
            ans.map(a => a.id === id ? {...a, selected: true} : {...a, selected: false}) :
            ans))
    }

    const x = 100;
    const y = 100;
    const override = {
        display: "block",
        margin: "0 auto",
        // position: "fixed",
        // top: "30%",
        // left: "50%"
      };

    return (
        <div>
            {isLoading ?
            (
                // <ClipLoader 
                //     color={"#4D5B9E"}
                //     loading={isLoading}
                //     cssOverride={override}
                //     size={100}
                //     aria-label="Loading Spinner"
                //     data-testid="loader"
                // /> 
                <BarLoader loading={isLoading} height={5} width={80} cssOverride={override} color={"#4D5B9E"}/>

            ) :
            (<div>
                <div className="questions">
                    {questions.map((question, index) => {
                        return (
                            <div className="qa">
                                <p className="question"
                                    dangerouslySetInnerHTML={{__html: question.question}}
                                />
                                <div className="answers">
                                    {allAnswers[index].map(ans => 
                                        !checkAnswer ?
                                            <p 
                                            onClick={() => updateAnswers(index+1, ans.id)}
                                            className={ans.selected ? 'selected' : ''}
                                            // className={`${ans.correct && 'correct'} ${ans.selected && 'selected'}`}
                                            dangerouslySetInnerHTML={{__html: ans.answer}}
                                        /> :
                                        <p 
                                            className={`${ans.selected && 'wrong'} ${ans.correct && 'correct'}`}
                                            dangerouslySetInnerHTML={{__html: ans.answer}}
                                        />
                                    )}
                                </div>
                            </div>
                        )
                    })}
                    {showBtn && <button className="check-answer" onClick={displayAnswers}>Check answers</button>}
                </div>
                {checkAnswer && 
                <Results
                    displayAnswers={displayAnswers}
                    setCheckAnswer={setCheckAnswer} 
                    setStarted={setStarted}
                    setShowBtn={setShowBtn}
                />}
            </div>)
            }
        </div>

    )
}

export default Question

import { useState } from 'react'
import './App.css'
import Start from "./components/Start/Start"
import Questions from "./components/Questions/Questions"

function App() {
  const [started, setStarted] = useState(false)
    const startQuiz = () => {
        setStarted(true)
    }

  return (
    <div>
        {started ?
        <Questions setStarted={setStarted} /> :
        <Start startQuiz={startQuiz} />}
    </div>
  )
}

export default App

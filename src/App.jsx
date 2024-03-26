import { useState } from 'react'
import Die from '../components/Die'
import './App.css'

function App() {
  function allNewDice() {
    let diceArray = []
    for (let i = 0; i < 10; i++) {
      diceArray.push(Math.floor(Math.random() * 6) + 1)
    }
    return diceArray
  }

  return (
    <main>
      <div className="dice--container">
        <Die value="1" />
        <Die value="2" />
        <Die value="3" />
        <Die value="4" />
        <Die value="5" />
        <Die value="6" />
        <Die value="1" />
        <Die value="2" />
        <Die value="3" />
        <Die value="4" />
      </div>
    </main>

  )
}

export default App

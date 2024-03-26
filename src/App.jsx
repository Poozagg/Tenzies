import { useState } from 'react'
import Die from '../components/Die'
import './App.css'

function App() {
  const [dice, setDice] = useState(allNewDice())
  function allNewDice() {
    let diceArray = []
    for (let i = 0; i < 10; i++) {
      diceArray.push(Math.floor(Math.random() * 6))
    }
    return diceArray
  }
  const diceElements = dice.map((die) => <Die value={die} />)

  function rollDice() {
    setDice(allNewDice())
  }

  return (
    <main>
      <div className="dice--container">
        {diceElements}
      </div>
      <button
        className="Roll--Button"
        onClick={rollDice}
      >
        Roll
      </button>
    </main>

  )
}

export default App

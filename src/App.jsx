import { useState } from 'react'
import { nanoid } from 'nanoid'
import Die from '../components/Die'
import './App.css'

function App() {
  const [dice, setDice] = useState(allNewDice())
  function allNewDice() {
    let diceArray = []
    for (let i = 0; i < 10; i++) {
      diceArray.push({
        value: Math.floor(Math.random() * 6),
        isHeld: false,
        id: nanoid()
      })
    }
    console.log(diceArray)
    return diceArray
  }

  // console.log(diceArray)

  const diceElements = dice.map((die) => (
                      <Die value={die.value} key={die.id} isHeld={die.isHeld}/>
                      ))

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

import { useState, useEffect } from 'react'
import { nanoid } from 'nanoid'
import Die from '../components/Die'
import './App.css'

function App() {
  const [dice, setDice] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)

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

  function holdDie(id) {
    setDice((prevDice) => {
      return prevDice.map((die) => {
        if (die.id === id) {
          return {
            ...die,
            isHeld: !die.isHeld
          }
        }
        return die
      })

    })
  }

  const diceElements = dice.map((die) => (
                      <Die
                        value={die.value}
                        key={die.id}
                        isHeld={die.isHeld}
                        handleClick={() => holdDie(die.id)}
                      />
                      ))

  function rollDice() {
    // setDice(allNewDice())
    setDice(prevDice => prevDice.map(die => {
        return die.isHeld ?
          die :
          { ...die, value: Math.floor(Math.random() * 6)}
      })
    )
  }

  //  side-effect to check for tenzies
  useEffect(() => {
    console.log("Dice state has changed")
  }, [dice])

  return (
    <main>
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
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

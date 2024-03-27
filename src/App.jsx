import { useState, useEffect } from 'react'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'
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
    if (tenzies) {
      setDice(allNewDice())
      setTenzies(false)
    } else {
    setDice(prevDice => prevDice.map(die => {
        return die.isHeld ?
          die :
          { ...die, value: Math.floor(Math.random() * 6)}
      })
    )}
  }

  //  side-effect to check for tenzies
  // this is to check two pieces of state (dice & tenzies in sync)
  useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every(die => die.value === firstValue)
    if (allHeld && allSameValue) {
      setTenzies(true)
    }
  }, [dice])

  return (
    <main>
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <div className="dice--container">
          {diceElements}
        </div>
      <button
        className="Roll--Button"
        onClick={rollDice}
      >
        {tenzies ? "New Game" : "Roll"}
      </button>
    </main>

  )
}

export default App

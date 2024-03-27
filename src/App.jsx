import { useState, useEffect } from 'react'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'
import Die from '../components/Die'
import './App.css'

function App() {
  const [dice, setDice] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)
  const [rollCounter, setRollCounter] = useState(0)

  function allNewDice() {
    let diceArray = []
    for (let i = 0; i < 10; i++) {
      diceArray.push({
        value: Math.floor(Math.random() * 6),
        isHeld: false,
        id: nanoid()
      })
    }
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
    //--! if tenzies is true, reset the dice and set tenzies to false !--
  // useEffect to update the rollCounter
    setRollCounter(prev => prev + 1)
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

  // // useEffect to update the rollCounter
  // useEffect(() => {
  //   if (!tenzies) {
  //     setRollCounter(prev => prev + 1)
  //   }
  // }, [setDice, tenzies])

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

      {tenzies && `You completed the Tenzies in ${rollCounter} rolls `}
    </main>

  )
}

export default App

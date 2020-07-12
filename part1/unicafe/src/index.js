import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button text="good" func={() => setGood(good + 1)} />
      <Button text="neutral" func={() => setNeutral(neutral + 1)} />
      <Button text="bad" func={() => setBad(bad + 1)} />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

const Button = ({ text, func }) => <button onClick={func}>{text}</button>

const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

const Statistics = ({ good, neutral, bad }) => {

  const total = () => good + neutral + bad
  const avg = () => (good - bad) / total()
  const positive = () => (good / total()) * 100 + " %"

  if (total() === 0) {
    return <div>No feedback given</div>
  } else {
    return (
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={total()} />
          <StatisticLine text="average" value={avg()} />
          <StatisticLine text="positive" value={positive()} />
        </tbody>
      </table>
    )
  }
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)

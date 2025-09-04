import { useState } from 'react'

const StatisticRow = ({ text, value }) => {
  if (text == 'good') return <tr><td>{text}</td><td>{value.good}</td></tr>
  else if (text == 'neutral') return <tr><td>{text}</td><td>{value.neutral}</td></tr>
  else if (text == 'bad') return <tr><td>{text}</td><td>{value.bad}</td></tr>
  else if (text == 'all') return <tr><td>{text}</td><td>{value.good + value.neutral + value.bad}</td></tr>
  else if (text == 'average') return <tr><td>{text}</td><td>{(value.good + value.neutral + value.bad) / 3}</td></tr>
  else if (text == 'positive') return <tr><td>{text}</td><td>{value.good / (value.good + value.neutral + value.bad)}%</td></tr>
}

const Statistics = ({ good, neutral, bad }) => {

  if (good == 0 && neutral == 0 && bad == 0) {
    return <p>No feedback given</p>
  } else {
    const value = { good: good, neutral: neutral, bad: bad }
    return (
      <table>
        <tbody>
          <StatisticRow text='good' value={value} />
          <StatisticRow text='neutral' value={value} />
          <StatisticRow text='bad' value={value} />
          <StatisticRow text='all' value={value} />
          <StatisticRow text='average' value={value} />
          <StatisticRow text='positive' value={value} />
        </tbody>
      </table>
    )
  }
}

const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={() => setGood(good + 1)} text={'good'} />
      <Button onClick={() => setNeutral(neutral + 1)} text={'neutral'} />
      <Button onClick={() => setBad(bad + 1)} text={'bad'} />
      <h2>statistics</h2>
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  )
}

export default App
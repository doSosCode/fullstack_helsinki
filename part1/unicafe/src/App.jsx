import { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.onClick}>{props.text}</button>
  )
}

const StatisticLine = (props) => {
  return (
      <tbody>
        <tr>
          <td>{props.text}</td>
          <td>{props.value}</td>
        </tr>
      </tbody>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)

  const goodFeedback = () => {
    const updatedGood = good + 1;
    const updatedTotal = updatedGood + neutral + bad
    const updatedAverage = (updatedGood - bad)/(updatedTotal)
    const updatedPositive = (updatedGood*100)/updatedTotal
    setGood(updatedGood);
    setTotal(updatedTotal);
    setAverage(updatedAverage);
    setPositive(updatedPositive);
  }
  const neutralFeedback = () => {
    const updatedNeutral = neutral + 1;
    const updatedTotal = good + updatedNeutral + bad
    const updatedAverage = (good - bad)/(updatedTotal)
    const updatedPositive = (good*100)/updatedTotal
    setNeutral(updatedNeutral);
    setTotal(updatedTotal);
    setAverage(updatedAverage);
    setPositive(updatedPositive);
  }
  const badFeedback = () => {
    const updatedBad = bad + 1;
    const updatedTotal = good + neutral + updatedBad
    const updatedAverage = (good - updatedBad)/(updatedTotal)
    const updatedPositive = (good*100)/updatedTotal    
    setBad(updatedBad);
    setTotal(updatedTotal);
    setAverage(updatedAverage);
    setPositive(updatedPositive);
  }
  
  if (total === 0) {
    return (
      <div>
      <h2>give feedback</h2>
      <Button onClick={goodFeedback} text="good" />
      <Button onClick={neutralFeedback} text="neutral" />
      <Button onClick={badFeedback} text="bad" />      
      <h2>statistics</h2>
      <p>No feedback given</p>
    </div>
    )
  }

  return (
    <div>
      <h2>give feedback</h2>
      <Button onClick={goodFeedback} text="good" />
      <Button onClick={neutralFeedback} text="neutral" />
      <Button onClick={badFeedback} text="bad" /> 
      <h2>statistics</h2>
      <table>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="total" value={total} />
        <StatisticLine text="average" value={average} />
        <StatisticLine text="positive" value={positive + " %"} />
      </table>
    </div>
  )
}



export default App
import { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.onClick}>{props.text}</button>
  )
}

const MostVoted = (props) => {
  let mostVotedAnecdote = props.anecdotes[0]
  let mostVotes = props.votes[0];

  for (let i = 0; i < props.votes.length; ++i) {
    if (props.votes[i] > mostVotes){
      mostVotes = props.votes[i];
      mostVotedAnecdote = props.anecdotes[i];
    }
  } 

  if (mostVotes === 1) {
    return (
      <div>
      <p>{mostVotedAnecdote}</p>
      <p>has {mostVotes} vote</p>
    </div>
    )
  }
  return (
    <div>
      <p>{mostVotedAnecdote}</p>
      <p>has {mostVotes} votes</p>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))


  const selectRandomAnecdote = () => {
    const randomNumber = Math.floor(Math.random() * anecdotes.length)
    setSelected(randomNumber)
  }

  const voteForAnecdote = () => {
    const updatedVotes = [...votes]
    updatedVotes[selected] += 1
    setVotes(updatedVotes)
  }


  if (votes[selected] === 1) {
    return (
      <div>
      <h2>Anecdote of the day</h2>
      <p>{anecdotes[selected]}</p>
      <p>has 1 vote</p>
      <Button onClick={voteForAnecdote} text="vote" />
      <Button onClick={selectRandomAnecdote} text="next anecdote" />
      <h2>Anecdote with most votes</h2>
      <MostVoted anecdotes={anecdotes} votes={votes} />
    </div>
    )
  }

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <Button onClick={voteForAnecdote} text="vote" />
      <Button onClick={selectRandomAnecdote} text="next anecdote" />
      <h2>Anecdote with most votes</h2>
      <MostVoted anecdotes={anecdotes} votes={votes} />
    </div>
  )
}

export default App
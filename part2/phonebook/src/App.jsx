import { useState } from 'react'

const Filter = (props) => {
  return (
    <div>
      filter shown with <input value={props.newFilter} onChange={props.handleFilterChange}/>
    </div>
  )
}

const PersonForm = (props) => {
  return (
  <form onSubmit={props.addPerson}>
      <div>
        name: <input value={props.newName} onChange={props.handleNameChange} />
      </div>
      <div>
        number: <input value={props.newNumber} onChange={props.handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Persons = (props) => {
  return (
    <div>
      {props.filterPhonebook.map(person =>
        <li key={person.id}>{person.name} {person.number}</li>
      )}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    const personObject = {
      name: newName,
      number: newNumber,
      id: String(persons.length + 1)
    }
    if (persons.map(person => person.name).includes(newName)) {
      window.alert(`${personObject.name} is already added to phonebook`);
    }
    else if (persons.map(person => person.number).includes(newNumber)) {
      window.alert(`${personObject.number} is already allocated to someone else`);
    }
    else {
    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
    }
  }

  const filterPhonebook = newFilter
  ? persons.filter(person => person.name.match(new RegExp(newFilter, "gi")))
  : persons

  const handleNameChange = (event) => {
    //console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    //console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    //console.log(event.target.value)
    setNewFilter(event.target.value)
  }


  return (
    <div>
      <h1>Phonebook</h1>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange}/>
      <h2>add a new</h2>
      <PersonForm addPerson={addPerson} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons filterPhonebook={filterPhonebook}/>
    </div>
  )
}

export default App
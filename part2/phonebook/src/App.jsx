import { useState, useEffect } from 'react';
//import axios from 'axios';
import personService from './services/personService';
import './index.css'

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
      {props.filterPhonebook.map(filteredPerson =>
        <li key={filteredPerson.id}>
          {filteredPerson.name} {filteredPerson.number} <button onClick={() => props.deletePerson(filteredPerson.id)}>delete</button>
        </li>
      )}
    </div>
  )
}

const Error = ({message}) => {
  if (message === null) {
    return null
  }

  return (
    <div className="error">
      {message}
    </div>
  )
}

const Notification = ({message}) => {
  if (message === null) {
    return null
  }

  return (
    <div className="info">
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState(null)

  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
      .then(initialPersons => {
        console.log('promise fulfilled')
        setPersons(initialPersons)
      })
  }, [])
  console.log('render', persons.length, 'persons')

  const addPerson = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    const personObject = {
      name: newName,
      number: newNumber,
    }
    if (persons.map(person => person.name).includes(newName)) {
      const changedPerson = {...personObject, number: newNumber}
      const personID = persons.find(person => person.name === newName).id
      if (window.confirm(`${personObject.name} is already added to phonebook, replace the old number with a new one?`)) {
        personService
          .update(personID, changedPerson)
          .then(changedPerson => {
          setPersons(currentPersons => currentPersons.map(person => person.name === changedPerson.name ? changedPerson : person))
          setNewName('')
          setNewNumber('')
          setNotificationMessage(
            `Changed the information of ${personObject.name}`
          )
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
          })
      }
    }
    else if (persons.map(person => person.number).includes(newNumber)) {
      window.alert(`${personObject.number} is already allocated to some other person`);
    }
    else {    
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          setNotificationMessage(
            `Added ${personObject.name}`
          )
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
        })
    }
  }
  
  const deletePerson = (id) => {
    const personToDelete = persons.find(person => person.id === id)
    if(window.confirm('Are you sure you want to delete this entry?')) {
      personService
        .deletePerson(id)
        .then(() => {
          setPersons(returnedPersons => returnedPersons.filter(person => person.id !== id))
          setNotificationMessage(
            `${personToDelete.name} was removed successfully`
          )
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
        })
        .catch(error => {
          setErrorMessage(
            `Information of ${personToDelete.name} was already removed from server`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
          setPersons(persons.filter(person => person.id !== id))
        })
    }
  }
  
  const filterPhonebook = newFilter
  ? persons.filter(filteredPerson => filteredPerson.name.match(new RegExp(newFilter, "gi")))
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
      <Notification message={notificationMessage} />
      <Error message={errorMessage} />
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange}/>
      <h2>add a new</h2>
      <PersonForm addPerson={addPerson} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons filterPhonebook={filterPhonebook} deletePerson={deletePerson} />
    </div>
  )
}

export default App
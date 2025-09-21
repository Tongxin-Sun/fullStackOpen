import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personService from './services/persons'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setNewFilter] = useState('')
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState(true)

  const addPerson = (e) => {
    e.preventDefault()
    const existingPerson = persons.find((person) => person.name === newName)
    if (existingPerson === undefined) {
      const newPerson = { name: newName, number: newNumber }
      personService
        .create(newPerson)
        .then(newPerson => {
          setPersons(persons.concat(newPerson))
        })
      setMessageType(true)
      setMessage(`Added ${newName}`)
      setTimeout(() => setMessage(''), 2000)
    }
    else {
      const confirmUpdate = confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
      const newPerson = { ...existingPerson, number: newNumber }
      if (confirmUpdate) {
        personService
          .update(existingPerson.id, newPerson)
          .then(() => {
            setPersons(
              persons.map(person =>
                person.id === newPerson.id ? newPerson : person
              )
            )
          })
          .catch(error => {
            setMessage(`Information of ${newPerson.name} has already been removed from the server`)
            setMessageType(false)
            setPersons(persons.filter(person => person.id !== existingPerson.id))
          })
        setMessageType(true)
        setMessage(`Updated ${newName}`)
        setTimeout(() => setMessage(''), 2000)
      }
    }
    setNewName('')
    setNewNumber('')
  }

  const deletePerson = (e, person) => {
    e.preventDefault()
    const userConfirm = confirm(`delete ${person.name}`)
    if (userConfirm) {
      personService
        .deletePerson(person.id)
        .then(() => {
          setMessageType(true)
          setMessage(`${person.name} has been successfully deleted!`)
          setTimeout(() => setMessage(''), 2000)
          setPersons(persons.filter(p => p.id != person.id))
        })
        .catch(error => {
          console.log(error)
        })
    }
  }

  useEffect(() => {
    personService
      .getAll()
      .then((initialPersons) => setPersons(initialPersons))
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      {message && <Notification message={message} type={messageType} />}
      <Filter filter={filter} onChange={(e) => setNewFilter(e.target.value)} />
      <h3>Add a new</h3>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        setNewName={(e) => setNewName(e.target.value)}
        setNewNumber={(e) => setNewNumber(e.target.value)}
        addPerson={addPerson}
      />
      <h3>Numbers</h3>
      <Persons filter={filter} persons={persons} deletePerson={deletePerson} />
    </div>
  )
}

export default App
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
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState({ message: null })

  const personsToShow = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  )

  const addPerson = (e) => {
    e.preventDefault()
    const existingPerson = persons.find((person) => person.name === newName)

    if (existingPerson) {
      updatePerson(existingPerson)
      return
    }

    personService
      .create({ name: newName, number: newNumber })
      .then(createdPerson => {
        setPersons(persons.concat(createdPerson))
        notifyWith(`Added ${createdPerson.name}`)
        clearForm()
      })
  }

  const updatePerson = (existingPerson) => {
    const confirmUpdate = confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)

    if (confirmUpdate) {
      personService
        .update({ ...existingPerson, number: newNumber })
        .then((updatedPerson) => {
          setPersons(
            persons.map(person =>
              person.id === existingPerson.id ? updatedPerson : person
            )
          )
          notifyWith(`Phonenumber of ${updatedPerson.name} updated!`)
          clearForm()
        })
        .catch((e) => {
          notifyWith(`Information of ${existingPerson.name} has already been removed from server`, true)
          clearForm()
          setPersons(persons.filter(person => person.id !== existingPerson.id))
        })
    }
  }

  const deletePerson = (e, person) => {
    const userConfirm = confirm(`Delete ${person.name}`)
    if (userConfirm) {
      personService
        .deletePerson(person.id)
        .then(() => {
          setPersons(persons.filter(p => p.id != person.id))
          notifyWith(`Delete ${person.name}`)
        })
        .catch(error => {
          console.log(error)
        })
    }
  }

  const notifyWith = (message, isError = false) => {
    setNotification({ message, isError })
    setTimeout(() => {
      setNotification({ message: null })
    }, 5000)
  }

  const clearForm = () => {
    setNewName('')
    setNewNumber('')
  }

  useEffect(() => {
    personService
      .getAll()
      .then((initialPersons) => setPersons(initialPersons))
  }, [])

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification notification={notification} />
      <Filter filter={filter} setFilter={setFilter} />
      <h2>Add a new</h2>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        setNewName={(e) => setNewName(e.target.value)}
        setNewNumber={(e) => setNewNumber(e.target.value)}
        addPerson={addPerson}
      />
      <h3>Numbers</h3>
      <Persons persons={personsToShow} deletePerson={deletePerson} />
    </div>
  )
}

export default App
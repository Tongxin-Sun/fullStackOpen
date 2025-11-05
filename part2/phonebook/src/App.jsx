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

  const personsToShow = persons.filter((person) => person.name.toLowerCase().includes(filter.toLowerCase()))

  const addPerson = (e) => {
    e.preventDefault()

    // Make sure that the new name is trimmed off the white space at the end
    const newNameTrimmed = newName.trim()
    setNewName(newNameTrimmed)

    const existingPerson = persons.find((person) => person.name === newNameTrimmed)

    if (existingPerson) {
      updatePerson(existingPerson)
      return
    }

    personService
      .create({ name: newNameTrimmed, number: newNumber })
      .then(createdPerson => {
        setPersons(persons.concat(createdPerson))
        notifyWith(`Added ${createdPerson.name}`)
        clearForm()
      })
      .catch(error => {
        console.log(error.response.data.error)
        notifyWith(error.response.data.error, true)
        clearForm()
      })
  }

  const updatePerson = existingPerson => {
    const confirmUpdate = confirm(`${newName.trim()} is already added to phonebook, replace the old number with a new one?`)

    if (confirmUpdate) {
      personService
        .update({ ...existingPerson, number: newNumber })
        .then((updatedPerson) => {
          setPersons(
            persons.map(person =>
              person.id === existingPerson.id ? updatedPerson : person
            )
          )
          notifyWith(`Phone number of ${updatedPerson.name} updated!`)
          clearForm()
        })
        .catch(error => {
          if (error.status === 400) {
            notifyWith(error.response.data.error, true)
          } else if (error.status === 404) {
            notifyWith(
              `Information of ${existingPerson.name} has already been removed from server`,
              true
            )

          }
          setPersons(persons.filter(person => person.name !== existingPerson.name))
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
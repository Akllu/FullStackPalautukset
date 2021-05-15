import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'

const App = () => {
  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('Add a new person')
  const [ newNumber, setNewNumber ] = useState('Add a phone number')
  const [ newFilter, setNewFilter ] = useState('')

  useEffect(() => {
    personService
     .getAll()
     .then(initialPersons => {
       setPersons(initialPersons)
     })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.some(person => person.name === newName)) {
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const person = persons.find(p => p.name === newName)
        const ID = person.id
        const nameObject = {
          name: newName,
          number: newNumber,
        }
        console.log(ID, nameObject)
      
        personService
          .update(ID, nameObject)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id === returnedPerson.id ? returnedPerson : person))
            setNewName('')
            setNewNumber('')
          })
        }
    }
    else if(persons.some(person => person.number === newNumber))
    {
      alert(`Phone number ${newNumber} is already in use!`)
      setNewNumber('')
    }
    else {
      const nameObject = {
        name: newName,
        number: newNumber
      }

      personService
        .create(nameObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const deletePerson = (person) => {
    const personID = person.id

    if(window.confirm(`Delete ${person.name}?`)) {
    console.log(`Poistetaan henkilö ${person.name}`)
    
    personService
      .remove(personID)
      .then(response => {
        const updatedPersons = persons.filter(p => p.id !== personID)
        setPersons(updatedPersons)
      })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />

      <h2> Add a new person </h2>
      <PersonForm addPerson={addPerson} newName={newName} setNewName={setNewName} handleNameChange={handleNameChange}
                  newNumber={newNumber} setNewNumber={setNewNumber} handleNumberChange={handleNumberChange} />
         
      <h2>Numbers</h2>
      <Persons persons={persons} newFilter={newFilter} deletePerson={deletePerson} />
    </div>
  )
}

export default App
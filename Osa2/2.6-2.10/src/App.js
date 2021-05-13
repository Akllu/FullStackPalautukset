import React, { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '0401231244' },
    { name: 'Ada Lovelace', number: '39445323523' },
    { name: 'Dan Abramov', number: '1243234345' },
    { name: 'Mary Poppendieck', number: '39236423122' }
  ]) 

  const [ newName, setNewName ] = useState('Add a new person')
  const [ newNumber, setNewNumber ] = useState('Add a phone number')
  const [ newFilter, setNewFilter ] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook!`)
      setNewName('')
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
      setPersons(persons.concat(nameObject))
      setNewName('')
      setNewNumber('')
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
      <Persons persons={persons} newFilter={newFilter} />
    </div>
  )
}

export default App
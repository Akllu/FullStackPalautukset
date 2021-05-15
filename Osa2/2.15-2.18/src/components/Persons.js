import React from 'react'

const Persons = (props) => {
    let persons = props.persons
    
    if(props.newFilter !== '') {
        if(isNaN(props.newFilter)) {
            persons = props.persons.filter(person => person.name.toLowerCase().includes(props.newFilter.toLowerCase()))
        }
        else {
            persons = props.persons.filter(person => person.number.includes(props.newFilter))
        }
        
    }
    const showPersons = () => persons.map(person => 
        <li key={person.id}>
            {person.name} {person.number} <button onClick={() => props.deletePerson(person)}> Delete </button>
        </li>
    )

  return ( 
      <ul> {showPersons()} </ul>
  )
}

export default Persons
import React from 'react'

const PersonForm = (props) => {
    return (
        <form onSubmit={props.addPerson}>
            <div>
                <input value={props.newName} onChange={props.handleNameChange} onClick={() => {props.setNewName('')}} />      
            </div>
            <div>
                <input value={props.newNumber} onChange={props.handleNumberChange} onClick={() => {props.setNewNumber('')}} />
            </div>  
            <button type="submit">Add</button>
        </form>      
  )
}

export default PersonForm
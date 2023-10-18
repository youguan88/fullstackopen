import { useState } from 'react'

const Content = (props) => {
  return (
    <div>{props.person.name} {props.person.number}</div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { 
      name: 'Arto Hellas',
      number: '040-1234567' 
    }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleNewName = (event) =>{
    setNewName(event.target.value)
  }
  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }
  const addName = (event) => {
    event.preventDefault()
    if (persons.map(x=>x.name).includes(newName))
    {
      window.alert(`${newName} is already added to phonebook`)
    }
    else{
      const personObject = {
        name : newName,
        number: newNumber
      }
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input onChange={handleNewName} value={newName}/>
        </div>
        <div>
          number: <input onChange={handleNewNumber} value={newNumber}/>
        </div>
        <div>
          <button type="submit" onClick={addName}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => <Content person={person} key={person.name}/>)}
    </div>
  )
}

export default App
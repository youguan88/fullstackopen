import { useState } from 'react'

const Content = (props) => {
  return (
    <div>{props.person.name}</div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const handleNewName = (event) =>{
    setNewName(event.target.value)
  }
  const addName = (event) => {
    event.preventDefault()
    const personObject = {
      name : newName
    }
    setPersons(persons.concat(personObject))
    setNewName('')
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input onChange={handleNewName}/>
        </div>
        <div>
          <button type="submit" onClick={addName}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => <Content person={person} key={person.name}/>)}
      <div>debug: {newName}</div>
    </div>
  )
}

export default App
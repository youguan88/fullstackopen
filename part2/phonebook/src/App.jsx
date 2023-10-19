import { useEffect, useState } from 'react'
import axios from 'axios'

const Content = (props) => <div>{props.person.name} {props.person.number}</div>
const Filter = (props) => <div>filter shown with <input onChange={props.handle} value={props.value} /></div>
const PersonForm = (props) => {
  return (
    <form>
      <div>
        name: <input onChange={props.handleNewName} value={props.newName} />
      </div>
      <div>
        number: <input onChange={props.handleNewNumber} value={props.newNumber} />
      </div>
      <div>
        <button type="submit" onClick={props.addName}>add</button>
      </div>
    </form>
  )
}
const Persons = (props) => props.persons.filter(x => props.regexNameFilter.test(x.name)).map(person => <Content person={person} key={person.id} />)

const App = () => {
  const [persons, setPersons] = useState([])
  useEffect(()=>{
    axios.get("http://localhost:3001/persons")
    .then(response => setPersons(response.data))
  },[])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')
  const regexNameFilter = new RegExp(nameFilter, 'i')

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }
  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }
  const handleNameFilter = (event) => {
    setNameFilter(event.target.value)
  }
  const addName = (event) => {
    event.preventDefault()
    if (persons.map(x => x.name).includes(newName)) {
      window.alert(`${newName} is already added to phonebook`)
    }
    else {
      const personObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1
      }
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handle={handleNameFilter} value={nameFilter} />
      <h3>add a new</h3>
      <PersonForm handleNewName={handleNewName} handleNewNumber={handleNewNumber} newName={newName} newNumber={newNumber} addName={addName} />
      <h3>Numbers</h3>
      <Persons persons={persons} regexNameFilter={regexNameFilter} />
    </div>
  )
}

export default App
import { useState } from 'react'

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
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
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
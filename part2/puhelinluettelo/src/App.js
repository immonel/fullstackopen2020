import React, { useState, useEffect } from 'react'
import personService from './services/persons'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')
  const [ message, setMessage ] = useState({text: null, error: false})

  const nameChange   = (event) => setNewName(event.target.value)
  const numberChange = (event) => setNewNumber(event.target.value)
  const filterChange = (event) => setFilter(event.target.value)

  const updatePersons = () => {
    personService.get().then(data => setPersons(data))
    .catch(err => showError(`Fetching data failed: ${err}`))
    setNewName('')
    setNewNumber('')
  }

  useEffect(updatePersons, [])

  const showMessage = (message) => {
    setMessage({text: message, error: false})
    setTimeout(() => {
      setMessage({text: null, error: false})
    }, 5000)
  }
  
  const showError = (message) => {
    setMessage({text: message, error: true})
    setTimeout(() => {
      setMessage({text: null, error: false})
    }, 5000)
  }

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.map(p => p.name).includes(newName)) {
      const person = persons.find(p => p.name === newName)
      if (!person.number || window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const newPerson = {...person, number: newNumber}
        personService.update(person.id, newPerson)
        .then(updatePersons)
        .then(() => showMessage(`Updated ${person.name}`))
        .catch(err => showError(`Updating ${person.name} failed: ${err}`))
      }
    } else {
      const newPerson = {
        name: newName,
        number: newNumber
      }
      personService.add(newPerson)
        .then(updatePersons)
        .then(() => showMessage(`Added ${newPerson.name}`))
        .catch(error => {
          showError(`Adding person failed: ${error}`)
        })
    }
  }

  const handleDelBtn = (event) => deletePerson(parseInt(event.target.value))

  const deletePerson = (id) => {
    const person = persons.find(p => p.id === id)

    if (person && window.confirm(`Do you want to delete ${person.name}?`)) {
      personService.del(id).then(() => {
        setPersons(persons.filter(p => p.id !== id))
      })
      .then(() => showMessage(`Deleted ${person.name}`))
      .catch(err => showError(`Deleting failed: ${err}`))
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
        <FilterForm value={filter} onChange={filterChange} />
      <h2>Add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={nameChange}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={numberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <Notification message={message} />
      <h2>Numbers</h2>
        <PersonList persons={persons} filter={filter} onBtn={handleDelBtn}/>
    </div>
  )

}

const FilterForm = ({ value, onChange }) => (
  <form>
    <div>
      filter shown with <input value={value} onChange={onChange}/>
    </div>
  </form>
)

const Person = ({ person, onBtn }) => (
  <div>
    {person.name} {person.number}
    <button onClick={onBtn} value={person.id}>delete</button>
  </div>
)

const PersonList = ({ persons, filter, onBtn }) => (
  persons.filter(p => p.name.includes(filter)).map(p => <Person key={p.name} person={p} onBtn={onBtn}/>)
)

const Notification = ({ message }) => {
  if (message.text === null) {
    return null
  }
  return <div className={message.error ? "error" : "notification"}>{message.text}</div>
}

export default App
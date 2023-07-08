import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Form from './components/Form'
import Display from './components/Display'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterValue, setFilterValue] = useState('')
  const [notification, setNotification] = useState({message: null, color: null})

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
      .catch(response => {
        console.log(response)
        setNotification({message: "failed to get people", color: "red"})
        setTimeout(() => {
          setNotification({message: null, color: null})
        }, 5000)
      })
  }, [])

  const updateName = event => {
    setNewName(event.target.value)
  }

  const updateNumber = event => {
    setNewNumber(event.target.value)
  }

  const updateFilter = event => {
    setFilterValue(event.target.value)
  }

  const deletePerson = event => {
    const id = parseInt(event.target.id)
    const name = event.target.name

    if (window.confirm(`Delete ${name}?`)) {
    personService
      .deletePerson(id)
      .then(response => {
        setPersons(persons.filter(person => person.id !== id))
        setNotification({message: `Deleted ${name}`, color: "green"})
        setTimeout(() => {
          setNotification({message: null, color: null})
        }, 5000)
      })
      .catch(response => {
        setNotification({message: `Failed to delete ${name}`, color: "red"})
        setTimeout(() => {
          setNotification({message: null, color: null})
        }, 5000)
      })
    }
  }

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.some(person => person.name === newName)){
      if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)){
        const personToUpdate = persons.find(person => person.name === newName)
        const personObject = {...personToUpdate, number: newNumber}
        personService
          .updatePerson(personToUpdate.id, personObject)
          .then(response => {
            setPersons(persons.map(person => person.id !== personToUpdate.id ? person : response.data))
            setNotification({message: `Updated ${newName}'s number`, color: "green"})
            setTimeout(() => {
              setNotification({message: null, color: null})
            }, 5000)
            setNewName('')
            setNewNumber('')
          })
          .catch(response => {
            setNotification({message: `Information for ${newName} has already been removed from the server`, color: "red"})
            setTimeout(() => {
              setNotification({message: null, color: null})
            }, 5000)
            setPersons(persons.filter(person => person.id !== personToUpdate.id))
          })
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber
      }
      personService.create(personObject)
      .then(response => {
        setPersons(persons.concat(response.data))
        setNotification({message: `Added ${newName}`, color: "green"})
        setTimeout(() => {
          setNotification({message: null, color: null})
        }, 5000)
        setNewName('')
        setNewNumber('')
      })
      .catch(response => {
        setNotification({message: `Failed to add person`, color: "red"})
        setTimeout(() => {
          setNotification({message: null, color: null})
        }, 5000)
      })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification}/>
      <Filter updateFilter={updateFilter} filterValue={filterValue}/>
      <h2>Add</h2>
      <Form updateName={updateName} 
            newName={newName} 
            updateNumber={updateNumber} 
            newNumber={newNumber}
            addPerson={addPerson}
      />
      <h2>Numbers</h2>
      <Display filterValue={filterValue} persons={persons} deletePerson={deletePerson}/>
    </div>
  )
}

export default App
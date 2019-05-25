import React, { useState, useEffect } from 'react'
import {Filter, PersonForm, Persons, FlashMessenger} from './Components'
import Server from './Server'


const App = () => {
    const [ persons, setPersons] = useState([])
    const [ filter, setFilter] = useState('')
    const [ message, setMessage] = useState({message: '', type: ''})

    const addPerson = p => {
      const existing = persons.find(o => o.name === p.name)
      if(!!existing){
          if(window.confirm(`${p.name} on jo luettelossa, korvataanko vanha numero uudella?`)){
              Server.update(existing.id, p)
                  // Slice existing away and concat new version of it
                  .then(r => setPersons(persons.filter(f => f.id !== existing.id).concat(r)))
          }
      } else {
          Server.create(p)
              .then(r => {
                  setPersons(persons.concat(r))
                  createMessage(`Lisättiin ${r.name}`,'ok')
              })
      }
    }

    const deletePerson = p => {
      Server.remove(p.id)
          .then(r => setPersons(persons.filter(f => f.id !== p.id)))
          .catch(r => (r.response.status === 404 ?
            createMessage(`${p.name} on jo poistettu`, 'notice') || true : false))

    }

    const createMessage = (message, type) => {
        setMessage({message, type})
        window.setTimeout(() => setMessage({message: '', type: ''}), 3000)
    }

    const hook = () => {
      Server.getAll()
          .then(r => setPersons(r))
    }

    useEffect(hook, [])

  return (
      <div>
          <h2>Puhelinluettelo</h2>
          <FlashMessenger message={message} />
          <Filter setFilter={setFilter} />
          <h3>Lisää uusi</h3>
          <PersonForm addPerson={addPerson} />
          <h3>Numerot</h3>
          <Persons persons={persons} filter={filter} deletePerson={deletePerson} />

    </div>
  )

}

export default App
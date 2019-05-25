import React, { useState, useEffect } from 'react'
import {Filter, PersonForm, Persons} from './Components'
import axios from 'axios'


const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
    const [ filter, setFilter] = useState('')

    const addPerson = p => {
      if(!!persons.find(o => o.name === p.name)){
          alert(`${p.name} on jo lisätty`)
      } else {
          setPersons(persons.concat(p))
      }
    }

    const hook = () => {
      axios.get('http://localhost:3001/persons')
          .then(r => setPersons(r.data))
    }

    useEffect(hook, [])

  return (
      <div>
          <h2>Puhelinluettelo</h2>
          <Filter setFilter={setFilter} />
          <h3>Lisää uusi</h3>
          <PersonForm addPerson={addPerson} />
          <h3>Numerot</h3>
          <Persons persons={persons} filter={filter} />

    </div>
  )

}

export default App
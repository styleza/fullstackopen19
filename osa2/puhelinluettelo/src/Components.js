import React, { useState } from 'react'
import './index.css'

const Filter = props => (
    <p>
        Rajaa näytettäviä:
        <input onChange={(e) => props.setFilter(e.target.value.toLowerCase())} />
    </p>
)

const FormHandler = (e, newPerson, cb) => {
    e.preventDefault();
    cb(newPerson)
}

const PersonForm = props => {
    const [ newPerson, setNewPerson ] = useState({name:'',number:''})

    return(
    <form onSubmit={(e) => FormHandler(e, newPerson, props.addPerson)} >
        <div>
            nimi:
            <input onChange={(e) => setNewPerson({name: e.target.value, number: newPerson.number})} />
        </div>
        <div>
            numero:
            <input onChange={(e) => setNewPerson({name: newPerson.name, number: e.target.value})} />
        </div>
        <div>
            <button type="submit">lisää</button>
        </div>
    </form>
    )
}

const PersonDeleteHandler = (cb, person) => {
    if(window.confirm(`Haluatko varmasti poistaa ${person.name}?`)){
        cb(person)
    }
}

const Person = props => (
    <li key={props.person.name}>
        {props.person.name}: {props.person.number}
        <button onClick={() => PersonDeleteHandler(props.deletePerson, props.person)}>Poista</button>
    </li>
)

const Persons = props => (
    <ul>
        {props.persons.map(person =>
            person.name.toLowerCase().indexOf(props.filter) !== -1 ?
                <Person key={person.id} person={person} deletePerson={props.deletePerson} />
                : null)}
    </ul>
)

const FlashMessenger = props => (
    <p className={`flash-message-${props.message.type}`}>{props.message.message}</p>
)


export {Filter, PersonForm, Persons, FlashMessenger}

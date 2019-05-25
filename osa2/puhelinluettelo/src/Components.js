import React, { useState } from 'react'

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


const Persons = props => (
    <ul>
        {props.persons.map(person =>
            person.name.toLowerCase().indexOf(props.filter) !== -1 ?
                <li key={person.name}>
                    {person.name}: {person.number}
                </li>
                : null)}
    </ul>
)


export {Filter, PersonForm, Persons}

const mongoose = require('mongoose')
let action = 'none'

if ( process.argv.length<3 ) {
    console.log(`Usage: ${process.argv[0]} ${process.argv[1]} <password> [<name> <phone>]`)
    process.exit(1)
} else if(process.argv.length === 3){
    action = 'list'
} else if(process.argv.length === 5){
    action = 'add'
}

const [,,password,name,phone] = process.argv

const url =
    `mongodb+srv://fullstack-io:${password}@cluster0-xyhxa.mongodb.net/test?retryWrites=true`

mongoose.connect(url, { useNewUrlParser: true })

const personSchema = new mongoose.Schema({
    name: String,
    phone: String
})

const Person = mongoose.model('Person', personSchema)

const addPerson = (name, phone) => {
    const person = new Person({
        name,
        phone
    })

    console.log(`lisätään ${name} numero ${phone} luetteloon`)

    person.save().then(response => {
        console.log('person saved!');
        mongoose.connection.close();
    })
}

const listpersons = () => {
    Person.find({}, (e, res) => {
        res.map(person => console.log(`${person.name} ${person.phone}`))
        mongoose.connection.close()
    })
}

if(action == 'list'){
    listpersons()
} else if(action == 'add') {
    addPerson(name, phone)
} else {
    console.log("Invalid parameter scheme")
    mongoose.connection.close()
}

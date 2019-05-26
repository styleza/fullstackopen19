require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const app = express()
const Person = require('./models/person')

const PORT = process.env.PORT ||3001

morgan.token('body', (req, res) => JSON.stringify(req.body))

const entityValidator = (entity) => {
    if(!('name' in entity && 'number' in entity)){
        return [false, 'Missing required parameters']
    }
/*    if(data.find(i => i.name === entity.name)){
        return [false, 'name must be unique']
    }*/
    return [true, '']
}

const apiRouter = express.Router()
apiRouter.route('/persons')
    .get((req,res) => {
        Person.find({}, (err, persons) => {
            if(err){
                res.status(500).end()
            } else {
                res.status(200).json(persons)
            }
        })
    })
    .post((req,res) => {
        const entity = req.body
        const [isValid,error] = entityValidator(entity)

        if(isValid){
            const person = new Person(entity)
            person.save().then(response => {
                res.status(200).json(response)
            })
        } else {
            res.status(400).json({error})
        }
    })

apiRouter.route('/persons/:personId')
    .get((req,res) => {
        Person.findById(req.params.personId)
            .exec((err,person) => {
                if(err || !person) {
                    res.status(404).end()
                }  else {
                    res.status(200).json(person.toJSON())
                }
        })
    })
    .delete((req,res) => {
        Person.findByIdAndRemove(req.params.personId)
            .exec((err, person) => {
                if(err || !person){
                    res.status(404).end()
                } else {
                    res.status(200).end()
                }
            })
    })
    .put((req,res) => {
        const [isValid,error] = entityValidator(req.body)
        Person.findByIdAndUpdate(req.params.personId, req.body)
            .exec((err, person) => {
                if(err || !person){
                    res.status(404).end()
                } else {
                    res.status(200).end()
                }
            })
    })

app.use(bodyParser.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(express.static('build'))
app.use('/api',apiRouter)


app.get('/info', (req, res) => {
    Person.find({}, (err, persons) => {
        if(!err) {
            res.status(200)
                .send(`Puhelinluettelossa ${persons.length} henkilön tiedot <br/> ${(new Date())}`)
        } else {
            res.status(500).end()
        }
    })

})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const app = express()
const Person = require('./models/person')

const PORT = process.env.PORT ||3001

morgan.token('body', (req, res) => JSON.stringify(req.body))

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
    .post((req,res,next) => {
        const person = new Person(req.body)
        person.save()
            .then(response => {
                res.status(200).json(response)
            })
            .catch(err => next(err))
    })

apiRouter.route('/persons/:personId')
    .get((req,res,next) => {
        Person.findById(req.params.personId)
            .then(person => {
                if(person) {
                    res.status(200).json(person)
                } else {
                    res.status(404).end()
                }
            })
            .catch(err => next(err))
    })
    .delete((req,res,next) => {
        Person.findByIdAndRemove(req.params.personId)
            .then(person => {
                if(person) {
                    res.status(200).end()
                } else {
                    res.status(404).end()
                }
            })
            .catch(err => next(err))
    })
    .put((req,res,next) => {
        Person.findByIdAndUpdate(req.params.personId, req.body)
            .then(person => {
                if(person) {
                    res.status(200).json(person)
                } else {
                    res.status(404).end()
                }
            })
            .catch(err => next(err))
    })

const errorHandler = (error, req, res, next) => {
    console.error(error.message)
    console.log("PYLLY")

    if (error.name === 'CastError' && error.kind == 'ObjectId') {
        return res.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return res.status(400).json({ error: error.message })
    }

    next(error)
}

app.use(bodyParser.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(express.static('build'))
app.use('/api',apiRouter)
app.use(errorHandler)


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
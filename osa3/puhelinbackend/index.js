const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const app = express()

const PORT = process.env.PORT ||3001

let data = [
    {
        "name": "Arto Hellas",
        "number": "040-123456",
        "id": 1
    },
    {
        "name": "Martti Tienari",
        "number": "040-123456",
        "id": 2
    },
    {
        "name": "Arto Järvinen",
        "number": "040-123456",
        "id": 3
    }
]

morgan.token('body', (req, res) => JSON.stringify(req.body))

const entityValidator = (entity) => {
    if(!('name' in entity && 'number' in entity)){
        return [false, 'Missing required parameters']
    }
    if(data.find(i => i.name === entity.name)){
        return [false, 'name must be unique']
    }
    return [true, '']
}

const apiRouter = express.Router()
apiRouter.route('/persons')

    .get((req,res) => {
        res.status(200).json(data)
    })
    .post((req,res) => {
        let entity = req.body
        entity['id'] = Math.round(Math.random()*100000)

        const [isValid,error] = entityValidator(entity)
        if(isValid){
            data = data.concat(entity)
            res.status(200).json(entity)
        } else {
            res.status(400).json({error})
        }
    })

apiRouter.route('/persons/:personId')
    .get((req,res) => {
    console.log(req.params.personId)
        const person = data.find(i => i.id == req.params.personId)
        if(person){
            res.status(200).json(person)
        } else {
            res.status(404).end()
        }
    })
    .delete((req,res) => {
        const lenBeforeFilter = data.length
        data = data.filter(i => i.id != req.params.personId)
        if(lenBeforeFilter > data.length){
            res.status(200).end()
        } else {
            res.status(404).end()
        }
    })

app.use(bodyParser.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(express.static('build'))
app.use('/api',apiRouter)


app.get('/info', (req, res) => {
    res.status(200)
        .send(`Puhelinluettelossa ${data.length} henkilön tiedot <br/> ${(new Date())}`)
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
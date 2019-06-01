const app = require('./app')
const http = require('http')

const PORT = require('./config/config').port

const server = http.createServer(app)

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
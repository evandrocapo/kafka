// Imports =========================================================
// Vamos importar o objeto 'server' que configuramos no arquivo
// './config/server'
const server = require('./config/server')

// =================================================================


const port = process.env.PORT || 3000;

server.get('/', async (req, res) => {
    return res.send("Kafka Node.JS")
})
server.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})
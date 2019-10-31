//Bring In the Primary Middle-Ware
const express = require('express')
const helmet = require('helmet')
require('dotenv').config()

//Set Globalse
const PORT = process.env.PORT || 5000
const path = require('path')
global._dbConfig = path.resolve(__dirname + '/data/dbConfig')
global._jwt = path.resolve(__dirname + '/api/auth/preAuth/jwt')

//Bring in the Routes.. Always after Globals
const webHooks = require('./webHooks/webhooks')

//Configure the server
const server = express()
server.use(helmet());
server.use(express.json())

//Implement Routes
server.use('/webhooks',webHooks)

server.listen(PORT,()=>{
    console.log(`\n** It's Alive... on port: ${PORT} **\n`)
})

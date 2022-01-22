const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const http = require('http')
const { Server } = require('socket.io')
const app = express()
const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
})

const authRouter = require('./routes/authRouter')
const tableRouter = require('./routes/tableRouter')
const settingsRouter = require('./routes/settingsRouter')
const PORT = process.env.PORT || 5000

io.on('connection', socket => {
    console.log(`user ${socket.id} is connected`);

    socket.on('message', data => {
        socket.broadcast.emit('message:recieved', data);
    })

    socket.on('disconnect', () => {
        console.log(`user ${socket.id} is left`);
    })
})

app.use(cors({
    origin: '*',
    methods: ['POST', 'GET']
}))
app.use(express.json())
app.use('/auth', authRouter)
app.use('/tables', tableRouter)
app.use('/settings', settingsRouter)

const start = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/vue", { useUnifiedTopology: true, useNewUrlParser: true })
        server.listen(PORT, () => console.log(`local server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()
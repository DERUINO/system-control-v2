const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const authRouter = require('./routes/authRouter')
const tableRouter = require('./routes/tableRouter')
const settingsRouter = require('./routes/settingsRouter')
const PORT = process.env.PORT || 5000

const app = express()

app.use(cors())
app.use(express.json())
app.use('/auth', authRouter)
app.use('/tables', tableRouter)
app.use('/settings', settingsRouter)

const start = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/vue", { useUnifiedTopology: true, useNewUrlParser: true })
        app.listen(PORT, () => console.log(`local server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()
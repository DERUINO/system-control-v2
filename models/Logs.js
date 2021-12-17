const {$chema, model, Schema} = require('mongoose')

const Logs = new Schema({
    username: { type: String, required: true },
    status: { type: String, required: true },
    ip: { type: String, required: true },
    date: { type: String, required: false, default: Date.now() },
})

module.exports = model('Logs', Logs)
const {model, Schema} = require('mongoose')

const Room = new Schema({
    name: { type: String, unique: true, required: true },
    createdAt: { type: Date, required: false, default: Date.now() },
    updatedAt: { type: Date, required: false, default: Date.now() },
})

module.exports = model('Room', Room)

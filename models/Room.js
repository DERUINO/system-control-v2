const {model, Schema} = require('mongoose')

const Room = new Schema({
    name: { type: String, unique: true, required: true },
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date, required: true },
})

module.exports = model('Room', Room)

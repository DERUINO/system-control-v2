const {model, Schema} = require('mongoose')

const Spec = new Schema({
    name: { type: String, unique: true, required: true },
    genre: { type: String, required: true },
    description: { type: String, required: true },
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date, required: true },
})

module.exports = model('Spec', Spec)

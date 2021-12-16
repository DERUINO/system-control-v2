const { model, Schema } = require('mongoose')

const User = new Schema({
    username: { type: String, unique: true, required: true },
    spec: { type: Object, required: true },
    genre: { type: String, required: true },
    createdAt: { type: Date, required: false, default: Date.now() },
    updatedAt: { type: Date, required: false, default: Date.now() },
})

module.exports = model('User', User)

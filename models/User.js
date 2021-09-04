const { model, Schema } = require('mongoose')
const ObjectId = Schema.ObjectId

const User = new Schema({
    username: { type: String, unique: true, required: true },
    spec: { type: ObjectId, required: true, ref: 'Spec' },
    genre: { type: String, required: true },
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date, required: true },
})

module.exports = model('User', User)

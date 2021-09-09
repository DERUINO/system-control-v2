const { Int32 } = require('mongodb')
const { model, Schema } = require('mongoose')
const ObjectId = Schema.ObjectId

const Table = new Schema({
    username: { type: String, required: true },
    spec: { type: ObjectId, required: true, ref: 'Spec' },
    room: { type: ObjectId, required: true, ref: 'Room' },
    genre: { type: String, required: true  },
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date, required: true },
    getout: { type: Boolean, required: true },
})

module.exports = model('Table', Table)

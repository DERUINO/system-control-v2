const { Int32 } = require('mongodb')
const { model, Schema } = require('mongoose')

const Table = new Schema({
    username: { type: String, required: true },
    spec: { type: Object, required: true },
    room: { type: Object, required: true },
    genre: { type: String, required: true  },
    createdAt: { type: Date, required: false, default: Date.now() },
    updatedAt: { type: Date, required: false, default: Date.now() },
    getout: { type: Boolean, required: true },
})

module.exports = model('Table', Table)

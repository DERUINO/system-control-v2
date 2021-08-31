const {model, Schema} = require('mongoose')

const Table = new Schema({
    username: { type: String, required: true },
    spec: { type: String, required: true, default: '-' },
    room: { type: String, required: true },
    dateStart: { type: Date, required: true },
    dateEnd: { type: Date },
})

module.exports = model('Table', Table)

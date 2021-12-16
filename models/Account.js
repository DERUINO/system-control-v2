const { model, Schema } = require('mongoose')

const Account = new Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    roles: [{ type: String, ref: 'Role' }],
    createdAt: { type: Date, required: false, default: Date.now() },
    updatedAt: { type: Date, required: false, default: Date.now() },
})

module.exports = model('Account', Account)
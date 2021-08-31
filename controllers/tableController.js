const Table = require('../models/Table')

class tableController {
    async getTables(req, res) {
        try {
            const tables = await Table.find().sort({dateStart: -1})
            res.json({data: tables, status: 200})
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'response error'})
        }
    }

    async addTable(req, res) {
        try {
            const { username, spec, room, dateStart } = req.body
            const checkRoom = await Table.findOne({ room, dateEnd: null })
            
            if (checkRoom)
                return res.status(400).json({ message: 'Данный класс уже занят' })
            
            const update = new Table({ username, spec, room, dateStart })
            await update.save()

            res.json({data: update, status: 200, message: 'Запись успешно добавлена'})
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'response error'})
        }
    }

    async deleteTable(req, res) {
        try {
            const { id } = req.body
            const update = await Table.deleteOne({_id: id})

            res.json({data: update, status: 200, message: 'Запись успешно удалена'})
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'response error'})
        }
    }

    async getOut(req, res) {
        try {
            const { id } = req.body
            const update = await Table.updateOne({ _id: id }, {dateEnd: Date.now()})

            res.json({data: update, status: 200, message: 'Ключ успешно сдан'})
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'response error'})
        }
    }
}

module.exports = new tableController()
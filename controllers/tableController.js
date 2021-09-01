const Table = require('../models/Table')

class tableController {
    async getTables(req, res) {
        try {
            const tables = await Table.find().sort({ dateStart: -1 })
            const count = await Table.find().count()
            res.json({data: tables, status: 200, count: count})
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'response error'})
        }
    }

    async getFilteredTables(req, res) {
        try {
            const { name, type } = req.body
            const filteredName = new RegExp(name, 'i')
            const tables = await Table.find({ [type]: filteredName }).sort({ dateStart: -1 })
            const count = await Table.find({ [type]: filteredName }).count()
            res.json({data: tables, status: 200, count: count})
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'response error'})
        }
    }

    async getPaginatedTables(req, res) {
        try {
            const { page } = req.body

            if (page < 0)
                return res.status(400).json({ message: 'Как ты собрался смотреть нулевую страницу?' })

            const tables = await Table.find().sort({ dateStart: -1 }).skip(page * 50).limit(50)
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
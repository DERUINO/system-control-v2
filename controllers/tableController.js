const Table = require('../models/Table')
const User = require('../models/User')

class tableController {
    async getTables(req, res) {
        try {
            const tables = await Table.find().populate([{path: 'spec'}, {path: 'room'}]).sort({ createdAt: -1 }).limit(50).lean()
            const count = await Table.find().count().lean()
            res.json({data: tables, status: 200, count: count})
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'response error'})
        }
    }

    async getUsers(req, res) {
        try {
            const users = await User.find().populate('spec').lean()
            res.json({data: users, status: 200})
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'response error'})
        }
    }

    async getFilteredTables(req, res) {
        try {
            const { name } = req.body
            const filteredName = new RegExp(name, 'i')
            const tables = await Table.find({username: filteredName}).populate([{path: 'spec'}, {path: 'room'}]).sort({ createdAt: -1 }).limit(50).lean()
            const count = await Table.find({ username: filteredName }).count().lean()
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

            const tables = await Table.find().populate([{path: 'spec'}, {path: 'room'}]).sort({ createdAt: -1 }).skip(page * 50).limit(50).lean()
            res.json({data: tables, status: 200})
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'response error'})
        }
    }

    async getSearchedPaginatedTables(req, res) {
        try {
            const { page, name } = req.body
            const filteredName = new RegExp(name, 'i')

            if (page < 0)
                return res.status(400).json({ message: 'Как ты собрался смотреть нулевую страницу?' })

            const tables = await Table.find({username: filteredName}).populate([{path: 'spec'}, {path: 'room'}]).sort({ createdAt: -1 }).skip(page * 50).limit(50).lean()
            res.json({data: tables, status: 200})
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'response error'})
        }
    }

    async addTable(req, res) {
        try {
            const { username, spec, room, genre } = req.body
            // const checkRoom = await Table.findOne({ room, getout: false }).populate('room').lean()
            
            // if (checkRoom)
            //     return res.status(400).json({ message: 'Данный класс уже занят' })
            
            const update = new Table({ username, spec, room, genre, createdAt: Date.now(), updatedAt: Date.now(), getout: false })
            await update.save()
            const resData = await Table.findOne({ _id: update._id }).populate([{path: 'spec'}, {path: 'room'}]).lean()
            res.json({data: resData, status: 200, message: 'Запись успешно добавлена'})
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'response error'})
        }
    }

    async deleteTable(req, res) {
        try {
            const { id } = req.body
            const update = await Table.deleteOne({_id: id}).lean()

            res.json({data: update, status: 200, message: 'Запись успешно удалена'})
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'response error'})
        }
    }

    async getOut(req, res) {
        try {
            const { id } = req.body
            const update = await Table.updateOne({ _id: id }, {updatedAt: Date.now(), getout: true})

            res.json({data: update, status: 200, message: 'Ключ успешно сдан'})
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'response error'})
        }
    }
}

module.exports = new tableController()
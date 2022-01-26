const User = require('../models/User')
const Room = require('../models/Room')
const Spec = require('../models/Spec')
const Account = require('../models/Account');

class settingsController {
    async addRoom(req, res) {
        try {
            const { name } = req.body
            const checkroom = await Room.findOne({ name }).lean()
            
            if (checkroom)
                res.status(400).json({ message: 'Данный класс уже существует' })
            
            const addroom = new Room({ name })
            await addroom.save()
            res.json({data: addroom, status: 200, message: 'Новый класс успешно добавлен'})
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'response error'})
        }
    }

    async deleteRoom(req, res) {
        try {
            const { roomId } = req.body           
            const checkroom = await Room.findOne({ _id: roomId }).lean()
            
            if (!checkroom)
                res.status(400).json({ message: 'Данного класса не существует' })
            
            const deleteroom = await Room.deleteOne({_id: roomId})
            res.json({data: deleteroom, status: 200, message: 'Класс успешно удален'})
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'response error'})
        }
    }

    async addUser(req, res) {
        try {
            const { username, spec, genre } = req.body
            const filteredName = new RegExp(username, 'i')
            const checkuser = await User.findOne({ username: filteredName }).lean()
            
            if (checkuser)
                res.status(400).json({ message: 'Данный пользователь уже существует' })
            
            const filteredSpec = await Spec.findOne({ _id: spec }).lean()
            const adduser = new User({username, spec: filteredSpec, genre})
            await adduser.save()

            res.json({data: adduser, status: 200, message: 'Новый пользователь успешно добавлен'})
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'response error'})
        }
    }

    async deleteUser(req, res) {
        try {
            const { userId } = req.body
            const deleteuser = await User.deleteOne({ _id: userId })
            res.json({data: deleteuser, status: 200, message: 'Пользователь успешно удален'})
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'response error'})
        }
    }

    async addSpec(req, res) {
        try {
            const { name, genre, description } = req.body
            const filteredSpec = new RegExp(name, 'i')
            const checkspec = await Spec.findOne({ name: filteredSpec }).lean()
            
            if (checkspec)
                res.status(400).json({ message: 'Данная специальность уже существует' })
            
            const addspec = new Spec({name, genre, description, createdAt: Date.now(), updatedAt: Date.now()})
            await addspec.save()
            res.json({data: addspec, status: 200, message: 'Новая специальность успешно добавлена'})
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'response error'})
        }
    }

    async deleteSpec(req, res) {
        try {
            const { specId } = req.body           
            const checkspec = await Spec.findOne({ _id: specId }).lean()
            
            if (!checkspec)
                res.status(400).json({ message: 'Данной специальности не существует' })
            
            const deletespec = await Spec.deleteOne({_id: specId})
            res.json({data: deletespec, status: 200, message: 'Специальность успешно удалена'})
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'response error'})
        }
    }

    async getSpecs(req, res) {
        try {
            const speclist = await Spec.find().sort({createdAt: -1}).lean()
            res.json({data: speclist, status: 200})
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'response error'})
        }
    }

    async getRooms(req, res) {
        try {
            const roomlist = await Room.find().sort({createdAt: -1}).lean()
            res.json({data: roomlist, status: 200})
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'response error'})
        }
    }

    async getUsers(req, res) {
        try {
            const userlist = await User.find().populate('spec').sort({createdAt: -1}).lean()
            res.json({data: userlist, status: 200})
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'response error'})
        }
    }

    async getUserInfo(req, res) {
        try {
            const { id } = req.body;

            const user = await Account.findOne({ _id: id }).lean();
            res.json({ data: user, status: 200 });
        } catch (e) {
            console.log(e);
            res.status(400).json({message: 'response error'});
        }
    }
}

module.exports = new settingsController()
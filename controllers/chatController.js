const Chat = require("../models/Chat");

class chatController {
    async addMessage(req, res) {
        const { text, authorId, recieveId, dialogId } = req.body

        const message = new Chat({ text, authorId, recieveId, dialogId })
        await message.save()
        res.json({status: 200, data: message})
    }

    async getMessages(req, res) {
        const { authorId, recieveId } = req.body

        const messages = await Chat.find({ $or: [{ authorId, recieveId }, {authorId: recieveId, recieveId: authorId}] }).populate('Account').lean()
        res.json({ status: 200, data: messages })
    }
}

module.exports = new chatController();
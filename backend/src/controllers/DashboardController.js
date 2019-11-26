const horse = require('../models/Horse')

module.exports = {
    async show(req, res) {
        const { user_id } = req.headers

        const horses = await horse.find({ user: user_id })

        return res.json(horses)
    }
}
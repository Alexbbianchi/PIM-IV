const Horse = require('../models/Horse');


module.exports = {

    async index(req, res) {
        const { breed } = req.query
        const horses = await Horse.find({ breed: breed })
        return res.json(horses)
    },

    async store(req, res) {

        const { filename } = req.file
        const {
            local, 
            breed, 
            price, 
            age, 
            weight, 
            height, 
            vaccines, 
            ownerName, 
            ownerPhone, 
            ownerEmail, 
            ownerAdress
        } = req.body
        const { user_id } = req.headers

        horse = await Horse.create({
            user: user_id,
            thumbnail: filename,
            local,
            breed,
            price,
            age,
            weight,
            height,
            vaccines,
            ownerName,
            ownerPhone,
            ownerEmail,
            ownerAdress
        })
        return res.json(horse)
    }
}
const Booking = require('../models/Booking.js')

module.exports = {
    async store(req, res) {
        const { user_id } = req.headers
        const { horse_id } = req.params
        const { date } = req.body

        const booking = await Booking.create({
            user: user_id,
            horse: horse_id,
            date
        })

        await booking.populate('horse').populate('user').execPopulate()

        const ownerSocket = req.connectedUsers[booking.horse.user]

        if (ownerSocket) {
            req.io.to(ownerSocket).emit('booking_request', booking)
        }

        return res.json(booking)
    }
}
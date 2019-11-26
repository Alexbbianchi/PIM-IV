const express = require('express')

const multer = require('multer')
const uploadConfig = require('./config/upload')

const SessionController = require('./controllers/SessionController')
const horseController = require('./controllers/horseController')
const DashboardController = require('./controllers/DashboardController')
const BookingController = require('./controllers/BookingController')
const ApprovalController = require('./controllers/ApprovalController')
const RejectionController = require('./controllers/RejectionController')

const routes = express.Router()
const uploadMiddleware = multer(uploadConfig)

routes.post('/sessions', SessionController.store)

routes.get('/horses', horseController.index)
routes.post('/horses', uploadMiddleware.single('thumbnail'), horseController.store)

routes.get('/dashboard', DashboardController.show)

routes.post('/horses/:horse_id/bookings', BookingController.store)

routes.post('/bookings/:booking_id/approvals', ApprovalController.store)
routes.post('/bookings/:booking_id/rejections', RejectionController.store)

module.exports = routes
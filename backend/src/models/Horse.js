const mongoose = require('mongoose');

const horseSchema = new mongoose.Schema({
    thumbnail: String,
    local: String,
    price: String,
    breed: String,
    age: String,
    vaccines: String,
    weight: Number,
    height: Number,
    ownerName: String,
    ownerAdress: String,
    ownerEmail: String,
    ownerPhone: Number,

    user: {
        type: mongoose.Schema.Types.ObjectId, //stores the referenced Id from user that stored a new horse
        ref: 'User'
    }
}, {
    toJSON: {
        virtuals: true,
    },
});

horseSchema.virtual('thumbnail_url').get(function(){
    return `http://localhost:3333/files/${this.thumbnail}`
})

module.exports = mongoose.model('Horse', horseSchema);
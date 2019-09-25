const mongoose = require('mongoose');

const StoreSchema = mongoose.Schema({
    title: String,
    content: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Store', StoreSchema);
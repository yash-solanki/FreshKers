const mongoose = require('mongoose');

const RackSchema = mongoose.Schema({
    rackId: String,
    rackContainer: String,
    rackCapacity: Number,
    rackCurrentQty: Number
}, {
    timestamps: true
});

module.exports = mongoose.model('Rack', RackSchema);
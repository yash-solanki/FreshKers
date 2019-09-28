const mongoose = require('mongoose');

const RackSchema = mongoose.Schema({
    rackId: String,
    rackContainer: String,
    rackProductIds: Array,
    rackCapacity: Number,
    rackCurrentQty: Number,
    isActive: {type: Boolean, default: true}
}, {
    timestamps: true,
    collectionName: 'racks'
});

module.exports = mongoose.model('Racks', RackSchema);

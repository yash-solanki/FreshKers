const mongoose = require('mongoose');

const ContainerSchema = mongoose.Schema({
    productIds: {type: Array},
    productName: {type: String},
    productQty: {type: Number},
    productPrice: {type: Number}
});

const TrollySchema = mongoose.Schema({
    trollyId: String,
    trollyContainer: [ContainerSchema],
    isCheckout: {type: Boolean, default: false},
    isActive: {type: Boolean, default: true}
}, {
    timestamps: true,
    collectionName: 'trolley'
});

module.exports = mongoose.model('Trolly', TrollySchema);

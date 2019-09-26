const mongoose = require('mongoose');

const ContainerSchema = mongoose.Schema({
    productId: {type: String},
    productName: {type: String},
    productQty: {type: Number},
    productPrice: {type: Number}
});

const TrollySchema = mongoose.Schema({
    trollyId: String,
    trollyContainer: [ContainerSchema]
}, {
    timestamps: true
});

module.exports = mongoose.model('Trolly', TrollySchema);
